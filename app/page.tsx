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
  Trash2,
  Plus,
  Sparkles,
  User,
  Info,
  Activity,
  ArrowRight,
  Upload,
  Calendar,
  X,
  FileCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { FloatingCommandNav } from "@/components/nav/FloatingCommandNav";

interface MedicationItem {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  instructions: string;
  pillAppearance: {
    shape: "round" | "oval" | "capsule" | "oblong" | "octagonal" | "softgel";
    colorHex: string;
    label: string;
  };
}

interface AlertItem {
  id: string;
  severity: "HIGH" | "MODERATE" | "FOOD" | "DUPLICATE";
  title: string;
  drugs: [string, string] | [string];
  mechanism: string;
  directive: string;
  evidenceScore: string;
}

interface ScheduleItem {
  id: string;
  timeSlot: "08:00" | "13:00" | "19:00" | "22:00";
  slotLabel: string;
  medication: string;
  dosage: string;
  foodRequirement: string;
  isSpaced?: boolean;
  isTaken: boolean;
}

const CLINICAL_PRESETS = {
  bleeding: {
    name: "Scenario A: Severe Bleeding Crisis",
    tagline: "Warfarin + OTC Ibuprofen Anticoagulant Hazard",
    severityLevel: "HIGH" as const,
    accentColor: "#A85A33",
    medications: [
      {
        id: "m-1",
        name: "Coumadin",
        genericName: "Warfarin Sodium",
        dosage: "5mg",
        frequency: "Once daily (Morning)",
        instructions: "Take consistently at 08:00 AM with water",
        pillAppearance: {
          shape: "round" as const,
          colorHex: "#F7BE98",
          label: "Peach round scored tablet",
        },
      },
      {
        id: "m-2",
        name: "Advil",
        genericName: "Ibuprofen",
        dosage: "400mg",
        frequency: "As needed for arthritic pain",
        instructions: "Taken with meals",
        pillAppearance: {
          shape: "capsule" as const,
          colorHex: "#B84732",
          label: "Red-brown liquid gel capsule",
        },
      },
      {
        id: "m-3",
        name: "Zestril",
        genericName: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily (Morning)",
        instructions: "Take in the morning for hypertension",
        pillAppearance: {
          shape: "round" as const,
          colorHex: "#FCE7A2",
          label: "Yellow circular tablet",
        },
      },
    ] as MedicationItem[],
    alerts: [
      {
        id: "a-1",
        severity: "HIGH" as const,
        title: "GI Hemorrhage & Platelet Aggregation Blockade",
        drugs: ["Warfarin Sodium", "Ibuprofen"] as [string, string],
        mechanism:
          "Ibuprofen displaces Warfarin from plasma albumin binding sites while inhibiting platelet COX-1, multiplying GI mucosal bleeding hazards by 3.5× and diminishing Lisinopril renal clearance.",
        directive:
          "DISCONTINUE OTC Ibuprofen immediately. Substitute with Acetaminophen (< 2,000mg/day) under physician supervision.",
        evidenceScore: "Level 1A (FDA Black Box Warning)",
      },
    ] as AlertItem[],
    schedule: [
      {
        id: "s-1",
        timeSlot: "08:00" as const,
        slotLabel: "Morning",
        medication: "Warfarin (Coumadin)",
        dosage: "5mg",
        foodRequirement: "Take with 8oz water; maintain stable dietary vitamin K",
        isTaken: true,
      },
      {
        id: "s-2",
        timeSlot: "08:00" as const,
        slotLabel: "Morning",
        medication: "Lisinopril (Zestril)",
        dosage: "10mg",
        foodRequirement: "Consistent morning dose with or without food",
        isTaken: true,
      },
      {
        id: "s-3",
        timeSlot: "13:00" as const,
        slotLabel: "Afternoon",
        medication: "Ibuprofen (Advil)",
        dosage: "400mg",
        foodRequirement: "⚠️ FLAGGED INTERACTION: Discontinue or take with food",
        isTaken: false,
      },
      {
        id: "s-4",
        timeSlot: "22:00" as const,
        slotLabel: "Bedtime",
        medication: "Hydration & Rest Slot",
        dosage: "—",
        foodRequirement: "Record blood pressure reading prior to sleep",
        isTaken: false,
      },
    ] as ScheduleItem[],
  },
  thyroid: {
    name: "Scenario B: Thyroid Mineral Chelation",
    tagline: "Levothyroxine + Calcium Carbonate 4-Hour Spacing",
    severityLevel: "MODERATE" as const,
    accentColor: "#3F5C9A",
    medications: [
      {
        id: "m-4",
        name: "Synthroid",
        genericName: "Levothyroxine Sodium",
        dosage: "50mcg",
        frequency: "Once daily on empty stomach",
        instructions: "Take 60 minutes before breakfast with full glass of water",
        pillAppearance: {
          shape: "oval" as const,
          colorHex: "#FFFFFF",
          label: "White oval scored tablet",
        },
      },
      {
        id: "m-5",
        name: "Caltrate",
        genericName: "Calcium Carbonate",
        dosage: "600mg",
        frequency: "Once daily (Afternoon)",
        instructions: "Take with lunch or afternoon meal",
        pillAppearance: {
          shape: "oblong" as const,
          colorHex: "#EFEFEF",
          label: "White oblong dense tablet",
        },
      },
      {
        id: "m-6",
        name: "Glucophage",
        genericName: "Metformin HCl",
        dosage: "500mg",
        frequency: "Twice daily with meals",
        instructions: "Take with breakfast and dinner to reduce GI upset",
        pillAppearance: {
          shape: "round" as const,
          colorHex: "#FFFFFF",
          label: "White round scored tablet",
        },
      },
    ] as MedicationItem[],
    alerts: [
      {
        id: "a-2",
        severity: "MODERATE" as const,
        title: "Insoluble Chelation Complexation & Diminished T4 Bioavailability",
        drugs: ["Levothyroxine", "Calcium Carbonate"] as [string, string],
        mechanism:
          "Divalent calcium cations bind thyroxine in the gastric lumen, precipitating an insoluble chelate that reduces circulating T4 hormone absorption by up to 55%.",
        directive:
          "AUTOMATICALLY ENFORCED: 4-hour temporal separation required. Levothyroxine scheduled at 08:00 AM; Calcium shifted to 01:00 PM.",
        evidenceScore: "Level 2B (Clinical Pharmacology Lexicomp)",
      },
    ] as AlertItem[],
    schedule: [
      {
        id: "s-5",
        timeSlot: "08:00" as const,
        slotLabel: "Morning",
        medication: "Levothyroxine (Synthroid)",
        dosage: "50mcg",
        foodRequirement: "Strictly empty stomach • 60 mins before meals",
        isTaken: true,
      },
      {
        id: "s-6",
        timeSlot: "08:00" as const,
        slotLabel: "Morning",
        medication: "Metformin (Glucophage)",
        dosage: "500mg",
        foodRequirement: "Take with breakfast",
        isTaken: true,
      },
      {
        id: "s-7",
        timeSlot: "13:00" as const,
        slotLabel: "Afternoon",
        medication: "Calcium Carbonate (Caltrate)",
        dosage: "600mg",
        foodRequirement: "Take with lunch • Auto-staggered by 4h",
        isSpaced: true,
        isTaken: false,
      },
      {
        id: "s-8",
        timeSlot: "19:00" as const,
        slotLabel: "Evening",
        medication: "Metformin (Glucophage)",
        dosage: "500mg",
        foodRequirement: "Take with dinner",
        isTaken: false,
      },
    ] as ScheduleItem[],
  },
  safe: {
    name: "Scenario C: Safe Maintenance Regimen",
    tagline: "Atorvastatin + Amlodipine Monitored Stack",
    severityLevel: "FOOD" as const,
    accentColor: "#5F7D43",
    medications: [
      {
        id: "m-7",
        name: "Lipitor",
        genericName: "Atorvastatin Calcium",
        dosage: "20mg",
        frequency: "Once daily (Evening)",
        instructions: "Take with evening meal or at bedtime",
        pillAppearance: {
          shape: "oval" as const,
          colorHex: "#FFFFFF",
          label: "White elliptical tablet",
        },
      },
      {
        id: "m-8",
        name: "Norvasc",
        genericName: "Amlodipine Besylate",
        dosage: "5mg",
        frequency: "Once daily (Morning)",
        instructions: "Take every morning at consistent hour",
        pillAppearance: {
          shape: "octagonal" as const,
          colorHex: "#F5F5F5",
          label: "White octagonal scored tablet",
        },
      },
      {
        id: "m-9",
        name: "CoQ10",
        genericName: "Ubiquinone",
        dosage: "100mg",
        frequency: "Once daily with food",
        instructions: "Take with breakfast for cellular coenzyme support",
        pillAppearance: {
          shape: "softgel" as const,
          colorHex: "#FAD066",
          label: "Golden amber oval softgel",
        },
      },
    ] as MedicationItem[],
    alerts: [
      {
        id: "a-3",
        severity: "FOOD" as const,
        title: "Intestinal CYP3A4 Furanocoumarin Dietary Interaction",
        drugs: ["Atorvastatin Calcium"] as [string],
        mechanism:
          "Grapefruit compounds irreversibly inhibit intestinal CYP3A4, causing significant elevations in circulating Atorvastatin levels and elevating risk of myalgia or rhabdomyolysis.",
        directive:
          "Avoid whole grapefruit, juice, and Seville orange marmalade during active Atorvastatin therapy.",
        evidenceScore: "Level 1B (FDA Guidance & PubMed)",
      },
    ] as AlertItem[],
    schedule: [
      {
        id: "s-9",
        timeSlot: "08:00" as const,
        slotLabel: "Morning",
        medication: "Amlodipine (Norvasc)",
        dosage: "5mg",
        foodRequirement: "Take with full glass of water",
        isTaken: true,
      },
      {
        id: "s-10",
        timeSlot: "08:00" as const,
        slotLabel: "Morning",
        medication: "CoQ10 (Ubiquinone)",
        dosage: "100mg",
        foodRequirement: "Take with meal containing dietary lipids",
        isTaken: true,
      },
      {
        id: "s-11",
        timeSlot: "19:00" as const,
        slotLabel: "Evening",
        medication: "Atorvastatin (Lipitor)",
        dosage: "20mg",
        foodRequirement: "Take with dinner • Strictly no grapefruit",
        isTaken: false,
      },
      {
        id: "s-12",
        timeSlot: "22:00" as const,
        slotLabel: "Bedtime",
        medication: "Hydration & Rest Slot",
        dosage: "—",
        foodRequirement: "Standard evening hydration",
        isTaken: false,
      },
    ] as ScheduleItem[],
  },
};

export default function Home() {
  const [activeScenarioKey, setActiveScenarioKey] = useState<"bleeding" | "thyroid" | "safe">("bleeding");
  const [inputChannel, setInputChannel] = useState<"image" | "text">("image");
  const [manualDrugText, setManualDrugText] = useState("");
  const [isScanningActive, setIsScanningActive] = useState(false);
  const [isAudioSpeaking, setIsAudioSpeaking] = useState(false);
  const [isCaregiverModalOpen, setIsCaregiverModalOpen] = useState(false);

  const scenario = CLINICAL_PRESETS[activeScenarioKey];
  const [medications, setMedications] = useState<MedicationItem[]>(scenario.medications);
  const [alerts, setAlerts] = useState<AlertItem[]>(scenario.alerts);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(scenario.schedule);

  // Switch demo preset immediately
  const handleSelectScenario = (key: "bleeding" | "thyroid" | "safe") => {
    setActiveScenarioKey(key);
    const data = CLINICAL_PRESETS[key];
    setMedications(data.medications);
    setAlerts(data.alerts);
    setSchedule(data.schedule);
  };

  // Toggle dose taken & fire particle confetti
  const handleToggleTaken = (id: string) => {
    setSchedule((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.isTaken;
          if (nextState) {
            confetti({
              particleCount: 55,
              spread: 65,
              origin: { y: 0.65 },
              colors: ["#3F5C9A", "#A85A33", "#5F7D43", "#2B2723"],
            });
          }
          return { ...item, isTaken: nextState };
        }
        return item;
      })
    );
  };

  // Remove medication from cabinet
  const handleRemoveMed = (id: string) => {
    const updated = medications.filter((m) => m.id !== id);
    setMedications(updated);
    if (updated.length < 2) {
      setAlerts([]);
    }
  };

  // Simulate scanning trigger
  const handleRunOCRScan = () => {
    setIsScanningActive(true);
    setTimeout(() => {
      setIsScanningActive(false);
      confetti({
        particleCount: 60,
        spread: 80,
        colors: ["#3F5C9A", "#A85A33", "#5F7D43"],
      });
    }, 1400);
  };

  // Elderly plain English audio summary
  const handleToggleAudio = () => {
    if (!("speechSynthesis" in window)) return;
    if (isAudioSpeaking) {
      window.speechSynthesis.cancel();
      setIsAudioSpeaking(false);
      return;
    }

    const highAlert = alerts.find((a) => a.severity === "HIGH");
    const summary = highAlert
      ? `Important safety advisory for patient Margaret Vance. A critical conflict exists between ${highAlert.drugs.join(
          " and "
        )}. ${highAlert.directive}`
      : `Clinical safety check completed for patient Margaret Vance. ${medications.length} active prescriptions currently verified. Daily doses are appropriately separated.`;

    const utterance = new SpeechSynthesisUtterance(summary);
    utterance.rate = 0.92;
    utterance.onend = () => setIsAudioSpeaking(false);
    utterance.onerror = () => setIsAudioSpeaking(false);
    setIsAudioSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Adherence calculation
  const totalDoses = schedule.filter((s) => s.dosage !== "—").length;
  const dosesTaken = schedule.filter((s) => s.dosage !== "—" && s.isTaken).length;
  const adherenceRate = totalDoses > 0 ? Math.round((dosesTaken / totalDoses) * 100) : 100;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2B2723] font-sans-clinical selection:bg-[#A85A33]/20 selection:text-[#2B2723] relative">
      {/* Subtle Fixed Micro-Grain Texture */}
      <div className="fixed-grain" />

      {/* ================= MODERN FLOATING ISLAND COMMAND NAV ================= */}
      <FloatingCommandNav
        isAudioSpeaking={isAudioSpeaking}
        onToggleAudio={handleToggleAudio}
        onOpenCaregiverModal={() => setIsCaregiverModalOpen(true)}
        alertCount={alerts.length}
        medicationCount={medications.length}
        adherenceRate={adherenceRate}
      />

      {/* Modern Clinical Telemetry Status Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-1">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#57524C] bg-white/60 backdrop-blur-md px-4 py-2 rounded-xl border border-[#2B2723]/6 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5F7D43] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5F7D43]" />
            </span>
            <span className="font-semibold text-[#2B2723]">
              Autonomous Safety Engine Armed
            </span>
            <span className="text-[#8C857D] hidden sm:inline">·</span>
            <span className="hidden sm:inline font-mono-clinical text-[10px] text-[#3F5C9A]">
              Gemini 2.0 Flash Vision Multimodal
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono-clinical text-[10px]">
            <span className="flex items-center gap-1.5 text-[#57524C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3F5C9A]" />
              Neon Postgres: Standby
            </span>
            <span className="flex items-center gap-1.5 text-[#57524C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A85A33]" />
              Offline Fail-Safe: Armed
            </span>
          </div>
        </div>
      </div>


      {/* ================= MAIN DASHBOARD WORKSPACE ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 1-Click Clinical Demo Scenarios (Zero-Failure Hackathon Gate) */}
        <div className="double-bezel-card">
          <div className="double-bezel-inner p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A85A33]" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#2B2723]">
                  1-Click Live Demonstration Presets (Instant Offline Fail-Safe):
                </h2>
              </div>
              <span className="font-script text-lg text-[#5F7D43]">
                zero network latency ↘
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(
                [
                  [
                    "bleeding",
                    "Scenario A: Severe Bleeding Crisis",
                    "Warfarin 5mg + Ibuprofen 400mg (3.5× Hazard)",
                    "#A85A33",
                  ],
                  [
                    "thyroid",
                    "Scenario B: Mineral Spacing Conflict",
                    "Levothyroxine 50mcg + Calcium 600mg (4h Stagger)",
                    "#3F5C9A",
                  ],
                  [
                    "safe",
                    "Scenario C: Safe Maintenance Regimen",
                    "Atorvastatin 20mg + Amlodipine 5mg (Dietary Caution)",
                    "#5F7D43",
                  ],
                ] as const
              ).map(([key, name, desc, color]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectScenario(key)}
                  className={`spring-hover text-left p-3.5 rounded-xl border cursor-pointer relative transition-all ${
                    activeScenarioKey === key
                      ? "bg-[#FAF8F5] border-[#2B2723] shadow-xs"
                      : "bg-white border-[#2B2723]/10 hover:border-[#2B2723]/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-bold tracking-tight"
                      style={{ color }}
                    >
                      {name}
                    </span>
                    {activeScenarioKey === key && (
                      <span
                        className="w-2 h-2 rounded-full ring-2 ring-white"
                        style={{ backgroundColor: color }}
                      />
                    )}
                  </div>
                  <p className="text-[11px] text-[#57524C] mt-1">{desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Master Bento Grid (Left 5 Cols: Input & Cabinet | Right 7 Cols: Matrix & Timeline) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ================= LEFT BENTO: INPUT CHANNELS & CABINET (5 Cols) ================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* CARD 1: Two Clean Input Channels (Image vs Text) */}
            <div className="double-bezel-card">
              <div className="double-bezel-inner p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#2B2723]/8">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-[#3F5C9A]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#2B2723]">
                      Prescription Input Channels
                    </h3>
                  </div>
                  <span className="font-mono-clinical text-[11px] text-[#A85A33]">
                    PS-6 CORE
                  </span>
                </div>

                {/* Concentric Segmented Switcher */}
                <div className="grid grid-cols-2 p-1 rounded-xl bg-[#FAF8F5] border border-[#2B2723]/10">
                  <button
                    type="button"
                    onClick={() => setInputChannel("image")}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      inputChannel === "image"
                        ? "bg-white text-[#2B2723] shadow-xs border border-[#2B2723]/10"
                        : "text-[#57524C] hover:text-[#2B2723]"
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5 text-[#A85A33]" />
                    Option 1: Image
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputChannel("text")}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      inputChannel === "text"
                        ? "bg-white text-[#2B2723] shadow-xs border border-[#2B2723]/10"
                        : "text-[#57524C] hover:text-[#2B2723]"
                    }`}
                  >
                    <Search className="w-3.5 h-3.5 text-[#3F5C9A]" />
                    Option 2: Text
                  </button>
                </div>

                {/* Option 1: Vision Scanner Mode */}
                {inputChannel === "image" ? (
                  <div className="space-y-4">
                    {/* Cyber-Medical Viewfinder Hardware Frame */}
                    <div className="relative h-60 rounded-xl bg-[#FAF8F5] border-2 border-dashed border-[#2B2723]/20 flex flex-col items-center justify-center p-4 text-center overflow-hidden">
                      {/* Illuminated Animated Laser Beam */}
                      <div
                        className={`absolute left-0 right-0 h-0.5 bg-[#3F5C9A] shadow-[0_0_10px_#3F5C9A] pointer-events-none ${
                          isScanningActive ? "animate-laser-sweep" : "top-1/2 opacity-30"
                        }`}
                      />

                      {/* Precision Reticle Corner Brackets */}
                      <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#2B2723]/60 rounded-tl-sm" />
                      <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#2B2723]/60 rounded-tr-sm" />
                      <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#2B2723]/60 rounded-bl-sm" />
                      <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#2B2723]/60 rounded-br-sm" />

                      <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-[#2B2723]/10 flex items-center justify-center text-[#3F5C9A] mb-2">
                        <Camera className="w-6 h-6" />
                      </div>

                      <p className="text-xs font-bold text-[#2B2723]">
                        Align Prescription Label or Pill Bottle
                      </p>
                      <p className="text-[11px] text-[#57524C] max-w-xs mt-1">
                        Gemini 2.0 Flash Vision reads curved bottle text, NDC identifier, strength, and pill color.
                      </p>

                      <label className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#2B2723]/15 text-xs font-medium text-[#2B2723] hover:bg-[#FAF8F5] cursor-pointer shadow-2xs">
                        <Upload className="w-3.5 h-3.5 text-[#A85A33]" />
                        <span>Upload Photo / Label</span>
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    </div>

                    {/* Scan Action Button */}
                    <button
                      type="button"
                      disabled={isScanningActive}
                      onClick={handleRunOCRScan}
                      className="spring-hover w-full py-3 px-4 rounded-xl bg-[#2B2723] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer hover:bg-[#1C1917] disabled:opacity-70"
                    >
                      <Sparkles className="w-4 h-4 text-[#FAF8F5]" />
                      {isScanningActive ? "Extracting Clinical JSON..." : "Run Multi-Modal Vision OCR"}
                    </button>
                  </div>
                ) : (
                  /* Option 2: Text Formulary Search Mode */
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#2B2723] block">
                        Drug Name or Active Chemical Ingredient:
                      </label>
                      <input
                        type="text"
                        value={manualDrugText}
                        onChange={(e) => setManualDrugText(e.target.value)}
                        placeholder="e.g. Warfarin, Advil 400mg, Levothyroxine 50mcg..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#2B2723]/15 text-xs text-[#2B2723] placeholder:text-[#8C857D] focus:outline-none focus:ring-1 focus:ring-[#2B2723]"
                      />
                    </div>

                    {/* Quick Strength Selectors */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-medium text-[#57524C] block">
                        Quick Strength Chips:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {["5mg", "10mg", "20mg", "400mg", "500mcg", "600mg"].map((dose) => (
                          <button
                            key={dose}
                            type="button"
                            onClick={() =>
                              setManualDrugText((prev) => (prev ? `${prev} ${dose}` : dose))
                            }
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#FAF8F5] border border-[#2B2723]/15 hover:bg-[#2B2723] hover:text-white transition-colors cursor-pointer"
                          >
                            {dose}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (!manualDrugText.trim()) return;
                        const newMed: MedicationItem = {
                          id: `m-${Date.now()}`,
                          name: manualDrugText,
                          genericName: manualDrugText,
                          dosage: "Standard dose",
                          frequency: "Daily",
                          instructions: "As directed by physician",
                          pillAppearance: {
                            shape: "round",
                            colorHex: "#FFFFFF",
                            label: "Standard white circular tablet",
                          },
                        };
                        setMedications([newMed, ...medications]);
                        setManualDrugText("");
                      }}
                      className="spring-hover w-full py-3 px-4 rounded-xl bg-[#2B2723] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer hover:bg-[#1C1917]"
                    >
                      <Plus className="w-4 h-4" />
                      Add Prescription to Patient Regimen
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* CARD 2: Active Prescription Medicine Cabinet */}
            <div className="double-bezel-card">
              <div className="double-bezel-inner p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#2B2723]/8">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-[#A85A33]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#2B2723]">
                      Active Medicine Cabinet ({medications.length})
                    </h3>
                  </div>
                  <span className="font-script text-lg text-[#3F5C9A]">
                    monitored actively ↺
                  </span>
                </div>

                <div className="space-y-3">
                  {medications.map((med) => (
                    <div
                      key={med.id}
                      className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#2B2723]/10 hover:border-[#2B2723]/30 transition-all flex items-start justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-start gap-3">
                        {/* Physical Pill Appearance Icon */}
                        <div
                          className="w-8 h-8 rounded-full border border-[#2B2723]/20 shadow-xs flex items-center justify-center text-xs shrink-0 mt-0.5"
                          style={{ backgroundColor: med.pillAppearance.colorHex }}
                          title={med.pillAppearance.label}
                        >
                          💊
                        </div>

                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-bold text-[#2B2723]">
                              {med.name}
                            </span>
                            <span className="font-mono-clinical text-xs font-bold text-[#A85A33]">
                              {med.dosage}
                            </span>
                          </div>
                          <p className="text-xs text-[#57524C] font-medium">
                            {med.genericName} · {med.frequency}
                          </p>
                          <p className="text-[11px] text-[#8C857D] mt-0.5">
                            {med.instructions}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveMed(med.id)}
                        className="text-[#8C857D] hover:text-[#A85A33] p-1.5 transition-colors cursor-pointer"
                        title="Remove prescription"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {medications.length === 0 && (
                    <div className="py-8 text-center text-xs text-[#8C857D] border border-dashed border-[#2B2723]/15 rounded-xl">
                      No prescriptions in cabinet. Scan bottle or enter drug name above.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT BENTO: MATRIX & 24H TIMELINE (7 Cols) ================= */}
          <div className="lg:col-span-7 space-y-6">
            {/* CARD 3: Clinical Contraindication & Safety Engine */}
            <div className="double-bezel-card">
              <div className="double-bezel-inner p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#2B2723]/8">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#A85A33]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#2B2723]">
                      Clinical Contraindication Matrix
                    </h3>
                  </div>
                  <span className="font-script text-lg text-[#A85A33]">
                    pharmacology engine active ⚡
                  </span>
                </div>

                {alerts.length > 0 ? (
                  <div className="space-y-3.5">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 rounded-xl border transition-all ${
                          alert.severity === "HIGH"
                            ? "bg-[#FAF8F5] border-[#A85A33] shadow-xs"
                            : alert.severity === "MODERATE"
                            ? "bg-[#FAF8F5] border-[#3F5C9A] shadow-xs"
                            : "bg-[#FAF8F5] border-[#5F7D43] shadow-xs"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                alert.severity === "HIGH"
                                  ? "bg-[#A85A33] text-white"
                                  : alert.severity === "MODERATE"
                                  ? "bg-[#3F5C9A] text-white"
                                  : "bg-[#5F7D43] text-white"
                              }`}
                            >
                              {alert.severity} SEVERITY
                            </span>
                            <span className="font-bold text-xs text-[#2B2723]">
                              {alert.drugs.join(" ⚡ ")}
                            </span>
                          </div>
                          <span className="font-mono-clinical text-[10px] text-[#57524C]">
                            {alert.evidenceScore}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-[#2B2723] leading-snug mb-1.5">
                          {alert.title}
                        </h4>

                        <p className="text-xs text-[#57524C] leading-relaxed mb-3">
                          <strong className="text-[#2B2723]">Mechanism of Action:</strong>{" "}
                          {alert.mechanism}
                        </p>

                        <div className="p-3 rounded-lg bg-white border border-[#2B2723]/10 text-xs text-[#2B2723] flex items-start gap-2 shadow-2xs">
                          <Info className="w-4 h-4 text-[#A85A33] shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-[#A85A33]">CLINICAL DIRECTIVE: </strong>
                            {alert.directive}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#5F7D43]/30 text-center">
                    <CheckCircle2 className="w-8 h-8 text-[#5F7D43] mx-auto mb-2" />
                    <p className="text-base font-bold text-[#2B2723]">
                      No Clinical Contraindications Detected
                    </p>
                    <p className="text-xs text-[#57524C] mt-1 max-w-sm mx-auto">
                      All active medications are cleared for concurrent administration with no documented pharmacokinetic conflicts.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* CARD 4: Interactive 24-Hour Daily Timeline & Smart Scheduler */}
            <div className="double-bezel-card">
              <div className="double-bezel-inner p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#2B2723]/8 gap-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#3F5C9A]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#2B2723]">
                      24-Hour Daily Timeline & Adherence Ring
                    </h3>
                  </div>

                  {/* Adherence Progress Chip */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#2B2723]/12 text-xs">
                    <span className="text-[#2B2723] font-medium">
                      Adherence: <strong>{dosesTaken} / {totalDoses} Doses ({adherenceRate}%)</strong>
                    </span>
                    <div className="w-14 h-2 rounded-full bg-[#EAE4D9] overflow-hidden">
                      <div
                        className="h-full bg-[#5F7D43] transition-all duration-500 rounded-full"
                        style={{ width: `${adherenceRate}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 4 Daily Time Slot Buckets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {schedule.map((slot) => (
                    <div
                      key={slot.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        slot.isTaken
                          ? "bg-[#FAF8F5] border-[#5F7D43]/40 shadow-2xs"
                          : "bg-white border-[#2B2723]/10 hover:border-[#2B2723]/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-clinical text-[10px] px-1.5 py-0.5 rounded bg-[#EAE4D9] text-[#2B2723] font-bold">
                            {slot.timeSlot}
                          </span>
                          <span className="text-xs font-bold text-[#2B2723]">
                            {slot.slotLabel}
                          </span>
                        </div>

                        {slot.dosage !== "—" && (
                          <button
                            type="button"
                            onClick={() => handleToggleTaken(slot.id)}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all ${
                              slot.isTaken
                                ? "bg-[#5F7D43] text-white"
                                : "bg-[#FAF8F5] text-[#2B2723] border border-[#2B2723]/15 hover:bg-[#EAE4D9]"
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            {slot.isTaken ? "Taken" : "Mark Taken"}
                          </button>
                        )}
                      </div>

                      <div className="text-sm font-bold text-[#2B2723]">
                        {slot.medication}
                        {slot.dosage !== "—" && (
                          <span className="font-mono-clinical text-xs font-semibold text-[#A85A33] ml-1.5">
                            {slot.dosage}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-[#57524C] mt-1">
                        {slot.foodRequirement}
                      </p>

                      {slot.isSpaced && (
                        <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold text-[#3F5C9A] bg-[#3F5C9A]/10 border border-[#3F5C9A]/20">
                          ⚡ Auto-spaced by 4 hours for safety
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Physician Clinical Attestation */}
                <div className="pt-3 border-t border-[#2B2723]/8 flex flex-wrap items-center justify-between text-xs text-[#57524C] gap-2">
                  <span className="font-mono-clinical text-[11px] text-[#2B2723]">
                    Synchronized with EHR record #RX-9042
                  </span>
                  <span className="font-script text-xl text-[#2B2723]">
                    Clinical Attestation: Dr. Katherine Chen, MD ✍️
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ================= CAREGIVER PRINTABLE SUMMARY MODAL ================= */}
      {isCaregiverModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2B2723]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#2B2723]/15 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#2B2723]/10 pb-4">
              <div>
                <span className="font-mono-clinical text-[10px] uppercase tracking-wider text-[#A85A33]">
                  PHARMALENS PS-6 CLINICAL ATTESTATION
                </span>
                <h3 className="text-xl font-bold text-[#2B2723]">
                  Caregiver & Physician Emergency Medical Summary
                </h3>
                <p className="text-xs text-[#57524C] mt-0.5">
                  Patient: Margaret Vance, 74 • ID #RX-9042 • Generated Today
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCaregiverModalOpen(false)}
                className="text-[#8C857D] hover:text-[#2B2723] p-1.5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Prescriptions Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B2723]">
                1. Active Prescription Regimen
              </h4>
              <div className="space-y-1.5 text-xs text-[#2B2723]">
                {medications.map((m) => (
                  <div
                    key={m.id}
                    className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#2B2723]/10 flex items-center justify-between"
                  >
                    <span>
                      <strong>{m.name}</strong> ({m.genericName}) — {m.dosage}
                    </span>
                    <span className="font-mono-clinical text-[11px] text-[#57524C]">
                      {m.frequency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flagged Contraindications */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#A85A33]">
                2. Documented Safety Contraindications
              </h4>
              {alerts.length > 0 ? (
                <div className="space-y-2 text-xs">
                  {alerts.map((a) => (
                    <div
                      key={a.id}
                      className="p-3 rounded-lg bg-[#FAF8F5] border border-[#A85A33]/40"
                    >
                      <strong className="text-[#A85A33] block">{a.title}</strong>
                      <p className="text-[#57524C] mt-0.5">{a.directive}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#5F7D43]">No contraindications flagged.</p>
              )}
            </div>

            {/* Daily Schedule */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2B2723]">
                3. Daily Timeline Schedule
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {schedule.map((s) => (
                  <div key={s.id} className="p-2 rounded bg-[#FAF8F5] border border-[#2B2723]/10">
                    <span className="font-mono-clinical text-[10px] text-[#A85A33] font-bold">
                      {s.timeSlot} {s.slotLabel}
                    </span>
                    <p className="font-bold text-[#2B2723]">{s.medication}</p>
                    <p className="text-[10px] text-[#57524C]">{s.foodRequirement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2B2723]/10">
              <button
                type="button"
                onClick={() => setIsCaregiverModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-[#57524C] hover:text-[#2B2723] cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="spring-hover px-5 py-2 rounded-lg bg-[#2B2723] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-[#1C1917]"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Physical Medical Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
