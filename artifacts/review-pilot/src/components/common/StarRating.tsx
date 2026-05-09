import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({ rating, max = 5, size = "sm", className }: { rating: number; max?: number; size?: "xs" | "sm" | "md"; className?: string }) {
  const sizeClass = size === "xs" ? "w-3 h-3" : size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(sizeClass, i < rating ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600")}
        />
      ))}
    </div>
  );
}
