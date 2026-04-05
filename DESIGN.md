# Current Equities — LP CRM Design System

> Agent-friendly design specification for AI code generation tools. This is the authoritative visual reference — all UI decisions follow this file.

## 1. Visual Theme & Atmosphere

**Product:** LP CRM — internal relationship manager for Current Equities Fund I fundraising
**Type:** Internal pipeline tool — 3 users managing 100+ LP relationships
**Audience:** Jerry Shi (GP), Matt (Partner), Angel Zhou (Principal)

**Design Philosophy:** This is a deal desk. Bloomberg Terminal meets Linear. Every screen answers: "Who do I talk to next, and what's their status?" Dense data, fast navigation, zero chrome. Built for someone managing LP conversations across time zones, on planes, and during dinners.

**North Star References:**

| Product | What to take |
|---------|-------------|
| Bloomberg Terminal | Data density, tabular numbers, keyboard-first, dark canvas |
| Linear | Sidebar, command palette (⌘K), task-like items, clean dark theme |
| Superhuman | Keyboard shortcuts for everything, split-pane, speed-optimized |
| Attio CRM | Modern CRM patterns, pipeline views, relationship-centric design |
| Raycast | Command palette UX, instant search, minimal chrome |

**Mood:** Dark, fast, professional. Navy-black canvas with CE gold as the accent that marks what matters — committed LPs, hot leads, action items. No onboarding flows, no tooltips, no empty-state illustrations. The 3 users know the tool. Optimize for speed, not discoverability.

**Core Principles:**
1. **Speed over polish** — every action should be ≤2 clicks or 1 keyboard shortcut. No modals for simple edits.
2. **Pipeline is the heartbeat** — the LP pipeline stage is the most important data point. Always visible, always colored.
3. **Keyboard-first** — ⌘K opens command palette, j/k navigate lists, Enter opens detail, Escape goes back.
4. **Financial numbers are sacred** — AUM, commitment size, fund size, close probability all use `tnum` and right-align.
5. **Desktop-primary** — this is a desk tool. iPad-functional for LP dinners (quick lookup). Not phone-optimized.

---

## 2. Color Palette & Roles

All colors use **OKLCh** for perceptual uniformity. Hex approximations provided for reference.

### Base (Dark Canvas)

| Token | OKLCh | Hex | Role |
|-------|-------|-----|------|
| `--background` | `oklch(0.12 0.015 260)` | #0c1222 | Page background — deep navy-black |
| `--foreground` | `oklch(0.93 0.005 250)` | #e8eaf0 | Primary text |
| `--card` | `oklch(0.16 0.02 255)` | #161f32 | Card/row surfaces |
| `--card-foreground` | `oklch(0.93 0.005 250)` | #e8eaf0 | Text on cards |
| `--muted` | `oklch(0.20 0.015 255)` | #1e2840 | Input fields, secondary surfaces |
| `--muted-foreground` | `oklch(0.58 0.015 250)` | #7d8899 | Secondary text, labels |
| `--border` | `oklch(0.24 0.02 255)` | #2a3450 | Borders, table row dividers |
| `--ring` | `oklch(0.80 0.14 85)` | #ffba05 | Focus rings — CE gold |

### Brand (CE Identity)

| Token | OKLCh | Hex | Role |
|-------|-------|-----|------|
| `--primary` | `oklch(0.80 0.14 85)` | #ffba05 | CE Gold — committed LPs, primary CTAs, important metrics |
| `--primary-foreground` | `oklch(0.12 0.015 260)` | #0c1222 | Text on gold backgrounds |
| `--accent` | `oklch(0.35 0.08 260)` | #1e3560 | Navy — secondary buttons, selected rows, active sidebar |
| `--accent-foreground` | `oklch(0.93 0.005 250)` | #e8eaf0 | Text on navy accent |

### Pipeline Stage Colors (The Core Visual System)

| Stage | Token | OKLCh | Hex | Meaning |
|-------|-------|-------|-----|---------|
| Prospect | `--stage-prospect` | `oklch(0.55 0.02 250)` | #6b7280 | Identified, no outreach yet |
| Outreach | `--stage-outreach` | `oklch(0.65 0.15 250)` | #3b82f6 | First contact made, email/call sent |
| Meeting | `--stage-meeting` | `oklch(0.75 0.16 75)` | #f59e0b | Meeting scheduled or completed |
| DD | `--stage-dd` | `oklch(0.55 0.20 290)` | #8b5cf6 | LP doing due diligence on CE |
| Committed | `--stage-committed` | `oklch(0.70 0.17 155)` | #22c55e | Verbal or written commitment |
| Passed | `--stage-passed` | `oklch(0.55 0.18 25)` | #dc2626 | Declined or went cold |

**Pipeline colors are the most important visual system.** They appear on:
- Left-border accents on LP cards/rows
- Dot indicators in lists
- Kanban column headers
- Badge backgrounds (15% opacity + text + 30% border)
- Pipeline summary bar (stacked horizontal, proportional)

### Sidebar

| Token | OKLCh | Hex | Role |
|-------|-------|-----|------|
| `--sidebar` | `oklch(0.09 0.02 260)` | #080e1a | Sidebar — darkest surface |
| `--sidebar-foreground` | `oklch(0.70 0.01 250)` | #a0a8b8 | Nav text |
| `--sidebar-active` | `oklch(0.80 0.14 85)` | #ffba05 | Active item — CE gold |
| `--sidebar-active-bg` | `oklch(0.16 0.03 260)` | #152040 | Active item background |
| `--sidebar-hover` | `oklch(0.13 0.02 260)` | #101828 | Hover state |

---

## 3. Typography Rules

| Element | Font | Weight | Size | Tracking | Notes |
|---------|------|--------|------|----------|-------|
| **Sans** | Geist | — | — | — | Everything except data |
| **Mono** | Geist Mono | — | — | — | Financial figures, IDs, dates |
| Page title | Geist | 700 | 20px | -0.025em | One per page |
| Section header | Geist | 600 | 14px | 0 | Table group headers |
| Row/card title | Geist | 500 | 14px | 0 | LP name, firm name |
| Body | Geist | 400 | 14px | 0 | Notes, descriptions |
| Secondary | Geist | 400 | 13px | 0 | Metadata, last contact date |
| Label | Geist | 500 | 12px | 0 | Field labels, column headers |
| Micro | Geist | 600 | 10px | 0.08em | Uppercase badges, stage tags |
| Money (large) | Geist Mono | 700 | 28px | 0 | `tabular-nums` — total commitments, AUM |
| Money (inline) | Geist Mono | 500 | 14px | 0 | `tabular-nums` — commitment size in tables |
| Percentage | Geist Mono | 500 | 14px | 0 | `tabular-nums` — close probability |

**Rules:**
- All financial figures use Geist Mono + `tabular-nums` — never proportional
- Money values right-align in tables and cards
- Maximum 2 font weights per row/card (typically 400 + 500, or 400 + 600)
- Dates use Geist Mono at 13px (consistent character width)
- Never use font sizes below 10px

---

## 4. Component Patterns

### LP Row (Primary Element — Table View)

```
- Full-width row in data table
- Left: stage-colored dot (8px) + LP name (500) + firm name (400, muted)
- Center: stage badge (colored bg/15 + text + border/30, rounded-full)
- Right: commitment size (mono, right-aligned) + last contact date (13px, muted)
- Hover: bg-muted/30
- Click: opens detail panel (right sheet or full page)
- Border-bottom: border-border/40
```

### LP Card (Kanban View)

```
- bg-card, border border-border/60, rounded-lg (8px)
- border-l-2 with stage color
- p-4
- Top: LP name (500, 14px) + firm (400, 13px, muted)
- Middle: commitment size (mono, 16px) + probability % (mono, muted)
- Bottom: last contact date + owner avatar (24px, rounded-full)
- Hover: border-border, transition-colors 150ms
```

### Pipeline Summary Bar

```
- Full-width horizontal bar, h-3, rounded-full
- Segmented by stage, proportional width
- Each segment uses stage color
- Hover segment: tooltip with count + total commitment
- Below bar: stage labels with counts
```

### Detail Panel (LP Profile)

```
- Right sheet (w-[480px]) or full page
- Header: LP name (20px, 700) + stage badge + edit button
- Sections:
  1. Overview: firm, AUM, type (pension/endowment/FO/SWF), geography
  2. CE Interest: commitment size, probability, target close date, notes
  3. Contact History: timeline of meetings/calls/emails
  4. Key People: contacts at the LP with roles
  5. Documents: attached files (DDQ responses, side letters)
  6. Notes: freeform text, timestamped
```

### Stat Widget

```
- bg-card, border border-border/60, rounded-lg, p-4
- Label: 12px, muted-foreground, uppercase tracking-wide
- Value: Geist Mono 700, 28px, tabular-nums
- Subtitle: 13px, muted-foreground (e.g., "of $500M target")
- Optional: progress bar below (h-1.5, rounded-full, primary fill)
```

### Pipeline Kanban

```
- 6 columns matching pipeline stages
- Column header: stage dot + name + count pill + total commitment (mono)
- Column bg: transparent (cards provide surface)
- Drag-and-drop between columns (updates stage)
- Scroll: horizontal on narrow screens
```

### Command Palette (⌘K)

```
- Overlay: bg-black/60 backdrop-blur-sm
- Dialog: bg-card, border border-border, rounded-xl, w-[560px], shadow-2xl shadow-black/50
- Search input: 16px, no border, transparent bg, placeholder "Search LPs, contacts, notes..."
- Results: grouped sections (LPs, Contacts, Actions)
- Each result: icon + label + metadata (right-aligned, muted)
- Keyboard: arrow keys navigate, Enter selects, Escape closes
```

### Navigation

```
Sidebar (Fixed Left):
- w-56 (224px), bg-sidebar
- Logo/title: "CE Fund I" at top
- Nav sections: Pipeline, Contacts, Calendar, Reports, Settings
- Active: bg-sidebar-active-bg, text-sidebar-active (gold), font-weight 500
- Count badges: rounded-full, bg-muted, text-muted-foreground, 10px
- Bottom: user avatar + name + keyboard shortcut hints

No mobile nav — this is a desktop tool. On iPad: sidebar collapses to icons (w-16).
```

### Data Table

```
- bg-card, rounded-xl, border border-border/60
- Header: bg-muted/30, text-muted-foreground, 11px uppercase, font-weight 600
- Sortable columns: hover underline, click toggles asc/desc, active shows arrow
- Body rows: border-b border-border/30
- Numbers: right-aligned, Geist Mono, tabular-nums
- Actions: icon buttons, opacity-0 group-hover:opacity-100
- Selected row: bg-accent/10
- Empty: "No LPs match this filter" centered, muted
```

### Filters Bar

```
- Sticky below topbar
- Row of Select dropdowns + search input
- Filters: Stage, Type (pension/FO/SWF/endowment), Geography, Owner, Commitment range
- Active filters: pill badges with X to remove
- "Clear all" ghost button when filters active
```

---

## 5. Layout Principles

| Element | Value |
|---------|-------|
| Sidebar width | 224px — `w-56` |
| Sidebar collapsed (iPad) | 64px — `w-16` |
| Topbar height | 48px — `h-12` (compact — more data visible) |
| Page padding | 24px — `p-6` |
| Card padding | 16px — `p-4` |
| Card radius | 8px — `rounded-lg` |
| Table row height | 48px — `h-12` |
| Section gap | 16px — `space-y-4` (tighter than marketing — data tool) |
| Card grid gap | 12px — `gap-3` |
| Max content width | None — fill available space (data tools use full width) |

### Grid Strategy

```
Desktop (≥1024px):
- Sidebar + full-width main content
- Stats: 4-column grid (grid-cols-4)
- Pipeline kanban: 6 columns
- Table: full width with horizontal scroll if needed

Tablet/iPad (768-1023px):
- Sidebar collapses to icon rail (w-16)
- Stats: 2-column grid
- Kanban: horizontal scroll
- Table: prioritized columns (name, stage, commitment, last contact)

Below 768px:
- Not a target. If accessed on phone, show read-only summary only.
```

---

## 6. Depth & Elevation

Dark canvas — same rules as Compass. Borders over shadows.

| Level | Surface | Method |
|-------|---------|--------|
| 0 (Base) | Page | `bg-background` — darkest |
| 1 (Card/Row) | Cards, table | `bg-card` + `border border-border/60` |
| 2 (Elevated) | Filters bar, dropdowns | `bg-muted` + `border border-border` |
| 3 (Overlay) | Command palette, sheets | `bg-card` + `ring-1 ring-border` + `shadow-2xl shadow-black/50` |

No shadows on cards. No glow effects. Border luminance only.

---

## 7. Do's and Don'ts

### Do
- Use pipeline stage colors consistently — they're the primary visual language
- Right-align all financial figures in tables
- Use Geist Mono for every number (money, dates, percentages, counts)
- Use `tabular-nums` on every number column
- Build keyboard shortcuts for all common actions (⌘K search, j/k nav, Enter open)
- Show total pipeline value prominently on every view
- Show "last contacted X days ago" — stale relationships need attention
- Use inline editing where possible (click to edit commitment size, stage, notes)
- Keep filter state in URL params (shareable views)

### Don't
- Don't add onboarding, tooltips, or help text — 3 expert users
- Don't use illustrations or decorative empty states — just "No results" text
- Don't design for mobile phones — desktop + iPad only
- Don't use rounded-full on cards or rows — rounded-lg maximum
- Don't show more than 6 stat widgets — prioritize
- Don't use modals for simple edits — inline or sheet panel
- Don't add loading animations beyond skeleton shimmer
- Don't use CE gold for anything except: committed stage, primary CTAs, active nav, key metrics
- Don't use light/bright backgrounds — dark canvas throughout

---

## 8. Responsive Behavior

| Breakpoint | Width | Changes |
|-----------|-------|---------|
| Desktop | ≥1024px | Full sidebar + main content, all columns visible |
| iPad | 768-1023px | Sidebar collapses to icon rail, 2-col stats, horizontal kanban scroll |
| Below 768px | Not a target — read-only fallback if accessed |

**Desktop-primary.** This tool is used at a desk with a large monitor. iPad support is for quick LP lookups during dinners/events.

---

## 9. Agent Prompt Guide

When building UI for the LP CRM, paste this to your AI agent:

```
You are building an internal LP CRM for Current Equities, a PE infrastructure fund.
3 users: GP, Partner, Principal. They manage 100+ LP relationships for a $300-500M fundraise.

CRITICAL RULES:
- Dark background (#0c1222), light text (#e8eaf0), card surfaces (#161f32)
- CE Gold (#ffba05) accent — committed LPs, CTAs, active nav, key metrics
- Pipeline stages are the core visual system (6 colors, always visible)
- All money/numbers: Geist Mono, tabular-nums, right-aligned
- Keyboard-first: ⌘K search, j/k navigate, Enter open, Escape back
- Desktop-primary (1024px+), iPad-functional, no phone
- shadcn/ui components + Tailwind CSS + Lucide icons

PIPELINE STAGES (in order):
- Prospect (#6b7280 gray) → Outreach (#3b82f6 blue) → Meeting (#f59e0b amber)
- DD (#8b5cf6 purple) → Committed (#22c55e green) → Passed (#dc2626 red)

COMPONENT PATTERNS:
- LP rows: stage dot + name + firm + stage badge + commitment (mono) + last contact
- Cards: bg-[#161f32] border border-[#2a3450]/60 rounded-lg p-4, border-l-2 stage color
- Stats: label (12px uppercase) + value (Geist Mono 700 28px tnum) + subtitle
- Tables: full-width, right-aligned numbers, sortable columns, hover actions
- Command palette: ⌘K, overlay dialog, grouped search results
- Sidebar: w-56, dark (#080e1a), gold active state, nav with count badges

KEY METRICS TO SHOW:
- Total pipeline value (sum of all non-passed commitments)
- Committed amount vs target ($500M)
- Number of LPs per stage
- Days since last contact (flag stale >30 days)
```

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS 4 (OKLCh tokens) |
| Components | shadcn/ui |
| Charts | Recharts (pipeline funnel, commitment trends) |
| Icons | Lucide React (2px stroke, outline) |
| Fonts | Geist + Geist Mono (Google Fonts) |
| Database | Supabase (Postgres + Auth + RLS) |
| ORM | Drizzle ORM |
| Forms | React Hook Form + Zod |
