import PublicLayout from "@/components/layout/PublicLayout";
import { Chrome, Star, Bot, MessageSquare, Zap, AlertTriangle, MapPin, FileText, BarChart2, CreditCard, Tag, Shield, Globe, CheckCircle } from "lucide-react";

const features = [
  { icon: Chrome, title: "Google Business Profile OAuth", desc: "Connect securely using Google OAuth. We never store your password. One-click connection to your Google Business Profile.", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30" },
  { icon: Star, title: "Read & Monitor Reviews", desc: "Automatically fetch all new Google reviews across all your connected locations in real-time.", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/30" },
  { icon: Bot, title: "Gemini AI Reply Generation", desc: "Powered by Google's Gemini AI to craft contextually relevant, on-brand replies that match your tone.", color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30" },
  { icon: MessageSquare, title: "WhatsApp / SMS Approval Flow", desc: "Get review alerts on WhatsApp or SMS with AI-drafted replies. Approve with YES, edit, or skip instantly.", color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/30" },
  { icon: CheckCircle, title: "YES / EDIT / SKIP Actions", desc: "Simple one-tap approval from any device. No need to log in to approve a reply — just reply to the WhatsApp message.", color: "text-teal-600", bg: "bg-teal-50 dark:bg-teal-950/30" },
  { icon: AlertTriangle, title: "Negative Review Alerts", desc: "Instant urgent alerts for 1-3 star reviews. Never miss a complaint — respond within minutes, not days.", color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/30" },
  { icon: Zap, title: "Auto-Reply Rules", desc: "Set smart rules to auto-post replies to simple 5-star reviews while requiring approval for anything sensitive.", color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-950/30" },
  { icon: MapPin, title: "Multi-Location Support", desc: "Manage reviews from all your business locations in one unified dashboard. Perfect for chains and franchises.", color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-950/30" },
  { icon: FileText, title: "Review Response Templates", desc: "Build a library of proven response templates for different scenarios. Personalize at scale with variables.", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950/30" },
  { icon: Globe, title: "Multi-Language Replies", desc: "Generate replies in English, Hindi, Hinglish, or auto-detect the review language for native-feeling responses.", color: "text-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-950/30" },
  { icon: BarChart2, title: "Analytics & Reports", desc: "Track reply rates, rating trends, response times, and location-wise performance with weekly/monthly reports.", color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-950/30" },
  { icon: CreditCard, title: "Payment & Subscription Management", desc: "Pay seamlessly via Razorpay (India) or Stripe (International). Manage your plan, invoices, and billing in one place.", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { icon: Tag, title: "Offers & Discount Coupons", desc: "Apply promotional codes to get discounts on monthly or annual plans. Exclusive offers for specific business categories.", color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-950/30" },
  { icon: Shield, title: "Admin Revenue Dashboard", desc: "Founders get a full-stack admin panel with user management, revenue tracking, AI usage costs, and platform health.", color: "text-slate-600", bg: "bg-slate-50 dark:bg-slate-950/30" },
];

export default function FeaturesPage() {
  return (
    <PublicLayout>
      <div className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground mb-4">Everything You Need to Master Google Reviews</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete toolkit for small businesses to protect and improve their online reputation.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-card border border-card-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
