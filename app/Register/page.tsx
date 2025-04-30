'use client';

import {
   Card,
   CardDescription,
   CardHeader,
   CardTitle
} from "@/components/ui/card";

import {z} from 'zod';

const formSchema = z.object({
   email: z.string().email(),
   password: z.string().min(5),
   passwordConfirm: z.string()
});

export default function Register() {
   return <main className="flex justify-center items-center min-h-screen">
      <Card className="w-[350px]">
         <CardHeader>
            <CardTitle>
               Register
            </CardTitle>
            <CardDescription>
               Register for a new account
            </CardDescription>
         </CardHeader>
      </Card>
   </main>
}