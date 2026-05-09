import { useState } from "react";
import { mockReviews } from "@/lib/mock-data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { StarRating } from "@/components/common/StarRating";
import { StatsCard } from "@/components/common/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, Bot, CheckCircle, AlertTriangle, Download } from "lucide-react";

export default function AdminReviewsPage() {
  const [search, setSearch] = useState("");
  const [sentimentFilter, setSentimentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockReviews.filter(r => {
    if (sentimentFilter !== "all" && r.sentiment.toLowerCase() !== sentimentFilter) return false;
    if (statusFilter !== "all" && r.replyStatus.toLowerCase() !== statusFilter) return false;
    if (search && !r.reviewerName.toLowerCase().includes(search.toLowerCase()) && !r.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const positiveCount = mockReviews.filter(r => r.sentiment === "Positive").length;
  const negativeCount = mockReviews.filter(r => r.sentiment === "Negative").length;
  const repliedCount = mockReviews.filter(r => r.replyStatus === "Posted").length;
  const pendingCount = mockReviews.filter(r => r.ownerAction === "Pending").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatsCard title="Total Reviews" value={mockReviews.length.toString()} icon={Star} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-900/20" />
        <StatsCard title="Positive" value={positiveCount.toString()} icon={CheckCircle} iconColor="text-green-500" iconBg="bg-green-50 dark:bg-green-900/20" />
        <StatsCard title="Negative" value={negativeCount.toString()} icon={AlertTriangle} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/20" />
        <StatsCard title="Replied" value={repliedCount.toString()} icon={Bot} iconColor="text-primary" iconBg="bg-primary/10" />
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search reviews..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} data-testid="input-admin-review-search" />
        </div>
        <Select onValueChange={setSentimentFilter} defaultValue="all">
          <SelectTrigger className="w-36" data-testid="select-admin-sentiment"><SelectValue placeholder="Sentiment" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sentiment</SelectItem>
            <SelectItem value="positive">Positive</SelectItem>
            <SelectItem value="neutral">Neutral</SelectItem>
            <SelectItem value="negative">Negative</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-36" data-testid="select-admin-reply-status"><SelectValue placeholder="Reply Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="posted">Posted</SelectItem>
            <SelectItem value="waiting">Waiting</SelectItem>
            <SelectItem value="skipped">Skipped</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2" data-testid="button-export-reviews"><Download className="w-4 h-4" /> Export</Button>
      </div>

      <div className="space-y-3">
        {filtered.map(review => (
          <div key={review.id} className="bg-card border border-card-border rounded-xl p-4 shadow-sm" data-testid={`admin-review-${review.id}`}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                {review.reviewerInitials}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-foreground">{review.reviewerName}</span>
                  <StarRating rating={review.rating} size="xs" />
                  <StatusBadge status={review.sentiment} />
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{review.text}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-muted px-2 py-0.5 rounded">{review.location}</span>
                  <StatusBadge status={review.ownerAction} />
                  <StatusBadge status={review.replyStatus} />
                  {review.aiDraftStatus !== "None" && <StatusBadge status={review.aiDraftStatus} />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
