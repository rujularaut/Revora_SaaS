import { mockWhatsAppLogs } from "@/lib/mock-data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { StatsCard } from "@/components/common/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, MessageSquare, CheckCircle, XCircle, AlertCircle, Download } from "lucide-react";

const allLogs = [
  ...mockWhatsAppLogs,
  { id: "w6", customer: "Amrita Sharma", business: "Naturals Salon", reviewId: "#R-4492", messageType: "Approval Request", deliveryStatus: "Delivered", ownerResponse: "YES", timestamp: "2025-01-08 14:12" },
  { id: "w7", customer: "Rajesh Kumar", business: "Royal Hotel", reviewId: "#R-4489", messageType: "Approval Request", deliveryStatus: "Delivered", ownerResponse: "SKIP", timestamp: "2025-01-08 11:30" },
  { id: "w8", customer: "Riya Kapoor", business: "Glow Salon", reviewId: "#R-4480", messageType: "Urgent Alert", deliveryStatus: "Delivered", ownerResponse: "EDIT", timestamp: "2025-01-07 16:45" },
  { id: "w9", customer: "Sanjay Patel", business: "Spice Garden", reviewId: "#R-4474", messageType: "Approval Request", deliveryStatus: "Failed", ownerResponse: "—", timestamp: "2025-01-07 09:15" },
  { id: "w10", customer: "David Chen", business: "FitZone Gym", reviewId: "#R-4462", messageType: "Approval Request", deliveryStatus: "Delivered", ownerResponse: "YES", timestamp: "2025-01-06 17:22" },
];

export default function AdminWhatsAppLogsPage() {
  const [search, setSearch] = useState("");

  const filtered = allLogs.filter(l =>
    !search || l.customer.toLowerCase().includes(search.toLowerCase()) || l.business.toLowerCase().includes(search.toLowerCase())
  );

  const deliveredCount = allLogs.filter(l => l.deliveryStatus === "Delivered").length;
  const failedCount = allLogs.filter(l => l.deliveryStatus === "Failed").length;
  const yesCount = allLogs.filter(l => l.ownerResponse === "YES").length;
  const editCount = allLogs.filter(l => l.ownerResponse === "EDIT").length;
  const skipCount = allLogs.filter(l => l.ownerResponse === "SKIP").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatsCard title="Total Sent" value={allLogs.length.toString()} icon={MessageSquare} iconColor="text-green-500" iconBg="bg-green-50 dark:bg-green-900/20" />
        <StatsCard title="Delivered" value={deliveredCount.toString()} icon={CheckCircle} iconColor="text-green-500" iconBg="bg-green-50 dark:bg-green-900/20" />
        <StatsCard title="Failed" value={failedCount.toString()} icon={XCircle} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/20" />
        <StatsCard title="YES Replies" value={yesCount.toString()} icon={CheckCircle} iconColor="text-teal-500" iconBg="bg-teal-50 dark:bg-teal-900/20" />
        <StatsCard title="SKIP/EDIT" value={(editCount + skipCount).toString()} icon={AlertCircle} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/20" />
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by customer or business..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} data-testid="input-wa-log-search" />
        </div>
        <Button variant="outline" className="gap-2" data-testid="button-export-wa-logs"><Download className="w-4 h-4" /> Export</Button>
      </div>

      <div className="bg-card border border-card-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["Customer", "Business", "Review", "Type", "Delivery", "Response", "Timestamp"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(log => (
                <tr key={log.id} className="hover:bg-muted/30 transition-colors" data-testid={`wa-log-${log.id}`}>
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{log.customer}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{log.business}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{log.reviewId}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${log.messageType === "Urgent Alert" ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400" : "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"}`}>
                      {log.messageType}
                    </span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={log.deliveryStatus} /></td>
                  <td className="px-4 py-3">
                    <StatusBadge status={log.ownerResponse === "—" ? "Pending" : log.ownerResponse} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
