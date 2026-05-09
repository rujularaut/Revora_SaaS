import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login("admin");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-violet-950/20 dark:via-background dark:to-indigo-950/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">Revora <span className="text-violet-600">Admin</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
          <p className="text-muted-foreground mt-1 text-sm">Sign in to the founder / admin dashboard</p>
        </div>

        <div className="bg-card border border-card-border rounded-2xl shadow-lg p-8">
          <div className="mb-4 p-3 bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 rounded-lg">
            <p className="text-xs text-violet-700 dark:text-violet-400 font-medium">Restricted Access — Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input id="admin-email" type="email" placeholder="admin@revora.com" value={email} onChange={e => setEmail(e.target.value)} required data-testid="input-admin-email" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="admin-password">Password</Label>
              <div className="relative mt-1">
                <Input id="admin-password" type={showPass ? "text" : "password"} placeholder="Enter admin password" value={password} onChange={e => setPassword(e.target.value)} required data-testid="input-admin-password" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700" disabled={loading} data-testid="button-admin-login-submit">
              {loading ? "Signing in..." : "Log in as Admin"}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-border text-center">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-primary">
              Business owner? Log in here →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
