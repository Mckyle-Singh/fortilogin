'use server'

import { emailSchema } from "@/validation/emailSchema";
import { passwordMatchSchema } from "@/validation/paswordMatchSchema";
import { z } from "zod";

export const registerUser = async ({
   email,
   password,
   passwordConfirm,
}: {
   email: string;
   password: string;
   passwordConfirm: string;
   }) => { 
   const newUserSchema = z.object({
      email: emailSchema
   }).and(passwordMatchSchema)

   const newUserValidation = newUserSchema.safeParse({
      email,
      password,
      passwordConfirm
   })

   if (!newUserValidation.success) {
      return {
         error: true,
         message: newUserValidation.error.issues[0]?.message ?? "An error occured"
      };
   }
};