import { HobbyCategories, Question } from "../types";

export const questions: Question[] = [
  {
    id: 1,
    question: "How much free time do you typically have?",
    options: [
      "1-2 hours/day",
      "3-4 hours/day",
      "5+ hours/day",
      "Weekends only",
    ],
  },
  {
    id: 2,
    question: "What's your preferred environment?",
    options: ["Indoors", "Outdoors", "Both", "Virtual"],
  },
  {
    id: 3,
    question: "Do you prefer social or solitary activities?",
    options: [
      "Very social",
      "Somewhat social",
      "Mostly solitary",
      "Completely solitary",
    ],
  },
  {
    id: 4,
    question: "What's your budget for a new hobby?",
    options: ["No budget", "Under $100", "$100-500", "$500+"],
  },
];

export const hobbies: HobbyCategories = {
  indoorsSolitary: ["Reading", "Painting", "Writing", "Meditation"],
  indoorsSocial: ["Board Games", "Cooking Classes", "Book Club", "Chess Club"],
  outdoorsSolitary: ["Gardening", "Photography", "Hiking", "Bird Watching"],
  outdoorsSocial: [
    "Team Sports",
    "Rock Climbing",
    "Group Hiking",
    "Volunteering",
  ],
  virtualSolitary: ["Programming", "Digital Art", "Blogging", "Online Courses"],
  virtualSocial: [
    "Online Gaming",
    "Virtual Book Clubs",
    "Language Exchange",
    "Online DnD",
  ],
};
