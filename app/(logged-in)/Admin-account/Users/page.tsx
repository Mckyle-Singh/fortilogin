import db from "@/db/drizzle"; 
import { users } from "@/db/usersSchema"; 
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminUsers() {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    redirect("/unauthorised");
  }

  // Fetch all non-admin users
  const nonAdminUsers = await db.select().from(users);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900 border-b pb-3">
        User Management
      </h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="border border-gray-300 px-6 py-3 text-center text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {nonAdminUsers.length > 0 ? (
            nonAdminUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="border border-gray-300 px-6 py-4 text-gray-800">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-6 py-4 text-center">
                  <button
                    type="button"
                    className="mr-2 px-4 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                    aria-label={`Edit user ${user.email}`}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="px-4 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition"
                    aria-label={`Delete user ${user.email}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={2}
                className="text-center text-gray-500 py-6"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}