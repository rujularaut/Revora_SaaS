import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import NotFound from "@/pages/not-found";

import LandingPage from "@/pages/public/LandingPage";
import HowItWorksPage from "@/pages/public/HowItWorksPage";
import FeaturesPage from "@/pages/public/FeaturesPage";
import WhoItsForPage from "@/pages/public/WhoItsForPage";
import AboutPage from "@/pages/public/AboutPage";
import ContactPage from "@/pages/public/ContactPage";

import LoginPage from "@/pages/auth/LoginPage";
import AdminLoginPage from "@/pages/auth/AdminLoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";

import DashboardLayout from "@/components/layout/DashboardLayout";
import OverviewPage from "@/pages/dashboard/OverviewPage";
import ReviewsPage from "@/pages/dashboard/ReviewsPage";
import LocationsPage from "@/pages/dashboard/LocationsPage";
import AIRepliesPage from "@/pages/dashboard/AIRepliesPage";
import TemplatesPage from "@/pages/dashboard/TemplatesPage";
import AutoRulesPage from "@/pages/dashboard/AutoRulesPage";
import NegativeAlertsPage from "@/pages/dashboard/NegativeAlertsPage";
import GoogleProfilePage from "@/pages/dashboard/GoogleProfilePage";
import WhatsAppPage from "@/pages/dashboard/WhatsAppPage";
import AnalyticsPage from "@/pages/dashboard/AnalyticsPage";
import BillingPage from "@/pages/dashboard/BillingPage";
import OffersPage from "@/pages/dashboard/OffersPage";
import SettingsPage from "@/pages/dashboard/SettingsPage";
import SupportPage from "@/pages/dashboard/SupportPage";

import AdminLayout from "@/components/layout/AdminLayout";
import AdminOverviewPage from "@/pages/admin/AdminOverviewPage";
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import AdminBusinessesPage from "@/pages/admin/AdminBusinessesPage";
import AdminLocationsPage from "@/pages/admin/AdminLocationsPage";
import AdminReviewsPage from "@/pages/admin/AdminReviewsPage";
import AdminPaymentsPage from "@/pages/admin/AdminPaymentsPage";
import AdminSubscriptionsPage from "@/pages/admin/AdminSubscriptionsPage";
import AdminOffersPage from "@/pages/admin/AdminOffersPage";
import AdminAIUsagePage from "@/pages/admin/AdminAIUsagePage";
import AdminWhatsAppLogsPage from "@/pages/admin/AdminWhatsAppLogsPage";
import AdminGoogleHealthPage from "@/pages/admin/AdminGoogleHealthPage";
import AdminPlansPage from "@/pages/admin/AdminPlansPage";
import AdminReportsPage from "@/pages/admin/AdminReportsPage";
import AdminSupportPage from "@/pages/admin/AdminSupportPage";
import AdminSettingsPage from "@/pages/admin/AdminSettingsPage";

const queryClient = new QueryClient();

function ProtectedDashboard({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  const [, setLocation] = useLocation();
  if (role !== "owner") {
    setLocation("/login");
    return null;
  }
  return <DashboardLayout>{children}</DashboardLayout>;
}

function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const { role } = useAuth();
  const [, setLocation] = useLocation();
  if (role !== "admin") {
    setLocation("/admin-login");
    return null;
  }
  return <AdminLayout>{children}</AdminLayout>;
}

function Router() {
  return (
    <Switch>
      {/* Public */}
      <Route path="/" component={LandingPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/features" component={FeaturesPage} />
      <Route path="/who-its-for" component={WhoItsForPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />

      {/* Auth */}
      <Route path="/login" component={LoginPage} />
      <Route path="/admin-login" component={AdminLoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />

      {/* Dashboard */}
      <Route path="/dashboard">
        {() => <ProtectedDashboard><OverviewPage /></ProtectedDashboard>}
      </Route>
      <Route path="/dashboard/reviews">
        {() => <ProtectedDashboard><ReviewsPage /></ProtectedDashboard>}
      </Route>
      <Route path="/dashboard/locations">
        {() => <ProtectedDashboard><LocationsPage /></ProtectedDashboard>}
      </Route>
      <Route path="/dashboard/ai-replies">
        {() => <ProtectedDashboard><AIRepliesPage /></ProtectedDashboard>}
      </Route>
      <Route path="/dashboard/templates">
        {() => <ProtectedDashboard><TemplatesPage /></ProtectedDashboard>}
      </Route>
      <Route path="/dashboard/auto-rules">
        {() => <ProtectedDashboard><AutoRulesPage /></ProtectedDashboard>}
      </Route>
      <Route path="/dashboard/negative-alerts">
        {() => <ProtectedDashboard><NegativeAlertsPage /></ProtectedDashboard>}
      </Route>
      <Route path="/dashboard/google-profile">
        {() => <ProtectedDashboard><GoogleProfilePage /></ProtectedDashboard>}
      </Route>
      <Route path="/dashboard/whatsapp">
        {() => <ProtectedDashboard><WhatsAppPage /></ProtectedDashboard>}
      </Route>
      <Route path="/dashboard/analytics">
        {() => <ProtectedDashboard><AnalyticsPage /></ProtectedDashboard>}
      </Route>
      <Route path="/dashboard/billing">
        {() => <ProtectedDashboard><BillingPage /></ProtectedDashboard>}
      </Route>
      <Route path="/dashboard/offers">
        {() => <ProtectedDashboard><OffersPage /></ProtectedDashboard>}
      </Route>
      <Route path="/dashboard/settings">
        {() => <ProtectedDashboard><SettingsPage /></ProtectedDashboard>}
      </Route>
      <Route path="/dashboard/support">
        {() => <ProtectedDashboard><SupportPage /></ProtectedDashboard>}
      </Route>

      {/* Admin */}
      <Route path="/admin">
        {() => <ProtectedAdmin><AdminOverviewPage /></ProtectedAdmin>}
      </Route>
      <Route path="/admin/users">
        {() => <ProtectedAdmin><AdminUsersPage /></ProtectedAdmin>}
      </Route>
      <Route path="/admin/businesses">
        {() => <ProtectedAdmin><AdminBusinessesPage /></ProtectedAdmin>}
      </Route>
      <Route path="/admin/locations">
        {() => <ProtectedAdmin><AdminLocationsPage /></ProtectedAdmin>}
      </Route>
      <Route path="/admin/reviews">
        {() => <ProtectedAdmin><AdminReviewsPage /></ProtectedAdmin>}
      </Route>
      <Route path="/admin/payments">
        {() => <ProtectedAdmin><AdminPaymentsPage /></ProtectedAdmin>}
      </Route>
      <Route path="/admin/subscriptions">
        {() => <ProtectedAdmin><AdminSubscriptionsPage /></ProtectedAdmin>}
      </Route>
      <Route path="/admin/offers">
        {() => <ProtectedAdmin><AdminOffersPage /></ProtectedAdmin>}
      </Route>
      <Route path="/admin/ai-usage">
        {() => <ProtectedAdmin><AdminAIUsagePage /></ProtectedAdmin>}
      </Route>
      <Route path="/admin/whatsapp-logs">
        {() => <ProtectedAdmin><AdminWhatsAppLogsPage /></ProtectedAdmin>}
      </Route>
      <Route path="/admin/google-health">
        {() => <ProtectedAdmin><AdminGoogleHealthPage /></ProtectedAdmin>}
      </Route>
      <Route path="/admin/plans">
        {() => <ProtectedAdmin><AdminPlansPage /></ProtectedAdmin>}
      </Route>
      <Route path="/admin/reports">
        {() => <ProtectedAdmin><AdminReportsPage /></ProtectedAdmin>}
      </Route>
      <Route path="/admin/support">
        {() => <ProtectedAdmin><AdminSupportPage /></ProtectedAdmin>}
      </Route>
      <Route path="/admin/settings">
        {() => <ProtectedAdmin><AdminSettingsPage /></ProtectedAdmin>}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
