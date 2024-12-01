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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        {/* Sekcja statystyk */}
        <section aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">
            Twoje statystyki
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-inka rounded-lg shadow p-6" role="status">
              <h3 className="text-lg font-medium text-forest">
                Ukończenie profilu
              </h3>
              <p
                className="mt-2 text-3xl font-semibold text-forest"
                aria-label="85 procent ukończenia profilu"
              >
                85%
              </p>
            </div>
            <div className="bg-inka rounded-lg shadow p-6" role="status">
              <h3 className="text-lg font-medium text-forest">
                Aktywne hobby
              </h3>
              <p
                className="mt-2 text-3xl font-semibold text-forest"
                aria-label={`${userHobbies.length} aktywnych hobby`}
              >
                {userHobbies.length}
              </p>
            </div>
            <div className="bg-inka rounded-lg shadow p-6" role="status">
              <h3 className="text-lg font-medium text-forest">
                Dni aktywności
              </h3>
              <p
                className="mt-2 text-3xl font-semibold text-forest"
                aria-label="7 dni aktywności"
              >
                7
              </p>
            </div>
          </div>
        </section>

        {/* Sekcja hobby */}
        <section aria-labelledby="hobbies-heading">
          <h2
            id="hobbies-heading"
            className="text-2xl font-bold text-forest mb-6"
          >
            Twoje hobby
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
          >
            {userHobbies.map((hobby) => (
              <div
                key={hobby.id}
                onClick={() => handleHobbyClick(hobby.id)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleHobbyClick(hobby.id)
                }
                tabIndex={0}
                role="button"
                aria-label={`${hobby.name}: ${hobby.description}. Postęp: ${hobby.progress}%. Kliknij aby zobaczyć szczegóły.`}
                className="bg-inka rounded-lg shadow p-6 cursor-pointer 
                         hover:shadow-lg transition-all duration-300 
                         transform hover:-translate-y-1 active:translate-y-0
                         active:shadow-md relative group"
              >
                <div
                  className="absolute inset-0 bg-forest opacity-0 
                              group-hover:opacity-5 rounded-lg transition-opacity"
                  aria-hidden="true"
                />
                <h3 className="text-lg font-medium text-forest mb-2">
                  {hobby.name}
                </h3>
                <p className="text-forest mb-4">{hobby.description}</p>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-forest">
                        Postęp
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-xs font-semibold inline-block text-forest"
                        aria-label={`${hobby.progress} procent ukończenia`}
                      >
                        {hobby.progress}%
                      </span>
                    </div>
                  </div>
                  <div
                    className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200"
                    role="progressbar"
                    aria-valuenow={hobby.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      style={{ width: `${hobby.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap 
                               text-white justify-center bg-forest transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Wskaźnik kliknięcia */}
                <div
                  className="flex items-center justify-end mt-2 text-forest 
                              opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
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
              onKeyPress={(e) => e.key === "Enter" && router.push("/quiz")}
              tabIndex={0}
              role="button"
              aria-label="Odkryj nowe hobby. Kliknij aby przejść do quizu."
              className="bg-white rounded-lg shadow p-6 border-2 border-dashed 
                       border-forest hover:border-forest cursor-pointer 
                       flex items-center justify-center group hover:shadow-lg 
                       transition-all duration-300"
            >
              <div className="text-center">
                <div
                  className="mx-auto h-12 w-12 text-forest group-hover:text-forest 
                              transition-colors duration-300"
                  aria-hidden="true"
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
                <span className="mt-2 block text-sm font-medium text-forest">
                  Odkryj nowe hobby
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
