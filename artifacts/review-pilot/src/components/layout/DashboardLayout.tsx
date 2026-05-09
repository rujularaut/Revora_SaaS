import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Star, MapPin, Bot, FileText, Zap, AlertTriangle,
  Chrome, MessageSquare, BarChart2, CreditCard, Tag, Settings, HelpCircle,
  Menu, X, Bell, ChevronRight, LogOut
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star },
  { label: "Locations", href: "/dashboard/locations", icon: MapPin },
  { label: "AI Replies", href: "/dashboard/ai-replies", icon: Bot },
  { label: "Templates", href: "/dashboard/templates", icon: FileText },
  { label: "Auto-Reply Rules", href: "/dashboard/auto-rules", icon: Zap },
  { label: "Negative Alerts", href: "/dashboard/negative-alerts", icon: AlertTriangle },
  { label: "Google Profile", href: "/dashboard/google-profile", icon: Chrome },
  { label: "WhatsApp / SMS", href: "/dashboard/whatsapp", icon: MessageSquare },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { label: "Billing & Plans", href: "/dashboard/billing", icon: CreditCard },
  { label: "Offers", href: "/dashboard/offers", icon: Tag },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Support", href: "/dashboard/support", icon: HelpCircle },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const currentPage = sidebarItems.find(i => i.href === location)?.label ?? "Dashboard";

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar flex flex-col transition-transform duration-200 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Star className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <span className="font-bold text-sm text-sidebar-foreground">Revora <span className="text-primary">AI</span></span>
          </Link>
          <button className="md:hidden text-sidebar-foreground" onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
                {active && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-sidebar-accent">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {user?.avatar ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-sidebar-foreground truncate">{user?.name ?? "Business Owner"}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user?.businessName ?? ""}</p>
            </div>
            <button onClick={logout} className="text-sidebar-foreground/60 hover:text-sidebar-foreground" title="Logout">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border bg-background px-4 sm:px-6 flex items-center gap-4">
          <button className="md:hidden text-muted-foreground" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-semibold text-foreground">{currentPage}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted" data-testid="button-notifications">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
              {user?.avatar ?? "U"}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
