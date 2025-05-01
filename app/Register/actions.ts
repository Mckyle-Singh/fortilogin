'use server'

import { emailSchema } from "@/validation/emailSchema";
import { passwordMatchSchema } from "@/validation/paswordMatchSchema";
import { z } from "zod";
import  {hash} from "bcryptjs"
import db from "@/db/drizzle";
import { users } from "@/db/usersSchema";


export const registerUser = async ({
   email,
   password,
   passwordConfirm,
}: {
   email: string;
   password: string;
   passwordConfirm: string;
   }) => { 
   try {
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

      const hashedPassword = await hash(password, 10);
   
      await db.insert(users).values({
         email,
         password: hashedPassword
      });
   } catch (e: unknown) {
      if (e instanceof Error && "code" in e && e.code === "23505") { // ✅ Type-safe check
         return {
            error: true,
            message: "An account is already registered with that email address"
         };
      }
   
      return {
         error: true,
         message: "An error occurred"
      };
   }
};