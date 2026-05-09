import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Building2, Users, Bell, Shield, Database, Trash2, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const teamMembers = [
  { name: "Riya Kapoor", email: "riya@glowsalon.com", role: "Owner", status: "Active" },
  { name: "Amit Sharma", email: "amit@glowsalon.com", role: "Manager", status: "Active" },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="max-w-3xl">
      <Tabs defaultValue="profile">
        <TabsList className="mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="profile" className="gap-1.5 text-xs"><User className="w-3.5 h-3.5" />User Profile</TabsTrigger>
          <TabsTrigger value="business" className="gap-1.5 text-xs"><Building2 className="w-3.5 h-3.5" />Business Profile</TabsTrigger>
          <TabsTrigger value="team" className="gap-1.5 text-xs"><Users className="w-3.5 h-3.5" />Team Members</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5 text-xs"><Bell className="w-3.5 h-3.5" />Notifications</TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5 text-xs"><Shield className="w-3.5 h-3.5" />Security</TabsTrigger>
          <TabsTrigger value="data" className="gap-1.5 text-xs"><Database className="w-3.5 h-3.5" />Data & Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">User Profile</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-white">{user?.avatar ?? "U"}</div>
              <Button variant="outline" size="sm" data-testid="button-change-avatar">Change Photo</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Full Name</Label><Input defaultValue={user?.name ?? ""} className="mt-1" data-testid="input-profile-name" /></div>
              <div><Label>Email</Label><Input defaultValue={user?.email ?? ""} className="mt-1" type="email" data-testid="input-profile-email" /></div>
            </div>
            <div><Label>Phone Number</Label><Input defaultValue="+91 98765 43210" className="mt-1" data-testid="input-profile-phone" /></div>
            <Button onClick={save} data-testid="button-save-profile">{saved ? "Saved!" : "Save Changes"}</Button>
          </div>
        </TabsContent>

        <TabsContent value="business" className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Business Profile</h3>
          <div className="space-y-4">
            <div><Label>Business Name</Label><Input defaultValue="Glow Salon" className="mt-1" data-testid="input-business-name" /></div>
            <div><Label>Category</Label><Input defaultValue="Salon" className="mt-1" data-testid="input-business-category" /></div>
            <div><Label>Website</Label><Input placeholder="https://glowsalon.com" className="mt-1" data-testid="input-business-website" /></div>
            <div><Label>Description</Label><Input placeholder="Brief description of your business..." className="mt-1" data-testid="input-business-description" /></div>
            <Button onClick={save} data-testid="button-save-business">{saved ? "Saved!" : "Save Changes"}</Button>
          </div>
        </TabsContent>

        <TabsContent value="team" className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Team Members</h3>
            <Button size="sm" className="gap-1.5" data-testid="button-invite-member"><Plus className="w-3.5 h-3.5" /> Invite Member</Button>
          </div>
          <div className="space-y-3">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg" data-testid={`team-member-${i}`}>
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  {member.name[0]}{member.name.split(" ")[1]?.[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
                <span className="text-xs px-2 py-0.5 bg-muted rounded font-medium">{member.role}</span>
                {member.role !== "Owner" && (
                  <Button size="sm" variant="ghost" className="text-red-500 h-7 text-xs" data-testid={`button-remove-member-${i}`}>Remove</Button>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { label: "New review received", key: "new_review", defaultOn: true },
              { label: "Negative review alert", key: "negative_review", defaultOn: true },
              { label: "WhatsApp approval request", key: "whatsapp_approval", defaultOn: true },
              { label: "Reply posted to Google", key: "reply_posted", defaultOn: false },
              { label: "Weekly analytics report", key: "weekly_report", defaultOn: true },
              { label: "Payment reminders", key: "payment_reminder", defaultOn: true },
            ].map(({ label, key, defaultOn }) => (
              <div key={key} className="flex items-center justify-between py-2">
                <Label className="text-sm font-normal">{label}</Label>
                <Switch defaultChecked={defaultOn} data-testid={`switch-notif-${key}`} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Security</h3>
          <div className="space-y-4">
            <div><Label>Current Password</Label><Input type="password" placeholder="Enter current password" className="mt-1" data-testid="input-current-password" /></div>
            <div><Label>New Password</Label><Input type="password" placeholder="Enter new password" className="mt-1" data-testid="input-new-password" /></div>
            <div><Label>Confirm New Password</Label><Input type="password" placeholder="Confirm new password" className="mt-1" data-testid="input-confirm-new-password" /></div>
            <Button data-testid="button-change-password">Change Password</Button>
          </div>
        </TabsContent>

        <TabsContent value="data" className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Data & Privacy</h3>
          <div className="space-y-4">
            <Button variant="outline" className="w-full gap-2" data-testid="button-export-data"><Database className="w-4 h-4" /> Export My Data (JSON)</Button>
            <Separator />
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-4">
              <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Danger Zone</h4>
              <p className="text-sm text-red-600 dark:text-red-400 mb-3">Deleting your account will permanently remove all your data including reviews, templates, and analytics. This action cannot be undone.</p>
              <Button variant="destructive" className="gap-2" data-testid="button-delete-account"><Trash2 className="w-4 h-4" /> Delete Account</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
