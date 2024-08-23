import { NextAuthOptions, } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions:NextAuthOptions= {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        jwt: async ({ token, account }) => {
          if (account) {
            token.idToken = account.id_token;
          }
          return token;
        },
        session: async ({ session, token }) => {
          session.idToken = token.idToken as string;
          return session;
        },
      },
}