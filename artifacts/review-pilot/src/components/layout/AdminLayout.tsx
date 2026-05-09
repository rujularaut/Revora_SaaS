import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Users, Building2, MapPin, Star, CreditCard, RefreshCw,
  Tag, Bot, MessageSquare, Chrome, PackageOpen, BarChart2, HelpCircle,
  Settings, Menu, X, Bell, ChevronRight, LogOut, Shield
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const adminItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Businesses", href: "/admin/businesses", icon: Building2 },
  { label: "Locations", href: "/admin/locations", icon: MapPin },
  { label: "Reviews Monitor", href: "/admin/reviews", icon: Star },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Subscriptions", href: "/admin/subscriptions", icon: RefreshCw },
  { label: "Offers & Coupons", href: "/admin/offers", icon: Tag },
  { label: "AI Usage", href: "/admin/ai-usage", icon: Bot },
  { label: "WhatsApp / SMS Logs", href: "/admin/whatsapp-logs", icon: MessageSquare },
  { label: "Google Sync Health", href: "/admin/google-health", icon: Chrome },
  { label: "Plans", href: "/admin/plans", icon: PackageOpen },
  { label: "Reports", href: "/admin/reports", icon: BarChart2 },
  { label: "Support", href: "/admin/support", icon: HelpCircle },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const currentPage = adminItems.find(i => i.href === location)?.label ?? "Admin";

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-200 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "hsl(230 45% 9%)" }}>
        <div className="flex items-center justify-between h-16 px-4 border-b" style={{ borderColor: "hsl(230 40% 16%)" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm text-white">Revora</span>
              <span className="ml-1 text-xs px-1.5 py-0.5 bg-violet-600/30 text-violet-300 rounded font-medium">Admin</span>
            </div>
          </div>
          <button className="md:hidden text-white/60" onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {adminItems.map((item) => {
            const Icon = item.icon;
            const active = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-violet-600 text-white"
                    : "text-white/60 hover:bg-white/8 hover:text-white/90"
                }`}
                data-testid={`admin-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
                {active && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t" style={{ borderColor: "hsl(230 40% 16%)" }}>
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg" style={{ background: "hsl(230 40% 14%)" }}>
            <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {user?.avatar ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name ?? "Admin"}</p>
              <p className="text-xs text-white/40 truncate">Super Admin</p>
            </div>
            <button onClick={logout} className="text-white/40 hover:text-white" title="Logout">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border bg-background px-4 sm:px-6 flex items-center gap-4">
          <button className="md:hidden text-muted-foreground" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-semibold text-foreground">{currentPage}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-xs font-bold text-white">
              {user?.avatar ?? "A"}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
