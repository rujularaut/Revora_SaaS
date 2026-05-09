import { useState } from "react";
import { mockSupportTickets } from "@/lib/mock-data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { StatsCard } from "@/components/common/StatsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, CheckCircle, Clock, AlertCircle, MessageSquare, Search } from "lucide-react";

const allTickets = [
  ...mockSupportTickets,
  { id: "st6", customer: "Amrita Sharma", issue: "AI replies generating in Hindi but I want English", status: "Open" as const, created: "2025-01-10", updated: "2025-01-10" },
  { id: "st7", customer: "Sanjay Patel", issue: "Can I add 2 more locations to Growth plan?", status: "Resolved" as const, created: "2025-01-05", updated: "2025-01-06" },
];

function TicketReplyModal({ ticket, open, onClose }: { ticket: typeof allTickets[0] | null; open: boolean; onClose: () => void }) {
  if (!ticket) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Reply to Ticket</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-1">Customer: <strong>{ticket.customer}</strong></p>
            <p className="text-sm text-foreground">{ticket.issue}</p>
          </div>
          <Textarea placeholder="Type your reply here..." rows={5} data-testid="textarea-ticket-reply" />
          <div className="flex gap-2">
            <Button className="flex-1" data-testid="button-send-reply">Send Reply & Resolve</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminSupportPage() {
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<typeof allTickets[0] | null>(null);
  const [replyOpen, setReplyOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Open", "In Progress", "Resolved"];

  const filtered = allTickets.filter(t => {
    if (activeTab !== "All" && t.status !== activeTab) return false;
    if (search && !t.customer.toLowerCase().includes(search.toLowerCase()) && !t.issue.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const openCount = allTickets.filter(t => t.status === "Open").length;
  const inProgressCount = allTickets.filter(t => t.status === "In Progress").length;
  const resolvedCount = allTickets.filter(t => t.status === "Resolved").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatsCard title="Total Tickets" value={allTickets.length.toString()} icon={HelpCircle} iconColor="text-primary" iconBg="bg-primary/10" />
        <StatsCard title="Open" value={openCount.toString()} icon={AlertCircle} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/20" />
        <StatsCard title="In Progress" value={inProgressCount.toString()} icon={Clock} iconColor="text-yellow-500" iconBg="bg-yellow-50 dark:bg-yellow-900/20" />
        <StatsCard title="Resolved" value={resolvedCount.toString()} icon={CheckCircle} iconColor="text-green-500" iconBg="bg-green-50 dark:bg-green-900/20" />
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search tickets..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} data-testid="input-ticket-search" />
        </div>
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
              data-testid={`tab-ticket-${tab.toLowerCase().replace(/\s+/g, "-")}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(ticket => (
          <div key={ticket.id} className="bg-card border border-card-border rounded-xl p-4 shadow-sm" data-testid={`ticket-admin-${ticket.id}`}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-sm text-foreground">{ticket.customer}</span>
                  <StatusBadge status={ticket.status} />
                  <span className="text-xs text-muted-foreground ml-auto">Created: {ticket.created}</span>
                </div>
                <p className="text-sm text-foreground mb-1">{ticket.issue}</p>
                <p className="text-xs text-muted-foreground">Last updated: {ticket.updated}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button size="sm" className="gap-1.5 text-xs h-7" onClick={() => { setSelectedTicket(ticket); setReplyOpen(true); }} data-testid={`button-reply-ticket-${ticket.id}`}>
                  <MessageSquare className="w-3 h-3" /> Reply
                </Button>
                {ticket.status !== "Resolved" && (
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs h-7" data-testid={`button-close-ticket-${ticket.id}`}>
                    <CheckCircle className="w-3 h-3" /> Close
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <TicketReplyModal ticket={selectedTicket} open={replyOpen} onClose={() => setReplyOpen(false)} />
    </div>
  );
}
