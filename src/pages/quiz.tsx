import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { hobbies, questions } from "../data/questions";
import type { UserAnswers } from "../types";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const router = useRouter();
  const { isLoaded } = useAuth();

  const handleAnswer = (answer: string): void => {
    setAnswers({ ...answers, [currentQuestion]: answer });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const results = calculateHobbies(answers);
      router.push({
        pathname: "/results",
        query: { hobbies: JSON.stringify(results) },
      });
    }
  };

  const calculateHobbies = (answers: UserAnswers): string[] => {
    const environment = answers[1];
    const social = answers[2];

    let category = "";
    if (environment === "Virtual") {
      category = "virtual";
    } else if (environment === "Indoors") {
      category = "indoors";
    } else {
      category = "outdoors";
    }

    category += social.includes("solitary") ? "Solitary" : "Social";
    return hobbies[category] || [];
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="w-full p-4 text-left rounded-lg border border-gray-200 hover:bg-blue-50"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
