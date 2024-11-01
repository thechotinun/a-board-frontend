import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            userName: credentials?.userName,
          });

          if (response.data.status.code === 200) {
            const tokenPayload = JSON.parse(atob(response.data.data.accessToken.split('.')[1]));
            
            return {
              id: tokenPayload.sub,
              userName: credentials?.userName,
              accessToken: response.data.data.accessToken,
              refreshToken: response.data.data.refreshToken,
              tokenExpiry: new Date().getTime() + (30 * 60 * 1000), // 30 minutes from now
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.userName = user.userName;
        token.tokenExpiry = user.tokenExpiry;
        return token;
      }

      // Return previous token if the access token has not expired
      if (new Date().getTime() < token.tokenExpiry) {
        return token;
      }

      return {
        ...token,
        error: "AccessTokenError",
      };
    },
    async session({ session, token }) {
      if (token.error) {
        // Add error to session to handle in client
        session.error = token.error;
      }
      
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = { userName: token.userName };
      return session;
    },
  },
  pages: {
    signIn: '/signin'
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };