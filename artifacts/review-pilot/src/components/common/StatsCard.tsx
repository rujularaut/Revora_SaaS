import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export function StatsCard({ title, value, subtitle, icon: Icon, iconColor = "text-primary", iconBg = "bg-primary/10", trend, className }: StatsCardProps) {
  return (
    <div className={cn("bg-card border border-card-border rounded-xl p-4 shadow-sm", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          {trend && (
            <p className={cn("text-xs font-medium mt-1", trend.positive ? "text-green-600" : "text-red-600")}>
              {trend.positive ? "+" : ""}{trend.value}
            </p>
          )}
        </div>
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", iconBg)}>
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
      </div>
    </div>
  );
}
