# AGENTS.md — RxGuard (PS-6) Autonomous Agent Directives & Engineering Protocol

> **Project Identity:** RxGuard (Pharmalens)  
> **Problem Statement (PS-6):** Multi-modal prescription & pill bottle scanner with clinical contraindication detection, drug-drug interaction matrix, and an interactive 24-hour daily timeline.  
> **Repository Type:** Full-Stack Next.js Monorepo (App Router)  
> **Primary Audience for this Document:** AI Coding Agents & Pair-Programming Engineers working on this repository.

---

## 1. Core Operating Principles for AI Agents

Every agent working on this codebase MUST follow these mandatory operating rules:

1. **State Persistence & Task Tracking:**
   - Never lose track of current phase or tasks. Always reference and update `PROGRESS_TRACKER.md` upon completing sub-features.
   - Work methodically: plan, implement, verify, and document.
2. **Strict Non-Destructive Editing:**
   - Never overwrite existing functionality or discard working code during edits.
   - Respect file-ownership boundaries to prevent merge conflicts when multiple developers/agents are collaborating.
3. **Demo Resilience (Hackathon Zero-Failure Rule):**
   - **Offline Mock Fallback:** Every external dependency (Gemini AI Vision API, Neon Postgres) **MUST** have an instantaneous fallback mock state. If an API key or database string is missing or times out, the app must gracefully fall back to pre-seeded clinical scenarios so live demos never fail on stage.
4. **No Placeholders or Stubs:**
   - Write complete, robust, type-safe implementations. Avoid `// TODO: add later` for core user-facing features.

---

## 2. 🎨 UI Design Reference & Replication Protocol (CRITICAL)

The user will provide visual design references (such as screenshots, UI mockups, Figma frames, image assets, or layout descriptions). When a design reference is supplied, agents MUST execute the following exact protocol:

```
[ User Supplies Design Reference ]
           │
           ▼
[ Step 1: Visual Anatomy Deconstruction ]
  - Color palette (hex/hsl tokens, dark mode gradients, contrast)
  - Typography & hierarchy (font families, weight, tracking, sizes)
  - Container styling (border radius, subtle borders, glassmorphic blur, drop shadows)
  - Layout & spatial grid (flex/grid structure, paddings, gaps)
  - Micro-interactions & animations (spring curves, hover states, pulse glows)
           │
           ▼
[ Step 2: High-Fidelity Pixel Replication ]
  - Replicate using Tailwind CSS + Framer Motion
  - Avoid generic browser components; match the exact aesthetic of the reference
           │
           ▼
[ Step 3: Pattern Registration (/imprint) ]
  - Register visual tokens in ui-registry.md so subsequent components stay 100% consistent
```

### Detailed Rules for UI Replication:
- **Strict User-Driven Design Fidelity:**
  - Do NOT assume, hardcode, or pre-define any arbitrary colors, themes, palettes, or visual styling in advance.
  - The user will provide visual design references, mockups, or prompt instructions.
  - Agents must faithfully extract and adopt the exact color palette, typography, container styling, and spacing directly from whatever the user provides.
- **Visual Faithfulness:** Match the user-provided reference's layout geometry, badge treatments, status chips, card elevations, and spacing rhythms precisely.
- **Fluid Motion:** Implement smooth spring animations via **Framer Motion** to complement the user's chosen aesthetic.
- **No Unstyled Placeholders:** When an image or graphic element is referenced, create a rich interactive SVG, Lucide icon composition, or canvas visualization that matches the design intent.

---

## 3. Technology Stack & Architecture

| Layer | Technology | Key Details & Rules |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14+ (App Router)** | Full-stack monorepo; API routes in `app/api/`; React Server & Client Components. |
| **Styling** | **Tailwind CSS** | Curated design tokens, utility classes, and glassmorphism. |
| **Animations** | **Framer Motion** | HUD laser scanner sweep, card transitions (`layoutId`), alert pulse badges, spring timeline physics. |
| **Icons** | **Lucide React** | Medical, timing, and utility iconography (`Pill`, `AlertTriangle`, `Clock`, `Camera`, `ShieldAlert`, `CheckCircle2`). |
| **AI / Multimodal Vision** | **Google Gemini 2.0 / 1.5 Flash** | Multimodal OCR + Clinical Pharmacology reasoning + native JSON schema extraction in a single call. |
| **Database** | **Neon (Serverless Postgres)** | `@neondatabase/serverless` HTTP driver for zero-cold-start queries. Auto-fallback to local store if `DATABASE_URL` is omitted. |

---

## 4. Product Domain & Feature Specifications

### 4.1 Two Clean Input Channels (User Requirement)
The app must provide a clean 2-option selector:
1. **Option 1: Image Mode**
   - Live Webcam scan with an interactive cyber-medical viewfinder and animated laser beam.
   - Drag-and-drop / file upload for photos of prescription bottles and printed labels.
   - 3 One-Click Demo Presets (*Severe Bleeding Conflict*, *Thyroid-Calcium Spacing Conflict*, *Safe Polypharmacy Stack*).
2. **Option 2: Text Mode**
   - Quick drug search & manual entry input for damaged/lost labels or fast judge testing.
   - Autocomplete suggestions and automated standard dosage/timing suggestion.

### 4.2 Output Sections (Post-Analysis Screen)
Immediately upon submission (via Image or Text), the app displays:
1. **Extracted Prescription Card:** Brand name, generic chemical name, dosage, frequency, and physical pill appearance avatar (e.g. ⚪ *Peach round scored tablet*).
2. **Immediate Contraindication & Safety Engine:**
   - 🔴 **HIGH Severity:** Severe interaction (e.g., Warfarin + Ibuprofen) with emergency warnings and clinical mechanism explanation.
   - 🟡 **MODERATE / SPACING Severity:** Absorption conflicts requiring time spacing (e.g., Levothyroxine + Calcium requiring 4-hour stagger).
   - 🍽️ **FOOD / DIETARY Severity:** Grapefruit juice warnings, meal requirements ("take with food", "empty stomach").
   - ⚠️ **DUPLICATE ACTIVE INGREDIENT:** Cumulative toxicity alerts (e.g. Acetaminophen daily limit check).
3. **Interactive 24-Hour Timeline:**
   - 4 Time buckets: Morning (08:00), Afternoon (13:00), Evening (19:00), Bedtime (22:00).
   - Dynamic Auto-Spacing: Conflicting pills are automatically staggered with an *"Auto-adjusted for safety"* indicator.
   - Interactive adherence checkbox (*"Mark as Taken"*) with celebratory micro-animations and adherence percentage ring.
4. **Caregiver / Physician 1-Click Summary:**
   - Printable / exportable emergency medical card summarizing active prescriptions, flagged risks, and schedule.

---

## 5. Domain Ownership & Team Collaboration (Zero-Conflict Monorepo)

To allow 2 team members and AI agents to work simultaneously without Git conflicts:

```
P6/
├── components/          <-- [DOMAIN 1: FRONTEND LEAD]
│   ├── scanner/         <-- Camera viewfinder, WebRTC capture, laser animation
│   ├── text-input/      <-- Manual drug name search & autocomplete
│   ├── alerts/          <-- Severity cards, pulse badges, mechanism modals
│   ├── timeline/        <-- 24-hour visual schedule, adherence rings
│   └── summary/         <-- Caregiver printable export sheet
│
├── lib/                 <-- [DOMAIN 2: BACKEND & AI LEAD]
│   ├── gemini.ts        <-- Gemini Flash vision prompt & JSON schema parser
│   ├── neon.ts          <-- Neon Postgres connection & schema queries
│   ├── pharmacology.ts  <-- DDI rules engine & spacing calculator
│   └── mock-presets.ts  <-- Offline bulletproof demo datasets
│
└── app/
    ├── page.tsx         <-- Dashboard layout assembly
    └── api/             <-- Serverless API endpoints:
        ├── scan/route.ts
        ├── analyze-text/route.ts
        ├── interactions/route.ts
        └── schedule/route.ts
```

- **Frontend Engineers/Agents:** Touch `components/` and `app/page.tsx`.
- **Backend/AI Engineers/Agents:** Touch `lib/` and `app/api/`.
- **Integration Contract:** The frontend consumes typed JSON contracts from `/api/*`.

---

## 6. Agent Workflow & Execution Checklist

When given a development task:
1. **Consult `PROGRESS_TRACKER.md`**: Identify the current phase and exact task IDs.
2. **Consult Design Reference (if provided)**: Extract design tokens, layout, and visual details before writing JSX.
3. **Write Clean, Modular Code**:
   - Use TypeScript interfaces for all medical data (`Medication`, `InteractionAlert`, `ScheduleSlot`).
   - Use Framer Motion for entry/exit animations.
4. **Verify Live**:
   - Ensure the Next.js dev server builds cleanly without TypeScript or ESLint errors.
   - Verify both real API mode and offline mock mode function seamlessly.
5. **Update Documentation**: Mark completed checklist items in `PROGRESS_TRACKER.md`.
