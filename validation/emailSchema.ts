import { z } from "zod"

export const emailSchema = z.string()
.min(5, "Email should be at least 5 characters long") // Minimum length
.max(255, "Email is too long") // Maximum length
.nonempty("Email cannot be empty") // Ensure the email field is not empty
.regex(
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
  { message: "Invalid email format" }
)  // Email format check
.refine((email) => {
  const domain = email.split('@')[1]; // Get domain part after "@"
  // If domain part doesn't exist (no '@' or invalid email), return false
  if (!domain) {
    return false;
  }
  // Check if the domain part is at least 3 characters long
  if (domain.length < 3) {
    return false; 
  }
  return true;
}, {
  message: "Domain must be at least 3 characters long",
})
.refine((email) => {
  const domain = email.split('@')[1]; // Get domain part after "@"
  // If domain part doesn't contain a dot, return false
  if (domain && !domain.includes('.')) {
    return false;
  }
  return true;
}, {
  message: "Domain should contain a valid domain name with a '.'",
});