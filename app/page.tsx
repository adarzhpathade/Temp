"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Pill,
  Clock,
  Camera,
  Search,
  AlertTriangle,
  CheckCircle2,
  Printer,
  Volume2,
  RotateCcw,
  Trash2,
  Plus,
  Sparkles,
  User,
  Info,
  Calendar,
  HeartPulse,
  Utensils,
  ArrowRight,
  Upload,
} from "lucide-react";
import confetti from "canvas-confetti";

interface MedicationItem {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  instructions: string;
  pillAppearance: {
    shape: string;
    color: string;
    imprint: string;
    description: string;
  };
}

interface AlertItem {
  id: string;
  severity: "HIGH" | "MODERATE" | "FOOD" | "DUPLICATE";
  title: string;
  drugs: [string, string] | [string];
  mechanism: string;
  directive: string;
}

interface ScheduleItem {
  id: string;
  timeSlot: "08:00" | "13:00" | "19:00" | "22:00";
  slotLabel: string;
  medication: string;
  dosage: string;
  foodNote: string;
  isSpaced?: boolean;
  isTaken: boolean;
}

// 3 Pre-Packaged Demo Scenarios
const DEMO_SCENARIOS = {
  bleeding: {
    title: "Scenario A: Severe Bleeding Conflict",
    subtitle: "Warfarin + OTC Ibuprofen Hazard",
    accent: "#A85A33",
    medications: [
      {
        id: "m-1",
        name: "Coumadin",
        genericName: "Warfarin Sodium",
        dosage: "5mg",
        frequency: "Once daily at morning",
        instructions: "Take consistently at 08:00 AM with water",
        pillAppearance: {
          shape: "round",
          color: "#f6b26b",
          imprint: "COUMADIN 5",
          description: "Peach round scored tablet",
        },
      },
      {
        id: "m-2",
        name: "Advil",
        genericName: "Ibuprofen",
        dosage: "400mg",
        frequency: "As needed for joint pain",
        instructions: "Taken with meals",
        pillAppearance: {
          shape: "capsule",
          color: "#cc4125",
          imprint: "ADVIL 400",
          description: "Red-brown liquid gel capsule",
        },
      },
      {
        id: "m-3",
        name: "Zestril",
        genericName: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        instructions: "Take in the morning for blood pressure",
        pillAppearance: {
          shape: "round",
          color: "#ffe599",
          imprint: "L 10",
          description: "Yellow round tablet",
        },
      },
    ] as MedicationItem[],
    alerts: [
      {
        id: "a-1",
        severity: "HIGH",
        title: "GI Mucosal Hemorrhage & Platelet Aggregation Conflict",
        drugs: ["Warfarin Sodium", "Ibuprofen"],
        mechanism:
          "Ibuprofen displaces Warfarin from plasma albumin binding sites and inhibits platelet COX-1, escalating gastrointestinal bleeding risk by 3.5× while blunting Lisinopril antihypertensive efficacy.",
        directive:
          "DISCONTINUE OTC Ibuprofen immediately. Consult prescribing physician for Acetaminophen substitution (max 2,000mg/day).",
      },
    ] as AlertItem[],
    schedule: [
      {
        id: "s-1",
        timeSlot: "08:00",
        slotLabel: "Morning",
        medication: "Warfarin (Coumadin)",
        dosage: "5mg",
        foodNote: "Take with 8oz water; avoid vitamin K swings",
        isTaken: true,
      },
      {
        id: "s-2",
        timeSlot: "08:00",
        slotLabel: "Morning",
        medication: "Lisinopril (Zestril)",
        dosage: "10mg",
        foodNote: "Take with or without food",
        isTaken: true,
      },
      {
        id: "s-3",
        timeSlot: "13:00",
        slotLabel: "Afternoon",
        medication: "Ibuprofen (Advil)",
        dosage: "400mg",
        foodNote: "⚠️ FLAGGED: Take with full meal if approved",
        isTaken: false,
      },
      {
        id: "s-4",
        timeSlot: "22:00",
        slotLabel: "Bedtime",
        medication: "Rest & Hydration",
        dosage: "—",
        foodNote: "Log BP before sleep",
        isTaken: false,
      },
    ] as ScheduleItem[],
  },
  thyroid: {
    title: "Scenario B: Thyroid Absorption Spacing",
    subtitle: "Levothyroxine + Calcium Carbonate Stagger",
    accent: "#3F5C9A",
    medications: [
      {
        id: "m-4",
        name: "Synthroid",
        genericName: "Levothyroxine",
        dosage: "50mcg",
        frequency: "Once daily on empty stomach",
        instructions: "Take 60 minutes before breakfast",
        pillAppearance: {
          shape: "oval",
          color: "#ffffff",
          imprint: "SYN 50",
          description: "White oval debossed tablet",
        },
      },
      {
        id: "m-5",
        name: "Caltrate",
        genericName: "Calcium Carbonate",
        dosage: "600mg",
        frequency: "Once daily with food",
        instructions: "Take with lunch or dinner",
        pillAppearance: {
          shape: "oblong",
          color: "#f3f3f3",
          imprint: "CAL 600",
          description: "Large white oblong coated tablet",
        },
      },
      {
        id: "m-6",
        name: "Glucophage",
        genericName: "Metformin HCl",
        dosage: "500mg",
        frequency: "Twice daily with meals",
        instructions: "Take with breakfast and dinner",
        pillAppearance: {
          shape: "round",
          color: "#ffffff",
          imprint: "MET 500",
          description: "White circular scored tablet",
        },
      },
    ] as MedicationItem[],
    alerts: [
      {
        id: "a-2",
        severity: "MODERATE",
        title: "Chelation Binding & Reduced Thyroid Hormone Bioavailability",
        drugs: ["Levothyroxine", "Calcium Carbonate"],
        mechanism:
          "Polyvalent calcium cations bind levothyroxine in the acidic gastrointestinal tract, forming an insoluble precipitate that diminishes T4 absorption by up to 55%.",
        directive:
          "AUTOMATICALLY SEPARATED: Enforce minimum 4-hour spacing between Levothyroxine (08:00 AM) and Calcium Carbonate (01:00 PM).",
      },
    ] as AlertItem[],
    schedule: [
      {
        id: "s-5",
        timeSlot: "08:00",
        slotLabel: "Morning",
        medication: "Levothyroxine (Synthroid)",
        dosage: "50mcg",
        foodNote: "Empty stomach • 60 mins before food",
        isTaken: true,
      },
      {
        id: "s-6",
        timeSlot: "08:00",
        slotLabel: "Morning",
        medication: "Metformin (Glucophage)",
        dosage: "500mg",
        foodNote: "Take with breakfast meal",
        isTaken: true,
      },
      {
        id: "s-7",
        timeSlot: "13:00",
        slotLabel: "Afternoon",
        medication: "Calcium Carbonate (Caltrate)",
        dosage: "600mg",
        foodNote: "Take with lunch",
        isSpaced: true,
        isTaken: false,
      },
      {
        id: "s-8",
        timeSlot: "19:00",
        slotLabel: "Evening",
        medication: "Metformin (Glucophage)",
        dosage: "500mg",
        foodNote: "Take with evening meal",
        isTaken: false,
      },
    ] as ScheduleItem[],
  },
  safe: {
    title: "Scenario C: Safe Maintenance Stack",
    subtitle: "Atorvastatin + Amlodipine Routine",
    accent: "#6E8C4F",
    medications: [
      {
        id: "m-7",
        name: "Lipitor",
        genericName: "Atorvastatin Calcium",
        dosage: "20mg",
        frequency: "Once daily evening",
        instructions: "Take with evening meal or bedtime",
        pillAppearance: {
          shape: "oval",
          color: "#ffffff",
          imprint: "ATV 20",
          description: "White elliptical tablet",
        },
      },
      {
        id: "m-8",
        name: "Norvasc",
        genericName: "Amlodipine Besylate",
        dosage: "5mg",
        frequency: "Once daily morning",
        instructions: "Take at consistent morning hour",
        pillAppearance: {
          shape: "octagonal",
          color: "#f9f9f9",
          imprint: "AML 5",
          description: "White octagonal scored tablet",
        },
      },
      {
        id: "m-9",
        name: "CoQ10",
        genericName: "Ubiquinone",
        dosage: "100mg",
        frequency: "Once daily with food",
        instructions: "Take with breakfast for cellular support",
        pillAppearance: {
          shape: "softgel",
          color: "#ffd966",
          imprint: "Q10",
          description: "Golden amber oval softgel",
        },
      },
    ] as MedicationItem[],
    alerts: [
      {
        id: "a-3",
        severity: "FOOD",
        title: "Dietary CYP3A4 Furanocoumarin Caution (Grapefruit)",
        drugs: ["Atorvastatin Calcium"],
        mechanism:
          "Grapefruit and Seville oranges irreversibly inhibit intestinal CYP3A4 isoenzymes, which can increase serum Atorvastatin concentrations and trigger rhabdomyolysis or myopathy.",
        directive:
          "Avoid consuming grapefruit juice or whole grapefruit during Atorvastatin therapy.",
      },
    ] as AlertItem[],
    schedule: [
      {
        id: "s-9",
        timeSlot: "08:00",
        slotLabel: "Morning",
        medication: "Amlodipine (Norvasc)",
        dosage: "5mg",
        foodNote: "Consistent morning dose with water",
        isTaken: true,
      },
      {
        id: "s-10",
        timeSlot: "08:00",
        slotLabel: "Morning",
        medication: "CoQ10 (Ubiquinone)",
        dosage: "100mg",
        foodNote: "Take with meal containing dietary fat",
        isTaken: true,
      },
      {
        id: "s-11",
        timeSlot: "19:00",
        slotLabel: "Evening",
        medication: "Atorvastatin (Lipitor)",
        dosage: "20mg",
        foodNote: "Take with dinner • No grapefruit products",
        isTaken: false,
      },
      {
        id: "s-12",
        timeSlot: "22:00",
        slotLabel: "Bedtime",
        medication: "Hydration & Rest",
        dosage: "—",
        foodNote: "Glass of water before sleep",
        isTaken: false,
      },
    ] as ScheduleItem[],
  },
};

export default function Home() {
  const [selectedScenarioKey, setSelectedScenarioKey] = useState<"bleeding" | "thyroid" | "safe">("bleeding");
  const [inputMode, setInputMode] = useState<"image" | "text">("image");
  const [customText, setCustomText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const scenario = DEMO_SCENARIOS[selectedScenarioKey];
  const [medications, setMedications] = useState<MedicationItem[]>(scenario.medications);
  const [alerts, setAlerts] = useState<AlertItem[]>(scenario.alerts);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(scenario.schedule);

  // Switch demo preset
  const handleSelectScenario = (key: "bleeding" | "thyroid" | "safe") => {
    setSelectedScenarioKey(key);
    const data = DEMO_SCENARIOS[key];
    setMedications(data.medications);
    setAlerts(data.alerts);
    setSchedule(data.schedule);
  };

  // Toggle dose taken & trigger celebration confetti
  const handleToggleTaken = (id: string) => {
    setSchedule((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.isTaken;
          if (nextState) {
            confetti({
              particleCount: 45,
              spread: 60,
              origin: { y: 0.7 },
              colors: ["#3F5C9A", "#A85A33", "#6E8C4F", "#33302B"],
            });
          }
          return { ...item, isTaken: nextState };
        }
        return item;
      })
    );
  };

  // Remove medication
  const handleRemoveMedication = (id: string) => {
    const updated = medications.filter((m) => m.id !== id);
    setMedications(updated);
    // If fewer than 2 meds, clear interaction alerts
    if (updated.length < 2) {
      setAlerts([]);
    }
  };

  // Simulate scanning action
  const handleTriggerScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      confetti({
        particleCount: 50,
        spread: 70,
        colors: ["#3F5C9A", "#A85A33", "#6E8C4F"],
      });
    }, 1200);
  };

  // Web Speech API plain English summary readout
  const handleSpeakSummary = () => {
    if (!("speechSynthesis" in window)) return;
    if (audioPlaying) {
      window.speechSynthesis.cancel();
      setAudioPlaying(false);
      return;
    }

    const highAlert = alerts.find((a) => a.severity === "HIGH");
    const textToRead = highAlert
      ? `Attention for patient Margaret Vance. High safety alert detected between ${highAlert.drugs.join(
          " and "
        )}. ${highAlert.directive}`
      : `Prescription schedule reviewed for patient Margaret Vance. ${medications.length} active prescriptions currently managed. All doses appropriately spaced.`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.onend = () => setAudioPlaying(false);
    utterance.onerror = () => setAudioPlaying(false);
    setAudioPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  // Adherence calculation
  const totalDoses = schedule.filter((s) => s.dosage !== "—").length;
  const takenDoses = schedule.filter((s) => s.dosage !== "—" && s.isTaken).length;
  const adherencePercent = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 100;

  return (
    <div className="relative min-h-screen bg-[#F4EEE2] text-[#33302B] font-karla selection:bg-[#A85A33]/25 selection:text-[#33302B] overflow-x-hidden">
      {/* Tactile Paper Grain Texture Overlay */}
      <div className="grain" />

      {/* Top Tactical Command Header */}
      <header className="relative z-20 border-b border-[#33302B]/15 bg-[#FAF6EE]/90 backdrop-blur-md sticky top-0 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Clinical Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#33302B] text-[#F4EEE2] flex items-center justify-center shadow-sm rotate-[-1deg]">
              <ShieldAlert className="w-5 h-5 text-[#FAF6EE]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cav text-3xl font-bold tracking-tight text-[#33302B] leading-none">
                  RxGuard
                </span>
                <span className="font-elite text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[#33302B]/30 bg-[#E7DDC8] text-[#33302B] rounded-xs">
                  Pharmalens PS-6
                </span>
              </div>
              <p className="font-elite text-[11px] text-[#A85A33] tracking-wide">
                MULTI-MODAL PRESCRIPTION SCANNER & CONTRAINDICATION MATRIX
              </p>
            </div>
          </div>

          {/* Patient Dossier Chip with Washi Tape */}
          <div className="relative bg-white px-4 py-2 border border-[#33302B]/20 shadow-xs rotate-[0.5deg]">
            <div className="tape" style={{ top: "-9px", right: "15%", transform: "rotate(2deg)" }} />
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#E7DDC8] flex items-center justify-center text-[#33302B]">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-elite text-xs text-[#33302B] font-semibold">
                    Margaret Vance, 74
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6E8C4F]" />
                </div>
                <p className="font-elite text-[10px] text-[#3F5C9A]">
                  Polypharmacy Journal #RX-9042 · Dr. Chen Verified
                </p>
              </div>
            </div>
          </div>

          {/* Quick Header Utility Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeakSummary}
              className={`ink-btn px-3 py-1.5 font-elite text-xs uppercase tracking-wider border flex items-center gap-1.5 rounded-xs transition-colors ${
                audioPlaying
                  ? "bg-[#A85A33] text-white border-[#A85A33]"
                  : "bg-white text-[#33302B] border-[#33302B]/30 hover:bg-[#FAF6EE]"
              }`}
              title="Voice summary for elderly patients"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{audioPlaying ? "Playing..." : "Audio Readout"}</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="ink-btn px-3 py-1.5 bg-white text-[#33302B] font-elite text-xs uppercase tracking-wider border border-[#33302B]/30 hover:bg-[#FAF6EE] flex items-center gap-1.5 rounded-xs"
              title="Print clinical care report"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Caregiver Sheet</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Clinical Dashboard Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Preset Selector Banner (Zero-Failure Hackathon Demo Controls) */}
        <section className="bg-white border border-[#33302B]/15 p-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A85A33]" />
              <span className="font-elite text-xs uppercase tracking-wider text-[#33302B]">
                1-Click Demo Scenarios (Pre-Seeded Offline Resilience):
              </span>
            </div>
            <span className="font-cav text-lg text-[#6E8C4F]">
              instant fail-safe switch ↘
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(
              [
                ["bleeding", "Scenario A: Severe Bleeding", "Warfarin + Ibuprofen (High Risk)", "#A85A33"],
                ["thyroid", "Scenario B: Mineral Spacing", "Levothyroxine + Calcium (4h Stagger)", "#3F5C9A"],
                ["safe", "Scenario C: Safe Maintenance", "Atorvastatin + Amlodipine (Diet Caution)", "#6E8C4F"],
              ] as const
            ).map(([key, label, sub, color]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectScenario(key)}
                className={`p-3 text-left border transition-all rounded-xs relative ${
                  selectedScenarioKey === key
                    ? "bg-[#FAF6EE] border-[#33302B] shadow-sm -translate-y-0.5"
                    : "bg-white border-[#33302B]/20 hover:bg-[#FAF6EE]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-elite text-xs uppercase tracking-wider font-semibold"
                    style={{ color }}
                  >
                    {label}
                  </span>
                  {selectedScenarioKey === key && (
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                  )}
                </div>
                <p className="font-karla text-xs text-[#4A463F] mt-1">{sub}</p>
              </button>
            ))}
          </div>
        </section>

        {/* 2-Column Application Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ================= LEFT COLUMN: INPUT CHANNELS & MEDICINE CABINET (5 cols) ================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* CARD 1: Two Clean Input Channels (Image vs Text) */}
            <div className="bg-white border border-[#33302B]/20 shadow-sm p-6 relative">
              <div className="tape" style={{ top: "-11px", left: "20%", transform: "rotate(-3deg)" }} />

              <div className="flex items-center justify-between pb-3 border-b border-[#33302B]/10 mb-4">
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-[#3F5C9A]" />
                  <h2 className="font-elite text-xs uppercase tracking-wider text-[#33302B]">
                    Prescription Input Channel
                  </h2>
                </div>
                <span className="font-cav text-lg text-[#A85A33]">
                  two options ✍️
                </span>
              </div>

              {/* Segmented Mode Selector */}
              <div className="grid grid-cols-2 gap-2 bg-[#FAF6EE] p-1 border border-[#33302B]/15 mb-4 rounded-xs">
                <button
                  type="button"
                  onClick={() => setInputMode("image")}
                  className={`py-2 px-3 font-elite text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                    inputMode === "image"
                      ? "bg-[#33302B] text-[#F4EEE2] shadow-xs"
                      : "text-[#33302B] hover:bg-[#E7DDC8]/60"
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 text-[#A85A33]" />
                  Option 1: Image
                </button>

                <button
                  type="button"
                  onClick={() => setInputMode("text")}
                  className={`py-2 px-3 font-elite text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                    inputMode === "text"
                      ? "bg-[#33302B] text-[#F4EEE2] shadow-xs"
                      : "text-[#33302B] hover:bg-[#E7DDC8]/60"
                  }`}
                >
                  <Search className="w-3.5 h-3.5 text-[#3F5C9A]" />
                  Option 2: Text
                </button>
              </div>

              {/* Mode 1: Image Mode (Camera / Viewfinder) */}
              {inputMode === "image" ? (
                <div className="space-y-4">
                  {/* Cyber-Medical Viewfinder with Atelier Stylings */}
                  <div className="relative h-56 border-2 border-dashed border-[#33302B]/30 bg-[#FAF6EE] flex flex-col items-center justify-center p-4 text-center overflow-hidden">
                    {/* Animated Scanning Laser Beam */}
                    <div
                      className={`absolute left-0 right-0 h-0.5 bg-[#3F5C9A] shadow-[0_0_8px_#3F5C9A] pointer-events-none ${
                        isScanning ? "animate-laser" : "top-1/2 opacity-40"
                      }`}
                    />

                    {/* Corner Reticle Brackets */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#33302B]" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#33302B]" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#33302B]" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#33302B]" />

                    <Camera className="w-8 h-8 text-[#33302B]/70 mb-2" />
                    <p className="font-elite text-xs text-[#33302B] font-semibold">
                      Align Pill Bottle or Upload Prescription
                    </p>
                    <p className="font-karla text-[11px] text-[#4A463F] mt-1 max-w-xs">
                      Gemini 2.0 Flash extracts Brand Name, NDC, Dosage & Pill Geometry in a single multi-modal call.
                    </p>

                    <label className="mt-3 cursor-pointer inline-flex items-center gap-1.5 bg-white border border-[#33302B]/30 px-3 py-1 font-elite text-[10px] uppercase tracking-wider text-[#33302B] hover:bg-[#FAF6EE]">
                      <Upload className="w-3 h-3 text-[#A85A33]" />
                      Browse Photo
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  </div>

                  {/* Scan Trigger Action Button */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      disabled={isScanning}
                      onClick={handleTriggerScan}
                      className="ink-btn w-full bg-[#33302B] text-[#F4EEE2] py-2.5 px-4 font-elite text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs hover:bg-[#24221E] disabled:opacity-70"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#E7DDC8]" />
                      {isScanning ? "Running Vision OCR..." : "Capture & Run Clinical OCR"}
                    </button>
                  </div>
                </div>
              ) : (
                /* Mode 2: Text Mode (Manual Search & Form) */
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-elite text-xs text-[#33302B] block">
                      Prescription Name / Active Chemical:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="e.g. Warfarin 5mg, Advil 400mg, Levothyroxine..."
                        className="w-full bg-[#FAF6EE] border border-[#33302B]/30 px-3.5 py-2 font-elite text-xs text-[#33302B] placeholder:text-[#33302B]/40 focus:outline-none focus:border-[#33302B]"
                      />
                    </div>
                  </div>

                  {/* Strength & Dosage Chips */}
                  <div className="space-y-1.5">
                    <span className="font-elite text-[11px] text-[#33302B]/70 block">
                      Quick Strength Selectors:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {["5mg", "10mg", "20mg", "400mg", "500mcg", "600mg"].map((dose) => (
                        <button
                          key={dose}
                          type="button"
                          onClick={() => setCustomText((prev) => (prev ? `${prev} ${dose}` : dose))}
                          className="font-elite text-[10px] px-2 py-0.5 bg-[#FAF6EE] border border-[#33302B]/30 hover:bg-[#33302B] hover:text-[#F4EEE2] transition-colors"
                        >
                          {dose}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!customText.trim()) return;
                      const newMed: MedicationItem = {
                        id: `m-${Date.now()}`,
                        name: customText,
                        genericName: customText,
                        dosage: "Standard dose",
                        frequency: "Daily",
                        instructions: "As directed by physician",
                        pillAppearance: {
                          shape: "round",
                          color: "#ffffff",
                          imprint: "RX",
                          description: "Standard white tablet",
                        },
                      };
                      setMedications([newMed, ...medications]);
                      setCustomText("");
                    }}
                    className="ink-btn w-full bg-[#33302B] text-[#F4EEE2] py-2.5 px-4 font-elite text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs hover:bg-[#24221E]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Prescription to Active Cabinet
                  </button>
                </div>
              )}
            </div>

            {/* CARD 2: Active Medication Cabinet */}
            <div className="bg-white border border-[#33302B]/20 shadow-sm p-6 relative">
              <div className="tape-blue tape" style={{ top: "-11px", right: "20%", transform: "rotate(3deg)" }} />

              <div className="flex items-center justify-between pb-3 border-b border-[#33302B]/10 mb-4">
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-[#A85A33]" />
                  <h3 className="font-elite text-xs uppercase tracking-wider text-[#33302B]">
                    Active Medicine Cabinet ({medications.length})
                  </h3>
                </div>
                <span className="font-cav text-lg text-[#3F5C9A]">
                  monitored actively ↺
                </span>
              </div>

              {/* Medication List */}
              <div className="space-y-3">
                {medications.map((med) => (
                  <div
                    key={med.id}
                    className="p-3 bg-[#FAF6EE] border border-[#33302B]/15 hover:border-[#33302B]/40 transition-all flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      {/* Pill appearance physical avatar */}
                      <div
                        className="w-8 h-8 rounded-full border border-[#33302B]/30 flex items-center justify-center text-[10px] font-elite font-bold shadow-xs shrink-0 mt-0.5"
                        style={{ backgroundColor: med.pillAppearance.color }}
                        title={med.pillAppearance.description}
                      >
                        💊
                      </div>

                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-karla text-sm font-bold text-[#33302B]">
                            {med.name}
                          </span>
                          <span className="font-elite text-xs text-[#A85A33] font-semibold">
                            {med.dosage}
                          </span>
                        </div>
                        <p className="font-elite text-[11px] text-[#4A463F]">
                          {med.genericName} · {med.frequency}
                        </p>
                        <p className="font-karla text-[11px] text-[#6B5B45] mt-0.5">
                          {med.instructions}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveMedication(med.id)}
                      className="text-[#33302B]/40 hover:text-[#A85A33] p-1 transition-colors"
                      title="Remove from cabinet"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {medications.length === 0 && (
                  <div className="text-center py-8 text-[#33302B]/50 font-elite text-xs border border-dashed border-[#33302B]/20">
                    Cabinet is currently empty. Add medication above.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: CONTRAINDICATIONS & 24H TIMELINE (7 cols) ================= */}
          <div className="lg:col-span-7 space-y-6">
            {/* CARD 3: Clinical Contraindication & Interaction Engine */}
            <div className="bg-white border border-[#33302B]/20 shadow-sm p-6 relative">
              <div className="tape" style={{ top: "-11px", right: "25%", transform: "rotate(2deg)" }} />

              <div className="flex items-center justify-between pb-3 border-b border-[#33302B]/10 mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#A85A33]" />
                  <h3 className="font-elite text-xs uppercase tracking-wider text-[#33302B]">
                    Clinical Contraindication Matrix
                  </h3>
                </div>
                <span className="font-cav text-lg text-[#A85A33]">
                  real-time evaluation ⚠️
                </span>
              </div>

              {/* Alert Banners */}
              {alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 border transition-all ${
                        alert.severity === "HIGH"
                          ? "bg-[#FAF6EE] border-[#A85A33] shadow-sm"
                          : alert.severity === "MODERATE"
                          ? "bg-[#FAF6EE] border-[#3F5C9A] shadow-sm"
                          : "bg-[#FAF6EE] border-[#6E8C4F] shadow-sm"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-elite text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold ${
                              alert.severity === "HIGH"
                                ? "bg-[#A85A33] text-white"
                                : alert.severity === "MODERATE"
                                ? "bg-[#3F5C9A] text-white"
                                : "bg-[#6E8C4F] text-white"
                            }`}
                          >
                            {alert.severity} SEVERITY
                          </span>
                          <span className="font-elite text-xs text-[#33302B] font-semibold">
                            {alert.drugs.join(" ⚡ ")}
                          </span>
                        </div>

                        <span className="font-cav text-xl text-[#A85A33]">
                          {alert.severity === "HIGH" ? "urgent review ⚠" : "safety note ↘"}
                        </span>
                      </div>

                      <h4 className="font-cav text-2xl font-bold text-[#33302B] leading-tight mb-2">
                        {alert.title}
                      </h4>

                      <p className="font-karla text-xs text-[#4A463F] leading-relaxed mb-3">
                        <strong className="text-[#33302B]">Clinical Mechanism:</strong> {alert.mechanism}
                      </p>

                      <div className="bg-white p-3 border border-[#33302B]/15 text-xs font-elite text-[#33302B] flex items-start gap-2">
                        <Info className="w-4 h-4 text-[#A85A33] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#A85A33]">DIRECTIVE: </strong>
                          {alert.directive}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-[#FAF6EE] border border-[#6E8C4F]/40 text-center">
                  <CheckCircle2 className="w-8 h-8 text-[#6E8C4F] mx-auto mb-2" />
                  <p className="font-cav text-2xl text-[#33302B] font-bold">
                    No Contraindications Detected
                  </p>
                  <p className="font-karla text-xs text-[#4A463F] mt-1 max-w-sm mx-auto">
                    The active combination shows no documented high-risk pharmacokinetic or pharmacodynamic conflicts.
                  </p>
                </div>
              )}
            </div>

            {/* CARD 4: Interactive 24-Hour Timeline & Smart Auto-Scheduler */}
            <div className="bg-white border border-[#33302B]/20 shadow-sm p-6 relative">
              <div className="tape-sage tape" style={{ top: "-11px", left: "20%", transform: "rotate(-2deg)" }} />

              <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#33302B]/10 mb-4 gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#3F5C9A]" />
                  <h3 className="font-elite text-xs uppercase tracking-wider text-[#33302B]">
                    Interactive 24-Hour Timeline & Adherence
                  </h3>
                </div>

                {/* Daily Adherence Progress Pill */}
                <div className="flex items-center gap-2 bg-[#FAF6EE] px-3 py-1 border border-[#33302B]/20">
                  <span className="font-elite text-[11px] text-[#33302B]">
                    Adherence: <strong>{takenDoses} / {totalDoses} Doses ({adherencePercent}%)</strong>
                  </span>
                  <div className="w-12 h-2 bg-[#E7DDC8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#6E8C4F] transition-all duration-500"
                      style={{ width: `${adherencePercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 4 Time Slots Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {schedule.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3.5 border transition-all relative ${
                      item.isTaken
                        ? "bg-[#FAF6EE] border-[#6E8C4F]/60 opacity-90"
                        : "bg-white border-[#33302B]/20 hover:border-[#33302B]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-elite text-[11px] px-1.5 py-0.5 bg-[#E7DDC8] text-[#33302B] font-semibold">
                          {item.timeSlot}
                        </span>
                        <span className="font-cav text-lg font-bold text-[#33302B]">
                          {item.slotLabel}
                        </span>
                      </div>

                      {/* Interactive Taken Checkbox */}
                      {item.dosage !== "—" && (
                        <button
                          type="button"
                          onClick={() => handleToggleTaken(item.id)}
                          className={`font-elite text-[10px] uppercase tracking-wider px-2 py-0.5 border flex items-center gap-1 transition-all ${
                            item.isTaken
                              ? "bg-[#6E8C4F] text-white border-[#6E8C4F]"
                              : "bg-white text-[#33302B] border-[#33302B]/30 hover:bg-[#FAF6EE]"
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {item.isTaken ? "Taken" : "Mark Taken"}
                        </button>
                      )}
                    </div>

                    <div className="font-karla text-sm font-bold text-[#33302B]">
                      {item.medication}
                      {item.dosage !== "—" && (
                        <span className="font-elite text-xs text-[#A85A33] ml-1.5 font-semibold">
                          ({item.dosage})
                        </span>
                      )}
                    </div>

                    <p className="font-karla text-[11px] text-[#4A463F] mt-1">
                      {item.foodNote}
                    </p>

                    {item.isSpaced && (
                      <div className="mt-2 inline-flex items-center gap-1 font-elite text-[10px] text-[#3F5C9A] bg-[#3F5C9A]/10 px-2 py-0.5 border border-[#3F5C9A]/30">
                        ⚡ Auto-spaced by 4 hours for safety
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Doctor's Signature & Care Directive in Caveat */}
              <div className="mt-4 pt-3 border-t border-[#33302B]/10 flex flex-wrap items-center justify-between text-xs text-[#4A463F] gap-2">
                <span className="font-elite text-[11px] text-[#33302B]">
                  Schedule synchronized with electronic medical record #RX-9042
                </span>
                <span className="font-cav text-xl text-[#33302B] rotate-[-2deg]">
                  Reviewed & Approved: Dr. Katherine Chen, MD ✍️
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
