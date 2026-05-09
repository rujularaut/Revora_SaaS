# Revora AI 
AI-powered Google Review Management SaaS 

## Project Structure
```
artifacts/review-pilot/src/
├── App.tsx                        # All routes (public, auth, dashboard, admin)
├── context/
│   └── AuthContext.tsx            # Role-based auth (guest / owner / admin)
├── lib/
│   └── mock-data.ts               # All mock data and types
├── components/
│   ├── common/                    # EmptyState, StarRating, StatsCard, StatusBadge
│   ├── layout/
│   │   ├── PublicLayout.tsx       # Marketing nav + footer
│   │   ├── DashboardLayout.tsx    # Owner sidebar (14 links)
│   │   └── AdminLayout.tsx        # Admin sidebar (15 links)
│   └── ui/                        # shadcn/ui primitives
└── pages/
    ├── public/                    # 6 marketing pages
    ├── auth/                      # Login, AdminLogin, Signup, ForgotPassword
    ├── dashboard/                 # 14 owner dashboard pages
    └── admin/                     # 15 admin dashboard pages
```

## Getting Started
Prerequisites
```
Node.js 24+
pnpm 10+
```
## Installation
```
bash# Clone the repo
git clone <your-repo-url>
cd Review-Master-AI
```
## Install dependencies (with Windows native binary support)
```
pnpm install
```

Windows users: If you hit Cannot find module @rollup/rollup-win32-x64-msvc errors, add this to .npmrc in the project root and reinstall:
supportedArchitectures[os][]=win32
supportedArchitectures[os][]=linux
supportedArchitectures[cpu][]=x64
Then run rm -rf node_modules && pnpm install

## Run the Dev Server
```
bash# On Windows (Command Prompt)
set BASE_PATH=/ && set PORT=3000 && pnpm --filter @workspace/review-pilot dev
```
## On Mac / Linux
```
BASE_PATH=/ PORT=3000 pnpm --filter @workspace/review-pilot dev
Open http://localhost:3000 in your browser.
```
## Demo Accounts
RoleEmailPasswordBusiness Ownerriya@glowsalon.comanyAdminadmin@reviewpilot.comany
Demo business: Glow Salon (owner: Riya Kapoor)

## Design System
TokenValuePrimaryIndigo — hsl(245 82% 62%)AccentTeal — hsl(175 77% 40%)Sidebar (owner)Dark navy — hsl(230 35% 13%)Sidebar (admin)Violet-600 accents

## Architecture Notes

No backend — prototype only; all state is in-memory using mock-data.ts
Auth is role-based (guest / owner / admin); login sets role + user object; guard components redirect unauthorized users
wouter used for routing (lightweight, no React Router dependency)
AuthProvider is nested inside WouterRouter so useLocation works inside it
JSX transformer handles React import — do not add import React manually
All chart data must be passed to the top-level chart component (e.g. <LineChart data={...}>), not to <XAxis>

## Scripts
```
# Start dev server (from repo root on Windows)
set BASE_PATH=/ && set PORT=3000 && pnpm --filter @workspace/review-pilot dev

# Typecheck entire workspace
pnpm run typecheck
```

# Typecheck entire workspace
pnpm run typecheck
