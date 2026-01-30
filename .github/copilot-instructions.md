# Copilot Instructions for AI Agents

## Project Overview
- This is a Next.js e-commerce platform, similar to Shopify, for merchants to create and manage online stores.
- The codebase uses the Next.js App Router (see `src/app/`) and TypeScript throughout.
- Major features include product management, orders, customers, admin dashboard, boutique customization, and integrations.

## Key Architecture & Patterns
- **App Structure:**
  - All main routes/pages are under `src/app/` (e.g., `products/`, `orders/`, `dashboard/`, `admin/`, `boutique/`).
  - Each feature (products, orders, users, etc.) has its own folder with `page.tsx` and sometimes subfolders for CRUD or settings.
  - Shared UI components are in `src/components/`.
  - Business logic and utilities are in `src/lib/`.
  - Data templates in `src/data/`.
  - Internationalization in `src/i18n/`.
- **API Layer:**
  - API endpoints are in `src/app/api/` (REST-style, Next.js API routes).
  - Prisma ORM is used for database access (see `prisma/schema.prisma`).
- **Styling:**
  - Uses global and feature-specific CSS (`globals.css`, `input-placeholder-normal.css`, etc.).
  - Font optimization via `next/font` and Geist font.
- **Admin vs. Boutique:**
  - `src/app/admin/` for admin-only features/settings.
  - `src/app/boutique/` for merchant-facing store customization and settings.

## Developer Workflows
- **Development:**
  - Start dev server: `npm run dev`
  - Main entry: `src/app/page.tsx`
- **Database:**
  - Prisma schema: `prisma/schema.prisma`
  - Use Prisma CLI for migrations and DB tasks.
- **Deployment:**
  - Deploy via Vercel (see README for link).
- **Testing:**
  - No explicit test setup found; follow Next.js/TypeScript best practices if adding tests.

## Project Conventions
- Use TypeScript for all code.
- Organize new features as folders under `src/app/` with their own `page.tsx`.
- Place shared logic in `src/lib/` and shared UI in `src/components/`.
- Use Prisma for all DB access; do not access the DB directly.
- Follow Next.js file-based routing and API conventions.
- Use existing CSS files for styling; prefer CSS modules or global styles as appropriate.
- For i18n, use utilities in `src/i18n/`.

## Integration Points
- Database: Prisma ORM (`prisma/schema.prisma`, `src/lib/prisma.ts`).
- Fonts: `next/font` and Geist.
- Deployment: Vercel.

## Examples
- Add a new product page: create `src/app/products/new/page.tsx`.
- Add a new admin setting: create a folder/file under `src/app/admin/settings/`.
- Add a shared component: add to `src/components/` and import where needed.

## References
- See `README.md` for getting started and deployment.
- See `prisma/schema.prisma` for DB structure.
- See `src/app/` for routing and feature structure.
- See `src/components/` for reusable UI.

---
For questions, follow the structure and patterns above. When in doubt, match the organization and conventions of existing features.