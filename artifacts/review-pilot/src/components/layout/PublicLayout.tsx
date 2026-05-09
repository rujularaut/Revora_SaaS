import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Star, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Features", href: "/features" },
  { label: "Who It's For", href: "/who-its-for" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { role } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="font-bold text-lg text-foreground">Revora <span className="text-primary">AI</span></span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              {role === "owner" ? (
                <Link href="/dashboard">
                  <Button variant="default" size="sm">Dashboard</Button>
                </Link>
              ) : role === "admin" ? (
                <Link href="/admin">
                  <Button variant="default" size="sm">Admin Panel</Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm" data-testid="button-login">Log In</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="default" size="sm" data-testid="button-get-started">Get Started</Button>
                  </Link>
                </>
              )}
            </div>

            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/login"><Button variant="outline" className="w-full" size="sm">Log In</Button></Link>
              <Link href="/signup"><Button variant="default" className="w-full" size="sm">Get Started</Button></Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                  <Star className="w-3.5 h-3.5 text-white fill-white" />
                </div>
                <span className="font-bold text-foreground">Revora</span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered Google review replies with WhatsApp approval.</p>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground mb-3">Product</p>
              <div className="space-y-2">
                {["Features", "How It Works", "Pricing"].map(l => (
                  <p key={l} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">{l}</p>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground mb-3">Company</p>
              <div className="space-y-2">
                {["About Us", "Contact", "Blog"].map(l => (
                  <p key={l} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">{l}</p>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground mb-3">Legal</p>
              <div className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Refund Policy"].map(l => (
                  <p key={l} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">{l}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Revora. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
