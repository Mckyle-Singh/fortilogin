import { z } from "zod"

export const emailSchema = z.string()
  .superRefine((value, ctx) => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid email structure",
      });
    }
    if (!value.includes("@")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid email format",
      });
    }
  });