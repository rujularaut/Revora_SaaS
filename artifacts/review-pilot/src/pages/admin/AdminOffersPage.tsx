import { useState } from "react";
import { mockOffers } from "@/lib/mock-data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tag, Plus, Edit3, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

function CreateOfferModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Create New Offer</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div><Label>Offer Code</Label><Input placeholder="WELCOME50" className="mt-1 uppercase font-mono" data-testid="input-offer-code" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Discount Type</Label>
              <Select>
                <SelectTrigger className="mt-1" data-testid="select-offer-type"><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Value</Label><Input type="number" placeholder="50" className="mt-1" data-testid="input-offer-value" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Valid Till</Label><Input type="date" className="mt-1" data-testid="input-offer-valid-till" /></div>
            <div><Label>Usage Limit</Label><Input type="number" placeholder="500" className="mt-1" data-testid="input-offer-limit" /></div>
          </div>
          <div>
            <Label>Applicable Plans</Label>
            <Select>
              <SelectTrigger className="mt-1" data-testid="select-offer-plans"><SelectValue placeholder="All Plans" /></SelectTrigger>
              <SelectContent>
                {["All Plans", "Starter", "Growth", "Pro", "Growth, Pro"].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" data-testid="button-save-offer">Create Offer</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminOffersPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [offers, setOffers] = useState(mockOffers);

  const toggleOffer = (id: string) => {
    setOffers(os => os.map(o => o.id === id ? { ...o, active: !o.active } : o));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">{offers.filter(o => o.active).length} active offers</div>
        <Button onClick={() => setCreateOpen(true)} className="gap-2" data-testid="button-create-offer">
          <Plus className="w-4 h-4" /> Create Offer
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {offers.map(offer => (
          <div key={offer.id} className="bg-card border border-card-border rounded-xl p-5 shadow-sm" data-testid={`admin-offer-${offer.id}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                  <Tag className="w-4.5 h-4.5 text-amber-600" />
                </div>
                <div>
                  <code className="font-bold text-base text-primary font-mono">{offer.code}</code>
                  <p className="text-xs text-muted-foreground">{offer.discount}</p>
                </div>
              </div>
              <Switch checked={offer.active} onCheckedChange={() => toggleOffer(offer.id)} data-testid={`switch-offer-${offer.id}`} />
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium text-foreground">{offer.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valid till</span>
                <span className="font-medium text-foreground">{offer.validTill}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Used</span>
                <span className="font-medium text-foreground">{offer.usedCount} / {offer.limitCount}</span>
              </div>
              <Progress value={(offer.usedCount / offer.limitCount) * 100} className="h-1.5" />
            </div>

            <div className="flex gap-1.5">
              <StatusBadge status={offer.active ? "Active" : "Inactive"} />
              <div className="ml-auto flex gap-1.5">
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" data-testid={`button-edit-offer-${offer.id}`}><Edit3 className="w-3.5 h-3.5" /></Button>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-500" data-testid={`button-delete-offer-${offer.id}`}><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateOfferModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
