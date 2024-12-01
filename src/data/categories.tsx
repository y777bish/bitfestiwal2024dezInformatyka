/* eslint-disable @typescript-eslint/no-explicit-any */
interface Category {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  color: {
    bg: string;
    hover: string;
    text: string;
    indicator: string;
  };
}


export const categories: Category[] = [
  {
    id: "technologia_i_media",
    name: "Technologia i Media",
    description: "Hobby związane z nowoczesnymi technologiami",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    color: {
      bg: "bg-cyan-50",
      hover: "hover:bg-cyan-100",
      text: "text-cyan-800",
      indicator: "bg-cyan-500",
    },
  },
  {
    id: "sporty_ekstremalne",
    name: "Sporty Ekstremalne",
    description: "Hobby związane z aktywnościami pełnymi adrenaliny",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 10l1.5 6h15l1.5-6m-18 0L12 3l7.5 7M5 18h14m-7-8v8"
        />
      </svg>
    ),
    color: {
      bg: "bg-red-50",
      hover: "hover:bg-red-100",
      text: "text-red-800",
      indicator: "bg-red-500",
    },
  },
  {
    id: "edukacja_i_rozwoj",
    name: "Edukacja i Rozwój",
    description: "Hobby wspierające naukę i rozwój osobisty",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-4-6a4 4 0 018 0"
        />
      </svg>
    ),
    color: {
      bg: "bg-blue-50",
      hover: "hover:bg-blue-100",
      text: "text-blue-800",
      indicator: "bg-blue-500",
    },
  },
  {
    id: "kolekcjonerstwo_i_antyki",
    name: "Kolekcjonerstwo i Antyki",
    description: "Hobby związane ze zbieraniem i kolekcjonowaniem",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 17l4 4 4-4m-4-5v9M3 6h18M3 10h18"
        />
      </svg>
    ),
    color: {
      bg: "bg-yellow-50",
      hover: "hover:bg-yellow-100",
      text: "text-yellow-800",
      indicator: "bg-yellow-500",
    },
  },
  {
    id: "przyroda_i_ogrodnictwo",
    name: "Przyroda i Ogrodnictwo",
    description: "Hobby związane z naturą i pielęgnacją roślin",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8c-3 0-4 4-4 4s1 4 4 4 4-4 4-4-1-4-4-4zM3 21s1-1 3-1 4 2 4 2 2-2 4-2 3 1 3 1m-8-6v3m4-3v3"
        />
      </svg>
    ),
    color: {
      bg: "bg-green-50",
      hover: "hover:bg-green-100",
      text: "text-green-800",
      indicator: "bg-green-500",
    },
  },
  {
    id: "rzemioslo",
    name: "Sztuka i Rzemiosło",
    description: "Hobby związane z tworzeniem i projektowaniem",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 3v1m8-1v1m-9 8h10M5 21h14M12 17v4m-7-4a4 4 0 011-7.9V7a5 5 0 0110 0v2.1a4 4 0 011 7.9"
        />
      </svg>
    ),
    color: {
      bg: "bg-purple-50",
      hover: "hover:bg-purple-100",
      text: "text-purple-800",
      indicator: "bg-purple-500",
    },
  },
  {
    id: "sport_i_aktywnosc_fizyczna",
    name: "Sport i Aktywność Fizyczna",
    description: "Hobby związane z uprawianiem sportu i utrzymaniem aktywnego trybu życia",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4M7 21h10a2 2 0 002-2v-5a2 2 0 00-2-2H7a2 2 0 00-2 2v5a2 2 0 002 2zM12 3v4m-4 0h8"
        />
      </svg>
    ),
    color: {
      bg: "bg-orange-50",
      hover: "hover:bg-orange-100",
      text: "text-orange-800",
      indicator: "bg-orange-500",
    },
  },
  {
    id: "rozrywka_i_gry",
    name: "Rozrywka i Gry",
    description: "Hobby związane z grami, zabawą i rozrywką",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14.5 3a1.5 1.5 0 100 3h.5v2a3 3 0 003 3h2a1.5 1.5 0 100-3h-.5V6a3 3 0 00-3-3h-2zM5.5 14a1.5 1.5 0 100 3h.5v2a3 3 0 003 3h2a1.5 1.5 0 100-3h-.5v-2a3 3 0 00-3-3h-2z"
        />
      </svg>
    ),
    color: {
      bg: "bg-indigo-50",
      hover: "hover:bg-indigo-100",
      text: "text-indigo-800",
      indicator: "bg-indigo-500",
    },
  },
  {
    id: "kulinaria_i_napoje",
    name: "Kulinaria i Napoje",
    description: "Hobby związane z gotowaniem, pieczeniem i odkrywaniem smaków",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8c3.866 0 7-1.343 7-3s-3.134-3-7-3-7 1.343-7 3 3.134 3 7 3zm0 0v4m0 0c3.866 0 7 1.343 7 3s-3.134 3-7 3-7-1.343-7-3 3.134-3 7-3zm0 4v4m-5 0h10"
        />
      </svg>
    ),
    color: {
      bg: "bg-pink-50",
      hover: "hover:bg-pink-100",
      text: "text-pink-800",
      indicator: "bg-pink-500",
    },
  }
  
  
];

export const categoryLookup: Record<string, Category> = {}
for (const c of categories) {
  categoryLookup[c.id] = c;
}

export const getTreeNodes = () => categories.map((c) => ({ id: c.id, text: c.name, nodes: [] as any[], color: c.color }));