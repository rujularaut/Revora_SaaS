import { StatsCard } from "@/components/common/StatsCard";
import { StarRating } from "@/components/common/StarRating";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, MessageSquare, CheckCircle, Bell } from "lucide-react";

const alerts = [
  { id: "a1", reviewerName: "Anita Patel", rating: 1, text: "Very disappointed with the service. Had to wait for over an hour and the staff was rude. Will not be returning.", location: "Glow Salon - Mumbai Branch", alertSent: "WhatsApp", ownerStatus: "Pending", aiReply: "Dear Anita, we sincerely apologize for the experience you had. This is not the standard we hold ourselves to. We would love to connect with you personally to make things right. Please reach out to us directly.", time: "15 min ago", resolved: false },
  { id: "a2", reviewerName: "Sunita Rao", rating: 2, text: "The color treatment I got was not what I asked for. Very unhappy with the result.", location: "Glow Salon - Pune Branch", alertSent: "WhatsApp", ownerStatus: "Reviewed", aiReply: "Dear Sunita, we're truly sorry about your hair color experience. Please visit us again and we'll make sure to get it right at no extra charge.", time: "2 hr ago", resolved: false },
  { id: "a3", reviewerName: "Kavita Joshi", rating: 1, text: "The therapist was extremely rough during the massage. Never coming back.", location: "Glow Salon - Pune Branch", alertSent: "SMS", ownerStatus: "Pending", aiReply: "Dear Kavita, we're extremely sorry to hear this. This is not acceptable and we have addressed it with our team. We'd like to offer you a complimentary session to make it right.", time: "6 hr ago", resolved: false },
  { id: "a4", reviewerName: "Pradeep Kumar", rating: 2, text: "Overcharged for a simple haircut. The staff couldn't explain the bill properly.", location: "Glow Salon - Delhi NCR", alertSent: "WhatsApp", ownerStatus: "Resolved", aiReply: "Dear Pradeep, we sincerely apologize for the billing confusion. We'd like to review your invoice and ensure you're charged correctly.", time: "1 day ago", resolved: true },
  { id: "a5", reviewerName: "Meena Sharma", rating: 2, text: "The salon was very dirty and the tools didn't look sanitized. Very concerning.", location: "Glow Salon - Mumbai Branch", alertSent: "WhatsApp + SMS", ownerStatus: "Pending", aiReply: "Dear Meena, we take hygiene extremely seriously. We are very sorry to hear about your experience and are investigating this immediately.", time: "2 days ago", resolved: false },
];

const whatsappPreview = `🚨 New Negative Review Alert — Glow Salon Mumbai

Rating: ⭐ 1 Star
Reviewer: Anita Patel
Review: "Very disappointed with the service. Had to wait for over an hour and the staff was rude."

AI Draft Reply:
"Dear Anita, we sincerely apologize for the experience you had. This is not the standard we hold ourselves to..."

Reply? YES | EDIT | SKIP`;

export default function NegativeAlertsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatsCard title="All Negative" value="8" icon={AlertTriangle} iconColor="text-red-500" iconBg="bg-red-50 dark:bg-red-900/20" />
        <StatsCard title="Unresolved" value="5" icon={AlertTriangle} iconColor="text-orange-500" iconBg="bg-orange-50 dark:bg-orange-900/20" />
        <StatsCard title="Alerts Sent" value="8" icon={Bell} iconColor="text-yellow-500" iconBg="bg-yellow-50 dark:bg-yellow-900/20" />
        <StatsCard title="Pending Action" value="3" icon={Clock} iconColor="text-indigo-500" iconBg="bg-indigo-50 dark:bg-indigo-900/20" />
        <StatsCard title="Avg Response" value="2.4h" icon={CheckCircle} iconColor="text-teal-500" iconBg="bg-teal-50 dark:bg-teal-900/20" />
      </div>

      <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare className="w-4 h-4 text-green-600" />
          <h3 className="font-semibold text-foreground text-sm">WhatsApp Alert Preview</h3>
          <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full">Sample</span>
        </div>
        <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">{whatsappPreview}</pre>
          <div className="flex gap-2 mt-3">
            {["YES", "EDIT", "SKIP"].map(action => (
              <button key={action} className={`px-4 py-1.5 rounded-lg text-sm font-bold border-2 ${action === "YES" ? "bg-green-500 border-green-500 text-white" : action === "EDIT" ? "bg-indigo-500 border-indigo-500 text-white" : "bg-slate-400 border-slate-400 text-white"}`}>{action}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">All Negative Review Alerts</h3>
        {alerts.map(alert => (
          <div key={alert.id} className={`bg-card border rounded-xl p-5 shadow-sm ${alert.resolved ? "border-card-border opacity-70" : "border-red-200 dark:border-red-800/40"}`} data-testid={`alert-card-${alert.id}`}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-red-600">{"★".repeat(alert.rating)}</span>
                  <span className="font-semibold text-sm text-foreground">{alert.reviewerName}</span>
                  <StatusBadge status={alert.resolved ? "Resolved" : "Pending"} />
                  <span className="text-xs text-muted-foreground ml-auto">{alert.time}</span>
                </div>
                <p className="text-sm text-foreground mb-2">"{alert.text}"</p>
                <p className="text-xs text-muted-foreground mb-3">{alert.location}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded">Alert via: {alert.alertSent}</span>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded">Owner: {alert.ownerStatus}</span>
                </div>

                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-lg p-3">
                  <p className="text-xs font-medium text-red-700 dark:text-red-400 mb-1">AI Suggested Apology:</p>
                  <p className="text-sm text-foreground line-clamp-2">{alert.aiReply}</p>
                </div>
              </div>
              <div className="flex sm:flex-col gap-2">
                <Button size="sm" className="gap-1.5 text-xs bg-green-600 hover:bg-green-700 flex-1" data-testid={`button-resolve-${alert.id}`}>
                  <CheckCircle className="w-3.5 h-3.5" /> Resolve
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs flex-1" data-testid={`button-reminder-${alert.id}`}>
                  <Bell className="w-3.5 h-3.5" /> Remind
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
