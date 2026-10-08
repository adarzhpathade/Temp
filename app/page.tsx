import { ShieldAlert, Pill, Clock, Activity, FileText, User } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#070b12] text-slate-100">
      {/* Top Cyber-Clinical Navigation Header */}
      <header className="border-b border-slate-800/80 bg-[#0c1322]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                  RxGuard
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                  Pharmalens PS-6
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Clinical Prescription Scanner & Contraindication Matrix
              </p>
            </div>
          </div>

          {/* Patient Profile Chip */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-full px-3.5 py-1.5 shadow-inner">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-semibold">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="text-left text-xs">
              <span className="font-medium text-slate-200 block leading-tight">
                Margaret Vance, 74
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">
                Polypharmacy Care • ID #RX-9042
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid Workspace Shell */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Subheader status bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-slate-300">
              Safety Engine Active • Multi-Modal Scanner Armed
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Offline Mock Engine Ready
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              24h Timeline Sync
            </span>
          </div>
        </div>

        {/* Two-Column Core Layout (Input Channel on left, Clinical Matrix on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Input Channels (Scanner / Text / Demo Presets) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Pill className="w-4 h-4 text-cyan-400" />
                  Prescription Input Channels
                </h2>
                <span className="text-[11px] text-slate-500 font-mono">Phase 0 Scaffolding</span>
              </div>
              <div className="h-64 rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center p-6 text-center text-slate-500 space-y-2 bg-slate-950/40">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-cyan-400 border border-slate-800">
                  <FileText className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-300">Input Channels Shell Ready</p>
                <p className="text-xs text-slate-500 max-w-xs">
                  Option 1 (WebRTC Laser Viewfinder) & Option 2 (Manual Text Search) ready for Phase 4 integration.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contraindication Alerts & 24h Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Clinical Contraindication Matrix
                </h2>
                <span className="text-[11px] text-emerald-400 font-medium px-2 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-800/40">
                  Monitoring
                </span>
              </div>
              <div className="h-64 rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center p-6 text-center text-slate-500 space-y-2 bg-slate-950/40">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-rose-400 border border-slate-800">
                  <Activity className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-300">Safety & Schedule Workspace</p>
                <p className="text-xs text-slate-500 max-w-sm">
                  Clinical Contraindication Drawer & 24-Hour Timeline Auto-Spacing engine ready for subsequent phases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
