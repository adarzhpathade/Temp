"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  User,
  Volume2,
  VolumeX,
  Printer,
  ChevronDown,
  Activity,
  HeartPulse,
  Sparkles,
  CheckCircle2,
  FileText,
} from "lucide-react";

interface FloatingCommandNavProps {
  isAudioSpeaking: boolean;
  onToggleAudio: () => void;
  onOpenCaregiverModal: () => void;
  alertCount: number;
  medicationCount: number;
  adherenceRate: number;
}

export function FloatingCommandNav({
  isAudioSpeaking,
  onToggleAudio,
  onOpenCaregiverModal,
  alertCount,
  medicationCount,
  adherenceRate,
}: FloatingCommandNavProps) {
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  return (
    <nav className="sticky top-4 sm:top-6 z-50 px-4 sm:px-6 max-w-7xl mx-auto transition-all duration-300">
      {/* Outer Hardware Double-Bezel Enclosure */}
      <div className="rounded-full p-1.5 bg-[#FAF8F5]/80 backdrop-blur-2xl border border-[#2B2723]/10 shadow-[0_16px_40px_-10px_rgba(43,39,35,0.12),0_4px_12px_rgba(43,39,35,0.04)]">
        {/* Concentric Inner Core */}
        <div className="rounded-full px-3.5 sm:px-5 py-2 bg-white/95 border border-[#2B2723]/8 flex items-center justify-between gap-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
          {/* Left: Brand Identity & Neural Radar */}
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-[#2B2723] flex items-center justify-center text-[#FAF8F5] shadow-xs group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-4 h-4 text-[#FAF8F5]" />
              </div>
              {/* Pulsing Neural Liveness Dot */}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5F7D43] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5F7D43] ring-1 ring-white" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-[#2B2723]">
                  RxGuard
                </span>
                <span className="font-mono-clinical text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#EAE4D9] text-[#2B2723] font-bold border border-[#2B2723]/10 hidden sm:inline-block">
                  Pharmalens PS-6
                </span>
              </div>
              <p className="text-[10px] text-[#57524C] hidden lg:block leading-none mt-0.5">
                Clinical Pharmacovigilance & Safety Engine
              </p>
            </div>
          </div>

          {/* Center: Dynamic Patient Dossier Interactive Island */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDossierOpen(!isDossierOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#F3EFE8] border border-[#2B2723]/10 transition-all cursor-pointer shadow-2xs group"
            >
              <div className="w-5 h-5 rounded-full bg-[#EAE4D9] flex items-center justify-center text-[#2B2723]">
                <User className="w-3 h-3" />
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2B2723]">
                  <span>Margaret Vance, 74</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5F7D43]" />
                </div>
              </div>

              <div className="hidden md:flex items-center gap-1.5 pl-1 text-[11px] font-mono-clinical text-[#3F5C9A]">
                <span>#{medicationCount} Meds</span>
                <span>·</span>
                <span className={alertCount > 0 ? "text-[#A85A33] font-bold" : "text-[#5F7D43]"}>
                  {alertCount > 0 ? `⚠️ ${alertCount} Conflict` : "✓ Cleared"}
                </span>
              </div>

              <ChevronDown
                className={`w-3.5 h-3.5 text-[#57524C] transition-transform duration-200 ${
                  isDossierOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dossier Flyout Card on Click */}
            {isDossierOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 p-4 rounded-2xl bg-white border border-[#2B2723]/15 shadow-2xl z-50 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between border-b border-[#2B2723]/8 pb-2">
                  <span className="font-mono-clinical text-[10px] text-[#A85A33] font-bold uppercase">
                    EHR Dossier #RX-9042
                  </span>
                  <span className="text-[10px] text-[#57524C]">Adherence: {adherenceRate}%</span>
                </div>

                <div className="space-y-1.5 text-xs text-[#2B2723]">
                  <p>
                    <strong>Patient:</strong> Margaret Vance (Female, 74)
                  </p>
                  <p>
                    <strong>Condition:</strong> Polypharmacy Care / DVT & Hypertension
                  </p>
                  <p>
                    <strong>Attending Physician:</strong> Dr. Katherine Chen, MD
                  </p>
                  <p>
                    <strong>Active Meds:</strong> {medicationCount} Registered
                  </p>
                  <p>
                    <strong>Flagged Hazards:</strong>{" "}
                    <span className={alertCount > 0 ? "text-[#A85A33] font-bold" : "text-[#5F7D43]"}>
                      {alertCount} Documented Interactions
                    </span>
                  </p>
                </div>

                <div className="pt-2 border-t border-[#2B2723]/8 flex justify-between items-center text-[10px] text-[#57524C]">
                  <span>Last synced: Just now</span>
                  <button
                    type="button"
                    onClick={() => setIsDossierOpen(false)}
                    className="text-[#2B2723] font-bold hover:underline cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Modern Fluid Utility Hub */}
          <div className="flex items-center gap-2">
            {/* Audio Speech Synthesis Button with Dancing Soundbars */}
            <button
              type="button"
              onClick={onToggleAudio}
              className={`spring-hover h-8 px-3 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                isAudioSpeaking
                  ? "bg-[#A85A33] text-white border-[#A85A33] shadow-xs"
                  : "bg-[#FAF8F5] text-[#2B2723] border-[#2B2723]/12 hover:bg-[#F3EFE8]"
              }`}
              title="Voice summary for elderly patients & judges"
            >
              {isAudioSpeaking ? (
                <>
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 h-3 bg-white animate-pulse" />
                    <span className="w-0.5 h-2 bg-white animate-pulse delay-75" />
                    <span className="w-0.5 h-3.5 bg-white animate-pulse delay-150" />
                    <span className="w-0.5 h-2 bg-white animate-pulse delay-100" />
                  </div>
                  <span className="hidden sm:inline text-[11px]">Speaking</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#2B2723]" />
                  <span className="hidden sm:inline text-[11px]">Readout</span>
                </>
              )}
            </button>

            {/* Nested Island Button-in-Button CTA Architecture */}
            <button
              type="button"
              onClick={onOpenCaregiverModal}
              className="spring-hover group inline-flex items-center gap-2 pl-3.5 pr-1 py-1 rounded-full bg-[#2B2723] text-white text-xs font-semibold shadow-xs cursor-pointer hover:bg-[#1C1917]"
            >
              <span className="hidden sm:inline">Caregiver Report</span>
              <span className="sm:hidden">Report</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#A85A33] transition-all group-hover:scale-105">
                <Printer className="w-3 h-3 text-white transition-transform group-hover:rotate-6" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
