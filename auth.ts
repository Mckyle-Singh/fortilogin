import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import db from "./db/drizzle";
import { users } from "./db/usersSchema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";
import { loginLimiter } from "./lib/security/rateLimiter";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({token,user}) {
      if (user) {
        token.id=user.id
      }
      return token;
    },
    session({session,token}) {
      session.user.id = token.id as string;
      return session;
    }
  },
  providers: [Credentials({
    credentials: {
      email: {},
      password: {},
    },
    async authorize(credentials) {
      const key = `login_attempt:${credentials.email}`;
      const { success } = await loginLimiter.limit(key);
      if (!success) {
        throw new Error("Too many login attempts. Please try again later.");
      }
      const [user] = await db.select().from(users).where(eq(users.email, credentials.email as string))
      
      if (!user) {
        throw new Error("Incorrect credentials");
      } else {
        const passwordCorrect = await compare(credentials.password as string, user.password!)
        if (!passwordCorrect) {
          throw new Error("Incorrect credentials");
        }
      }
      return {
        id: user.id.toString(),
        email: user.email,
      };
    },
  }),
  ],
  // 🔐 Secure cookies config
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true, // make sure this is true when running on HTTPS
      },
    },
  },
});