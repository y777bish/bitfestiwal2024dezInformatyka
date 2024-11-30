import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    router.push("/landing");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-semibold">
                HobbyFinder
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link
                  href="/dashboard"
                  className={`${
                    router.pathname === "/dashboard"
                      ? "text-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/quiz"
                  className={`${
                    router.pathname === "/quiz"
                      ? "text-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Take Quiz
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                {user?.emailAddresses[0]
                  ? `Welcome, ${user.emailAddresses[0]}`
                  : "Welcome!"}
              </span>
              <button
                onClick={handleSignOut}
                className="text-gray-500 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Wyloguj
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
