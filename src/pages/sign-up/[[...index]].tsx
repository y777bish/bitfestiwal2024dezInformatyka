import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4"
      role="main"
    >
      {/* Nie wiem czy to jest potrzebne */}
      {/* <div className="mb-8 text-center" role="banner">
        <h1
          className="text-3xl font-bold text-gray-800 mb-2"
          id="signup-heading"
        >
          Join HobbyFinder
        </h1>
        <p
          className="text-gray-600"
          role="contentinfo"
          aria-describedby="signup-heading"
        >
          Create an account to start your hobby discovery journey
        </p>
      </div> */}

      <div
        className="bg-white rounded-xl shadow-lg p-8"
        role="form"
        aria-labelledby="signup-heading"
      >
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          forceRedirectUrl={"/quiz"}
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
              card: "bg-white",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-gray-600 text-base",
              formFieldInput:
                "focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none",
              formFieldLabel: "text-gray-700",
              footerAction:
                "text-indigo-600 hover:text-indigo-700 focus:outline-none focus:underline",
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-500",
              identityPreviewText: "text-gray-700",
              identityPreviewEditButton:
                "text-indigo-600 hover:text-indigo-700 focus:outline-none focus:underline",
            },
          }}
        />
      </div>

      <footer
        className="mt-8 text-sm text-gray-500 text-center"
        role="contentinfo"
        aria-label="Informacje o stronie"
      >
        <p>
          Powered by{" "}
          <span className="font-medium" aria-label="Page Systems">
            PageSystems
          </span>
        </p>
      </footer>
    </div>
  );
}
