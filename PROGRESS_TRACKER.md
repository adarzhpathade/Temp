# PROGRESS_TRACKER.md — RxGuard (PS-6) Master Progress & Fine-Tuning Tracker

> **Project:** RxGuard (Pharmalens)  
> **Problem Statement:** PS-6: Multi-modal prescription & pill bottle scanner with clinical contraindication detection, drug-drug interaction matrix, and an interactive 24-hour daily timeline.  
> **Architecture:** Full-Stack Next.js Monorepo (App Router) • Neon Serverless Postgres • Google Gemini 2.0 Flash • Framer Motion  
> **Purpose:** Granular, phase-by-phase execution roadmap with acceptance criteria, fine-tuning knobs, and regression prevention.

---

## 📊 Live Project Status Dashboard

| Phase | Description | Status | Verification Gate |
| :--- | :--- | :--- | :--- |
| **Phase 0** | Monorepo Setup & Design System Tokens | ⬜ Pending | Dev server runs at `localhost:3000` with dark medical tokens |
| **Phase 1** | Database Layer & Serverless Driver (Neon) | ⬜ Pending | HTTP connection + automatic local fallback verified |
| **Phase 2** | Fail-Safe Clinical Mock Presets & Data Models | ⬜ Pending | 3 pre-seeded scenarios loaded with zero network dependencies |
| **Phase 3** | AI Vision OCR & Pharmacology Rules Engine | ⬜ Pending | Gemini API + fallback rule engine passes JSON schema tests |
| **Phase 4** | Two Clean Input Channels (Image & Text Modes) | ⬜ Pending | WebRTC scanner + text autocomplete toggle renders seamlessly |
| **Phase 5** | Contraindication Alert Matrix & Clinical Drawer | ⬜ Pending | 🔴 High, 🟡 Spacing, 🍽️ Food, ⚠️ Duplicate alerts render correctly |
| **Phase 6** | Interactive 24-Hour Timeline & Auto-Scheduler | ⬜ Pending | 4 daily buckets + dynamic 4-hour spacing + adherence rings work |
| **Phase 7** | Caregiver Export Modal, Audio Readout & Polish | ⬜ Pending | 1-click printable summary + 60fps animations verified |

---

## 🛠️ Phase 0: Monorepo Setup & Design Foundation

### Objectives:
Scaffold Next.js 14+ App Router, configure Tailwind CSS, and set up Framer Motion and Lucide React ready to adopt the user's design reference.

### Implementation Checklist:
- [ ] **0.1 Initialize Next.js Project**:
  - `npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"`
- [ ] **0.2 Install Core Dependencies**:
  - `npm install framer-motion lucide-react @neondatabase/serverless canvas-confetti clsx tailwind-merge`
  - `npm install -D @types/canvas-confetti`
- [ ] **0.3 Design Foundation Setup (`tailwind.config.ts` & `app/globals.css`)**:
  - Configure Tailwind CSS and base styles ready to receive styling directly from user-provided design references or prompts.
  - Zero hardcoded color assumptions; visual design tokens will be populated strictly based on user reference.
- [ ] **0.4 Global Layout Shell (`app/layout.tsx` & `app/page.tsx`)**:
  - Patient header (*"Patient: Margaret Vance, 74 • Polypharmacy Care"*) and core layout shell structured according to user-supplied design preferences.

### 🎛️ Fine-Tuning Knobs:
- Design tokens and variables in `app/globals.css` populated strictly from user design reference.

### ✅ Phase 0 Acceptance Criteria:
- `npm run dev` compiles cleanly without warnings.
- Layout displays clean responsive containers matching user-provided design specifications.

---

## 🗄️ Phase 1: Database Architecture & Serverless Driver (Neon)

### Objectives:
Establish persistent storage using Neon Serverless Postgres with automatic local fallback so lack of credentials never crashes the application.

### Implementation Checklist:
- [ ] **1.1 Neon Client Module (`lib/neon.ts`)**:
  - Implement `@neondatabase/serverless` HTTP connection pool.
  - Implement zero-crash check: if `process.env.DATABASE_URL` is empty, toggle `isMockMode = true` and route all queries to in-memory store.
- [ ] **1.2 SQL Schema Migration Script (`lib/schema.sql`)**:
  - `medications`: `id`, `name`, `generic_name`, `dosage`, `frequency`, `instructions`, `pill_appearance`, `created_at`.
  - `contraindications`: `id`, `drug_a`, `drug_b`, `severity`, `clinical_effect`, `mechanism`, `recommendation`.
  - `schedule_items`: `id`, `medication_id`, `time_slot`, `food_instruction`, `is_spaced`, `is_taken`.
- [ ] **1.3 Data Access Layer (`lib/db-actions.ts`)**:
  - `getActiveMedications()`
  - `addMedication(med)`
  - `deleteMedication(id)`
  - `recordAdherence(id, isTaken)`

### 🎛️ Fine-Tuning Knobs:
- Toggle `DATABASE_URL` in `.env.local` to switch between live Neon Postgres and instant in-memory store.
- Adjust query timeout thresholds (default: 3000ms).

### ✅ Phase 1 Acceptance Criteria:
- Calling `getActiveMedications()` returns valid typed arrays under both live Neon and local fallback modes.

---

## 🧪 Phase 2: Fail-Safe Clinical Mock Presets & Data Models

### Objectives:
Create complete TypeScript interfaces and 3 pre-seeded clinical scenarios for 1-click live hackathon demonstrations.

### Implementation Checklist:
- [ ] **2.1 TypeScript Core Definitions (`types/medication.ts`)**:
  - `interface Medication`: id, name, genericName, strength, frequency, timingInstructions, pillAppearance (shape, color, imprint), warnings.
  - `interface InteractionAlert`: id, severity ('HIGH' | 'MODERATE' | 'FOOD' | 'DUPLICATE'), drugA, drugB, clinicalRisk, mechanism, recommendation.
  - `interface ScheduleSlot`: id, timeSlot ('08:00' | '13:00' | '19:00' | '22:00'), timeLabel, medicationId, medicationName, dosage, instructions, isSpaced, isTaken.
- [ ] **2.2 Pre-Packaged Demo Scenarios (`lib/mock-presets.ts`)**:
  - **Scenario A (Severe Bleeding Crisis)**:
    - *Warfarin 5mg* + *Ibuprofen 400mg* + *Lisinopril 10mg*.
    - High-risk alert: 3.5x GI bleeding hazard + renal clearance reduction.
  - **Scenario B (Thyroid-Mineral Absorption Conflict)**:
    - *Levothyroxine 50mcg* + *Calcium Carbonate 600mg* + *Metformin 500mg*.
    - Moderate alert: 4-hour absorption spacing required.
  - **Scenario C (Safe Maintenance Stack)**:
    - *Atorvastatin 20mg* + *Amlodipine 5mg* + *CoQ10 100mg*.
    - Food alert: Avoid grapefruit juice; take with evening meal.
- [ ] **2.3 Preset Selector Helper (`lib/preset-loader.ts`)**:
  - Function to inject any of the 3 scenarios into the active state with 1 function call.

### 🎛️ Fine-Tuning Knobs:
- Edit `mock-presets.ts` to add or customize patient clinical profiles or specific drug names.

### ✅ Phase 2 Acceptance Criteria:
- Preset loader returns completely populated, type-safe data structures with zero missing fields.

---

## 🧠 Phase 3: AI Multimodal Vision & Pharmacology Rules Engine

### Objectives:
Implement Gemini Flash multimodal OCR extraction, pharmacology rules engine, and fallback safety logic.

### Implementation Checklist:
- [ ] **3.1 Gemini Vision Route (`app/api/scan/route.ts`)**:
  - Accepts `multipart/form-data` image or base64 data.
  - Gemini Flash prompt with strict JSON schema:
    - Extracts Brand Name, Generic Name, Dosage, Frequency, Shape/Color.
  - Timeout protection (5000ms max) with instant fallback to nearest mock scenario.
- [ ] **3.2 Text Analysis Route (`app/api/analyze-text/route.ts`)**:
  - Accepts typed string (e.g. `"Ibuprofen 400mg"` or `"Warfarin"`).
  - Normalizes brand vs generic names via internal dictionary.
  - Inters standard dosage and frequency if not specified by user.
- [ ] **3.3 Clinical Rules Engine (`lib/pharmacology.ts`)**:
  - Evaluates combinations of all active medications:
    - Anticoagulant + NSAID -> 🔴 HIGH
    - Thyroid + Calcium/Iron -> 🟡 MODERATE (4h spacing required)
    - Statin + Grapefruit -> 🍽️ FOOD WARNING
    - Acetaminophen + Acetaminophen -> ⚠️ DUPLICATE ACTIVE INGREDIENT (4,000mg limit)
- [ ] **3.4 Auto-Spacing Calculation Logic (`lib/spacing-calculator.ts`)**:
  - If a 4-hour spacing conflict is detected, automatically relocates one conflicting dose to afternoon/evening with an `isSpaced: true` flag.

### 🎛️ Fine-Tuning Knobs:
- System prompt tuning in `lib/gemini.ts` for extraction precision on curved pill bottle labels.
- Add additional interaction pairs into `lib/pharmacology.ts` dictionary.

### ✅ Phase 3 Acceptance Criteria:
- Passing `{ drugA: "Warfarin", drugB: "Ibuprofen" }` produces a `HIGH` severity alert with mechanism explanation.
- Text route parses `"Advil 200mg"` into `{ genericName: "Ibuprofen", dosage: "200mg" }`.

---

## 📷 Phase 4: Two-Option Input Hub (Image & Text Modes)

### Objectives:
Deliver a clean 2-option selector: Option 1 (Image/Camera) and Option 2 (Text entry), plus 1-click demo chips.

### Implementation Checklist:
- [ ] **4.1 Two-Tab Mode Switcher (`components/input/InputModeSelector.tsx`)**:
  - Smooth animated pill tab indicator:
    - `[ 📷 Option 1: Image ]`
    - `[ ✍️ Option 2: Text ]`
  - Animated transition between modes using Framer Motion `AnimatePresence`.
- [ ] **4.2 Option 1: Cyber-Medical Viewfinder (`components/input/CameraScanner.tsx`)**:
  - HTML5 WebRTC video stream (`navigator.mediaDevices.getUserMedia`).
  - Animated laser scan beam (continuous smooth vertical sweep with glowing cyan trail).
  - Target reticle corner brackets with pulsing lock-on animation.
  - High-res photo file drag-and-drop zone (`input type="file" accept="image/*"`).
  - Instant snapshot capture canvas.
- [ ] **4.3 Option 2: Manual Drug Search (`components/input/TextInputMode.tsx`)**:
  - Clean search bar with instant autocomplete suggestions.
  - Quick-select dosage strength chips (`200mg`, `400mg`, `500mg`, `10mg`, `Custom`).
  - Frequency dropdown (*Once daily morning*, *Twice daily*, *Bedtime*).
  - Submit button with glowing gradient and loading spinner.
- [ ] **4.4 Quick-Demo Preset Chips (`components/input/DemoPresetBar.tsx`)**:
  - 3 prominent buttons pinned below input:
    - ⚡ *Demo 1: Severe Bleeding Conflict (Warfarin + NSAID)*
    - ⚡ *Demo 2: Thyroid Spacing Conflict (Levothyroxine + Calcium)*
    - ⚡ *Demo 3: Safe Daily Routine (Atorvastatin + Amlodipine)*

### 🎛️ Fine-Tuning Knobs:
- Camera scanner laser sweep speed (adjust duration: `2s` easeInOut).
- Autocomplete debounce delay (default: `150ms`).

### ✅ Phase 4 Acceptance Criteria:
- User can toggle between Image and Text modes without flickering.
- Camera starts and stops cleanly without holding browser media stream open.
- Clicking any demo preset immediately updates active medication state.

---

## 🚨 Phase 5: Safety Alerts & Contraindication Matrix

### Objectives:
Render rich, unambiguous clinical contraindication cards, mechanism drawer, and visual active medicine cabinet.

### Implementation Checklist:
- [ ] **5.1 Severity Alert Cards (`components/alerts/AlertCard.tsx`)**:
  - 🔴 **HIGH Alert**: Pulsing crimson border, heartbeat badge animation, *"DO NOT TAKE TOGETHER"* warning.
  - 🟡 **MODERATE Spacing Alert**: Amber border, clock icon, exact hour requirement banner.
  - 🍽️ **FOOD / DIET Alert**: Plate/fork icon, grapefruit prohibition banner.
  - ⚠️ **DUPLICATE INGREDIENT Alert**: Cumulative daily limit tracker with danger meter.
- [ ] **5.2 Clinical Mechanism Modal / Drawer (`components/alerts/MechanismModal.tsx`)**:
  - Pharmacokinetic & Pharmacodynamic breakdown.
  - CYP enzyme pathway details (e.g. CYP3A4 inhibition).
  - Official medical references (FDA, Lexicomp, PubMed citations).
- [ ] **5.3 Active Medication Cabinet (`components/medications/MedicationCabinet.tsx`)**:
  - Interactive grid of all currently active medications.
  - Pill avatar badge matching physical appearance (e.g., ⚪ White oval, 🟡 Yellow round, 🔴 Red capsule).
  - Individual pill removal action (trash icon) with instant re-calculation of interactions.

### 🎛️ Fine-Tuning Knobs:
- Heartbeat animation duration (`1.2s` pulse vs `0.8s` high-urgency).
- Card elevation shadows and border opacity.

### ✅ Phase 5 Acceptance Criteria:
- When conflicting drugs are in the cabinet, the corresponding alert card renders with correct colors and clinical explanation.
- Removing a conflicting medication instantly clears the alert card.

---

## ⏰ Phase 6: Interactive 24-Hour Timeline & Smart Scheduler

### Objectives:
Render an interactive 4-bucket daily medication timeline that automatically spaces conflicting drugs apart and tracks patient adherence.

### Implementation Checklist:
- [ ] **6.1 24-Hour Timeline Schedule Grid (`components/timeline/DailyTimeline.tsx`)**:
  - 4 Time Buckets:
    - 🌅 **Morning (08:00 AM)**
    - ☀️ **Afternoon (01:00 PM)**
    - 🌙 **Evening (07:00 PM)**
    - 🛌 **Bedtime (10:00 PM)**
- [ ] **6.2 Dynamic Auto-Spacing Engine (`components/timeline/TimelinePillCard.tsx`)**:
  - When pills have a spacing contraindication, the timeline automatically relocates one dose.
  - Displays a glowing tag: *"⚡ Auto-spaced by 4 hours for safety"*.
  - Displays dietary requirements (🍽️ *"Take with breakfast"*, 💧 *"Take with full glass of water"*).
- [ ] **6.3 Interactive Adherence Action (`components/timeline/AdherenceCheckbox.tsx`)**:
  - One-tap *"Mark as Taken"* toggle.
  - Spring-scale bounce interaction.
  - Confetti burst via `canvas-confetti` when a dose is taken.
- [ ] **6.4 Daily Adherence Progress Ring (`components/timeline/AdherenceRing.tsx`)**:
  - Visual circular SVG progress ring displaying percentage (e.g. *3 / 4 Doses Taken • 75%*).

### 🎛️ Fine-Tuning Knobs:
- Time bucket hour labels (customizable in `lib/constants.ts`).
- Confetti particle count and spread angle.

### ✅ Phase 6 Acceptance Criteria:
- Pills correctly populate their assigned time buckets.
- Auto-spacing pushes conflicting pills to separate slots with badge indicator.
- Clicking "Mark as Taken" updates the adherence ring and triggers confetti.

---

## 📋 Phase 7: Caregiver Export Modal, Audio Summary & Live Pitch Polish

### Objectives:
Create the clinician/caregiver export sheet, ensure 60fps responsiveness, and finalize demo keyboard shortcuts.

### Implementation Checklist:
- [ ] **7.1 Caregiver & Physician Summary (`components/summary/CaregiverSummaryModal.tsx`)**:
  - Printable / downloadable medical emergency sheet.
  - Complete list of active medications, daily schedule, and flagged drug-drug interactions.
  - Doctor signature & pharmacy contact section.
- [ ] **7.2 Accessibility & Audio Readout (`components/summary/AudioSummaryButton.tsx`)**:
  - Web Speech API (`speechSynthesis`) to read the plain-English safety summary aloud for elderly patients.
- [ ] **7.3 Keyboard Shortcuts for Live Presentation**:
  - Key `1`: Instantly load Scenario 1 (Severe Conflict)
  - Key `2`: Instantly load Scenario 2 (Spacing Conflict)
  - Key `3`: Instantly load Scenario 3 (Safe Stack)
  - Key `R`: Reset to clean slate
- [ ] **7.4 Production Build Verification**:
  - Run `npm run build` to verify zero TypeScript errors, zero lint warnings, and clean bundle output.

### 🎛️ Fine-Tuning Knobs:
- Speech synthesis rate (`0.95` for clear, intelligible elderly audio).
- Print CSS styles (`@media print`) for clean physical sheet exports.

### ✅ Phase 7 Acceptance Criteria:
- Clicking "Caregiver Export" opens a clean, printable medical report.
- App builds for production (`npm run build`) without errors.
- Demo hotkeys switch scenarios instantaneously.

---

## 🎨 UI Replication Registration Log (`ui-registry.md`)

When design references or prompts are provided by the user, extract and register their visual tokens below:

| Component Type | Background Token | Border Token | Radius | Motion / Interaction | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| *Scanner Frame* | *(from user reference)* | *(from user reference)* | *(from user reference)* | Laser sweep / HUD | Populated per user reference |
| *High Alert Card* | *(from user reference)* | *(from user reference)* | *(from user reference)* | Alert pulse / glow | Populated per user reference |
| *Spacing Card* | *(from user reference)* | *(from user reference)* | *(from user reference)* | Warning animation | Populated per user reference |
| *Timeline Card* | *(from user reference)* | *(from user reference)* | *(from user reference)* | Spring hover / state | Populated per user reference |
| *Preset Chip* | *(from user reference)* | *(from user reference)* | *(from user reference)* | Tap interaction | Populated per user reference |

---

## 🚀 Execution Instructions for Next Step
When you're ready to start building Phase 0, type **"Start Phase 0"** or provide your first **Design Reference**, and we will execute!
