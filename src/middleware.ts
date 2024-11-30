import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({ debug: true });

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
