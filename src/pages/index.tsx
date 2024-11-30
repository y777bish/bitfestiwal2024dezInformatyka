import Layout from "@/components/Layout";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <Layout>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Perfect Hobby
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Answer a few questions and find hobbies that match your interests
            and lifestyle.
          </p>
          <Link href={isSignedIn ? "/quiz" : "/sign-in"}>
            <span className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg">
              Start Quiz
            </span>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
