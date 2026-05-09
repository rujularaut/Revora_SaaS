import { useState } from "react";
import { mockPayments } from "@/lib/mock-data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatsCard } from "@/components/common/StatsCard";
import { Search, Download, CreditCard, CheckCircle, XCircle, RefreshCw } from "lucide-react";

export default function AdminPaymentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [providerFilter, setProviderFilter] = useState("all");

  const filtered = mockPayments.filter(p => {
    if (statusFilter !== "all" && p.status.toLowerCase() !== statusFilter) return false;
    if (providerFilter !== "all" && p.provider.toLowerCase() !== providerFilter) return false;
    if (search && !p.customerName.toLowerCase().includes(search.toLowerCase()) && !p.businessName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalRevenue = "₹1,24,500";
  const failedCount = mockPayments.filter(p => p.status === "Failed").length;
  const refundedCount = mockPayments.filter(p => p.status === "Refunded").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatsCard title="Monthly Revenue" value="₹1.24L" icon={CreditCard} iconColor="text-green-500" iconBg="bg-green-50 dark:bg-green-900/20" />
        <StatsCard title="Paid This Month" value="7" icon={CheckCircle} iconColor="text-green-500" iconBg="bg-green-50 dark:bg-green-900/20" />
        <StatsCard title="Failed Payments" value={failedCount.toString()} icon={XCircle} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/20" />
        <StatsCard title="Refunds" value={refundedCount.toString()} icon={RefreshCw} iconColor="text-purple-500" iconBg="bg-purple-50 dark:bg-purple-900/20" />
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by customer or business..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} data-testid="input-payment-search" />
        </div>
        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-36" data-testid="select-payment-status"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setProviderFilter} defaultValue="all">
          <SelectTrigger className="w-36" data-testid="select-payment-provider"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Providers</SelectItem>
            <SelectItem value="razorpay">Razorpay</SelectItem>
            <SelectItem value="stripe">Stripe</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2" data-testid="button-export-payments"><Download className="w-4 h-4" /> Export</Button>
      </div>

      <div className="bg-card border border-card-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["Customer", "Business", "Plan", "Amount", "Provider", "Offer", "Status", "Date", "Next Billing"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(payment => (
                <tr key={payment.id} className="hover:bg-muted/30 transition-colors" data-testid={`payment-row-${payment.id}`}>
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{payment.customerName}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{payment.businessName}</td>
                  <td className="px-4 py-3">{payment.plan}</td>
                  <td className="px-4 py-3 font-semibold">{payment.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${payment.provider === "Razorpay" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" : "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400"}`}>
                      {payment.provider}
                    </span>
                  </td>
                  <td className="px-4 py-3">{payment.offerApplied ? <span className="text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded font-mono">{payment.offerApplied}</span> : <span className="text-muted-foreground">—</span>}</td>
                  <td className="px-4 py-3"><StatusBadge status={payment.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{payment.date}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{payment.nextBilling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground">
          Showing {filtered.length} of {mockPayments.length} payments
        </div>
      </div>
    </div>
  );
}
