import { mockAdminUsers } from "@/lib/mock-data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/common/StatsCard";
import { RefreshCw, AlertTriangle, CheckCircle, XCircle, TrendingUp } from "lucide-react";

export default function AdminSubscriptionsPage() {
  const activeCount = mockAdminUsers.filter(u => u.status === "Active").length;
  const trialCount = mockAdminUsers.filter(u => u.status === "Trial").length;
  const failedCount = mockAdminUsers.filter(u => u.paymentStatus === "Failed").length;
  const cancelledCount = mockAdminUsers.filter(u => u.status === "Cancelled").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatsCard title="Active Subscriptions" value={activeCount.toString()} icon={CheckCircle} iconColor="text-green-500" iconBg="bg-green-50 dark:bg-green-900/20" />
        <StatsCard title="Free Trials" value={trialCount.toString()} icon={RefreshCw} iconColor="text-yellow-500" iconBg="bg-yellow-50 dark:bg-yellow-900/20" />
        <StatsCard title="Payment Failed" value={failedCount.toString()} icon={AlertTriangle} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/20" />
        <StatsCard title="Cancelled" value={cancelledCount.toString()} icon={XCircle} iconColor="text-slate-500" iconBg="bg-slate-100 dark:bg-slate-800" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { plan: "Starter", priceINR: 499, priceUSD: 9, count: 312, revenue: "₹1,55,688", color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" },
          { plan: "Growth", priceINR: 999, priceUSD: 19, count: 438, revenue: "₹4,37,562", color: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800" },
          { plan: "Pro", priceINR: 1999, priceUSD: 39, count: 89, revenue: "₹1,77,911", color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800" },
        ].map(p => (
          <div key={p.plan} className={`border rounded-xl p-5 ${p.color}`} data-testid={`subscription-plan-${p.plan.toLowerCase()}`}>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">{p.plan} Plan</h3>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{p.count}</p>
            <p className="text-sm text-muted-foreground mb-2">Active subscriptions</p>
            <p className="text-sm font-medium text-foreground">{p.revenue}/month</p>
            <p className="text-xs text-muted-foreground mt-0.5">₹{p.priceINR} / ${p.priceUSD} per subscriber</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-card-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">All Subscriptions</h3>
          <Button size="sm" variant="outline" className="gap-1.5 text-xs" data-testid="button-export-subscriptions">Export CSV</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["Customer", "Plan", "Payment", "Amount", "Signup Date", "Next Billing", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockAdminUsers.map(user => {
                const amount = user.plan === "Pro" ? "₹1,999" : user.plan === "Growth" ? "₹999" : "₹499";
                const next = user.paymentStatus === "Paid" ? "Feb 1, 2025" : "—";
                return (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors" data-testid={`subscription-row-${user.id}`}>
                    <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{user.name}</td>
                    <td className="px-4 py-3">{user.plan}</td>
                    <td className="px-4 py-3"><StatusBadge status={user.paymentStatus} /></td>
                    <td className="px-4 py-3 font-semibold">{user.paymentStatus === "Trial" ? "—" : amount}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.signupDate}</td>
                    <td className="px-4 py-3 text-muted-foreground">{next}</td>
                    <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
                    <td className="px-4 py-3">
                      {user.paymentStatus === "Failed" && (
                        <Button size="sm" className="h-7 text-xs bg-orange-600 hover:bg-orange-700" data-testid={`button-retry-${user.id}`}>Retry</Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
