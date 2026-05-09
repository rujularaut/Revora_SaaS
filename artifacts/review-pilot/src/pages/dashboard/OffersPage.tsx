import { useState } from "react";
import { mockOffers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Tag, Copy, CheckCircle } from "lucide-react";

function ApplyCouponModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    if (code.trim()) setApplied(true);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader><DialogTitle>Apply Offer Code</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          {applied ? (
            <div className="text-center py-4">
              <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-foreground">Coupon Applied!</p>
              <p className="text-sm text-muted-foreground mt-1">Code <strong>{code}</strong> has been applied to your next billing.</p>
            </div>
          ) : (
            <>
              <div>
                <Input placeholder="Enter offer code (e.g. WELCOME50)" value={code} onChange={e => setCode(e.target.value.toUpperCase())} data-testid="input-coupon-code" />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={handleApply} data-testid="button-validate-coupon">Validate & Apply</Button>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function OffersPage() {
  const [applyOpen, setApplyOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Have a coupon code? Apply it to get a discount on your plan.</p>
        </div>
        <Button onClick={() => setApplyOpen(true)} className="gap-2" data-testid="button-apply-coupon">
          <Tag className="w-4 h-4" /> Apply Offer Code
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockOffers.map(offer => (
          <div key={offer.id} className={`bg-card border-2 rounded-xl p-5 shadow-sm ${offer.active ? "border-card-border" : "border-dashed border-border opacity-60"}`} data-testid={`offer-card-${offer.id}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <code className="font-bold text-lg text-primary font-mono">{offer.code}</code>
                  <StatusBadge status={offer.active ? "Active" : "Inactive"} />
                </div>
                <p className="text-sm font-medium text-foreground">{offer.discount}</p>
              </div>
              <button onClick={() => copyCode(offer.code)} className="p-2 rounded-lg hover:bg-muted transition-colors" data-testid={`button-copy-${offer.id}`}>
                {copiedCode === offer.code ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground mb-4">
              <p>Valid till: <span className="text-foreground font-medium">{offer.validTill}</span></p>
              <p>Applicable plan: <span className="text-foreground font-medium">{offer.plan}</span></p>
              <p>Used: <span className="text-foreground font-medium">{offer.usedCount} / {offer.limitCount}</span></p>
            </div>
            <Button
              size="sm"
              className="w-full"
              disabled={!offer.active}
              onClick={() => setApplyOpen(true)}
              data-testid={`button-apply-${offer.id}`}
            >
              Apply This Offer
            </Button>
          </div>
        ))}
      </div>

      <ApplyCouponModal open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  );
}
