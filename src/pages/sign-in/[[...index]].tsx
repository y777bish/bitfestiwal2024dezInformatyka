import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Witaj w HobbyFinder
        </h1>
        <p className="text-gray-600">Sign in to discover your perfect hobby</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          //   redirectUrl="/quiz"
          forceRedirectUrl={"/quiz"}
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case",
              card: "bg-white",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-gray-600 text-base",
            },
          }}
        />
      </div>

      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>Powered by PageSystems</p>
      </div>
    </div>
  );
}
