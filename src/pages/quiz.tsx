import { getKnn } from "@/utils/predict-hobby";
import { useAuth } from "@clerk/nextjs";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { questions } from "../data/questions";
import { HobbyDetail } from "@/types/hobby";

const knn = getKnn();

export default function Quiz() {
  const [currentAnswers, setCurrentAnswers] = useState<number[]>([]);
  const router = useRouter();
  const { isLoaded, userId } = useAuth();
  const [treeData, setTreeData] = useState(
    knn.eliminateWithPredicted(currentAnswers),
  );
  const currentQuestionIndex = currentAnswers.length;
  const currentQuestion = questions[currentQuestionIndex];
  const [animationParent] = useAutoAnimate();

  useEffect(() => {
    const currentAnswers = router.query.answers
      ? JSON.parse(router.query.answers as string)
      : [];
    setCurrentAnswers(currentAnswers);
    setTreeData(knn.eliminateWithPredicted(currentAnswers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.answers]);

  const handleAnswer = async (answer: number) => {
    currentAnswers.push(answer as unknown as number);

    if (currentAnswers.length === questions.length) {
      const knnresults = knn.predict(currentAnswers);
      router.push({
        pathname: `/results`,
        query: {
          answers: JSON.stringify(currentAnswers),
          knnResult: JSON.stringify(knnresults),
          mainResultLabel: knnresults[0].label,
        },
      });
      return;
    }
    setTreeData(knn.eliminateWithPredicted(currentAnswers));
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
    currentAnswers.pop();
    router.push(
      {
        pathname: "/quiz",
        query: { answers: JSON.stringify(currentAnswers) },
      },
      undefined,
      { shallow: true },
    );
  };

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <Layout>
      <div className="relative" style={{ overflow: 'visible' }}>
        <div
          className="flex flex-row items-start py-12 px-4 gap-12 justify-center w-2xl"
          role="main"
          aria-labelledby="quiz-heading"
        >
          <div className="w-full flex-[3] sticky top-16">
            <div className="flex justify-center items-center gap-8">
              {/* Navigation Dots */}
              <div
                className="flex justify-center space-x-4 mb-8"
                role="tablist"
                aria-label="Postęp quizu"
              >
                {questions.slice(0, 7).map((_, index) => (
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
              <div className="self-start">
                {currentAnswers.length + 1} / 14
              </div>
              <div
                className="flex justify-center space-x-4 mb-8"
                role="tablist"
                aria-label="Postęp quizu"
              >
                {questions.slice(7).map((_, index) => (
                  <div
                    key={index}
                    role="tab"
                    aria-selected={index === currentQuestionIndex}
                    aria-label={`Pytanie ${index + 1}`}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentQuestionIndex - 7
                        ? "bg-indigo-600 w-4"
                        : index < currentQuestionIndex - 7
                        ? "bg-indigo-300"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

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
                aria-labelledby="current-questions"
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

            {/* Back Button */}
            {currentAnswers.length > 0 && (
              <button
                onClick={handleBack}
                className="mt-8 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
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
                Poprzednie pytanie
              </button>
            )}
          </div>
          <div className="flex-[2] mt-10">
            <div ref={animationParent} className="flex flex-col gap-4 w-2xl">
              {treeData.map((categoryNode) => (
                <>
                  {categoryNode.nodes.length !== 0 ? (
                    <>
                    <div
                      className={`p-4 rounded ${categoryNode.color.indicator}`}
                      key={categoryNode.id}
                    >
                      {categoryNode.text}
                    </div>
                    {categoryNode.nodes.slice(0, 5).map((hobbyNode: HobbyDetail) => (
                      <div
                        className="pl-8 flex gap-4"  
                        key={hobbyNode.name}
                      >
                        <div className={`p-1 ${categoryNode.color.indicator}`}></div>
                        {hobbyNode.name}
                      </div>
                    ))}
                    {categoryNode.nodes.length > 5 && (
                      <div
                        className="pl-8 flex gap-4"  
                      >
                        <div className={`p-1 ${categoryNode.color.indicator}`}></div>
                        wyświetl {categoryNode.nodes.length - 5} schowanych
                      </div>
                    )}
                  </>
                ) : null}
              </>
            ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
