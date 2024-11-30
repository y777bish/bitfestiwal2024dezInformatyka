import { useRouter } from "next/router";

function Results() {
  const router = useRouter();
  const { hobbies } = router.query;
  const parsedHobbies: string[] = hobbies ? JSON.parse(hobbies as string) : [];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Your Recommended Hobbies
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {parsedHobbies.map((hobby, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{hobby}</h3>
              <p className="text-gray-600">
                Click to learn more about {hobby} and find local groups!
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/quiz")}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
