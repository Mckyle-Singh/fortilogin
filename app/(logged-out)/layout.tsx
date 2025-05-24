import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoggedOutLayout({
   children,
}: {
      children: React.ReactNode;
   }) {
   const session = await auth();

   console.log({session})

   if (session?.user?.id) {
      // 🔄 Redirect based on isAdmin
      if (session.user.isAdmin) {
         redirect("/Admin-account");
      } else {
         redirect("/my-account");
      }
   }

   return children;
}