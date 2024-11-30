import Layout from "@/components/Layout";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <Layout>
      <main
        className="max-w-6xl mx-auto px-4 py-8"
        role="main"
        aria-labelledby="main-heading"
      >
        <div className="text-center">
          <h1
            id="main-heading"
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Discover Your Perfect Hobby
          </h1>
          <p className="text-xl text-gray-600 mb-8" role="description">
            Answer a few questions and find hobbies that match your interests
            and lifestyle.
          </p>
          <Link
            href={isSignedIn ? "/quiz" : "/sign-in"}
            role="button"
            aria-label={
              isSignedIn
                ? "Start quiz to find your perfect hobby"
                : "Sign in to start the quiz"
            }
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <span>Start Quiz</span>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
