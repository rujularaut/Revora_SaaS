import { StatsCard } from "@/components/common/StatsCard";
import { Users, Building2, CreditCard, Bot, Star, TrendingUp, AlertTriangle, Activity } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { adminUserGrowthData, adminRevenueData, planDistData } from "@/lib/mock-data";

const recentActivity = [
  { color: "bg-green-500", text: "New signup: Maria Garcia (Bella Salon, Spain)", time: "5 min ago" },
  { color: "bg-blue-500", text: "Payment received: Rajesh Kumar — ₹1,999 (Pro)", time: "18 min ago" },
  { color: "bg-red-500", text: "Google token expired: Glow Salon Mumbai", time: "45 min ago" },
  { color: "bg-yellow-500", text: "Support ticket opened: Fatima Al-Hassan", time: "1 hr ago" },
  { color: "bg-purple-500", text: "Payment failed: Fatima Al-Hassan — ₹999", time: "3 hr ago" },
  { color: "bg-teal-500", text: "New business connected: FitZone Gym Delhi", time: "5 hr ago" },
];

const countryData = [
  { country: "India", users: 612 }, { country: "USA", users: 98 }, { country: "UAE", users: 45 },
  { country: "UK", users: 42 }, { country: "Australia", users: 28 }, { country: "Other", users: 22 },
];

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatsCard title="Total Users" value="847" icon={Users} iconColor="text-primary" iconBg="bg-primary/10" trend={{ value: "+23 this week", positive: true }} />
        <StatsCard title="Active Businesses" value="612" icon={Building2} iconColor="text-teal-500" iconBg="bg-teal-50 dark:bg-teal-900/20" trend={{ value: "+8 this week", positive: true }} />
        <StatsCard title="Monthly Revenue" value="₹1.24L" icon={CreditCard} iconColor="text-green-500" iconBg="bg-green-50 dark:bg-green-900/20" trend={{ value: "+6% vs last month", positive: true }} />
        <StatsCard title="AI Replies / Month" value="18.4K" icon={Bot} iconColor="text-purple-500" iconBg="bg-purple-50 dark:bg-purple-900/20" trend={{ value: "+12%", positive: true }} />
        <StatsCard title="Reviews Processed" value="28.7K" icon={Star} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/20" />
        <StatsCard title="Reply Rate" value="95.3%" icon={TrendingUp} iconColor="text-green-500" iconBg="bg-green-50 dark:bg-green-900/20" trend={{ value: "+2.1% vs last month", positive: true }} />
        <StatsCard title="Open Tickets" value="7" icon={AlertTriangle} iconColor="text-orange-500" iconBg="bg-orange-50 dark:bg-orange-900/20" />
        <StatsCard title="Failed Payments" value="4" icon={Activity} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={adminUserGrowthData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="users" stroke="#7c3aed" fill="url(#colorUsers)" strokeWidth={2} name="Users" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Monthly Revenue (₹)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={adminRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Plan Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={planDistData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {planDistData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Users by Country</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={countryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="country" type="category" tick={{ fontSize: 11 }} width={65} />
              <Tooltip />
              <Bar dataKey="users" fill="#7c3aed" radius={[0, 4, 4, 0]} name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-foreground mb-4">Recent Platform Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((item, i) => (
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
