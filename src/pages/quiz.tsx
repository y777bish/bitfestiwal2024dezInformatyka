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
  const progress = (currentQuestionIndex / questions.length) * 100;

  useEffect(() => {
    const currentAnswers = router.query.answers
      ? JSON.parse(router.query.answers as string)
      : [];
    setCurrentAnswers(currentAnswers);
  }, [router.query.answers]);

  const handleAnswer = async (answer: number) => {
    currentAnswers.push(answer as unknown as number);
    const result = await predictHobby(currentAnswers);

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
      { shallow: true }
    );
  };

  const handleBack = () => {
    if (currentAnswers.length > 0) {
      const newAnswers = currentAnswers.slice(0, -1);
      router.push(
        {
          pathname: "/quiz",
          query: { answers: JSON.stringify(newAnswers) },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <Layout>
      <div
        className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4"
        role="main"
        aria-labelledby="quiz-heading"
      >
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          <div
            className="mb-8"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div className="flex justify-between mb-2">
              <span
                className="text-sm font-medium text-gray-500"
                aria-label={`Pytanie ${currentQuestionIndex + 1} z ${
                  questions.length
                }`}
              >
                {`Pytanie ${currentQuestionIndex + 1} z ${questions.length}`}
              </span>
              <span
                className="text-sm font-medium text-forest"
                aria-hidden="true"
              >
                {`${Math.round(progress)}%`}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-forest rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Back Button */}
          {currentAnswers.length > 0 && (
            <button
              onClick={handleBack}
              className="mb-4 flex items-center text-forest hover:text-forest transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Wróć do poprzedniego pytania"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
            className="bg-inka rounded-xl shadow-lg p-8 transition-opacity duration-300"
            role="form"
            aria-labelledby="current-question"
          >
            <h2
              id="current-question"
              className="text-2xl font-bold text-gray-900 mb-8"
            >
              {currentQuestion.question}
            </h2>

            <div
              className="space-y-4"
              role="radiogroup"
              aria-labelledby="current-question"
            >
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index + 1)}
                  className="w-full p-4 text-left rounded-lg border-2 border-gray-200 
                           hover:border-forest hover:bg-indigo-50
                           focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2
                           transition-all duration-200 relative group"
                  role="radio"
                  aria-checked="false"
                  aria-label={option}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 group-hover:text-forest">
                      {option}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-forest"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
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
          <div
            className="flex justify-center space-x-2 mt-8"
            role="tablist"
            aria-label="Postęp quizu"
          >
            {questions.map((_, index) => (
              <div
                key={index}
                role="tab"
                aria-selected={index === currentQuestionIndex}
                aria-label={`Pytanie ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentQuestionIndex
                    ? "bg-indigo-600 w-4"
                    : index < currentQuestionIndex
                    ? "bg-indigo-300"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
