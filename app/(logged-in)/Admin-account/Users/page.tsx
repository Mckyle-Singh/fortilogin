
import  db from "@/db/drizzle"; 
import { users } from "@/db/usersSchema"; 
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminUsers() {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    redirect("/");
  }

  // Fetch all non-admin users
   const nonAdminUsers = await db
      .select()
      .from(users);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <ul className="border rounded-lg shadow-lg bg-white p-4">
        {nonAdminUsers.map((user) => (
          <li key={user.id} className="flex justify-between p-3 border-b hover:bg-gray-100">
            <span className="text-gray-600">{user.email}</span>
            <span className="text-gray-800">{user.createdAt ? user.createdAt.toLocaleString() : "No Date"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}