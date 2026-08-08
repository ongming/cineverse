# 💎 IMPECCABLE DESIGN SYSTEM & UI/UX STANDARDS FOR CINEVERSE

> **Reference Specification**: Based on the *Impeccable Design Language Framework* by Paul Bakaus (Ex-Web Creator Lead at Google).
> **Target Application**: CINEVERSE Movie Streaming Platform

---

## 🎨 1. COLOR PALETTE & CONTRAST CLARITY (WCAG AAA)

### Core Backgrounds & Surfaces
- **App Canvas**: `#080808` (Deep void black)
- **Panel Surface**: `#12141a` (High-depth slate card background)
- **Sub-panel / Input Background**: `#0a0b0e` (Elevated dark inset)
- **Borders & Dividers**: `#222533` (Sharp subtle contrast border)
- **Border Hover Accent**: `#ffb800/60` (Gold glow) or `#00e5e5/60` (Cyan glow)

### Brand Accent Themes
- **Primary Accent (Gold Theme)**: `#ffb800` (`amber-400`) - Used for Watchlist, Ratings, Primary CTAs.
- **Secondary Accent (Cyan Neon Theme)**: `#00e5e5` (`cyan-neon`) - Used for Calendar Schedule, Active Tab highlights, Badges.
- **Danger / Destructive**: `#ff4d4d` / `red-500` - Used for Delete buttons, Error Toasts, Warning Badges.

---

## 📐 2. SPATIAL RIGOR & SPACING SYSTEM (8-POINT GRID)

All padding, margins, and gaps strictly adhere to the 8-point spatial grid system:

- **Micro-gap**: `gap-1` (4px), `gap-2` (8px)
- **Standard Layout Gap**: `gap-3` (12px), `gap-4` (16px), `gap-6` (24px)
- **Container Padding**: `p-4` (16px), `p-6` (24px), `p-8` (32px)
- **Section Margins**: `mb-6` (24px), `mb-8` (32px), `mb-10` (40px)
- **Border Radius Standards**:
  - `rounded-md` (6px) - Small badges, tag pills
  - `rounded-xl` (12px) - Buttons, dropdown menus, inputs
  - `rounded-2xl` (16px) - Movie poster cards, modal panels
  - `rounded-3xl` (24px) - Large feature banners, empty state cards

---

## 🔤 3. TYPOGRAPHY HIERARCHY & PAIRING

### Font Families
- **Primary Sans Font**: `"Inter", sans-serif` — Used for headings, titles, descriptions, and primary UI labels.
- **Monospace Font**: `"Roboto Mono", monospace` — Used for dates, timestamps, ratings, badge codes, and numeric counters.

### Typographic Scales
- **Display Heading**: `text-4xl sm:text-5xl font-black uppercase tracking-tight`
- **Page Title (H1)**: `text-3xl sm:text-4xl font-extrabold text-white tracking-tight`
- **Card Title (H3)**: `text-sm sm:text-base font-bold uppercase tracking-wide text-white`
- **Body Text**: `text-xs sm:text-sm text-gray-400 leading-relaxed font-sans`
- **Meta / Badge Text**: `text-[11px] font-mono tracking-tight text-gray-300`

---

## ⚡ 4. MICRO-INTERACTIONS & MOTION (PHYSICS-BASED SPRING)

### Spring Transition Curve
All interactive overlays, dropdowns, modal alerts, and toast snackbars use physics-based spring curves:

```css
/* Spring Slide Up Transition */
transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Card Hover Dynamics
- **Transform**: `-translate-y-1.5` and `scale-105` on inner images (`transition-transform duration-500`)
- **Glow Shadow**: `shadow-[0_12px_30px_rgba(255,184,0,0.2)]` for Gold theme or `shadow-[0_12px_30px_rgba(0,229,229,0.2)]` for Cyan theme.

---

## 🚫 5. ANTI-SLOP DETECTOR CHECKLIST (ZERO GENERIC DESIGN)

- ❌ **NO Browser Native Alerts**: Always use custom toast snackbars or modal dialogs.
- ❌ **NO Hardcoded Offsets**: Always compute container bounds dynamically.
- ❌ **NO Flat Gray Boxes**: Always use glassmorphism backdrop blurs (`backdrop-blur-md`) and subtle borders (`border-[#222533]`).
- ❌ **NO Abrupt Transitions**: Always supply explicit `duration-200` or `duration-300` on state changes.
- ❌ **NO Text Overflow Truncation Bugs**: Always apply `truncate` or `line-clamp-1` / `line-clamp-2` with appropriate tooltips.

---

## 🛠️ 6. COMPONENT MATRIX SUMMARY

| Component | Surface BG | Border | Accent | Motion |
| :--- | :--- | :--- | :--- | :--- |
| **Movie Card** | `#12141a` | `#222533` | Gold / Cyan Hover | `-translate-y-1.5` |
| **Date Picker** | `#12141a/95` | `#2b3042` | Cyan Neon | Fade + Zoom 95 |
| **Undo Snackbar**| `#12141a/95` | `#2a2e3d` | Amber Gold | Spring Cubic-Bezier + Drain Bar |
| **Watchlist Card**| `#0d0e12` | `#222533` | Gold `#ffb800` | Scale 105 + Radial Glow |
