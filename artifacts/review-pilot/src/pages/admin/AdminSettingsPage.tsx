import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Bot, CreditCard, MessageSquare, Bell } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="max-w-3xl">
      <Tabs defaultValue="platform">
        <TabsList className="mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="platform" className="gap-1.5 text-xs"><Globe className="w-3.5 h-3.5" />Platform</TabsTrigger>
          <TabsTrigger value="ai" className="gap-1.5 text-xs"><Bot className="w-3.5 h-3.5" />AI Config</TabsTrigger>
          <TabsTrigger value="payments" className="gap-1.5 text-xs"><CreditCard className="w-3.5 h-3.5" />Payments</TabsTrigger>
          <TabsTrigger value="whatsapp" className="gap-1.5 text-xs"><MessageSquare className="w-3.5 h-3.5" />WhatsApp/SMS</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5 text-xs"><Bell className="w-3.5 h-3.5" />Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="platform" className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Platform Settings</h3>
          <div className="space-y-4">
            <div><Label>Platform Name</Label><Input defaultValue="Revora" className="mt-1" data-testid="input-platform-name" /></div>
            <div><Label>Support Email</Label><Input defaultValue="support@revora.com" className="mt-1" data-testid="input-support-email" /></div>
            <div><Label>Trial Duration (days)</Label><Input defaultValue="14" type="number" className="mt-1" data-testid="input-trial-days" /></div>
            <div>
              <Label>Default Language</Label>
              <Select defaultValue="english">
                <SelectTrigger className="mt-1" data-testid="select-default-language"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="hinglish">Hinglish</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between py-2">
              <Label>Maintenance Mode</Label>
              <Switch data-testid="switch-maintenance" />
            </div>
            <Button onClick={save} data-testid="button-save-platform">{saved ? "Saved!" : "Save Settings"}</Button>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">AI Configuration</h3>
          <div className="space-y-4">
            <div>
              <Label>Default AI Model</Label>
              <Select defaultValue="gemini-flash">
                <SelectTrigger className="mt-1" data-testid="select-ai-model"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemini-flash">Gemini 1.5 Flash (Fast, Cost-efficient)</SelectItem>
                  <SelectItem value="gemini-pro">Gemini 1.5 Pro (High Quality)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Max Tokens Per Reply</Label><Input defaultValue="300" type="number" className="mt-1" data-testid="input-max-tokens" /></div>
            <div><Label>AI Temperature</Label><Input defaultValue="0.7" type="number" min="0" max="1" step="0.1" className="mt-1" data-testid="input-temperature" /></div>
            <div><Label>Monthly AI Budget Cap (₹)</Label><Input defaultValue="5000" type="number" className="mt-1" data-testid="input-ai-budget" /></div>
            <div className="flex items-center justify-between py-2">
              <Label>Enable AI for Negative Reviews</Label>
              <Switch defaultChecked data-testid="switch-ai-negative" />
            </div>
            <Button onClick={save} data-testid="button-save-ai-config">{saved ? "Saved!" : "Save Settings"}</Button>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Payment Gateway Settings</h3>
          <div className="space-y-4">
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Switch defaultChecked data-testid="switch-razorpay" />
                <Label className="text-sm font-semibold">Razorpay (India)</Label>
              </div>
              <div><Label>Razorpay Key ID</Label><Input placeholder="rzp_live_••••••••••••••" className="mt-1" data-testid="input-razorpay-key" /></div>
            </div>
            <div className="border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Switch defaultChecked data-testid="switch-stripe" />
                <Label className="text-sm font-semibold">Stripe (International)</Label>
              </div>
              <div><Label>Stripe Publishable Key</Label><Input placeholder="pk_live_••••••••••••••" className="mt-1" data-testid="input-stripe-key" /></div>
            </div>
            <Button onClick={save} data-testid="button-save-payment">{saved ? "Saved!" : "Save Settings"}</Button>
          </div>
        </TabsContent>

        <TabsContent value="whatsapp" className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">WhatsApp / SMS Configuration</h3>
          <div className="space-y-4">
            <div>
              <Label>WhatsApp Provider</Label>
              <Select defaultValue="wati">
                <SelectTrigger className="mt-1" data-testid="select-wa-provider"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="wati">WATI (WhatsApp Business API)</SelectItem>
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="kaleyra">Kaleyra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>WATI API Key</Label><Input placeholder="wati_••••••••••••••" className="mt-1" data-testid="input-wati-key" /></div>
            <div><Label>SMS Provider API Key</Label><Input placeholder="SMS provider key" className="mt-1" data-testid="input-sms-key" /></div>
            <div className="flex items-center justify-between py-2">
              <Label>Enable SMS Fallback</Label>
              <Switch defaultChecked data-testid="switch-sms-fallback" />
            </div>
            <Button onClick={save} data-testid="button-save-wa-config">{saved ? "Saved!" : "Save Settings"}</Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Admin Alert Settings</h3>
          <div className="space-y-3">
            {[
              { label: "New user signup", key: "new_user", on: true },
              { label: "Payment failure alert", key: "payment_fail", on: true },
              { label: "Google token expiry alert", key: "token_expiry", on: true },
              { label: "New support ticket opened", key: "new_ticket", on: true },
              { label: "Daily revenue report", key: "daily_revenue", on: false },
              { label: "Weekly analytics summary", key: "weekly_summary", on: true },
              { label: "AI budget threshold alert", key: "ai_budget", on: true },
            ].map(({ label, key, on }) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <Label className="text-sm font-normal">{label}</Label>
                <Switch defaultChecked={on} data-testid={`switch-admin-notif-${key}`} />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
