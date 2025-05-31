import  db from "@/db/drizzle"; 
import { users } from "@/db/usersSchema"; 
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { sql } from "drizzle-orm";



export default async function AdminUsers() {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    redirect("/");
  }

  const nonAdminUsers = await db
  .select()
  .from(users)
  .where(sql`${users.isAdmin} = false`);

return (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
      👥 User Management
    </h1>
    
    <div className="overflow-hidden rounded-lg shadow-lg bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Registration Date</th>
            <th className="p-4 text-center">Actions</th> {/* New column for buttons */}
          </tr>
        </thead>
        <tbody>
          {nonAdminUsers.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-100">
              <td className="p-4 text-gray-600">{user.email}</td>
              <td className="p-4 text-gray-800">
                {user.createdAt ? user.createdAt.toLocaleString() : "No Date"}
              </td>
              <td className="p-4 flex gap-2 justify-center">
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}
