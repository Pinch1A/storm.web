import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET || '',
      issuer: `${process.env.NEXT_PUBLIC_KEYCLOAK_BASE_URL}/realms/master`,

    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Store the access token from Keycloak in the JWT token
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
      }

      // Store user details if available
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }

      return token
    },

    async session({ session, token }) {
      // Include the accessToken in the session
      return { ...session, ...token }
    },

    async redirect({ baseUrl }) {
      return baseUrl // Redirect to home after login
    },
  },
  session: {
    strategy: 'jwt',
  },
})
