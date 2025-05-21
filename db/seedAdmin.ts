import db from './drizzle'; 
import { users } from './usersSchema'; 
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';

const seedAdmin = async () => {
  const adminEmail = 'admin@gmail.com';

  // Check if admin user already exists
  const existing = await db.select().from(users).where(eq(users.email, adminEmail));

  if (existing.length > 0) {
    console.log("⚠️ Admin already exists. Skipping seed.");
    return;
  }

  const hashedPassword = await hash('SuperSecureAdmin123!', 10);

  await db.insert(users).values({
    email: adminEmail,
    password: hashedPassword,
    isAdmin: true,
  });

  console.log("✅ Admin user created:", adminEmail);
};

seedAdmin().catch((err) => {
  console.error("❌ Failed to seed admin:", err);
});