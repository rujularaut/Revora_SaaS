import PublicLayout from "@/components/layout/PublicLayout";
import { Shield, Heart, Zap, Globe } from "lucide-react";

const values = [
  { icon: Shield, title: "Trust First", desc: "We use secure OAuth to connect to Google. We never store passwords, never access unrelated data, and we're transparent about what we read and write." },
  { icon: Heart, title: "Small Business Focused", desc: "We built this for the restaurant owner who works 14-hour days and the salon owner who is too busy to type a reply. Simplicity is our north star." },
  { icon: Zap, title: "Speed Matters", desc: "Google rewards businesses that respond to reviews quickly. Our goal is to get your reply posted within minutes of a review arriving." },
  { icon: Globe, title: "Made for India & Beyond", desc: "Revora started in India and understands the nuances of Indian business culture. But we're building for every market globally." },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground mb-4">Our Mission</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We help small businesses protect their online reputation by replying to customer reviews faster, smarter, and more consistently.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-teal-500/5 border border-primary/20 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Revora was born out of a simple frustration: small business owners are too busy running their businesses to manage their online reputation. We watched brilliant restaurateurs, dedicated doctors, and hardworking salon owners lose customers to competitors with faster, more professional review responses.</p>
              <p>Google Reviews have become the single most important trust signal for local businesses. A business with a 4.6 rating that responds to every review consistently outperforms a 4.8 business that ignores reviews. But crafting thoughtful, personalized responses takes time that small business owners simply don't have.</p>
              <p>We built Revora to close that gap — using Gemini AI to generate contextually perfect replies, and WhatsApp to make approval as easy as replying to a text message. The result: businesses that used to respond to 10% of reviews now respond to 95%+.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-6">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-card border border-card-border rounded-xl p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-card border border-card-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">By the Numbers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[["847+", "Businesses"], ["18K+", "Reviews / Month"], ["97%", "Reply Rate"], ["4.5★", "Avg Rating Boost"]].map(([val, label]) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold text-primary">{val}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
