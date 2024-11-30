import Layout from "@/components/Layout";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";

interface HobbyCard {
  name: string;
  description: string;
  progress: number;
}

export default function Dashboard() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  // Sample hobby data - in a real app, this would come from your database
  const userHobbies: HobbyCard[] = [
    {
      name: "Photography",
      description: "Learn to capture moments through the lens",
      progress: 30,
    },
    {
      name: "Guitar",
      description: "Master the basics of acoustic guitar",
      progress: 45,
    },
  ];

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    router.push("/sign-in");
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* User Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Profile Completion
              </h3>
              <p className="mt-2 text-3xl font-semibold text-indigo-600">85%</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900">
                Active Hobbies
              </h3>
              <p className="mt-2 text-3xl font-semibold text-indigo-600">
                {userHobbies.length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900">Days Active</h3>
              <p className="mt-2 text-3xl font-semibold text-indigo-600">7</p>
            </div>
          </div>

          {/* Hobbies Section */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Hobbies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userHobbies.map((hobby, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {hobby.name}
                </h3>
                <p className="text-gray-600 mb-4">{hobby.description}</p>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-indigo-600">
                        Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-indigo-600">
                        {hobby.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                    <div
                      style={{ width: `${hobby.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Hobby Card */}
            <Link href="/quiz">
              <div className="bg-white rounded-lg shadow p-6 border-2 border-dashed border-gray-300 hover:border-indigo-500 cursor-pointer flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Discover New Hobbies
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
}
