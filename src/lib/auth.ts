import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const getOrigin = (url: string | undefined) => {
  if (!url) {
    return undefined;
  }

  const normalizedUrl = /^[a-z][a-z\d+\-.]*:\/\//i.test(url)
    ? url
    : `${url.startsWith("localhost") ? "http" : "https"}://${url}`;

  return new URL(normalizedUrl).origin;
};

const createAuth = () => {
  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) {
    throw new Error("Missing required environment variable: MONGODB_URL");
  }

  const client = new MongoClient(mongoUrl);
  const db = client.db("bazar-dor");
  const baseURL =
    process.env.BETTER_AUTH_URL ??
    getOrigin(process.env.NEXT_PUBLIC_APP_URL) ??
    getOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    getOrigin(process.env.VERCEL_URL) ??
    "http://localhost:3000";
  const trustedOrigins = [
    baseURL,
    getOrigin(process.env.NEXT_PUBLIC_APP_URL),
    getOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL),
    getOrigin(process.env.VERCEL_URL),
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ].filter((origin): origin is string => Boolean(origin));

  return betterAuth({
    baseURL,
    trustedOrigins,
    database: mongodbAdapter(db, {
      client,
    }),

    emailAndPassword: {
      enabled: true,
    },

    socialProviders: {
      ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
        ? {
            google: {
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            },
          }
        : {}),
      ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
        ? {
            github: {
              clientId: process.env.GITHUB_CLIENT_ID,
              clientSecret: process.env.GITHUB_CLIENT_SECRET,
            },
          }
        : {}),
    },
  });
};

let authInstance: ReturnType<typeof createAuth> | undefined;

export const getAuth = () => {
  if (!authInstance) {
    authInstance = createAuth();
  }

  return authInstance;
};