import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, ArrowRight, Zap, Shield, Globe, MessageSquare, TrendingUp, Bot } from "lucide-react";
import PublicLayout from "@/components/layout/PublicLayout";

const workflowSteps = [
  { step: 1, icon: Globe, title: "Connect Google Business Profile", desc: "Securely link your Google account using OAuth — no password needed." },
  { step: 2, icon: MapPin, title: "Select Locations", desc: "Choose one or multiple business locations to monitor." },
  { step: 3, icon: Bot, title: "Choose AI Tone & Templates", desc: "Pick the tone and set up response templates that fit your brand." },
  { step: 4, icon: MessageSquare, title: "Get Alerts on WhatsApp/SMS", desc: "Receive instant review notifications with AI-drafted replies." },
  { step: 5, icon: CheckCircle, title: "Approve YES / EDIT / SKIP", desc: "Quickly approve, edit, or skip each reply with one tap." },
  { step: 6, icon: Zap, title: "Reply Posts to Google", desc: "Approved replies are automatically posted to your Google listing." },
];

function MapPin({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

const testimonials = [
  { name: "Priya Kapoor", business: "Glow Salon, Pune", rating: 5, text: "Revora has completely changed how we manage reviews. We went from replying to 10% of reviews to 95% within one month!" },
  { name: "Ramesh Menon", business: "Spice Garden Restaurant, Mumbai", rating: 5, text: "The WhatsApp approval flow is brilliant. I approve 20 reviews in 5 minutes every morning. My rating went from 4.1 to 4.6!" },
  { name: "Dr. Ananya Verma", business: "HealthFirst Clinic, Bangalore", rating: 5, text: "As a doctor, I was worried about how to respond to medical reviews. The AI drafts are perfect and professional every time." },
];

export default function LandingPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-indigo-950/40 dark:via-background dark:to-teal-950/20 pt-20 pb-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2MzY2ZjEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDB2Nmg2di02aC02em0tNiA2djZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Reply to Google Reviews<br />
            <span className="text-primary">Faster with AI</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Revora helps restaurants, salons, clinics, gyms, and local businesses generate smart review replies, get WhatsApp approval, and post responses automatically.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link href="/signup">
              <Button size="lg" className="gap-2 shadow-md" data-testid="button-hero-get-started">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" data-testid="button-hero-demo">Book Demo</Button>
            </Link>
          </div>

          {/* Dashboard mockup */}
          <div className="relative max-w-4xl mx-auto">
            <div className="rounded-2xl border border-border shadow-2xl bg-card overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 ml-2 h-5 bg-muted rounded text-xs text-muted-foreground flex items-center px-2">revora.com/dashboard</div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[["1,247", "Total Reviews"], ["4.3 ★", "Avg Rating"], ["23", "Pending"], ["₹999/mo", "Growth Plan"]].map(([val, label]) => (
                    <div key={label} className="bg-muted/50 rounded-xl p-3">
                      <p className="text-xl font-bold text-foreground">{val}</p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Priya S.", rating: 5, text: "Amazing service! Highly recommend.", status: "Ready", action: "Pending" },
                    { name: "Rahul M.", rating: 4, text: "Good experience, will come again.", status: "Posted", action: "YES" },
                    { name: "Anita P.", rating: 1, text: "Very disappointed with the service.", status: "Waiting", action: "Pending" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{r.name[0]}{r.name.split(" ")[1]?.[0]}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-medium text-foreground">{r.name}</span>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star key={j} className={`w-3 h-3 ${j < r.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{r.text}</p>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.status === "Posted" ? "bg-green-100 text-green-700" : r.status === "Ready" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>{r.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-3">How Revora Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From review received to reply posted — fully automated in 6 simple steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative bg-card border border-card-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm">{step.step}</div>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-3">Loved by Business Owners</h2>
            <p className="text-muted-foreground">Join hundreds of Indian businesses managing reviews smarter.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-4 italic">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-primary/5 to-teal-500/5 border border-primary/20 rounded-2xl p-10">
            <TrendingUp className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">Simple, Affordable Pricing</h2>
            <p className="text-muted-foreground mb-2">Plans start from <strong className="text-foreground">₹499/month</strong></p>
            <p className="text-sm text-muted-foreground mb-6">Full pricing details available after login. No credit card required to start.</p>
            <Link href="/login">
              <Button variant="default" className="gap-2" data-testid="button-view-plans">
                View Plans After Login
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-indigo-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Shield className="w-10 h-10 text-white/80 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-3">Ready to protect your online reputation?</h2>
          <p className="text-white/70 mb-8">Start replying to reviews smarter, faster, and more consistently today.</p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="gap-2" data-testid="button-cta-signup">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
