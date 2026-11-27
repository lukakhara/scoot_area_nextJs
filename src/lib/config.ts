const BACKEND = process.env.NEXT_PUBLIC_API_URL;

export const API_URL =
  typeof window === "undefined"
    ? `${BACKEND}/api` // server components: call the backend directly
    : "/api"; // browser: goes through the Next.js rewrite