import PublicLayout from "@/components/layout/PublicLayout";
import { UserPlus, CreditCard, Chrome, MapPin, Bot, Settings, MessageSquare, CheckCircle, Zap } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Sign Up", desc: "Create your account with your business name, category, and contact details. Takes under 2 minutes.", badge: "Step 1" },
  { icon: CreditCard, title: "Choose a Plan", desc: "Select the plan that fits your business — Starter, Growth, or Pro. Start with a free trial.", badge: "Step 2" },
  { icon: CreditCard, title: "Pay Securely", desc: "Pay using Razorpay (UPI, cards, netbanking) for India or Stripe for international customers. Safe and instant.", badge: "Step 3" },
  { icon: Chrome, title: "Connect Google Business Profile", desc: "Click 'Connect Google' and authorize Revora to read and respond to your Google reviews. Secure OAuth only.", badge: "Step 4" },
  { icon: MapPin, title: "Select Locations", desc: "Choose one or multiple business locations from your Google Business Profile. Each location is tracked independently.", badge: "Step 5" },
  { icon: Bot, title: "Set AI Tone & Templates", desc: "Choose your preferred AI tone (Warm, Formal, Casual, Apologetic, etc.) and set up reply templates for different review types.", badge: "Step 6" },
  { icon: Settings, title: "Configure Auto-Reply Rules", desc: "Set up smart rules — auto-reply to 5-star reviews, send alerts for negative ones, and block replies with sensitive keywords.", badge: "Step 7" },
  { icon: MessageSquare, title: "Receive WhatsApp / SMS Approvals", desc: "When a review comes in, you'll get a WhatsApp or SMS message with the review and AI-drafted reply. One tap to approve.", badge: "Step 8" },
  { icon: Zap, title: "Replies Post Automatically", desc: "After you approve (YES), the reply is automatically posted to Google — no login required. Your reputation stays protected.", badge: "Step 9" },
];

export default function HowItWorksPage() {
  return (
    <PublicLayout>
      <div className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground mb-4">How Revora Works</h1>
            <p className="text-xl text-muted-foreground">From signup to your first automated reply — here's the complete journey.</p>
          </div>

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex gap-4 sm:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-4.5 h-4.5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">{step.title}</h3>
                        <span className="ml-auto text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">{step.badge}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              Average setup time: under 10 minutes
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
