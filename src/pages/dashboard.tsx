import { useRouter } from "next/router";
import Layout from "../components/Layout";

interface HobbyCard {
  id: string;
  name: string;
  description: string;
  progress: number;
}

export default function Dashboard() {
  const router = useRouter();

  const userHobbies: HobbyCard[] = [
    {
      id: "gotowanie",
      name: "Gotowanie",
      description: "Gotowanie to fascynujące hobby, które pozwala...",
      progress: 30,
    },
    {
      id: "pieczenie",
      name: "Pieczenie",
      description: "Pieczenie to fascynujące hobby, które pozwala...",
      progress: 45,
    },
  ];

  const handleHobbyClick = (hobbyId: string) => {
    router.push(`/hobby/${hobbyId}`);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sekcja statystyk */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">
              Ukończenie profilu
            </h3>
            <p className="mt-2 text-3xl font-semibold text-indigo-600">85%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Aktywne hobby</h3>
            <p className="mt-2 text-3xl font-semibold text-indigo-600">
              {userHobbies.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">
              Dni aktywności
            </h3>
            <p className="mt-2 text-3xl font-semibold text-indigo-600">7</p>
          </div>
        </div>

        {/* Sekcja hobby */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Twoje hobby</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userHobbies.map((hobby) => (
              <div
                key={hobby.id}
                onClick={() => handleHobbyClick(hobby.id)}
                className="bg-white rounded-lg shadow p-6 cursor-pointer 
                         hover:shadow-lg transition-all duration-300 
                         transform hover:-translate-y-1 active:translate-y-0
                         active:shadow-md relative group"
              >
                <div
                  className="absolute inset-0 bg-indigo-500 opacity-0 
                              group-hover:opacity-5 rounded-lg transition-opacity"
                />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {hobby.name}
                </h3>
                <p className="text-gray-600 mb-4">{hobby.description}</p>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-indigo-600">
                        Postęp
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-indigo-600">
                        {hobby.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                    <div
                      style={{ width: `${hobby.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap 
                               text-white justify-center bg-indigo-600 transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Wskaźnik kliknięcia */}
                <div
                  className="flex items-center justify-end mt-2 text-indigo-600 
                              opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="text-sm mr-1">Zobacz szczegóły</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
                </div>
              </div>
            ))}

            {/* Kafelek dodawania nowego hobby */}
            <div
              onClick={() => router.push("/quiz")}
              className="bg-white rounded-lg shadow p-6 border-2 border-dashed 
                       border-gray-300 hover:border-indigo-500 cursor-pointer 
                       flex items-center justify-center group hover:shadow-lg 
                       transition-all duration-300"
            >
              <div className="text-center">
                <div
                  className="mx-auto h-12 w-12 text-gray-400 group-hover:text-indigo-500 
                              transition-colors duration-300"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Odkryj nowe hobby
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
