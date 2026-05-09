import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const categories = ["Restaurant", "Salon", "Clinic", "Gym", "Coaching Class", "Hotel", "Local Store", "Other"];
const countries = ["India", "USA", "UK", "UAE", "Australia", "Canada", "Singapore", "Other"];

export default function SignupPage() {
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", country: "", businessName: "", category: "", password: "", confirmPassword: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => login("owner"), 800);
  };

  const set = (key: keyof typeof form) => (val: string) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-indigo-950/20 dark:via-background dark:to-teal-950/10 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Star className="w-4.5 h-4.5 text-white fill-white" />
            </div>
            <span className="font-bold text-xl text-foreground">Revora <span className="text-primary">AI</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
          <p className="text-muted-foreground mt-1 text-sm">Start managing Google reviews smarter</p>
        </div>

        <div className="bg-card border border-card-border rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" placeholder="Riya Kapoor" value={form.fullName} onChange={e => set("fullName")(e.target.value)} required data-testid="input-full-name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+91 98765 43210" value={form.phone} onChange={e => set("phone")(e.target.value)} required data-testid="input-phone" className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" type="email" placeholder="you@business.com" value={form.email} onChange={e => set("email")(e.target.value)} required data-testid="input-signup-email" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Country</Label>
                <Select onValueChange={set("country")}>
                  <SelectTrigger className="mt-1" data-testid="select-country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Business Category</Label>
                <Select onValueChange={set("category")}>
                  <SelectTrigger className="mt-1" data-testid="select-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="business-name">Business Name</Label>
              <Input id="business-name" placeholder="Glow Salon" value={form.businessName} onChange={e => set("businessName")(e.target.value)} required data-testid="input-business-name" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="signup-password">Password</Label>
              <div className="relative mt-1">
                <Input id="signup-password" type={showPass ? "text" : "password"} placeholder="Create a password" value={form.password} onChange={e => set("password")(e.target.value)} required data-testid="input-signup-password" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm password" value={form.confirmPassword} onChange={e => set("confirmPassword")(e.target.value)} required data-testid="input-confirm-password" className="mt-1" />
            </div>
            <Button type="submit" className="w-full" disabled={loading} data-testid="button-create-account">
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
