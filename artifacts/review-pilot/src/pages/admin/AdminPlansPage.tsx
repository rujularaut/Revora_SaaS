import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Edit3, Plus } from "lucide-react";

const plans = [
  {
    id: "starter", name: "Starter", priceINR: 499, priceUSD: 9, active: true,
    features: ["1 location", "50 reviews/month", "Basic templates", "WhatsApp approval", "Manual mode only", "Email support"],
    limits: { locations: 1, reviewsPerMonth: 50, templates: 5, teamMembers: 1, aiCallsPerMonth: 60 }
  },
  {
    id: "growth", name: "Growth", priceINR: 999, priceUSD: 19, active: true,
    features: ["3 locations", "200 reviews/month", "Custom templates", "Negative alerts", "Auto-reply rules", "WhatsApp/SMS", "Monthly reports"],
    limits: { locations: 3, reviewsPerMonth: 200, templates: 20, teamMembers: 3, aiCallsPerMonth: 250 }
  },
  {
    id: "pro", name: "Pro", priceINR: 1999, priceUSD: 39, active: true,
    features: ["10 locations", "500 reviews/month", "Advanced templates", "Advanced analytics", "Team access", "Priority support", "API access"],
    limits: { locations: 10, reviewsPerMonth: 500, templates: 100, teamMembers: 10, aiCallsPerMonth: 600 }
  },
];

function EditPlanModal({ plan, open, onClose }: { plan: typeof plans[0] | null; open: boolean; onClose: () => void }) {
  if (!plan) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Edit {plan.name} Plan</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Price (INR)</Label><Input defaultValue={plan.priceINR} type="number" className="mt-1" data-testid="input-plan-price-inr" /></div>
            <div><Label>Price (USD)</Label><Input defaultValue={plan.priceUSD} type="number" className="mt-1" data-testid="input-plan-price-usd" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Max Locations</Label><Input defaultValue={plan.limits.locations} type="number" className="mt-1" data-testid="input-plan-locations" /></div>
            <div><Label>Reviews/Month</Label><Input defaultValue={plan.limits.reviewsPerMonth} type="number" className="mt-1" data-testid="input-plan-reviews" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Templates</Label><Input defaultValue={plan.limits.templates} type="number" className="mt-1" data-testid="input-plan-templates" /></div>
            <div><Label>AI Calls/Month</Label><Input defaultValue={plan.limits.aiCallsPerMonth} type="number" className="mt-1" data-testid="input-plan-ai-calls" /></div>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" data-testid="button-save-plan">Save Changes</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminPlansPage() {
  const [editPlan, setEditPlan] = useState<typeof plans[0] | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button className="gap-2" data-testid="button-create-plan"><Plus className="w-4 h-4" /> Create Plan</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.id} className="bg-card border-2 border-card-border rounded-xl p-6 shadow-sm" data-testid={`plan-admin-${plan.id}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-foreground">{plan.name}</h3>
              <Switch defaultChecked={plan.active} data-testid={`switch-plan-${plan.id}`} />
            </div>
            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">₹{plan.priceINR}</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>
              <span className="text-sm text-muted-foreground">${plan.priceUSD}/month USD</span>
            </div>

            <div className="space-y-1.5 mb-5">
              {plan.features.map(f => (
                <div key={f} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-foreground">{f}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-5 border-t border-border pt-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Plan Limits</p>
              {Object.entries(plan.limits).map(([key, val]) => (
                <div key={key} className="flex justify-between text-xs">
                  <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-medium text-foreground">{val}</span>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full gap-2" onClick={() => { setEditPlan(plan); setEditOpen(true); }} data-testid={`button-edit-plan-${plan.id}`}>
              <Edit3 className="w-4 h-4" /> Edit Plan
            </Button>
          </div>
        ))}
      </div>

      <EditPlanModal plan={editPlan} open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
}
