# UI Registry — Atelier Nº9 Design System (RxGuard)

> **Design Reference:** Atelier Nº9 (Kombai Gallery `kombai:import-template:atelier`)  
> **Style Paradigm:** Hand-drawn sketchbook skeuomorphism, warm cream book-spread canvas, watercolor blots, washi tape, torn-paper cards, and ink pen strokes.  
> **Type Pairing:** `Caveat` (expressive script display), `Special Elite` (typewriter monospace eyebrows/data), `Karla` (clean editorial body).

---

## 🎨 Color Palette Tokens

| Token Name | Hex / CSS Value | Semantic Role |
| :--- | :--- | :--- |
| `--color-paper` | `#F4EEE2` | Main page canvas background, sketchbook paper surface |
| `--color-paper-warm` | `#E7DDC8` | Secondary warm paper, container accents, card backs |
| `--color-cork` | `#6B5B45` | Pinned corkboard sections, warm grounding tone |
| `--color-ink` | `#33302B` | Primary ink text, hand-drawn outlines, dark button fills |
| `--color-body-soft` | `#4A463F` | Secondary readable paragraph copy |
| `--color-ultramarine` | `#3F5C9A` | Slate-blue/ultramarine watercolor wash, clinical focus, scanner beams |
| `--color-terracotta` | `#A85A33` | Burnt orange/terracotta for typewriter eyebrows, washi tape, alert accents |
| `--color-sage` | `#6E8C4F` | Olive/sage green for safe status, checkmarks, timing notes |
| `--color-washi-tape` | `rgba(168,90,51,0.28)` | Translucent washi tape strips pinning cards |
| `--color-watercolor-blue`| `rgba(63,92,154,0.18)` | Soft blue watercolor pool for card backgrounds |
| `--color-watercolor-red` | `rgba(168,90,51,0.22)` | Terracotta/rose watercolor pool for high-risk warnings |
| `--color-watercolor-green`| `rgba(110,140,79,0.20)` | Sage watercolor pool for safe medication badges |

---

## ✒️ Typography Hierarchy

| Style Role | Font Family | Size / Leading | Usage |
| :--- | :--- | :--- | :--- |
| **Display / Headline** | `Caveat`, cursive | `clamp(2.5rem, 5vw, 4.5rem)`, leading-none | Main hero titles, clinical section callouts, doctor notes |
| **Script Accent** | `Caveat`, cursive | `1.25rem - 1.75rem` (`text-xl` to `text-2xl`) | Margin notes (`study no. 47 ↺`, `free first lesson ↘`), arrows |
| **Eyebrow / Monospace** | `Special Elite`, monospace | `11px - 13px`, tracking-widest, uppercase | Patient ID, clinical severity flags, dosage values, time slots |
| **Body / Copy** | `Karla`, sans-serif | `15px - 18px`, leading-relaxed | Drug descriptions, mechanisms of action, patient guidance |
| **Hand-drawn Buttons** | `Special Elite` + SVG frame | `13px - 14px`, tracking-wide | Wobbly ink stroke action buttons |

---

## 📐 Surfaces, Shapes & Skeuomorphic Details

| Component Element | Styling Specification | Visual Effect |
| :--- | :--- | :--- |
| **Paper Canvas** | `bg-[#F4EEE2]` with `.grain` SVG turbulence overlay | Tactile artist's sketchbook page |
| **Book Center Gutter** | `linear-gradient(to right, transparent, rgba(51,48,43,0.14), ...)` | Spine fold of an open medical journal / sketchbook |
| **Torn Paper Card** | `clip-path: polygon(2% 4%, 98% 0%, 100% 94%, 4% 100%, 0% 50%)` | Hand-torn paper card effect |
| **Washi Tape Strip** | `h-6 w-24 bg-[#A85A33]/30 mix-blend-multiply rotate-[-4deg]` | Physical tape holding cards down |
| **Hand-Drawn Button** | SVG wobbly rect (`d="M10 14 Q60 6 110 9..."`) with ink text | Sketched ink action button with hover lift |
| **Watercolor Blobs** | `radial-gradient(circle, rgba(...))` with blob radius `55% 45% 60% 40%` | Watercolor wash blooming behind clinical cards |
| **Doodle Arrows & Lines** | Hand-sketched SVG paths with dashed strokes (`stroke-dasharray: 1 8`) | Botanical / sketch margin annotations |

---

## 🎬 Micro-Animations & Interaction Physics

| Element | Interaction / Motion | Implementation |
| :--- | :--- | :--- |
| **Pencil Trail** | Follows mouse on paper canvas in scanner/hero area | HTML5 Canvas particle dot trail |
| **Ink Buttons** | Lift up and tilt slightly: `translateY(-2px) rotate(-1deg)` | CSS transition + Framer Motion spring |
| **Polaroid / Pill Cards** | Hover: `rotate(0deg) translateY(-8px) scale(1.02)`, shadow bloom | CSS / Framer Motion hover states |
| **Self-Drawing SVGs** | Lines draw themselves on mount (`strokeDashoffset: 0`) | Framer Motion / SVG path animation |
| **Pulsing Warning Blot** | Terracotta / Crimson watercolor wash expands and breathes | CSS keyframes `pulseWatercolor` |
