import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/common/StatusBadge";
import { mockSupportTickets } from "@/lib/mock-data";
import { HelpCircle, MessageSquare, Mail, BookOpen, CheckCircle } from "lucide-react";

const helpArticles = [
  { title: "How to connect Google Business Profile", category: "Setup" },
  { title: "WhatsApp approval flow not working", category: "WhatsApp" },
  { title: "How to set up auto-reply rules", category: "Auto-Reply" },
  { title: "Changing the AI tone for replies", category: "AI Settings" },
  { title: "Understanding your analytics dashboard", category: "Analytics" },
  { title: "How to upgrade or downgrade plans", category: "Billing" },
];

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-card-border rounded-xl p-5 text-center shadow-sm">
          <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-foreground text-sm">WhatsApp Support</h3>
          <p className="text-xs text-muted-foreground mt-1">+91 90000 12345</p>
          <Button size="sm" variant="outline" className="mt-3 w-full" data-testid="button-whatsapp-support">Chat on WhatsApp</Button>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-5 text-center shadow-sm">
          <Mail className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
          <h3 className="font-semibold text-foreground text-sm">Email Support</h3>
          <p className="text-xs text-muted-foreground mt-1">support@revora.com</p>
          <Button size="sm" variant="outline" className="mt-3 w-full" data-testid="button-email-support">Send Email</Button>
        </div>
        <div className="bg-card border border-card-border rounded-xl p-5 text-center shadow-sm">
          <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <h3 className="font-semibold text-foreground text-sm">Help Center</h3>
          <p className="text-xs text-muted-foreground mt-1">Browse guides & tutorials</p>
          <Button size="sm" variant="outline" className="mt-3 w-full" data-testid="button-help-center">Visit Help Center</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Submit a Ticket</h3>
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="font-semibold text-foreground">Ticket Submitted!</p>
              <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div><Label>Subject</Label><Input placeholder="Brief description of your issue" value={subject} onChange={e => setSubject(e.target.value)} className="mt-1" data-testid="input-ticket-subject" /></div>
              <div><Label>Message</Label><Textarea placeholder="Describe your issue in detail..." rows={5} value={message} onChange={e => setMessage(e.target.value)} className="mt-1" data-testid="textarea-ticket-message" /></div>
              <Button className="w-full" onClick={() => setSubmitted(true)} data-testid="button-submit-ticket">Submit Ticket</Button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-foreground mb-3">Quick Help Articles</h3>
            <div className="space-y-2">
              {helpArticles.map((article, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-muted cursor-pointer transition-colors" data-testid={`help-article-${i}`}>
                  <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{article.title}</p>
                  </div>
                  <span className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{article.category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-foreground mb-3">My Tickets</h3>
            <div className="space-y-2">
              {mockSupportTickets.slice(0, 3).map(ticket => (
                <div key={ticket.id} className="flex items-center gap-2 p-2.5 border border-border rounded-lg" data-testid={`ticket-${ticket.id}`}>
                  <div className="flex-1">
                    <p className="text-sm text-foreground truncate">{ticket.issue}</p>
                    <p className="text-xs text-muted-foreground">Created {ticket.created}</p>
                  </div>
                  <StatusBadge status={ticket.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
