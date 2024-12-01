import { HobbyAttributes } from "@/types/hobby";
import { translateToPolish } from "@/utils/translate-to-polish";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { hobbiesData } from "../../data/hobbies";

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Tweet {
  id: string;
  text: string;
  created_at: string;
  author: {
    name: string;
    username: string;
    profile_image_url: string;
  };
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
}

export default function HobbyDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [tasks, setTasks] = useState<Task[]>([]);
  const hobby = hobbiesData[id as string];
  const [activeTab, setActiveTab] = useState<"details" | "social">("details");
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [isLoadingTweets, setIsLoadingTweets] = useState(false);

  useEffect(() => {
    if (hobby) {
      setTasks(hobby.tasks);
    }
  }, [hobby]);

  useEffect(() => {
    if (activeTab === "social" && hobby?.twitterHandle) {
      fetchTweets(hobby.twitterHandle);
    }
  }, [activeTab, hobby?.twitterHandle]);

  const fetchTweets = async (username: string) => {
    setIsLoadingTweets(true);
    try {
      const response = await fetch(`/api/tweets?username=${username}`);
      const data = await response.json();
      setTweets(data);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    } finally {
      setIsLoadingTweets(false);
    }
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  if (!hobby) {
    return (
      <Layout>
        <div
          className="min-h-screen flex items-center justify-center"
          role="alert"
          aria-live="polite"
        >
          <p className="text-gray-500 text-xl">Hobby nie zostało znalezione</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main
        className="max-w-4xl mx-auto px-4 py-8 space-y-8"
        role="main"
        aria-labelledby="hobby-title"
      >
        {/* Hero Section */}
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={hobby.imageUrl}
            alt={`Zdjęcie przedstawiające ${hobby.name}`}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            aria-hidden="true"
          />
          <h1
            id="hobby-title"
            className="absolute bottom-6 left-6 text-4xl font-bold text-white"
          >
            {hobby.name}
          </h1>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("details")}
              className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === "details"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              aria-current={activeTab === "details" ? "page" : undefined}
            >
              Szczegóły
            </button>
            <button
              onClick={() => setActiveTab("social")}
              className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === "social"
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              aria-current={activeTab === "social" ? "page" : undefined}
            >
              Social Media
            </button>
          </nav>
        </div>

        {activeTab === "details" ? (
          <>
            {/* Attributes Grid */}
            <section
              className="bg-white rounded-xl shadow-lg p-6"
              aria-labelledby="attributes-heading"
            >
              <h2
                id="attributes-heading"
                className="text-2xl font-bold text-gray-900 mb-4"
              >
                Charakterystyka hobby
              </h2>
              <div
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
                role="list"
                aria-label="Lista charakterystyk hobby"
              >
                {Object.entries(hobby.attributes).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-3 bg-gray-50 rounded-lg"
                    role="listitem"
                  >
                    <div className="text-sm text-gray-500 capitalize">
                      {translateToPolish(key.trim() as keyof HobbyAttributes)}
                    </div>
                    <div
                      className="mt-1 flex items-center"
                      role="meter"
                      aria-label={`Poziom ${translateToPolish(
                        key.trim() as keyof HobbyAttributes
                      )}`}
                      aria-valuenow={value}
                      aria-valuemin={0}
                      aria-valuemax={5}
                    >
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-2 w-4 mr-1 rounded-full ${
                            level <= value ? "bg-indigo-500" : "bg-gray-200"
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {value}/5
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          // Social Media Content
          <section
            className="bg-white rounded-xl shadow-lg p-6"
            aria-labelledby="social-heading"
          >
            <h2
              id="social-heading"
              className="text-2xl font-bold text-gray-900 mb-4"
            >
              Aktualności z X (Twitter)
            </h2>
            {isLoadingTweets ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
              </div>
            ) : tweets.length > 0 ? (
              <div className="space-y-6">
                {tweets.map((tweet) => (
                  <div
                    key={tweet.id}
                    className="border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <Image
                        src={tweet.author.profile_image_url}
                        alt={tweet.author.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <div className="font-semibold">{tweet.author.name}</div>
                        <div className="text-gray-500">
                          @{tweet.author.username}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-800 mb-2">{tweet.text}</p>
                    <div className="flex space-x-6 text-gray-500 text-sm">
                      <span>
                        {new Date(tweet.created_at).toLocaleDateString()}
                      </span>
                      <span>{tweet.public_metrics.like_count} polubień</span>
                      <span>
                        {tweet.public_metrics.retweet_count} retweetów
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Brak dostępnych tweetów lub konto nie zostało znalezione.
              </p>
            )}
          </section>
        )}

        {/* Description Section */}
        <section
          className="bg-white rounded-xl shadow-lg p-6"
          aria-labelledby="description-heading"
        >
          <h2
            id="description-heading"
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            O tym hobby
          </h2>
          <p className="text-gray-600 leading-relaxed">{hobby.description}</p>
        </section>

        {/* Tasks Section */}
        <section
          className="bg-white rounded-xl shadow-lg p-6"
          aria-labelledby="tasks-heading"
        >
          <h2
            id="tasks-heading"
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            Lista zadań
          </h2>
          <div
            className="space-y-3"
            role="list"
            aria-label="Lista zadań do wykonania"
          >
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 
                         transition-colors duration-200"
                role="listitem"
              >
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleToggleTask(task.id)}
                  className="w-5 h-5 text-forest border-forest rounded 
                           focus:ring-forest cursor-pointer transition-colors"
                  aria-label={`Zadanie: ${task.title}`}
                />
                <span
                  className={`flex-1 ${
                    task.isCompleted
                      ? "text-gray-400 line-through"
                      : "text-gray-700"
                  }`}
                >
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section
          className="bg-white rounded-xl shadow-lg p-6"
          aria-labelledby="resources-heading"
        >
          <h2
            id="resources-heading"
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            Źródła do nauki
          </h2>
          <div
            className="space-y-4"
            role="list"
            aria-label="Lista źródeł do nauki"
          >
            {hobby.sources.map((source) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg hover:bg-gray-50 transition-all 
                         duration-200 hover:shadow-md focus:outline-none focus:ring-2 
                         focus:ring-indigo-500 focus:ring-offset-2"
                aria-label={`${source.name}: ${source.description}. Otwiera się w nowej karcie.`}
              >
                <div className="flex items-center space-x-4">
                  {source.type === "youtube" ? (
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      role="img"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  ) : source.type === "wikipedia" ? (
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      role="img"
                    >
                      <path d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.931-1.532.029-1.406-3.321-4.293-9.144-5.651-12.409-.251-.601-.441-.987-.619-1.139-.181-.15-.554-.24-1.122-.271-.329-.026-.494-.078-.494-.348 0-.145.111-.271.335-.271.223 0 1.354.07 2.679.07 1.326 0 2.327-.07 2.551-.07.223 0 .335.124.335.271 0 .27-.166.322-.493.348-.68.044-1.02.142-1.02.494 0 .128.036.281.106.462.935 2.403 2.812 7.016 3.518 8.687.164.386.333.392.494.008.904-2.051 2.786-6.329 3.458-8.424.119-.371.183-.651.183-.832 0-.379-.314-.493-.941-.536-.329-.026-.494-.078-.494-.348 0-.145.111-.271.335-.271.223 0 1.354.07 2.679.07 1.326 0 2.327-.07 2.551-.07.223 0 .335.124.335.271z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      role="img"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {source.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {source.description}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    role="img"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
