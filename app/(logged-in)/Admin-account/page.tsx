import { auth } from "@/auth"
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth();

  // If not admin, redirect to a "not authorized" page or home
  if (!session?.user?.isAdmin) {
    redirect("/");
  }

  return <div>Admin Dashboard: Only accessible by admin</div>;
}