import { useState } from "react";
import { StatsCard } from "@/components/common/StatsCard";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BarChart2, Star, MessageSquare, AlertTriangle, Clock, CheckCircle } from "lucide-react";

const weeklyData = [
  { day: "Mon", reviews: 18, replies: 17 }, { day: "Tue", reviews: 24, replies: 22 },
  { day: "Wed", reviews: 21, replies: 20 }, { day: "Thu", reviews: 29, replies: 27 },
  { day: "Fri", reviews: 32, replies: 30 }, { day: "Sat", reviews: 38, replies: 36 },
  { day: "Sun", reviews: 19, replies: 18 },
];

const ratingTrend = [
  { month: "Aug", rating: 4.1 }, { month: "Sep", rating: 4.2 }, { month: "Oct", rating: 4.2 },
  { month: "Nov", rating: 4.3 }, { month: "Dec", rating: 4.3 }, { month: "Jan", rating: 4.3 },
];

const autoVsManual = [
  { month: "Oct", auto: 412, manual: 198 }, { month: "Nov", auto: 489, manual: 221 },
  { month: "Dec", auto: 634, manual: 287 }, { month: "Jan", auto: 734, manual: 455 },
];

const templateUsage = [
  { name: "5-Star Thank You", uses: 234 }, { name: "4-Star Positive", uses: 156 },
  { name: "No-Text Rating", uses: 67 }, { name: "Neutral Response", uses: 89 },
  { name: "Complaint Apology", uses: 45 },
];

const toneUsage = [
  { name: "Warm", value: 412, fill: "#4f46e5" }, { name: "Friendly", value: 287, fill: "#06b6d4" },
  { name: "Apologetic", value: 156, fill: "#8b5cf6" }, { name: "Professional", value: 198, fill: "#10b981" },
  { name: "Formal", value: 89, fill: "#f59e0b" }, { name: "Casual", value: 47, fill: "#ef4444" },
];

const periods = ["This Week", "This Month", "Last 3 Months"];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("This Month");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        {periods.map(p => (
          <Button key={p} size="sm" variant={period === p ? "default" : "outline"} onClick={() => setPeriod(p)} data-testid={`period-${p.toLowerCase().replace(/\s+/g, "-")}`}>
            {p}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatsCard title="Reviews" value="156" icon={Star} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/20" />
        <StatsCard title="Replies Posted" value="148" icon={CheckCircle} iconColor="text-green-500" iconBg="bg-green-50 dark:bg-green-900/20" />
        <StatsCard title="Pending" value="8" icon={MessageSquare} iconColor="text-yellow-500" iconBg="bg-yellow-50 dark:bg-yellow-900/20" />
        <StatsCard title="Negative" value="12" icon={AlertTriangle} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/20" />
        <StatsCard title="Avg Rating" value="4.3★" icon={Star} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/20" />
        <StatsCard title="Avg Response" value="1.8h" icon={Clock} iconColor="text-teal-500" iconBg="bg-teal-50 dark:bg-teal-900/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Reviews vs Replies Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="gReviews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(245 82% 62%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(245 82% 62%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gReplies" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(175 77% 40%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(175 77% 40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="reviews" stroke="hsl(245 82% 62%)" fill="url(#gReviews)" strokeWidth={2} name="Reviews" />
              <Area type="monotone" dataKey="replies" stroke="hsl(175 77% 40%)" fill="url(#gReplies)" strokeWidth={2} name="Replies" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Average Rating Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={ratingTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[3.5, 5]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="rating" stroke="hsl(245 82% 62%)" strokeWidth={2.5} dot={{ fill: "hsl(245 82% 62%)", r: 4 }} name="Rating" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Auto-Reply vs Manual Approval</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={autoVsManual}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="auto" fill="hsl(245 82% 62%)" radius={[4, 4, 0, 0]} name="Auto-Replies" stackId="a" />
              <Bar dataKey="manual" fill="hsl(175 77% 40%)" radius={[4, 4, 0, 0]} name="Manual Approvals" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Tone Usage</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={toneUsage} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value">
                {toneUsage.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm lg:col-span-2">
          <h3 className="font-semibold text-foreground mb-4">Top Templates Used</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={templateUsage} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={130} />
              <Tooltip />
              <Bar dataKey="uses" fill="hsl(245 82% 62%)" radius={[0, 4, 4, 0]} name="Uses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
