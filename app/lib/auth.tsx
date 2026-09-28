import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUrl = process.env.BETTER_AUTH_DB_URL;

if (!mongoUrl) {
  throw new Error("BETTER_AUTH_DB_URL is missing in .env");
}

const client = new MongoClient(mongoUrl);
const db = client.db();

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    client,
  }),
});