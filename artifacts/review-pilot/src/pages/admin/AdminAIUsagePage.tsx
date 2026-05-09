import { StatsCard } from "@/components/common/StatsCard";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Bot, DollarSign, TrendingUp, Zap } from "lucide-react";

const dailyUsage = [
  { day: "Jan 4", calls: 1240, cost: 4.22 }, { day: "Jan 5", calls: 1890, cost: 6.43 },
  { day: "Jan 6", calls: 2100, cost: 7.14 }, { day: "Jan 7", calls: 1640, cost: 5.58 },
  { day: "Jan 8", calls: 2450, cost: 8.33 }, { day: "Jan 9", calls: 2870, cost: 9.76 },
  { day: "Jan 10", calls: 1980, cost: 6.73 },
];

const topUsers = [
  { business: "FitZone Gym", user: "David Chen", calls: 2891, cost: "$9.83" },
  { business: "Spice Garden", user: "Sanjay Patel", calls: 2214, cost: "₹75.27" },
  { business: "Royal Hotel", user: "Rajesh Kumar", calls: 1876, cost: "₹63.78" },
  { business: "Glow Salon", user: "Riya Kapoor", calls: 1102, cost: "₹37.47" },
  { business: "Naturals Salon", user: "Amrita Sharma", calls: 890, cost: "₹30.26" },
];

const modelBreakdown = [
  { model: "gemini-1.5-flash", calls: 12430, cost: "$42.26", percentage: 75 },
  { model: "gemini-1.5-pro", calls: 4120, cost: "$14.01", percentage: 25 },
];

export default function AdminAIUsagePage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatsCard title="Total AI Calls" value="18,432" icon={Bot} iconColor="text-purple-500" iconBg="bg-purple-50 dark:bg-purple-900/20" trend={{ value: "+12% this month", positive: true }} />
        <StatsCard title="Total AI Cost" value="₹1,890" icon={DollarSign} iconColor="text-green-500" iconBg="bg-green-50 dark:bg-green-900/20" subtitle="~$22.80 USD" />
        <StatsCard title="Avg Cost / Reply" value="₹0.10" icon={TrendingUp} iconColor="text-teal-500" iconBg="bg-teal-50 dark:bg-teal-900/20" />
        <StatsCard title="Success Rate" value="99.2%" icon={Zap} iconColor="text-primary" iconBg="bg-primary/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Daily AI Calls</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyUsage}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="calls" fill="#7c3aed" radius={[4, 4, 0, 0]} name="API Calls" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Daily AI Cost (USD)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={dailyUsage}>
              <defs>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${v}`} />
              <Tooltip formatter={(v: number) => `$${v}`} />
              <Area type="monotone" dataKey="cost" stroke="#7c3aed" fill="url(#colorCost)" strokeWidth={2} name="Cost ($)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Model Usage Breakdown</h3>
          <div className="space-y-3">
            {modelBreakdown.map(model => (
              <div key={model.model} className="p-3 bg-muted/50 rounded-lg">
                <div className="flex justify-between mb-1.5">
                  <code className="text-sm font-mono text-foreground">{model.model}</code>
                  <span className="text-sm text-muted-foreground">{model.cost}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-violet-600 rounded-full" style={{ width: `${model.percentage}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{model.calls.toLocaleString()} calls</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Top AI Usage by Business</h3>
          <div className="space-y-3">
            {topUsers.map((u, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg" data-testid={`ai-usage-row-${i}`}>
                <div className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-xs font-bold text-violet-600">{i + 1}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{u.business}</p>
                  <p className="text-xs text-muted-foreground">{u.user}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{u.calls.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{u.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
