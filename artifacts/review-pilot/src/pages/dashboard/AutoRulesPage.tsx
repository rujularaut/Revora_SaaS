import { useState } from "react";
import { mockAutoRules, AutoRule } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Zap, Plus, Edit3, Trash2, Shield, CheckCircle } from "lucide-react";

const modes = [
  { id: "safe", label: "Safe Mode", desc: "No auto-posting. Every reply needs your approval.", icon: Shield, color: "border-slate-300 text-slate-600" },
  { id: "balanced", label: "Balanced Mode", desc: "Auto-reply to simple 5-star reviews. Approval required for everything else.", icon: CheckCircle, color: "border-primary text-primary", recommended: true },
  { id: "auto", label: "Auto Mode", desc: "Auto-reply to safe 4–5 star reviews. Negative reviews still require approval.", icon: Zap, color: "border-teal-400 text-teal-600" },
];

function CreateRuleModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Create Auto-Reply Rule</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label>Rule Name</Label>
            <Input placeholder="5-star Auto Thank You" className="mt-1" data-testid="input-rule-name" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Rating Condition</Label>
              <Select>
                <SelectTrigger className="mt-1" data-testid="select-rule-rating">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  {["Any", "5 stars", "4 stars", "4-5 stars", "1-3 stars", "1-2 stars"].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Sentiment Condition</Label>
              <Select>
                <SelectTrigger className="mt-1" data-testid="select-rule-sentiment">
                  <SelectValue placeholder="Select sentiment" />
                </SelectTrigger>
                <SelectContent>
                  {["Any", "Positive", "Neutral", "Negative"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Keywords to Block (comma separated)</Label>
            <Input placeholder="refund, rude, scam, legal, injury" className="mt-1" data-testid="input-rule-keywords" />
          </div>
          <div>
            <Label>Location</Label>
            <Select>
              <SelectTrigger className="mt-1" data-testid="select-rule-location">
                <SelectValue placeholder="All locations" />
              </SelectTrigger>
              <SelectContent>
                {["All locations", "Pune Branch", "Mumbai Branch", "Delhi NCR"].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Action</Label>
            <Select>
              <SelectTrigger className="mt-1" data-testid="select-rule-action">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                {["Auto-post reply", "Send for approval", "Send urgent alert", "Skip"].map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" data-testid="button-save-rule">Save Rule</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AutoRulesPage() {
  const [selectedMode, setSelectedMode] = useState("balanced");
  const [rules, setRules] = useState(mockAutoRules);
  const [createOpen, setCreateOpen] = useState(false);

  const toggleRule = (id: string) => {
    setRules(rs => rs.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-foreground mb-3">Select Mode</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {modes.map(mode => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                data-testid={`mode-${mode.id}`}
                className={`text-left p-4 rounded-xl border-2 transition-all ${selectedMode === mode.id ? "border-primary bg-primary/5" : "border-border hover:border-border/80 hover:bg-muted/30"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-5 h-5 ${selectedMode === mode.id ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`font-semibold text-sm ${selectedMode === mode.id ? "text-primary" : "text-foreground"}`}>{mode.label}</span>
                  {mode.recommended && <span className="text-xs px-1.5 py-0.5 bg-primary text-white rounded-full font-medium">Recommended</span>}
                </div>
                <p className="text-xs text-muted-foreground">{mode.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Custom Rules</h3>
        <Button onClick={() => setCreateOpen(true)} className="gap-2" size="sm" data-testid="button-create-rule">
          <Plus className="w-4 h-4" /> Create Rule
        </Button>
      </div>

      <div className="space-y-3">
        {rules.map(rule => (
          <div key={rule.id} className="bg-card border border-card-border rounded-xl p-4 shadow-sm" data-testid={`rule-card-${rule.id}`}>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-sm text-foreground">{rule.name}</h4>
                  <StatusBadge status={rule.active ? "Active" : "Inactive"} />
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-xs bg-muted px-2 py-0.5 rounded">Rating: {rule.ratingCondition}</span>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded">Sentiment: {rule.sentimentCondition}</span>
                  {rule.keywordsToBlock.length > 0 && (
                    <span className="text-xs bg-red-50 dark:bg-red-900/20 text-red-600 px-2 py-0.5 rounded">Block: {rule.keywordsToBlock.join(", ")}</span>
                  )}
                  <span className="text-xs bg-muted px-2 py-0.5 rounded">{rule.locationCondition}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground">Action:</span>
                  <StatusBadge status={rule.action === "Auto-post reply" ? "Posted" : rule.action === "Send urgent alert" ? "Negative" : "Pending"} />
                  <span className="text-xs text-muted-foreground">{rule.action}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={rule.active} onCheckedChange={() => toggleRule(rule.id)} data-testid={`switch-rule-${rule.id}`} />
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" data-testid={`button-edit-rule-${rule.id}`}><Edit3 className="w-3.5 h-3.5" /></Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:text-red-600" data-testid={`button-delete-rule-${rule.id}`}><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateRuleModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
