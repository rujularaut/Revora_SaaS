import { useState } from "react";
import { mockReviews, Review } from "@/lib/mock-data";
import { StarRating } from "@/components/common/StarRating";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, Bot, CheckCircle, SkipForward, Eye, MessageSquare, Send } from "lucide-react";

const filterTabs = ["All", "New", "Negative", "Positive", "Pending Approval", "Replied", "Skipped", "Failed"];

function ReviewDetailModal({ review, open, onClose }: { review: Review | null; open: boolean; onClose: () => void }) {
  const [editedReply, setEditedReply] = useState(review?.aiReply ?? "");
  if (!review) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Detail</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">{review.reviewerInitials}</div>
              <div>
                <p className="font-semibold text-foreground text-sm">{review.reviewerName}</p>
                <div className="flex items-center gap-2">
                  <StarRating rating={review.rating} size="xs" />
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>
              <div className="ml-auto flex gap-2">
                <StatusBadge status={review.sentiment} />
                <StatusBadge status={review.replyStatus} />
              </div>
            </div>
            <p className="text-sm text-foreground">{review.text}</p>
            <p className="text-xs text-muted-foreground mt-2">{review.location}</p>
          </div>

          {review.aiReply && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-4 h-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">AI-Generated Reply</p>
                {review.toneUsed && <StatusBadge status={review.toneUsed} />}
                {review.templateUsed && <span className="text-xs text-muted-foreground">via {review.templateUsed}</span>}
              </div>
              <Textarea value={editedReply} onChange={e => setEditedReply(e.target.value)} rows={5} className="text-sm" data-testid="textarea-edit-reply" />
            </div>
          )}

          <div className="flex gap-2 flex-wrap">
            <Button className="gap-2 flex-1" data-testid="button-post-reply">
              <Send className="w-4 h-4" /> Post Reply to Google
            </Button>
            <Button variant="outline" className="gap-2 flex-1" data-testid="button-send-whatsapp">
              <MessageSquare className="w-4 h-4" /> Send to WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = mockReviews.filter(r => {
    if (activeTab === "Negative" && r.sentiment !== "Negative") return false;
    if (activeTab === "Positive" && r.sentiment !== "Positive") return false;
    if (activeTab === "Replied" && r.replyStatus !== "Posted") return false;
    if (activeTab === "Skipped" && r.replyStatus !== "Skipped") return false;
    if (activeTab === "Failed" && r.replyStatus !== "Failed") return false;
    if (activeTab === "Pending Approval" && r.ownerAction !== "Pending") return false;
    if (locationFilter !== "all" && r.location !== locationFilter) return false;
    if (search && !r.text.toLowerCase().includes(search.toLowerCase()) && !r.reviewerName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const openReview = (r: Review) => { setSelectedReview(r); setModalOpen(true); };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search reviews or reviewer..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} data-testid="input-review-search" />
        </div>
        <Select onValueChange={setLocationFilter} defaultValue="all">
          <SelectTrigger className="w-full sm:w-52" data-testid="select-location-filter">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Glow Salon - Pune Branch">Pune Branch</SelectItem>
            <SelectItem value="Glow Salon - Mumbai Branch">Mumbai Branch</SelectItem>
            <SelectItem value="Glow Salon - Delhi NCR">Delhi NCR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {filterTabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
            data-testid={`tab-${tab.toLowerCase().replace(/\s+/g, "-")}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No reviews found</div>
        ) : filtered.map(review => (
          <div key={review.id} className="bg-card border border-card-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow" data-testid={`review-card-${review.id}`}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                {review.reviewerInitials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-foreground">{review.reviewerName}</span>
                  <StarRating rating={review.rating} size="xs" />
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                  <StatusBadge status={review.sentiment} />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{review.text}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs bg-muted px-2 py-0.5 rounded">{review.location}</span>
                  {review.aiDraftStatus !== "None" && <StatusBadge status={review.aiDraftStatus} />}
                  <StatusBadge status={review.ownerAction} />
                  <StatusBadge status={review.replyStatus} />
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 flex-shrink-0">
                <Button size="sm" variant="outline" onClick={() => openReview(review)} className="gap-1 h-7 text-xs" data-testid={`button-view-${review.id}`}>
                  <Eye className="w-3 h-3" /> View
                </Button>
                <Button size="sm" variant="outline" className="gap-1 h-7 text-xs" data-testid={`button-ai-${review.id}`}>
                  <Bot className="w-3 h-3" /> AI Reply
                </Button>
                <Button size="sm" className="gap-1 h-7 text-xs bg-green-600 hover:bg-green-700" data-testid={`button-approve-${review.id}`}>
                  <CheckCircle className="w-3 h-3" /> Approve
                </Button>
                <Button size="sm" variant="ghost" className="gap-1 h-7 text-xs" data-testid={`button-skip-${review.id}`}>
                  <SkipForward className="w-3 h-3" /> Skip
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ReviewDetailModal review={selectedReview} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
