import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    isAdmin: boolean; // ✅ Add this to match your DB schema
  }

  interface Session {
    user: {
      id: string;
      email: string;
      isAdmin: boolean;
    };
  }

  interface JWT {
    id: string;
    email: string;
    isAdmin: boolean;
  }
}

