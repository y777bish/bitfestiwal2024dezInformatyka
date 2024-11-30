import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="min-h-screen flex flex-col" role="document">
      <header className="sr-only">
        <h1>
          HobbyFinder2000 - Discover new hobbies and connect with like-minded
          people
        </h1>
      </header>
      <main
        className="flex-grow py-8 md:py-16 flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        style={{ backgroundColor: "#F5F5DC" }}
      >
        {/* Text Section */}
        <div className="space-y-6 px-4 md:pl-12 max-w-2xl order-2 md:order-1">
          <h2
            className="text-2xl text-center sm:text-2xl md:text-4xl md:text-left lg:text-5xl lg:text-left xl:text-7xl font-bold leading-tight"
            style={{ color: "#004225" }}
          >
            Welcome to HobbyFinder2000
          </h2>
          <p
            className="text-lg text-center md:text-xl md:text-left leading-relaxed"
            style={{ color: "#004225" }}
          >
            Discover new hobbies and connect with like-minded people. Join the
            community today!
          </p>
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4">
            <Link
              href="/sign-up"
              className="px-6 py-3 rounded-2xl transition-all duration-300 text-[#F5F5DC] bg-[#004225] text-center focus:ring-2 focus:ring-offset-2 focus:ring-[#004225] focus:outline-none"
              role="button"
              aria-label="Get Started - Create a new account"
            >
              Get Started
            </Link>
            <Link
              href="/sign-in"
              className="px-6 py-3 rounded-2xl border-2 border-[#004225] text-[#004225] transition-all duration-300 hover:bg-[#004225] hover:text-[#F5F5DC] text-center focus:ring-2 focus:ring-offset-2 focus:ring-[#004225] focus:outline-none"
              role="button"
              aria-label="Login to your account"
            >
              Login
            </Link>
          </div>
        </div>
        {/* Image Section */}
        <div className="flex justify-center items-center order-1 md:order-2">
          <div className="w-full max-w-lg">
            <Image
              src="/images/landing.webp"
              alt="People enjoying various hobbies together"
              width={800}
              height={500}
              className="w-full h-full object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer
        className="w-full py-4 text-center"
        style={{ backgroundColor: "#FFB000" }}
        role="contentinfo"
      >
        <p className="text-sm" style={{ color: "#004225" }}>
          © {currentYear} HobbyFinder2000. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
