import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
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
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.userName = user.userName;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = { userName: token.userName };
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
});

export { handler as GET, handler as POST };