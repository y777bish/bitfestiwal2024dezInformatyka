import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
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

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const { isLoaded, userId } = useAuth();

  // Sync URL with current question
  useEffect(() => {
    const step = router.query.step ? parseInt(router.query.step as string) : 0;
    if (
      step !== currentQuestion &&
      !isNaN(step) &&
      step >= 0 &&
      step < questions.length
    ) {
      setCurrentQuestion(step);
    }
  }, [router.query.step]);

  // Update URL when question changes
  useEffect(() => {
    router.push(
      {
        pathname: "/quiz",
        query: { step: currentQuestion },
      },
      undefined,
      { shallow: true },
    );
  }, [currentQuestion]);

  const handleAnswer = async (answer: string) => {
    setIsTransitioning(true);
    setAnswers({ ...answers, [currentQuestion]: answer });

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setIsTransitioning(false);
    } else {
      router.push({
        pathname: "/results",
        query: {
          answers: JSON.stringify({ ...answers, [currentQuestion]: answer }),
        },
      });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setIsTransitioning(false);
      }, 300);
    }
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
              <span className="text-sm font-medium text-gray-500">
                Pytanie {currentQuestion + 1} z {questions.length}
              </span>
              <span className="text-sm font-medium text-indigo-600">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Back Button */}
          {currentQuestion > 0 && (
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
            className={`bg-white rounded-xl shadow-lg p-8 transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 
                    ${
                      answers[currentQuestion] === option
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-500 hover:bg-indigo-50"
                    }
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                    transition-all duration-200 relative group`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium ${
                        answers[currentQuestion] === option
                          ? "text-indigo-600"
                          : "text-gray-900 group-hover:text-indigo-600"
                      }`}
                    >
                      {option}
                    </span>
                    <svg
                      className={`w-5 h-5 ${
                        answers[currentQuestion] === option
                          ? "text-indigo-500"
                          : "text-gray-400 group-hover:text-indigo-500"
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
                  index === currentQuestion
                    ? "bg-indigo-600 w-4"
                    : index < currentQuestion
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
