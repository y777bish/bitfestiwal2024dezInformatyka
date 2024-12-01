import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!isLoaded) {
    return (
      <div role="status" aria-live="polite">
        Ładowanie...
      </div>
    );
  }

  if (!userId) {
    router.push("/landing");
    return null;
  }

  return (
    <div className="min-h-screen bg-cream-light dark:bg-cream-dark transition-colors duration-200">
      <nav
        className="bg-sunset-light dark:bg-sunset-dark shadow-sm transition-colors duration-200"
        role="navigation"
        aria-label="Menu główne"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="text-xl font-semibold text-forest-light dark:text-forest-dark transition-colors duration-200"
                aria-label="Strona główna HobbyFinder"
              >
                HobbyFinder
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-4">
                <Link
                  href="/dashboard"
                  className={`${
                    router.pathname === "/dashboard"
                      ? "text-forest-light dark:text-forest-dark"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                  aria-current={
                    router.pathname === "/dashboard" ? "page" : undefined
                  }
                >
                  Dashboard
                </Link>
                <Link
                  href="/quiz"
                  className={`${
                    router.pathname === "/quiz"
                      ? "text-forest-light dark:text-forest-dark"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                  aria-current={
                    router.pathname === "/quiz" ? "page" : undefined
                  }
                >
                  Quiz
                </Link>
              </div>
            </div>

            {/* Desktop User Info, Theme Toggle, and Logout */}
            <div className="hidden md:flex items-center space-x-4">
              <span
                className="text-gray-700 dark:text-gray-300 transition-colors duration-200"
                role="status"
              >
                {user?.emailAddresses[0]?.emailAddress?.split("@")[0]
                  ? `Witaj, ${
                      user.emailAddresses[0]?.emailAddress?.split("@")[0]
                    }`
                  : "Witaj!"}
              </span>
              <ThemeToggle />
              <button
                onClick={handleSignOut}
                className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Wyloguj
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:hidden absolute bg-sunset-light dark:bg-sunset-dark w-full left-0 transition-colors duration-200`}
            role="menu"
            aria-orientation="vertical"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/dashboard"
                className={`${
                  router.pathname === "/dashboard"
                    ? "bg-indigo-50 dark:bg-indigo-900 text-forest-light dark:text-forest-dark"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
                aria-current={
                  router.pathname === "/dashboard" ? "page" : undefined
                }
                role="menuitem"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/quiz"
                className={`${
                  router.pathname === "/quiz"
                    ? "bg-indigo-50 dark:bg-indigo-900 text-forest dark:text-forest-dark"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                } block px-3 py-2 rounded-md text-base font-medium`}
                aria-current={router.pathname === "/quiz" ? "page" : undefined}
                role="menuitem"
                onClick={() => setIsMenuOpen(false)}
              >
                Weź Quiz
              </Link>
              <div className="border-t border-gray-200 pt-2">
                <span
                  className="block px-3 py-2 text-gray-700 dark:hover:text-gray-200"
                  role="status"
                >
                  {user?.emailAddresses[0]?.emailAddress?.split("@")[0]
                    ? `Witaj, ${
                        user.emailAddresses[0]?.emailAddress?.split("@")[0]
                      }`
                    : "Witaj!"}
                </span>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 text-gray-500 hover:text-red-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md text-base font-medium"
                  role="menuitem"
                  aria-label="Wyloguj się"
                >
                  Wyloguj
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        {children}
      </main>
    </div>
  );
}
