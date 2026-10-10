import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const createAuth = () => {
  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) {
    throw new Error("Missing required environment variable: MONGODB_URL");
  }

  const client = new MongoClient(mongoUrl);
  const db = client.db("bazar-dor");

  return betterAuth({
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