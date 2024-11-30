import { predictHobby } from "@/utils/predict-hobby";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { questions } from "../data/questions";

export default function Quiz() {
  const [currentAnswers, setCurrentAnswers] = useState<number[]>([]);
  const router = useRouter();
  const { isLoaded, userId } = useAuth();
  const currentQuestionIndex = currentAnswers.length;
  const currentQuestion = questions[currentQuestionIndex];

  // Sync URL with current question
  useEffect(() => {
    const currentAnswers = router.query.answers
      ? JSON.parse(router.query.answers as string)
      : [];
    setCurrentAnswers(currentAnswers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.answers]);

  const handleAnswer = async (answer: number) => {
    // setAnswers({ ...answers, [currentQuestion]: answer });
    currentAnswers.push(answer as unknown as number);

    const chuj = await predictHobby(currentAnswers);
    console.log({ chuj });

    if (currentAnswers.length === questions.length) {
      router.push({
        pathname: "/results",
        query: {
          answers: JSON.stringify(currentAnswers),
        },
      });
      return;
    }
    router.push(
      {
        pathname: "/quiz",
        query: { answers: JSON.stringify(currentAnswers) },
      },
      undefined,
      { shallow: true },
    );
  };

  const handleBack = () => {
    // if (currentQuestion > 0) {
    //   setIsTransitioning(true);
    //   setTimeout(() => {
    //     setCurrentQuestion(currentQuestion - 1);
    //     setIsTransitioning(false);
    //   }, 300);
    // }
  };

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-500"></span>
              <span className="text-sm font-medium text-indigo-600"></span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
                style={{}}
              />
            </div>
          </div>

          {/* Back Button */}
          {currentAnswers.length > 0 && (
            <button
              onClick={handleBack}
              className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous Question
            </button>
          )}

          {/* Question Card */}
          <div
            className={`bg-white rounded-xl shadow-lg p-8 transition-opacity duration-300`}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index + 1)}
                  className={`w-full p-4 text-left rounded-lg border-2 
                    ${
                      ""
                      // answers[currentQuestion] === option
                      //   ? "border-indigo-500 bg-indigo-50"
                      //   : "border-gray-200 hover:border-indigo-500 hover:bg-indigo-50"
                    }
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                    transition-all duration-200 relative group`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium ${
                        ""
                        // answers[currentQuestion] === option
                        //   ? "text-indigo-600"
                        //   : "text-gray-900 group-hover:text-indigo-600"
                      }`}
                    >
                      {option}
                    </span>
                    <svg
                      className={`w-5 h-5 ${
                        ""
                        // answers[currentQuestion] === option
                        //   ? "text-indigo-500"
                        //   : "text-gray-400 group-hover:text-indigo-500"
                      }`}
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
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  ""
                  // index === currentQuestion
                  //   ? "bg-indigo-600 w-4"
                  //   : index < currentQuestion
                  //   ? "bg-indigo-300"
                  //   : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
