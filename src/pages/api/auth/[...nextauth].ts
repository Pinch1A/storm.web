// pages/api/auth/[...nextauth].ts

import axios from "axios";
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import type { NextApiRequest, NextApiResponse } from "next";

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID || "",
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
      issuer: `${process.env.KEYCLOAK_BASE_URL}/realms/master`,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Store the access token from Keycloak in the token
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },

    async session({ session, token }) {
      // Ensure token.accessToken exists before making a request
      if (token.accessToken) {
        try {
          const response = await axios.get(
            `${process.env.KEYCLOAK_BASE_URL}/realms/master/protocol/openid-connect/userinfo`,
            {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            }
          );

          const userInfo = response.data;
          console.log("Fetched user info:", userInfo);

          // Merge user info into the session
          session.user = { ...session.user, ...userInfo };
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirect to home after login
    },
  },
  session: {
    strategy: "jwt",
  },
});
