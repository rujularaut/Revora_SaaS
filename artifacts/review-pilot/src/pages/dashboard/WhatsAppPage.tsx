import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, CheckCircle, AlertCircle, Send } from "lucide-react";

const previewMessage = `Revora — New Review Alert

Business: Glow Salon - Pune Branch
Rating: ★★★★★ (5 stars)
Reviewer: Priya Sharma

Review: "Absolutely loved the service! The staff was incredibly professional."

AI Draft Reply:
"Thank you so much, Priya! We're thrilled to hear you loved your experience at Glow Salon..."

Reply with:
YES — Post this reply
EDIT — Edit and then post
SKIP — Skip this review`;

export default function WhatsAppPage() {
  const [saved, setSaved] = useState(false);
  const [testSent, setTestSent] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-5">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-foreground">WhatsApp / SMS Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="primary-phone">Primary Approval Phone Number</Label>
              <Input id="primary-phone" placeholder="+91 98765 43210" defaultValue="+91 98765 43210" className="mt-1" data-testid="input-primary-phone" />
              <p className="text-xs text-muted-foreground mt-1">This number receives all review approval messages.</p>
            </div>
            <div>
              <Label htmlFor="backup-phone">Backup Phone Number</Label>
              <Input id="backup-phone" placeholder="+91 87654 32109" className="mt-1" data-testid="input-backup-phone" />
              <p className="text-xs text-muted-foreground mt-1">Optional. Gets alerts if primary number is unresponsive.</p>
            </div>
            <div>
              <Label>Preferred Channel</Label>
              <div className="flex gap-3 mt-2">
                {["WhatsApp", "SMS", "Both"].map(ch => (
                  <label key={ch} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="channel" value={ch} defaultChecked={ch === "WhatsApp"} className="accent-primary" data-testid={`radio-channel-${ch.toLowerCase()}`} />
                    <span className="text-sm text-foreground">{ch}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Label>Alert Frequency</Label>
              <Select defaultValue="immediate">
                <SelectTrigger className="mt-1" data-testid="select-alert-frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate (as reviews arrive)</SelectItem>
                  <SelectItem value="hourly">Hourly digest</SelectItem>
                  <SelectItem value="twice-daily">Twice daily (9 AM & 6 PM)</SelectItem>
                  <SelectItem value="daily">Daily digest (9 AM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} data-testid="button-save-whatsapp">
                {saved ? "Saved!" : "Save Settings"}
              </Button>
              <Button variant="outline" className="gap-2 flex-1" onClick={() => { setTestSent(true); setTimeout(() => setTestSent(false), 3000); }} data-testid="button-send-test">
                <Send className="w-4 h-4" />
                {testSent ? "Sent!" : "Send Test Message"}
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-3">Delivery Statistics</h3>
          <div className="grid grid-cols-3 gap-3">
            {[["18,432", "Messages Sent", "text-foreground"], ["17,891", "Delivered", "text-green-600"], ["541", "Failed", "text-red-600"]].map(([val, label, color]) => (
              <div key={label} className="text-center p-3 bg-muted/50 rounded-lg">
                <p className={`text-xl font-bold ${color}`}>{val}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {[["12,430", "YES Replies", "text-green-600"], ["3,218", "EDIT Replies", "text-indigo-600"], ["2,243", "SKIP Replies", "text-muted-foreground"]].map(([val, label, color]) => (
              <div key={label} className="text-center p-3 bg-muted/50 rounded-lg">
                <p className={`text-xl font-bold ${color}`}>{val}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-foreground">Message Preview</h3>
          </div>
          <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Revora</p>
                <p className="text-xs text-muted-foreground">WhatsApp Business</p>
              </div>
            </div>
            <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">{previewMessage}</pre>
            <div className="flex gap-2 mt-4 pt-3 border-t border-green-200 dark:border-green-800">
              {["YES", "EDIT", "SKIP"].map(action => (
                <button key={action} className={`flex-1 py-2 rounded-lg text-sm font-bold ${action === "YES" ? "bg-green-500 text-white" : action === "EDIT" ? "bg-blue-500 text-white" : "bg-slate-400 text-white"}`} data-testid={`button-preview-${action.toLowerCase()}`}>
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>

        {testSent && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-700 dark:text-green-400">Test message sent to +91 98765 43210! Check your WhatsApp.</p>
          </div>
        )}

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h3 className="font-semibold text-foreground">Important Notes</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Reply YES to approve and auto-post the AI draft to Google.</li>
            <li>• Reply EDIT to receive a link to edit the reply before posting.</li>
            <li>• Reply SKIP to skip this review — no reply will be posted.</li>
            <li>• Negative reviews (1-2 stars) always require manual approval.</li>
            <li>• Ensure your WhatsApp number is not in Do Not Disturb mode.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
