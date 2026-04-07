# CE Roadshow — Sovereign

Institutional roadshow dashboard for Current Equities Fund I. Mobile-first PWA for managing meetings, prep, and follow-ups across a multi-city fundraising trip.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL via Drizzle ORM
- **Fonts:** Manrope, Inter, Space Grotesk, JetBrains Mono
- **Icons:** Material Symbols Outlined

## Setup

### 1. Clone and install

```bash
git clone https://github.com/jerryshimax/ce-roadshow.git
cd ce-roadshow
npm install
```

### 2. Create Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy the connection string from Settings → Database

### 3. Configure environment

```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

### 4. Push database schema

```bash
npx drizzle-kit push
```

### 5. Seed roadshow data

```bash
npx tsx src/db/seed/roadshow-apr2026.ts
```

This creates the trip with 4 legs (HK, China, Paris, LA) and 13 meetings with full prep content in Chinese and English.

### 6. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000/roadshow](http://localhost:3000/roadshow)

## Deploy

### Vercel Pro (Recommended)

1. Import the GitHub repo on [vercel.com](https://vercel.com) (requires Pro plan for Next.js 16)
2. Add a Postgres database via Vercel Storage (Neon)
3. Deploy — the `DATABASE_URL` env var is auto-configured
4. Run seed remotely: `DATABASE_URL=<vercel-postgres-url> npx tsx src/db/seed/roadshow-apr2026.ts`

### Docker

```bash
docker compose up -d
```

Requires `.env` file with database credentials. See `.env.local.example`.

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/roadshow/     ← Roadshow pages
│   │   ├── page.tsx              ← Trip HQ (home)
│   │   ├── meetings/page.tsx     ← Meeting list
│   │   ├── meetings/[id]/page.tsx ← Meeting prep card
│   │   └── timeline/page.tsx     ← Day-by-day timeline
│   └── api/roadshow/             ← API routes
├── components/roadshow/          ← UI components
├── db/
│   ├── schema/roadshow.ts        ← Database tables
│   ├── queries/roadshow.ts       ← Query functions
│   └── seed/                     ← Seed scripts
└── hooks/use-roadshow.ts         ← SWR data hooks
```

## Database Tables

- `roadshow_trips` — Trip metadata, fund thesis, talking points
- `roadshow_legs` — Geographic segments (HK, China, Paris, LA)
- `roadshow_meetings` — Meetings with prep content, CRM links, action items

All tables link to the existing LP CRM (`lp_organizations`, `lp_contacts`, `interactions`).
