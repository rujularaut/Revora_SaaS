import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Chrome, ShieldCheck, RefreshCw, AlertCircle, CheckCircle, XCircle } from "lucide-react";

const connectedProfiles = [
  { location: "Glow Salon - Pune Branch", account: "glow.pune@gmail.com", status: "Connected" as const, lastSync: "10 min ago", reviews: 387, tokenStatus: "Valid" },
  { location: "Glow Salon - Mumbai Branch", account: "glow.mumbai@gmail.com", status: "Needs Reconnect" as const, lastSync: "3 days ago", reviews: 512, tokenStatus: "Expired" },
  { location: "Glow Salon - Delhi NCR", account: "glow.delhi@gmail.com", status: "Connected" as const, lastSync: "15 min ago", reviews: 203, tokenStatus: "Valid" },
];

export default function GoogleProfilePage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-background border border-border shadow-sm flex items-center justify-center flex-shrink-0">
            <Chrome className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-foreground text-lg">Google Business Profile</h3>
              <StatusBadge status="Connected" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Connected account: <strong className="text-foreground">glow.salon@gmail.com</strong></p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
              <span>3 locations connected</span>
              <span>Last sync: 10 min ago</span>
              <span>OAuth token: <span className="text-green-600 font-medium">Valid</span></span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-5">
          <Button variant="outline" className="gap-2 bg-white dark:bg-background" data-testid="button-reconnect-google">
            <RefreshCw className="w-4 h-4" /> Reconnect
          </Button>
          <Button className="gap-2" data-testid="button-sync-reviews">
            <RefreshCw className="w-4 h-4" /> Sync Reviews
          </Button>
          <Button variant="outline" className="gap-2 text-red-600 border-red-200 hover:bg-red-50" data-testid="button-disconnect-google">
            <XCircle className="w-4 h-4" /> Disconnect
          </Button>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">Mumbai Branch needs reconnection</p>
          <p className="text-sm text-amber-700 dark:text-amber-400">The OAuth token for your Mumbai location has expired. Please reconnect to resume review syncing and auto-replies.</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-foreground mb-3">Connected Locations</h3>
        <div className="space-y-3">
          {connectedProfiles.map((profile, i) => (
            <div key={i} className="bg-card border border-card-border rounded-xl p-4 shadow-sm" data-testid={`google-profile-${i}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${profile.status === "Connected" ? "bg-green-100 dark:bg-green-900/30" : "bg-orange-100 dark:bg-orange-900/30"}`}>
                  {profile.status === "Connected"
                    ? <CheckCircle className="w-5 h-5 text-green-600" />
                    : <AlertCircle className="w-5 h-5 text-orange-600" />
                  }
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-medium text-sm text-foreground">{profile.location}</p>
                    <StatusBadge status={profile.status} />
                  </div>
                  <p className="text-xs text-muted-foreground">{profile.account} • Last sync: {profile.lastSync} • {profile.reviews} reviews</p>
                </div>
                <div className="flex gap-1.5">
                  {profile.status === "Needs Reconnect" && (
                    <Button size="sm" className="text-xs bg-orange-600 hover:bg-orange-700 h-7" data-testid={`button-reconnect-${i}`}>Reconnect</Button>
                  )}
                  <Button size="sm" variant="outline" className="text-xs h-7" data-testid={`button-sync-${i}`}>
                    <RefreshCw className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-card-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-foreground">Security Note</h3>
        </div>
        <p className="text-sm text-muted-foreground">We never store your Google password. You connect securely using Google OAuth 2.0. We only request permission to read your reviews and post replies — we cannot access any other Google account data.</p>
      </div>

      <div className="flex gap-2">
        <Button className="gap-2" data-testid="button-add-google-location">
          <Chrome className="w-4 h-4" /> Connect Google Business Profile
        </Button>
      </div>
    </div>
  );
}
