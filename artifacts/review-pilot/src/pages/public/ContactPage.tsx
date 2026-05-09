import { useState } from "react";
import PublicLayout from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Mail, Phone, CalendarCheck, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PublicLayout>
      <div className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground mb-4">Get in Touch</h1>
            <p className="text-xl text-muted-foreground">Have questions? We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours. Check your email for a confirmation.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required data-testid="input-contact-name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@business.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required data-testid="input-contact-email" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} data-testid="input-contact-phone" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us about your business and what you'd like to achieve..." rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} required data-testid="input-contact-message" className="mt-1" />
                  </div>
                  <Button type="submit" className="w-full" data-testid="button-contact-submit">Send Message</Button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-card-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">Contact Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
                      <MessageSquare className="w-4.5 h-4.5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">WhatsApp Support</p>
                      <p className="text-sm text-muted-foreground">+91 90000 12345</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                      <Phone className="w-4.5 h-4.5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">SMS Support</p>
                      <p className="text-sm text-muted-foreground">+91 80000 56789</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                      <Mail className="w-4.5 h-4.5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@revora.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/5 to-teal-500/5 border border-primary/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CalendarCheck className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-foreground">Book a Demo</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">See Revora in action with a personalized 20-minute demo. We'll set up your account together.</p>
                <Button className="w-full" data-testid="button-book-demo">Schedule a Demo</Button>
              </div>

              <div className="bg-card border border-card-border rounded-xl p-6">
                <p className="text-sm font-medium text-foreground mb-1">Support Hours</p>
                <p className="text-sm text-muted-foreground">Monday – Saturday: 9 AM – 7 PM IST</p>
                <p className="text-sm text-muted-foreground">Urgent review alerts: 24/7 via WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
