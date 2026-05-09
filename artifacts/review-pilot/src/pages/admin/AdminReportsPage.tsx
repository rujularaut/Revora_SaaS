import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { adminRevenueData, adminUserGrowthData } from "@/lib/mock-data";
import { Download, BarChart2, TrendingUp, Users } from "lucide-react";

const churnData = [
  { month: "Aug", churned: 4 }, { month: "Sep", churned: 6 }, { month: "Oct", churned: 3 },
  { month: "Nov", churned: 7 }, { month: "Dec", churned: 5 }, { month: "Jan", churned: 4 },
];

const mrrData = [
  { month: "Aug", mrr: 32000, arr: 384000 }, { month: "Sep", mrr: 54000, arr: 648000 },
  { month: "Oct", mrr: 71000, arr: 852000 }, { month: "Nov", mrr: 89000, arr: 1068000 },
  { month: "Dec", mrr: 104000, arr: 1248000 }, { month: "Jan", mrr: 124500, arr: 1494000 },
];

const countryRevenue = [
  { country: "India", revenue: 89432 }, { country: "USA", revenue: 18900 }, { country: "UAE", revenue: 9800 },
  { country: "UK", revenue: 4320 }, { country: "Other", revenue: 2048 },
];

const categoryRevenue = [
  { category: "Salons", revenue: 52000 }, { category: "Restaurants", revenue: 34000 },
  { category: "Gyms", revenue: 18000 }, { category: "Hotels", revenue: 12500 },
  { category: "Clinics", revenue: 6000 }, { category: "Other", revenue: 2000 },
];

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" className="gap-2" data-testid="button-export-pdf"><Download className="w-4 h-4" /> Export PDF Report</Button>
        <Button variant="outline" className="gap-2" data-testid="button-export-csv"><Download className="w-4 h-4" /> Export CSV Data</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "MRR", value: "₹1.24L", sub: "Monthly Recurring Revenue" },
          { label: "ARR", value: "₹14.9L", sub: "Annual Recurring Revenue" },
          { label: "ARPU", value: "₹1,471", sub: "Avg Revenue Per User" },
          { label: "Churn Rate", value: "2.3%", sub: "Monthly churn" },
        ].map(m => (
          <div key={m.label} className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
            <p className="text-xs text-muted-foreground">{m.sub}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">MRR Growth (₹)</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mrrData}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
              <Area type="monotone" dataKey="mrr" stroke="#7c3aed" fill="url(#mrrGrad)" strokeWidth={2} name="MRR (₹)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">User Growth</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={adminUserGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#7c3aed" strokeWidth={2} dot={{ fill: "#7c3aed", r: 3 }} name="Total Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Revenue by Country</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={countryRevenue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <YAxis dataKey="country" type="category" tick={{ fontSize: 11 }} width={55} />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#7c3aed" radius={[0, 4, 4, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Revenue by Business Category</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryRevenue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <YAxis dataKey="category" type="category" tick={{ fontSize: 11 }} width={75} />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#0ea5e9" radius={[0, 4, 4, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
