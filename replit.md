# ReviewPilot AI

An AI-powered Google Review Management SaaS UI prototype — full frontend with marketing site, owner dashboard, and admin panel, all using mock data.

## Run & Operate

- `pnpm --filter @workspace/review-pilot run dev` — start the frontend (managed by workflow)
- `pnpm run typecheck` — full typecheck across all packages
- No backend or database required — all data is mock/static

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- React 18 + Vite, wouter (routing), TailwindCSS v4
- shadcn/ui components (`@/components/ui/`)
- recharts for charts, lucide-react for icons
- No real API — all data from `src/lib/mock-data.ts`

## Where things live

```
artifacts/review-pilot/src/
  App.tsx                        — all routes (public, auth, dashboard, admin)
  context/AuthContext.tsx        — role-based auth (guest/owner/admin) + user object
  lib/mock-data.ts               — all mock data and types
  components/
    common/                      — EmptyState, StarRating, StatsCard, StatusBadge
    layout/
      PublicLayout.tsx           — marketing nav + footer
      DashboardLayout.tsx        — owner sidebar (14 links)
      AdminLayout.tsx            — admin sidebar (15 links)
    ui/                          — shadcn/ui primitives
  pages/
    public/                      — 6 marketing pages
    auth/                        — Login, AdminLogin, Signup, ForgotPassword
    dashboard/                   — 14 owner dashboard pages
    admin/                       — 15 admin dashboard pages
```

## Architecture decisions

- No backend — prototype-only; all state is in-memory with mock data from `mock-data.ts`
- Auth is role-based (guest/owner/admin); login sets role + user object; guard components redirect unauthorized users
- wouter for routing (lightweight, no React Router dep); AuthProvider is nested inside WouterRouter so `useLocation` works inside it
- JSX transformer handles React import — do NOT add `import React` manually
- Recharts charts use single `data` prop on the chart wrapper (not on XAxis) to avoid TS2769 overload errors

## Product

- **6-page marketing website**: Landing, How It Works, Features, Who It's For, About, Contact
- **4 auth pages**: Business login, Admin login, Signup, Forgot password
- **14 owner dashboard sections**: Overview, Reviews, Locations, AI Replies, Templates, Auto-Reply Rules, Negative Alerts, Google Profile, WhatsApp/SMS, Analytics, Billing, Offers, Settings, Support
- **15 admin dashboard sections**: Overview, Users, Businesses, Locations, Reviews, Payments, Subscriptions, Offers, AI Usage, WhatsApp Logs, Google Health, Plans, Reports, Support, Settings

## User preferences

- Indigo primary (`245 82% 62%`), teal accent (`175 77% 40%`), dark sidebar (`230 35% 13%`)
- Admin sidebar uses violet-600 accents to distinguish from owner dashboard
- Demo business: Glow Salon (owner: Riya Kapoor / RK); Admin: AU

## Gotchas

- Do not run `pnpm dev` at workspace root — use workflow restart instead
- All chart data must be passed to the top-level chart component (`<LineChart data={...}>`), not to `<XAxis>`
- `useAuth()` must be called within `<AuthProvider>` which must be inside `<WouterRouter>`

## Pointers

- See `.local/skills/pnpm-workspace` for workspace/TS setup details
- See `.local/skills/react-vite` for Vite config conventions
