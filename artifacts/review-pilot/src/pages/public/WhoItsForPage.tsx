import PublicLayout from "@/components/layout/PublicLayout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Utensils, Scissors, Stethoscope, Dumbbell, GraduationCap, Hotel, ShoppingBag, Briefcase, ArrowRight } from "lucide-react";

const categories = [
  { icon: Utensils, title: "Restaurants", desc: "Respond to food quality, delivery, and ambiance reviews. Convert unhappy diners into loyal regulars with fast, professional replies.", color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950/30", example: "Negative food review → Apologetic AI reply → Customer returns" },
  { icon: Scissors, title: "Salons & Spas", desc: "Handle color, cut, and service complaints gracefully. Build a 5-star reputation that brings new clients through the door.", color: "text-pink-600", bg: "bg-pink-50 dark:bg-pink-950/30", example: "Service complaint → Quick apology → Free service offer" },
  { icon: Stethoscope, title: "Clinics & Hospitals", desc: "Professional medical review responses that are compassionate and compliant. Never leave a patient feeling unheard.", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30", example: "Long wait complaint → Professional apology → Appointment follow-up" },
  { icon: Dumbbell, title: "Gyms & Fitness Centers", desc: "Manage trainer feedback, equipment complaints, and class reviews. Show members you care about their fitness journey.", color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/30", example: "Trainer complaint → Empathetic response → Offer resolution" },
  { icon: GraduationCap, title: "Coaching Classes", desc: "Respond to student and parent reviews about teaching quality, fees, and results. Protect your educational brand.", color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30", example: "Result concern → Detailed response → Demo class offer" },
  { icon: Hotel, title: "Hotels & Resorts", desc: "Manage reviews for room quality, service, and amenities across multiple properties from one dashboard.", color: "text-teal-600", bg: "bg-teal-50 dark:bg-teal-950/30", example: "Room issue → Apology + upgrade offer → 5-star follow-up" },
  { icon: ShoppingBag, title: "Retail & Local Stores", desc: "Respond to product quality, staff behavior, and billing complaints. Turn negative experiences into comeback opportunities.", color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950/30", example: "Billing complaint → Resolution offer → Customer satisfied" },
  { icon: Briefcase, title: "Service Businesses", desc: "For agencies, consultants, repair shops, and any local service business that needs to protect their online reputation.", color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-950/30", example: "Service delay → Apology + discount → Review updated" },
];

export default function WhoItsForPage() {
  return (
    <PublicLayout>
      <div className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-foreground mb-4">Built for Every Small Business</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Revora is designed for any local business that depends on Google reviews to attract customers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.title} className="bg-card border border-card-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className={`w-12 h-12 rounded-xl ${cat.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${cat.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{cat.desc}</p>
                  <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-2.5 italic">
                    {cat.example}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <p className="text-muted-foreground mb-6">Don't see your category? Revora works for any business with a Google listing.</p>
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Start Free Today <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
