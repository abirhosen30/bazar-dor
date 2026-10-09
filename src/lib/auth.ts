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
  });
};

let authInstance: ReturnType<typeof createAuth> | undefined;

export const getAuth = () => {
  if (!authInstance) {
    authInstance = createAuth();
  }

  return authInstance;
};