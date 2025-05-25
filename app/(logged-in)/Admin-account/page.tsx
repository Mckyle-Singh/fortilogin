import { auth } from "@/auth"
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth();

  // If not admin, redirect to a "not authorized" page or home
  if (!session?.user?.isAdmin) {
    redirect("/");
  }

  // Hardcoded data
  const payments = {
    totalRevenue: "$120,530",
    pending: "$4,230",
    completed: "2,134",
    recent: [
      { id: 1, user: "John Doe", amount: "$125.00", status: "✅ Completed" },
      { id: 2, user: "Jane Smith", amount: "$89.99", status: "⏳ Pending" },
      { id: 3, user: "Michael Lee", amount: "$200.75", status: "❌ Failed" },
    ],
  };

  const stats = {
    newUsers: "450",
    activeSubscriptions: "1,290",
    refunds: "23",
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">Admin Dashboard</h1>

        {/* Stats Grid with Colors */}
        <div className="grid grid-cols-3 gap-6">
          <DashboardCard title="💰 Total Revenue" value={payments.totalRevenue} bgColor="bg-green-500" textColor="text-white" />
          <DashboardCard title="⌛ Pending Payouts" value={payments.pending} bgColor="bg-yellow-500" textColor="text-white" />
          <DashboardCard title="✅ Completed Transactions" value={payments.completed} bgColor="bg-blue-500" textColor="text-white" />

          <DashboardCard title="🆕 New Users This Month" value={stats.newUsers} bgColor="bg-purple-500" textColor="text-white" />
          <DashboardCard title="📊 Active Subscriptions" value={stats.activeSubscriptions} bgColor="bg-indigo-500" textColor="text-white" />
          <DashboardCard title="❌ Refund Requests" value={stats.refunds} bgColor="bg-red-500" textColor="text-white" />
        </div>

        {/* Recent Transactions */}
        <h2 className="text-2xl font-semibold mt-8 text-gray-700 text-center">Recent Transactions</h2>
        <div className="mt-4 p-6 border rounded-lg bg-white shadow-lg">
          {payments.recent.map((transaction) => (
            <div key={transaction.id} className="flex justify-between p-3 border-b">
              <span className="font-semibold text-gray-600">{transaction.user}</span>
              <span className="text-gray-800">{transaction.amount}</span>
              <span className="font-bold">{transaction.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Dashboard Card Component
function DashboardCard({ title, value, bgColor, textColor }: Readonly<{ title: string; value: string; bgColor: string; textColor: string }>) {
  return (
    <div className={`p-6 rounded-lg shadow-md flex items-center justify-center ${bgColor} ${textColor}`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-xl mt-2">{value}</p>
      </div>
    </div>
  );
}

