import { HobbyCategories, Question } from "../types";

export const questions: Question[] = [
  {
    id: 1,
    question: "Jaki poziom aktywności fizycznej preferujesz?",
    options: ["Bardzo duży", "Duży", "Mały", "Bardzo mały"],
  },
  {
    id: 2,
    question: "Ile czasu w tygodniu możesz poświęcić na swoją aktywność?",
    options: [
      "Ponad 10 godzin",
      "5-10 godzin",
      "2-5 godzin",
      "Mniej niż 2 godziny",
    ],
  },
  {
    id: 3,
    question: "Jak ważna jest dla Ciebie interakcja z innymi ludźmi?",
    options: [
      "Bardzo ważna, lubię spędzać czas z innymi",
      "Średnio, czasem wolę spokój",
      "Niezbyt, preferuję samotność",
      "Wcale, wolę spędzać czas samodzielnie",
    ],
  },
  {
    id: 4,
    question: "Jak dużą mobilność chciałbyś mieć w swojej aktywności?",
    options: ["Bardzo dużą", "Średnią", "Niewielką", "Bardzo małą"],
  },
  {
    id: 5,
    question: "Jak ważna jest dla Ciebie rywalizacja?",
    options: [
      "Bardzo ważna, lubię rywalizować",
      "Średnio, czasem rywalizuję",
      "Nie lubię rywalizacji",
      "Wcale, nie interesuje mnie rywalizacja",
    ],
  },
  {
    id: 6,
    question: "Jak ważny jest dla Ciebie poziom relaksu i odpoczynku?",
    options: [
      "Bardzo ważny, szukam odpoczynku",
      "Średnio ważny",
      "Nie zależy mi na tym",
      "Wcale, nie szukam odpoczynku",
    ],
  },
  {
    id: 7,
    question: "Czy chcesz, aby Twoja aktywność mogła generować dochód?",
    options: [
      "Tak, bardzo mi zależy na zarobkach",
      "Może być, jeśli się pojawią",
      "Raczej nie, to nie jest dla mnie priorytet",
      "Wcale, nie zależy mi na zarobkach",
    ],
  },
  {
    id: 8,
    question:
      "Jak ważny jest dla Ciebie poziom hałasu w otoczeniu podczas aktywności?",
    options: [
      "Bardzo ważny, wolę ciszę",
      "Średnio ważny, lubię umiarkowany hałas",
      "Nie przeszkadza mi hałas",
      "Wcale, im głośniej, tym lepiej",
    ],
  },
  {
    id: 9,
    question:
      "Jak ważny jest dla Ciebie wpływ Twojej aktywności na środowisko?",
    options: [
      "Bardzo ważny, chcę dbać o środowisko",
      "Średnio ważny, ale nie jest to kluczowe",
      "Niezbyt ważny",
      "Wcale, nie interesuje mnie wpływ na środowisko",
    ],
  },
  {
    id: 10,
    question:
      "Jak bardzo zależy Ci na wpływie Twojej aktywności na zdrowie psychiczne?",
    options: [
      "Bardzo zależy, chcę poprawić swoje samopoczucie",
      "Średnio zależy, może to być przy okazji",
      "Niezbyt zależy",
      "Wcale, nie interesuje mnie to",
    ],
  },
  {
    id: 11,
    question:
      "Jak bardzo zależy Ci na wpływie Twojej aktywności na zdrowie fizyczne?",
    options: [
      "Bardzo zależy, chcę poprawić swoją kondycję",
      "Średnio zależy",
      "Niezbyt zależy",
      "Wcale, nie interesuje mnie to",
    ],
  },
  {
    id: 12,
    question:
      "Jak ważny jest dla Ciebie element kreatywności w Twoich aktywnościach?",
    options: [
      "Bardzo ważny, chcę wyrażać siebie",
      "Średnio ważny",
      "Nie zależy mi na tym",
      "Wcale, nie potrzebuję kreatywności",
    ],
  },
  {
    id: 13,
    question:
      "Jakie są Twoje oczekiwania względem początkowych kosztów związanych z aktywnością?",
    options: [
      "Chciałbym, aby początkowy koszt był wysoki, jeśli to hobby mnie interesuje",
      "Średnie koszty są okej",
      "Wolałbym niski koszt początkowy",
      "Bardzo niski, wolę tanie rozwiązania",
    ],
  },
  {
    id: 14,
    question:
      "Jakie są Twoje oczekiwania względem bieżących kosztów utrzymania aktywności?",
    options: [
      "Bardzo wysokie, hobby nie musi być tanie",
      "Średnie koszty",
      "Niskie koszty",
      "Bardzo niskie koszty, wolę oszczędzać",
    ],
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
