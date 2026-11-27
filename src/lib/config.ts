// lib/config.ts
const BACKEND = "https://scootarea-backend.onrender.com";

export const API_URL =
  typeof window === "undefined"
    ? `${BACKEND}/api` // server components: call the backend directly
    : "/api"; // browser: goes through the Next.js rewrite