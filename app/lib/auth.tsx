import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUrl = process.env.BETTER_AUTH_DB_URL;

if (!mongoUrl) {
  throw new Error("BETTER_AUTH_DB_URL is missing");
}

const client = new MongoClient(mongoUrl);
const db = client.db();

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_CLIENT_SECRECT as string,
    },
     github: { 
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRECT as string, 
        }, 
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
      disableImplicitLinking: false,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});