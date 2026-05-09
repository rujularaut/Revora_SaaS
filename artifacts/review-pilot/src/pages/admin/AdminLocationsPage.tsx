import { mockLocations, mockAdminUsers } from "@/lib/mock-data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { StarRating } from "@/components/common/StarRating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, MapPin, Star, RefreshCw } from "lucide-react";

const allLocations = [
  ...mockLocations,
  { id: "l4", name: "Spice Garden - Andheri", address: "MV Road, Andheri East", city: "Mumbai", country: "India", avgRating: 4.6, totalReviews: 890, pendingReplies: 2, negativeReviews: 0, autoReplyMode: "Auto" as const, whatsappContact: "+91 87654 32109", status: "Connected" as const },
  { id: "l5", name: "FitZone - Koramangala", address: "100 Feet Road, Koramangala", city: "Bangalore", country: "India", avgRating: 4.7, totalReviews: 1203, pendingReplies: 0, negativeReviews: 0, autoReplyMode: "Auto" as const, whatsappContact: "+1 555-234-5678", status: "Connected" as const },
  { id: "l6", name: "Royal Hotel - Jaipur", address: "MI Road, Jaipur", city: "Jaipur", country: "India", avgRating: 4.5, totalReviews: 634, pendingReplies: 7, negativeReviews: 2, autoReplyMode: "Balanced" as const, whatsappContact: "+91 43210 98765", status: "Needs Reconnect" as const },
];

export default function AdminLocationsPage() {
  const [search, setSearch] = useState("");

  const filtered = allLocations.filter(l =>
    !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search locations..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} data-testid="input-location-search" />
        </div>
        <Button variant="outline" className="gap-2" data-testid="button-sync-all-locations">
          <RefreshCw className="w-4 h-4" /> Sync All
        </Button>
      </div>

      <div className="bg-card border border-card-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["Location", "City", "Rating", "Reviews", "Pending", "Negative", "Auto-Reply", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(loc => (
                <tr key={loc.id} className="hover:bg-muted/30 transition-colors" data-testid={`location-row-${loc.id}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="font-medium text-foreground whitespace-nowrap">{loc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{loc.city}, {loc.country}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <StarRating rating={Math.round(loc.avgRating)} size="xs" />
                      <span className="text-xs text-foreground font-medium">{loc.avgRating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">{loc.totalReviews.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={loc.pendingReplies > 0 ? "text-yellow-600 font-semibold" : "text-muted-foreground"}>{loc.pendingReplies}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={loc.negativeReviews > 0 ? "text-red-600 font-semibold" : "text-muted-foreground"}>{loc.negativeReviews}</span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={loc.autoReplyMode} /></td>
                  <td className="px-4 py-3"><StatusBadge status={loc.status} /></td>
                  <td className="px-4 py-3">
                    {loc.status === "Needs Reconnect" ? (
                      <Button size="sm" className="h-7 text-xs bg-orange-600 hover:bg-orange-700" data-testid={`button-reconnect-loc-${loc.id}`}>Reconnect</Button>
                    ) : (
                      <Button size="sm" variant="ghost" className="h-7 text-xs" data-testid={`button-sync-loc-${loc.id}`}><RefreshCw className="w-3 h-3" /></Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground">
          {filtered.length} locations across {mockAdminUsers.filter(u => u.businessConnected).length} businesses
        </div>
      </div>
    </div>
  );
}
