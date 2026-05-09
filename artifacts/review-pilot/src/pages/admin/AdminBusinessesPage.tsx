import { useState } from "react";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, Eye } from "lucide-react";

const businesses = [
  { id: "b1", name: "Glow Salon", owner: "Riya Kapoor", category: "Salon", locations: 3, totalReviews: 1102, avgRating: 4.3, plan: "Growth", status: "Active" as const },
  { id: "b2", name: "Spice Garden Restaurant", owner: "Sanjay Patel", category: "Restaurant", locations: 7, totalReviews: 3241, avgRating: 4.5, plan: "Pro", status: "Active" as const },
  { id: "b3", name: "HealthFirst Clinic", owner: "Meera Iyer", category: "Clinic", locations: 0, totalReviews: 0, avgRating: 0, plan: "Starter", status: "Trial" as const },
  { id: "b4", name: "FitZone Gym", owner: "David Chen", category: "Gym", locations: 12, totalReviews: 7821, avgRating: 4.6, plan: "Pro", status: "Active" as const },
  { id: "b5", name: "Glamour Salon", owner: "Fatima Al-Hassan", category: "Salon", locations: 2, totalReviews: 432, avgRating: 4.2, plan: "Growth", status: "Suspended" as const },
  { id: "b6", name: "Naturals Salon", owner: "Amrita Sharma", category: "Salon", locations: 4, totalReviews: 1890, avgRating: 4.4, plan: "Growth", status: "Active" as const },
  { id: "b7", name: "Luxe Hotel", owner: "Tom Wilson", category: "Hotel", locations: 0, totalReviews: 0, avgRating: 0, plan: "Starter", status: "Trial" as const },
  { id: "b8", name: "Royal Hotel", owner: "Rajesh Kumar", category: "Hotel", locations: 5, totalReviews: 2431, avgRating: 4.7, plan: "Pro", status: "Active" as const },
  { id: "b9", name: "Bella Salon", owner: "Maria Garcia", category: "Salon", locations: 1, totalReviews: 89, avgRating: 4.1, plan: "Starter", status: "Trial" as const },
  { id: "b10", name: "CoachingPlus", owner: "Nisha Reddy", category: "Coaching", locations: 0, totalReviews: 0, avgRating: 0, plan: "Pro", status: "Cancelled" as const },
];

export default function AdminBusinessesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = businesses.filter(b => {
    if (category !== "all" && b.category.toLowerCase() !== category) return false;
    if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.owner.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search businesses or owners..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} data-testid="input-business-search" />
        </div>
        <Select onValueChange={setCategory} defaultValue="all">
          <SelectTrigger className="w-40" data-testid="select-business-category"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {["Salon", "Restaurant", "Clinic", "Gym", "Hotel", "Coaching", "Retail"].map(c => <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(biz => (
          <div key={biz.id} className="bg-card border border-card-border rounded-xl p-4 shadow-sm" data-testid={`business-card-${biz.id}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{biz.name}</h3>
                <p className="text-xs text-muted-foreground">{biz.owner} • {biz.category}</p>
              </div>
              <StatusBadge status={biz.status} />
            </div>
            <div className="grid grid-cols-4 gap-2 mb-3">
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <div className="flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">{biz.locations}</span>
                </div>
                <p className="text-xs text-muted-foreground">Locations</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <p className="text-sm font-semibold text-foreground">{biz.totalReviews.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Reviews</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-semibold text-foreground">{biz.avgRating || "—"}</span>
                </div>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-2 text-center">
                <p className="text-sm font-semibold text-foreground">{biz.plan}</p>
                <p className="text-xs text-muted-foreground">Plan</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full gap-1.5 text-xs h-7" data-testid={`button-view-business-${biz.id}`}>
              <Eye className="w-3 h-3" /> View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
