import { useRouter } from "next/router";

function Results() {
  const router = useRouter();
  const { hobbies } = router.query;
  const parsedHobbies: string[] = hobbies ? JSON.parse(hobbies as string) : [];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4" role="main">
      <div className="max-w-2xl mx-auto">
        <h1
          id="results-heading"
          className="text-3xl font-bold text-center mb-8"
          aria-label="Twoje rekomendowane hobby"
        >
          Your Recommended Hobbies
        </h1>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label="Lista rekomendowanych hobby"
        >
          {parsedHobbies.map((hobby, index) => (
            <div
              key={index}
              role="listitem"
              tabIndex={0}
              onClick={() => router.push(`/hobby/${hobby.toLowerCase()}`)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  router.push(`/hobby/${hobby.toLowerCase()}`);
                }
              }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`${hobby}: Kliknij, aby dowiedzieć się więcej i znaleźć lokalne grupy`}
            >
              <h3 className="text-xl font-semibold mb-2">{hobby}</h3>
              <p className="text-gray-600">
                Click to learn more about {hobby} and find local groups!
              </p>
            </div>
          ))}
        </div>

        {parsedHobbies.length === 0 && (
          <div role="alert" className="text-center text-gray-600 mb-8">
            Brak rekomendowanych hobby. Spróbuj wypełnić quiz ponownie.
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/quiz")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            aria-label="Powtórz quiz, aby znaleźć inne hobby"
          >
            Powtórz Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
