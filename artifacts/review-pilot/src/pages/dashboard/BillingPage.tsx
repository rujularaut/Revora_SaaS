import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, CreditCard, Download, TrendingUp } from "lucide-react";

const plans = [
  { id: "starter", name: "Starter", priceINR: 499, priceUSD: 9, locations: 1, reviews: "50/mo", templates: "Basic", autoReply: false, analytics: "Basic", current: false },
  { id: "growth", name: "Growth", priceINR: 999, priceUSD: 19, locations: 3, reviews: "200/mo", templates: "Custom", autoReply: true, analytics: "Standard", current: true },
  { id: "pro", name: "Pro", priceINR: 1999, priceUSD: 39, locations: 10, reviews: "500/mo", templates: "Advanced", autoReply: true, analytics: "Advanced", current: false },
];

const planFeatures: Record<string, string[]> = {
  starter: ["1 location", "50 reviews/month", "Basic templates", "Manual approval only", "Email support"],
  growth: ["Up to 3 locations", "200 reviews/month", "Custom templates", "Negative review alerts", "Auto-reply rules", "Monthly reports", "WhatsApp support"],
  pro: ["Up to 10 locations", "500 reviews/month", "Advanced analytics", "Custom templates", "Team access", "Priority support", "API access"],
};

const invoices = [
  { id: "INV-2025-001", date: "2025-01-01", amount: "₹999", plan: "Growth", status: "Paid" as const },
  { id: "INV-2024-012", date: "2024-12-01", amount: "₹999", plan: "Growth", status: "Paid" as const },
  { id: "INV-2024-011", date: "2024-11-01", amount: "₹499", plan: "Starter", status: "Paid" as const },
  { id: "INV-2024-010", date: "2024-10-01", amount: "₹499", plan: "Starter", status: "Paid" as const },
  { id: "INV-2024-009", date: "2024-09-01", amount: "₹49", plan: "Starter", status: "Paid" as const },
];

export default function BillingPage() {
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [provider, setProvider] = useState("razorpay");

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-teal-50 dark:from-indigo-950/20 dark:to-teal-950/20 border border-primary/20 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-bold text-foreground">Growth Plan</span>
              <StatusBadge status="Paid" />
            </div>
            <p className="text-sm text-muted-foreground">₹999/month • 3 locations • 200 reviews/month</p>
            <p className="text-sm text-muted-foreground mt-1">Next billing: <strong className="text-foreground">February 1, 2025</strong></p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setUpgradeOpen(true)} className="gap-2" data-testid="button-upgrade-plan">
              <TrendingUp className="w-4 h-4" /> Upgrade to Pro
            </Button>
            <Button variant="outline" data-testid="button-downgrade-plan">Downgrade</Button>
          </div>
        </div>
      </div>

      <h3 className="font-semibold text-foreground">Available Plans</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {plans.map(plan => (
          <div key={plan.id} className={`bg-card border-2 rounded-xl p-5 shadow-sm ${plan.current ? "border-primary" : "border-card-border"}`} data-testid={`plan-card-${plan.id}`}>
            {plan.current && <div className="text-xs font-bold text-primary mb-3 uppercase tracking-wide">Current Plan</div>}
            <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
            <div className="mt-2 mb-4">
              <span className="text-3xl font-bold text-foreground">₹{plan.priceINR}</span>
              <span className="text-muted-foreground text-sm">/month</span>
              <div className="text-sm text-muted-foreground">${plan.priceUSD}/month</div>
            </div>
            <ul className="space-y-2 mb-5">
              {planFeatures[plan.id].map(f => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            {!plan.current && (
              <Button className="w-full" variant={plan.priceINR > 999 ? "default" : "outline"} data-testid={`button-select-plan-${plan.id}`}>
                {plan.priceINR > 999 ? "Upgrade to Pro" : "Downgrade"}
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
        <h3 className="font-semibold text-foreground mb-2">Payment Options</h3>
        <div className="flex gap-3">
          <button onClick={() => setProvider("razorpay")} className={`flex-1 p-3 border-2 rounded-xl text-sm font-medium transition-colors ${provider === "razorpay" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"}`} data-testid="button-razorpay">
            Razorpay <span className="block text-xs font-normal mt-0.5">UPI, Cards, Netbanking (India)</span>
          </button>
          <button onClick={() => setProvider("stripe")} className={`flex-1 p-3 border-2 rounded-xl text-sm font-medium transition-colors ${provider === "stripe" ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground"}`} data-testid="button-stripe">
            Stripe <span className="block text-xs font-normal mt-0.5">Cards, Apple Pay (International)</span>
          </button>
        </div>
      </div>

      <div className="bg-card border border-card-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Billing History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["Invoice ID", "Date", "Amount", "Plan", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-muted/30 transition-colors" data-testid={`invoice-row-${inv.id}`}>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{inv.id}</td>
                  <td className="px-4 py-3">{inv.date}</td>
                  <td className="px-4 py-3 font-semibold">{inv.amount}</td>
                  <td className="px-4 py-3">{inv.plan}</td>
                  <td className="px-4 py-3"><StatusBadge status={inv.status} /></td>
                  <td className="px-4 py-3">
                    <Button size="sm" variant="ghost" className="gap-1 h-7 text-xs" data-testid={`button-download-${inv.id}`}>
                      <Download className="w-3 h-3" /> Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Upgrade to Pro Plan</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <p className="font-bold text-foreground">Pro Plan — ₹1,999/month</p>
              <p className="text-sm text-muted-foreground">10 locations, 500 reviews/month, advanced analytics</p>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 gap-2" data-testid="button-confirm-upgrade">
                <CreditCard className="w-4 h-4" /> Pay ₹1,999 via Razorpay
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">Your current plan billing ends on Feb 1, 2025. Upgrade is prorated.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
