import Link from "next/link";
import Logoutbutton from "../logout-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoggedInLayout({
   children,
}: Readonly<{
      children: React.ReactNode;
   }>) {
    const session = await auth();
   
      if (!session?.user?.id) {
         redirect("/Login")
   }
   const isAdmin = session.user.isAdmin;
   return (
      <div className="min-h-screen flex flex-col">
         <nav className="bg-gray-200 flex justify-between p-4 items-center" >
            <ul className="flex gap-4">
               <li>
                  <Link href="/my-account">My account</Link>
               </li>
               {!isAdmin && (
            <>
              <li>
                <Link href="/account-password">Change Password</Link>
              </li>
              <li>
                <Link href="/make-payment">Make Payment</Link>
              </li>
            </>
          )}
               {isAdmin && (
            <>
              <li>
                <Link href="/Admin-account">Admin Dashboard</Link>
              </li>
              <li>
                <Link href="/admin/users">User Management</Link>
              </li>
            </>
          )}
            </ul>
            <div>
               <Logoutbutton></Logoutbutton>
            </div>
         </nav>
         <div className="flex-1 flex justify-center items-center">
            {children}
         </div>
      </div>
   );
}