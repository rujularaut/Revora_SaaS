import { useState } from "react";
import { mockLocations } from "@/lib/mock-data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { StarRating } from "@/components/common/StarRating";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Plus, RefreshCw, BarChart2, Settings, Edit3, AlertCircle } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";

function AddLocationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Connect Google Location</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-400 flex gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>Connect your Google Business Profile first, then select locations to monitor.</div>
          </div>
          <div>
            <Label>Google Account</Label>
            <Input placeholder="glow.salon@gmail.com" className="mt-1" data-testid="input-google-account" />
          </div>
          <div>
            <Label>Business Name</Label>
            <Input placeholder="Glow Salon" className="mt-1" data-testid="input-location-business" />
          </div>
          <Button className="w-full gap-2" data-testid="button-connect-google">
            Connect with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function LocationsPage() {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button onClick={() => setAddOpen(true)} className="gap-2" data-testid="button-add-location">
          <Plus className="w-4 h-4" /> Add Google Location
        </Button>
        <Button variant="outline" className="gap-2" data-testid="button-sync-locations">
          <RefreshCw className="w-4 h-4" /> Sync Locations
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockLocations.map(loc => (
          <div key={loc.id} className="bg-card border border-card-border rounded-xl p-5 shadow-sm" data-testid={`location-card-${loc.id}`}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{loc.name}</h3>
                    <p className="text-sm text-muted-foreground">{loc.address}, {loc.city}, {loc.country}</p>
                  </div>
                  <StatusBadge status={loc.status} className="ml-auto sm:ml-0" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-1 mb-1">
                      <StarRating rating={Math.round(loc.avgRating)} size="xs" />
                      <span className="text-sm font-semibold text-foreground">{loc.avgRating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Avg Rating</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-foreground">{loc.totalReviews}</p>
                    <p className="text-xs text-muted-foreground">Total Reviews</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className={`text-sm font-semibold ${loc.pendingReplies > 0 ? "text-yellow-600" : "text-foreground"}`}>{loc.pendingReplies}</p>
                    <p className="text-xs text-muted-foreground">Pending Replies</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className={`text-sm font-semibold ${loc.negativeReviews > 0 ? "text-red-600" : "text-foreground"}`}>{loc.negativeReviews}</p>
                    <p className="text-xs text-muted-foreground">Negative Reviews</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 px-2 py-1 rounded-lg">
                    Auto-reply: {loc.autoReplyMode} Mode
                  </span>
                  <span className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-lg">
                    WhatsApp: {loc.whatsappContact}
                  </span>
                </div>
              </div>

              <div className="flex sm:flex-col gap-2">
                <Button size="sm" variant="outline" className="gap-1.5 text-xs" data-testid={`button-analytics-${loc.id}`}>
                  <BarChart2 className="w-3.5 h-3.5" /> Analytics
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs" data-testid={`button-rules-${loc.id}`}>
                  <Settings className="w-3.5 h-3.5" /> Configure
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs" data-testid={`button-edit-whatsapp-${loc.id}`}>
                  <Edit3 className="w-3.5 h-3.5" /> Edit WhatsApp
                </Button>
                {loc.status === "Needs Reconnect" && (
                  <Button size="sm" className="gap-1.5 text-xs bg-orange-600 hover:bg-orange-700" data-testid={`button-reconnect-${loc.id}`}>
                    Reconnect
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddLocationModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
