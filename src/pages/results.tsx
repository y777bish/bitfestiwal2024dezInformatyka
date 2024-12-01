/* eslint-disable @typescript-eslint/no-explicit-any */
import { HobbyAttributes, Task } from "@/types/hobby";
import { translateToPolish } from "@/utils/translate-to-polish";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/Layout";
import { hobbiesData } from "../data/hobbies";
import { categoryLookup } from "@/data/categories";

export default function HobbyDetail() {
  const router = useRouter();
  const knnResultString = router.query.knnResult as string;
  const answersString = router.query.answers as string;
  const mainResultLabel = router.query.mainResultLabel as string;

  const result = knnResultString ? JSON.parse(knnResultString) : [];
  const answers = answersString ? JSON.parse(answersString) : [];
  const [tasks, setTasks] = useState<Task[]>([]);

  if (!knnResultString) {
    return null
  }
  const hobbyLabel = mainResultLabel;
  console.log({ hobbyLabel })
  const hobby = Object.values(hobbiesData).find(({ id }) => id === hobbyLabel);

  if (!hobby) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 text-xl">Hobby not found</p>
        </div>
      </Layout>
    );
  }

  const handleToggleTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  console.log({ answers })

  const handleSwitchResult = (mainResultLabel: string) => {
    router.push(
      {
        pathname: "/results",
        query: { ...router.query, mainResultLabel },
      },
      undefined,
      { shallow: true, scroll: true },
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8" role="main">
        {/* Hero Section */}
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={hobby.imageUrl}
            alt={hobby.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h1
            className="absolute bottom-6 left-6 text-4xl font-bold text-white"
            aria-label="Twoje rekomendowane hobby"
          >
            {hobby.name}
          </h1>
        </div>

        {/* Attributes Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            Charakterystyka hobby
          </h2>
          <h4 className="mb-4 flex items-center gap-2 text-gray-600">
            Twoja odpowiedź<div className="h-2 w-4 mr-1 rounded-full bg-emerald-500"/>
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(hobby.attributes).map(([key, value]: [string, unknown], index) => (
              <div key={key} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex text-sm text-gray-500 capitalize items-center">
                  {translateToPolish(key.trim() as keyof HobbyAttributes)}
                </div>
                <div className="mt-1 flex items-center">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-2 w-4 mr-1 rounded-full ${
                        level <= (value as number) ? "bg-indigo-500" : "bg-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {value as number}/4
                  </span>
                </div>
                <div className="mt-1 flex items-center">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-2 w-4 mr-1 rounded-full ${
                        level <= answers[index] ? "bg-emerald-500" : "bg-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {answers[index]}/4
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Możesz też polubić</h2>
          <div className="flex flex-row flex-wrap gap-6">
            {result.filter(({ label }: any) => label !== mainResultLabel).map((hobby: any) => {
              const data = hobbiesData[hobby.label];
              console.log(hobby.label, categoryLookup[data.category])
              return (

              <div key={hobby.label} onClick={() => handleSwitchResult(hobby.label)} className="min-w-[25%] relative h-40 flex-grow flex-shrink-0 basis-[1/4] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-110 hover:cursor-pointer">
                <div className={`p-2 ${categoryLookup[data.category].color.bg}`} />
                <Image
                  src={hobby.imageUrl}
                  alt={hobby.name}
                  width={80}
                  height={40}
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
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">O tym hobby</h2>
          <p className="text-gray-600 leading-relaxed">{hobby.description}</p>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lista zadań</h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 
                         transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleToggleTask(task.id)}
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded 
                           focus:ring-indigo-500 cursor-pointer transition-colors"
                />
                <span
                  className={`flex-1 ${
                    task.isCompleted
                      ? "text-gray-400 line-through"
                      : "text-gray-700"
                  }`}
                >
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Źródła do nauki
          </h2>
          <div className="space-y-4">
            {hobby.sources.map((source: any) => (
              <a
                key={source.id}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg hover:bg-gray-50 transition-all 
                         duration-200 hover:shadow-md"
              >
                <div className="flex items-center space-x-4">
                  {source.type === "youtube" ? (
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  ) : source.type === "wikipedia" ? (
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.09 13.119c-.936 1.932-2.217 4.548-2.853 5.728-.616 1.074-1.127.931-1.532.029-1.406-3.321-4.293-9.144-5.651-12.409-.251-.601-.441-.987-.619-1.139-.181-.15-.554-.24-1.122-.271-.329-.026-.494-.078-.494-.348 0-.145.111-.271.335-.271.223 0 1.354.07 2.679.07 1.326 0 2.327-.07 2.551-.07.223 0 .335.124.335.271 0 .27-.166.322-.493.348-.68.044-1.02.142-1.02.494 0 .128.036.281.106.462.935 2.403 2.812 7.016 3.518 8.687.164.386.333.392.494.008.904-2.051 2.786-6.329 3.458-8.424.119-.371.183-.651.183-.832 0-.379-.314-.493-.941-.536-.329-.026-.494-.078-.494-.348 0-.145.111-.271.335-.271.223 0 1.354.07 2.679.07 1.326 0 2.327-.07 2.551-.07.223 0 .335.124.335.271z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {source.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {source.description}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
