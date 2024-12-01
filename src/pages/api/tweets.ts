import type { NextApiRequest, NextApiResponse } from "next";

// Cache w pamięci z dłuższym czasem przechowywania
const CACHE: { [key: string]: { data: any; timestamp: number } } = {};
const CACHE_DURATION = 15 * 60 * 1000; // 15 minut w milisekundach

interface TwitterResponse {
  data: Array<{
    id: string;
    text: string;
    created_at: string;
    author_id: string;
    public_metrics: {
      retweet_count: number;
      reply_count: number;
      like_count: number;
      quote_count: number;
    };
  }>;
  includes: {
    users: Array<{
      id: string;
      name: string;
      username: string;
      profile_image_url: string;
    }>;
  };
}

const INITIAL_CACHE_DATA: { [key: string]: any } = {
  Team_BMC: [
    {
      id: "initial1",
      text: "Ładowanie najnowszych tweetów...",
      created_at: new Date().toISOString(),
      author: {
        name: "Team BMC",
        username: "Team_BMC",
        profile_image_url: "/images/fight_club.png",
      },
      public_metrics: {
        retweet_count: 0,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
    },
  ],
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const normalizedUsername = (username as string).trim();
    const cacheKey = `tweets-${normalizedUsername}`;

    // Inicjalizacja cache dla znanego użytkownika, jeśli cache jest pusty
    if (!CACHE[cacheKey] && INITIAL_CACHE_DATA[normalizedUsername]) {
      CACHE[cacheKey] = {
        data: INITIAL_CACHE_DATA[normalizedUsername],
        timestamp: Date.now(),
      };
    }

    // Sprawdź cache
    const cachedData = CACHE[cacheKey];
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      console.log("Returning cached data for", normalizedUsername);
      return res.status(200).json(cachedData.data);
    }

    // Jeśli nie ma w cache lub cache wygasł
    const userResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${normalizedUsername}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );

    const userData = await userResponse.json();

    // Obsługa rate limitu
    if (userData.status === 429) {
      console.log("Rate limit hit, checking for cached data");
      if (cachedData) {
        // Zwróć cached dane nawet jeśli są przeterminowane
        return res.status(200).json(cachedData.data);
      }
      return res.status(429).json({
        message: "Rate limit exceeded. Please try again in a few minutes.",
      });
    }

    if (!userData.data) {
      console.error("Twitter API Error (user):", userData);
      return res.status(404).json({ message: "User not found" });
    }

    const userId = userData.data.id;

    // Drugi request z poprawionym max_results
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?` +
        new URLSearchParams({
          max_results: "1",
          "tweet.fields": "created_at,public_metrics",
          expansions: "author_id",
          "user.fields": "name,username,profile_image_url",
        }),
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );

    const tweetsData = await tweetsResponse.json();

    // Obsługa rate limitu dla drugiego zapytania
    if (tweetsData.status === 429) {
      console.log("Rate limit hit on tweets request, checking for cached data");
      if (cachedData) {
        return res.status(200).json(cachedData.data);
      }
      return res.status(429).json({
        message: "Rate limit exceeded. Please try again in a few minutes.",
      });
    }

    if (!tweetsData.data || !tweetsData.includes) {
      console.error("Twitter API Error (tweets):", tweetsData);
      // Jeśli mamy cache, użyj go w przypadku błędu
      if (cachedData) {
        return res.status(200).json(cachedData.data);
      }
      return res.status(500).json({ message: "Error fetching tweets data" });
    }

    const formattedTweets = tweetsData.data.map((tweet: any) => {
      const author = tweetsData.includes.users.find(
        (user: any) => user.id === tweet.author_id
      );
      return {
        id: tweet.id,
        text: tweet.text,
        created_at: tweet.created_at,
        author: {
          name: author?.name || "",
          username: author?.username || "",
          profile_image_url: author?.profile_image_url || "",
        },
        public_metrics: tweet.public_metrics,
      };
    });

    // Zapisz w cache
    CACHE[cacheKey] = {
      data: formattedTweets,
      timestamp: Date.now(),
    };

    return res.status(200).json(formattedTweets);
  } catch (error) {
    console.error("Twitter API Error:", error);
    // W przypadku błędu, sprawdź czy mamy cached dane
    const cachedData = CACHE[`tweets-${(req.query.username as string).trim()}`];
    if (cachedData) {
      return res.status(200).json(cachedData.data);
    }
    return res.status(500).json({
      message: "Error fetching tweets",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
