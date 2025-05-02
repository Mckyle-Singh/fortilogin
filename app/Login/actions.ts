'use server'

import { signIn } from "@/auth";
import { emailSchema } from "@/validation/emailSchema";
import { passwordSchema } from "@/validation/passwordSchema";
import { z } from "zod";

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

   try {
      await signIn("credentials", {
         email,
         password,
         redirect: false
      });
   } catch (_e) {
      return {
         error: true,
         message: "Incorrect email or password"
      };
   }
};