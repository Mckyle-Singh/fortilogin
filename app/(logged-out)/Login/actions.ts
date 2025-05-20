'use server'

import { signIn } from "@/auth";
import { loginLimiter } from "@/lib/security/rateLimiter";
import { emailSchema } from "@/validation/emailSchema";
import { passwordSchema } from "@/validation/passwordSchema";
import { z } from "zod";
import { users } from "@/db/usersSchema";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";

export const loginWithCredentials = async ({
   email,
   password,
}: {
   email: string,
   password: string,
}) => {
   const loginSchema = z.object({
      email: emailSchema,
      password: passwordSchema,
   })

   const loginValidation = loginSchema.safeParse({
      email,
      password
   });

   if (!loginValidation.success) {
      return {
         error: true,
         message: loginValidation.error?.issues[0]?.message ?? "An error occured"
      };
   }

    // ✅ Rate Limit Check
    const rateLimit = await loginLimiter.limit(email);

    if (!rateLimit.success) {
      return {
        error: true,
        message: "Too many login attempts. Please try again later.",
        rateLimited: true,
        remaining: rateLimit.remaining,
        reset: rateLimit.reset, // can be used to show cooldown time in UI
      };
    }

   try {
      const result = await signIn("credentials", {
         email,
         password,
         redirect: false
      });

      if (result?.error) {
         return {
            error: true,
            message: result.error
         };
      }

      // ✅ Fetch user and log isAdmin
      const [user] = await db.select().from(users).where(eq(users.email, email));
      console.log("✅ Logged-in user:", user?.email);
      console.log("🛡️ isAdmin:", user?.isAdmin);

      return {
         error: false,
         isAdmin: user?.isAdmin ?? false,
      };
   } catch (e) {
      console.error("Auth error:", e);
      return {
         error: true,
         message: "Incorrect email or password"
      };
   }
};