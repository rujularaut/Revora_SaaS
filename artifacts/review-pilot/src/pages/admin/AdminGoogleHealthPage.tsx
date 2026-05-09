import { mockGoogleHealth } from "@/lib/mock-data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { StatsCard } from "@/components/common/StatsCard";
import { Button } from "@/components/ui/button";
import { Chrome, CheckCircle, AlertTriangle, RefreshCw, XCircle } from "lucide-react";

export default function AdminGoogleHealthPage() {
  const healthyCount = mockGoogleHealth.filter(g => g.tokenStatus === "Healthy").length;
  const expiredCount = mockGoogleHealth.filter(g => g.tokenStatus === "Expired").length;
  const reconnectCount = mockGoogleHealth.filter(g => g.tokenStatus === "Needs Reconnect").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatsCard title="Total Accounts" value={mockGoogleHealth.length.toString()} icon={Chrome} iconColor="text-blue-500" iconBg="bg-blue-50 dark:bg-blue-900/20" />
        <StatsCard title="Healthy" value={healthyCount.toString()} icon={CheckCircle} iconColor="text-green-500" iconBg="bg-green-50 dark:bg-green-900/20" />
        <StatsCard title="Expired Tokens" value={expiredCount.toString()} icon={XCircle} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/20" />
        <StatsCard title="Needs Reconnect" value={reconnectCount.toString()} icon={AlertTriangle} iconColor="text-orange-500" iconBg="bg-orange-50 dark:bg-orange-900/20" />
      </div>

      {(expiredCount + reconnectCount) > 0 && (
        <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-xl p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-orange-800 dark:text-orange-300">Action Required</p>
            <p className="text-sm text-orange-700 dark:text-orange-400">{expiredCount + reconnectCount} Google account(s) have connection issues. Automated review fetching and replies are paused for these accounts.</p>
          </div>
        </div>
      )}

      <div className="bg-card border border-card-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Google OAuth Status</h3>
          <Button size="sm" variant="outline" className="gap-1.5 text-xs" data-testid="button-sync-all">
            <RefreshCw className="w-3.5 h-3.5" /> Sync All
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["Business", "Location", "Google Account", "Token Status", "Last Sync", "Fetch Status", "Reply Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockGoogleHealth.map((item, i) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors" data-testid={`google-health-row-${item.id}`}>
                  <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{item.business}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{item.location}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{item.googleAccount}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.tokenStatus} /></td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{item.lastSync}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.fetchStatus} /></td>
                  <td className="px-4 py-3"><StatusBadge status={item.replyStatus} /></td>
                  <td className="px-4 py-3">
                    {item.tokenStatus !== "Healthy" ? (
                      <Button size="sm" className="h-7 text-xs bg-orange-600 hover:bg-orange-700" data-testid={`button-fix-token-${i}`}>Fix Token</Button>
                    ) : (
                      <Button size="sm" variant="ghost" className="h-7 text-xs" data-testid={`button-sync-${i}`}><RefreshCw className="w-3 h-3" /></Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
