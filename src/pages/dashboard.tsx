import { useRouter } from "next/router";
import Layout from "../components/Layout";

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

export default function Dashboard() {
  const router = useRouter();

  const categories: Category[] = [
    {
      id: "sport_i_aktywnosc_fizyczna",
      name: "Sport i Aktywność Fizyczna",
      description: "Aktywne hobby poprawiające kondycję i zdrowie",
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
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
      id: "sztuka_i_rekodzielo",
      name: "Sztuka i Rękodzieło",
      description: "Kreatywne zajęcia rozwijające artystyczne umiejętności",
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
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
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
    // ... dodaj pozostałe kategorie z ich ikonami i kolorami
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Odkrywaj hobby</h1>
          <button
            onClick={() => router.push("/quiz")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 
                     transition-colors duration-200 flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Rozpocznij quiz</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className={`p-1 ${category.color.indicator}`}></div>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`${category.color.text}`}>
                    {category.icon}
                  </div>
                  <h2
                    className={`text-xl font-semibold ${category.color.text}`}
                  >
                    {category.name}
                  </h2>
                </div>

                <p className="text-gray-600 mb-6">{category.description}</p>

                <button
                  onClick={() => router.push(`/category/${category.id}`)}
                  className={`w-full p-3 rounded-lg ${category.color.bg} ${category.color.hover} 
                           ${category.color.text} font-medium transition-colors duration-200 
                           flex items-center justify-center space-x-2`}
                >
                  <span>Zobacz wszystkie hobby</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
