import { z } from "zod"

export const passwordSchema = z
.string()
.min(8, "Password must contain at least 8 characters") // Increase minimum length for better security
.max(64, "Password cannot exceed 64 characters") // Prevent excessive length
.regex(/[A-Z]/, "Password must contain at least one uppercase letter") // Require uppercase
.regex(/[a-z]/, "Password must contain at least one lowercase letter") // Require lowercase
.regex(/[0-9]/, "Password must contain at least one number") // Require numeric character
.regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)") // Enforce special characters
.refine((password) => !password.includes("password"), {
  message: "Password cannot contain the word 'password'",
});