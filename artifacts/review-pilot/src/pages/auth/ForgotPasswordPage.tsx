import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, CheckCircle, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-indigo-950/20 dark:via-background dark:to-teal-950/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-bold text-xl text-foreground">Revora <span className="text-primary">AI</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Reset your password</h1>
          <p className="text-muted-foreground mt-1 text-sm">Enter your email and we'll send a reset link</p>
        </div>

        <div className="bg-card border border-card-border rounded-2xl shadow-lg p-8">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Reset link sent!</h3>
              <p className="text-sm text-muted-foreground mb-6">Check your email at <strong>{email}</strong> for the password reset link.</p>
              <Link href="/login">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="reset-email">Email Address</Label>
                <Input id="reset-email" type="email" placeholder="you@business.com" value={email} onChange={e => setEmail(e.target.value)} required data-testid="input-reset-email" className="mt-1" />
              </div>
              <Button type="submit" className="w-full" data-testid="button-send-reset">Send Reset Link</Button>
              <div className="text-center">
                <Link href="/login" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
