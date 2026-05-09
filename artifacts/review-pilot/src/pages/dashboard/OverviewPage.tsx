import { useState } from "react";
import { Link } from "wouter";
import { Star, MapPin, AlertTriangle, MessageSquare, Zap, TrendingUp, CheckCircle, X } from "lucide-react";
import { StatsCard } from "@/components/common/StatsCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { reviewsChartData, ratingDistData, replyStatusData, locationPerfData } from "@/lib/mock-data";

const onboardingSteps = [
  { label: "Complete profile", done: true },
  { label: "Choose plan", done: true },
  { label: "Connect Google Business Profile", done: false },
  { label: "Select locations", done: false },
  { label: "Set AI tone", done: true },
  { label: "Create templates", done: true },
  { label: "Configure auto-reply rules", done: false },
  { label: "Add WhatsApp/SMS number", done: false },
  { label: "Send test approval message", done: false },
];

const activityFeed = [
  { color: "bg-green-500", text: "New 5-star review received from Priya Sharma", time: "2 min ago" },
  { color: "bg-red-500", text: "Negative review alert sent to WhatsApp for Anita Patel review", time: "15 min ago" },
  { color: "bg-blue-500", text: "AI reply generated for Rahul Mehta (4-star)", time: "32 min ago" },
  { color: "bg-purple-500", text: "Owner approved reply — posted to Google", time: "1 hr ago" },
  { color: "bg-teal-500", text: "Auto-reply posted for Deepa Nair (5-star)", time: "2 hr ago" },
  { color: "bg-yellow-500", text: "Weekly analytics report generated", time: "3 hr ago" },
];

export default function OverviewPage() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const doneCount = onboardingSteps.filter(s => s.done).length;
  const progress = Math.round((doneCount / onboardingSteps.length) * 100);

  return (
    <div className="space-y-6">
      {showOnboarding && (
        <div className="bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-indigo-950/30 dark:to-teal-950/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-foreground">Getting Started with Revora</h3>
              <p className="text-sm text-muted-foreground">{doneCount} of {onboardingSteps.length} steps completed</p>
            </div>
            <button onClick={() => setShowOnboarding(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
          </div>
          <Progress value={progress} className="h-2 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {onboardingSteps.map((step, i) => (
              <div key={i} className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${step.done ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20" : "text-muted-foreground bg-background"}`}>
                <CheckCircle className={`w-4 h-4 flex-shrink-0 ${step.done ? "text-green-500 fill-green-500" : "text-muted-foreground"}`} />
                {step.label}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatsCard title="Total Reviews" value="1,247" icon={Star} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/20" trend={{ value: "18% this month", positive: true }} />
        <StatsCard title="Average Rating" value="4.3 ★" icon={TrendingUp} iconColor="text-green-500" iconBg="bg-green-50 dark:bg-green-900/20" trend={{ value: "+0.2 vs last month", positive: true }} />
        <StatsCard title="Pending Replies" value="23" icon={MessageSquare} iconColor="text-yellow-500" iconBg="bg-yellow-50 dark:bg-yellow-900/20" />
        <StatsCard title="Negative Reviews" value="8" icon={AlertTriangle} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/20" subtitle="5 unresolved" />
        <StatsCard title="Replies Posted" value="1,189" icon={CheckCircle} iconColor="text-teal-500" iconBg="bg-teal-50 dark:bg-teal-900/20" trend={{ value: "95.3% reply rate", positive: true }} />
        <StatsCard title="Auto-Replies Posted" value="734" icon={Zap} iconColor="text-purple-500" iconBg="bg-purple-50 dark:bg-purple-900/20" />
        <StatsCard title="WhatsApp Pending" value="5" icon={MessageSquare} iconColor="text-indigo-500" iconBg="bg-indigo-50 dark:bg-indigo-900/20" />
        <StatsCard title="Locations Connected" value="3" icon={MapPin} iconColor="text-blue-500" iconBg="bg-blue-50 dark:bg-blue-900/20" subtitle="1 needs reconnect" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Reviews This Month</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={reviewsChartData}>
              <defs>
                <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(245 82% 62%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(245 82% 62%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="reviews" stroke="hsl(245 82% 62%)" fill="url(#colorReviews)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ratingDistData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="rating" type="category" tick={{ fontSize: 11 }} width={50} />
              <Tooltip />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {ratingDistData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Reply Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={replyStatusData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {replyStatusData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Location-wise Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={locationPerfData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="location" type="category" tick={{ fontSize: 10 }} width={80} />
              <Tooltip />
              <Legend />
              <Bar dataKey="reviews" fill="hsl(245 82% 62%)" radius={[0, 4, 4, 0]} name="Reviews" />
              <Bar dataKey="replies" fill="hsl(175 77% 40%)" radius={[0, 4, 4, 0]} name="Replies" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {activityFeed.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${item.color}`} />
              <div className="flex-1">
                <p className="text-sm text-foreground">{item.text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
