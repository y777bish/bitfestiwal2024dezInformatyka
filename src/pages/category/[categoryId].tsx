/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "@/components/Layout";
import { categoryLookup } from "@/data/categories";
import { hobbiesData } from "@/data/hobbies";
import { questions } from "@/data/questions";
import { getKnn } from "@/utils/predict-hobby";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const knn = getKnn()

const Category = () => {
  const router = useRouter();

  const categoryId = router.query.categoryId as string;
  const answersString = router.query.answers as string;
  const savedAnswersString = router.query.savedAnswers as string;
  
  const answers = answersString ? JSON.parse(answersString) : null
  const savedAnswers = savedAnswersString ? JSON.parse(savedAnswersString) : null
  
  const totalInCategory = Object.values(hobbiesData).filter(hobby => hobby.category === categoryId).length
  let filteredLabels = Object.values(hobbiesData).filter(hobby => hobby.category === categoryId)

  if (answers?.length) {
    const k = knn.eliminateWithPredicted(answers).flatMap(d => d.nodes).map(d => d.id)
    filteredLabels = filteredLabels.filter((hobby) => k.includes(hobby.id))
  }

  console.log({ filteredLabels })

  console.log(categoryId, categoryLookup[categoryId]?.name)
  
  const handleHobby = (mainResultLabel: string) => {
    console.log({ mainResultLabel })
    router.push({
      pathname: `/results`,
      query: {
        mainResultLabel,
        savedAnswers: savedAnswersString,
      },
    });
  }
  const handleBack = () => {
    router.push(
      {
        pathname: "/quiz",
        query: { answers: savedAnswersString },
      },
      undefined,
    );
  };
  return (
    <Layout>
      <div className={`relative p-8 rounded-xl overflow-hidden shadow-lg mb-8 ${categoryLookup[categoryId]?.color.indicator}`}>
        <h1
          className="bottom-6 left-6 text-4xl font-bold"
          aria-label="Rekomendacja"
        >
          {categoryLookup[categoryId]?.name}
        </h1>
      </div>
      {answers && (
        <>
          <div className={`relative p-8 rounded-xl overflow-hidden shadow-lg mb-8`}>
            <h1
            className="bottom-6 left-6 text-4xl font-bold"
            aria-label="Rekomendacja"
            >Odpowiedzi</h1>
            {answers.map((a: any, idx: number) => (
              <ul>
                <li><div>{questions[idx].question}</div><div>- {questions[idx].options[a-1]}</div></li>
              </ul>
            ))}
          </div>
        </>
      )}
      {savedAnswers && (
        <button
          onClick={handleBack}
          className="my-8 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
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
          wróć do quizu
        </button>
      )}
      <div className="flex flex-wrap gap-8">
        {filteredLabels.map((hobby: any) => {
          const data = hobbiesData[hobby.id];
          return (
            <div onClick={() => handleHobby(hobby.id)} key={hobby.id} className="min-w-[25%] relative h-40 flex-grow flex-shrink-0 basis-[1/4] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-110 hover:cursor-pointer">
              <div className={`p-2 ${categoryLookup[data.category].color.bg}`} />
              <Image
                src={hobby.imageUrl}
                alt={hobby.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h1
                className="absolute max-w-[80%] bottom-6 left-6 text-xl font-bold text-white"
                aria-label="Twoje rekomendowane hobby"
              >
                {data?.name}
              </h1>
            </div>
          )
        })}
        {answers && (
          <div className={`relative p-8 rounded-xl overflow-hidden shadow-lg mb-8`}>
            Dopasowaliśmy {filteredLabels.length} z {totalInCategory}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Category;