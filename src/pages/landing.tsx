import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main
        className="flex-grow container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center"
        style={{ backgroundColor: "#F5F5DC" }}
      >
        {/* Text Section */}
        <div className="space-y-6 pl-12 max-w-2xl">
          <h2
            className="text-7xl font-bold leading-tight"
            style={{ color: "#004225" }}
          >
            Welcome to HobbyFinder2000
          </h2>
          <p className="text-xl leading-relaxed" style={{ color: "#004225" }}>
            Discover new hobbies and connect with like-minded people. Join the
            community today!
          </p>
          {/* Call to Action Buttons */}
          <div className="flex space-x-4">
            <Link
              href="/sign-up"
              className="px-6 py-3 rounded-2xl transition-all duration-300 text-[#F5F5DC] bg-[#004225]"
            >
              Get Started
            </Link>
            <Link
              href="/sign-in"
              className="px-6 py-3 rounded-2xl border-2 border-[#004225] text-[#004225] transition-all duration-300 hover:bg-[#004225] hover:text-[#F5F5DC]"
            >
              Login
            </Link>
          </div>
        </div>
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-lg overflow-hidden">
            <Image
              src="/images/landing.webp"
              alt="landing_image"
              width={800}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer
        className="w-full py-4 text-center"
        style={{ backgroundColor: "#FFB000" }}
      >
        <p className="text-sm" style={{ color: "#004225" }}>
          © {new Date().getFullYear()} HobbyFinder2000
        </p>
      </footer>
    </div>
  );
}
