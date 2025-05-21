import { auth } from "@/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@radix-ui/react-label"
import { redirect } from "next/navigation";

export default async function MyAccount() {
   const session = await auth();
    if (!session?.user || session.user.isAdmin) {
    redirect("/"); // or "/admin-dashboard" or "/not-authorized"
  }
   return (
      <Card className="w-[350px]">
         <CardHeader >
            <CardTitle>
               My Account
            </CardTitle>
         </CardHeader>
         <CardContent>
            <Label>Email Address</Label>
            <div className="text-muted-foreground">
               {session?.user?.email}
            </div>
         </CardContent>
      </Card>
   )
}
