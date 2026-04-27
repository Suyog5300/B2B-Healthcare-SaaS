# Healthcare SaaS — B2B Frontend Platform

A production-ready B2B healthcare management platform built with React, TypeScript, and Firebase. Features authentication, patient management with grid/list views, analytics dashboard, and push notifications via Service Worker.

🔗 **Live Demo:** [[demo](https://healthcare-snowy-sigma.vercel.app/)]
📦 **Repository:** [[github-repo](https://github.com/Suyog5300/B2B-Healthcare-SaaS)]

## ✨ Features

- 🔐 **Firebase Authentication** with form validation and error handling
- 📊 **Analytics Dashboard** with interactive charts (Recharts)
- 👥 **Patient Management** with grid/list view toggle, search, and filters
- 🔔 **Service Worker** push notifications
- 🌙 **Dark mode** with persisted preference
- 📱 **Fully responsive** (mobile-first design)
- ⚡ **Code splitting** with lazy-loaded routes
- 🎨 **Reusable component library**

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite + TypeScript |
| State Management | Zustand (with persist middleware) |
| Routing | React Router v6 |
| Styling | Tailwind CSS |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Auth | Firebase Authentication |
| Notifications | Service Worker + Web Push API |
| Icons | Lucide React |
| Notifications UI | React Hot Toast |


### Architecture Decisions

**Feature-based structure** — Each feature (auth, patients, analytics) is self-contained with its own components, hooks, services, store, and types. This makes the codebase scalable and ready for **micro-frontend** extraction if needed.

**Zustand over Redux** — Chosen for its minimal boilerplate, TypeScript-friendly API, and small bundle size. Persist middleware handles theme/view-mode preferences automatically.

**Service Worker** — Custom SW (`public/service-worker.js`) handles both local notifications (via `postMessage`) and future server push events. Registered on app mount.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# 1. Clone & install
git clone <repo-url>
cd healthcare-saas
npm install

# 2. Set up Firebase
# Create a project at https://console.firebase.google.com
# Enable Email/Password auth
# Copy .env.example → .env.local and fill in your Firebase config

cp .env.example .env.local

# 3. Create a test user in Firebase Console
# Authentication → Users → Add User

# 4. Run dev server
npm run dev
```

### Environment Variables

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 3000) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🚢 Deployment (Vercel)

1. Push to GitHub
2. Import repo on Vercel
3. Add environment variables (the `VITE_FIREBASE_*` keys)
4. Deploy

> **Important:** Service Worker requires HTTPS. Vercel provides this by default.
> After deployment, add your Vercel domain to Firebase: **Auth → Settings → Authorized domains**.

## ⚡ Performance Optimizations

- **Lazy-loaded routes** with `React.lazy` + Suspense
- **Code splitting** per page
- **Debounced search** (250ms) to prevent unnecessary re-renders
- **Memoized filtering** with `useMemo`
- **Path aliases** (`@/components`) for cleaner imports

## 🧪 What's Included

- ✅ Firebase email/password auth with full error handling
- ✅ Protected routes + auth state persistence
- ✅ Patient grid + list views with toggle
- ✅ Search, status filter, department filter
- ✅ 4 analytics charts (area, pie, bar, line)
- ✅ Working Service Worker with push notifications
- ✅ Dark mode toggle
- ✅ Loading skeletons + empty states
- ✅ Form validation with Zod
- ✅ Responsive on all screen sizes
- ✅ Error boundary

## 🔮 Future Enhancements

- Patient detail page with edit functionality
- Real backend API integration (replacing mock data)
- WebSocket for real-time critical alerts
- Role-based access control (Admin, Doctor, Nurse)
- Export reports (PDF/CSV)
- Micro-frontend split (auth as separate app)