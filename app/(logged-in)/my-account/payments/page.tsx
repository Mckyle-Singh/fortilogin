// app/payments/page.tsx
'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function PaymentsPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Payment Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Name on Card</Label>
              <Input id="name" placeholder="John Doe" />
            </div>

            <div>
              <Label htmlFor="card">Card Number</Label>
              <Input id="card" placeholder="1234 5678 9012 3456" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>

              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" placeholder="$100.00" />
            </div>

            <Button type="button" className="w-full mt-4">
              Pay Now
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}