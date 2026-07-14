import React, { useState, useEffect, useRef } from "react";
import { 
  PROJECT_DATA, 
  OBSESSED_QUESTIONS, 
  TICKER_FEED 
} from "./data";
import { DecisionNode, ScenarioResult, ProjectCard } from "./types";
import FloatingGlobe from "./components/FloatingGlobe";
import DecisionSphere from "./components/DecisionSphere";
import PunjabOSDashboard from "./components/PunjabOSDashboard";
import DecisionGalaxy from "./components/DecisionGalaxy";
import { 
  Briefcase, 
  Cpu, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  Activity, 
  Lightbulb, 
  Sliders, 
  Sparkles, 
  Clock, 
  User, 
  Lock, 
  Compass, 
  Building2, 
  Maximize2,
  DollarSign,
  AlertTriangle,
  Award,
  BookOpen,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState<"dashboard" | "intel" | "cases" | "simulation">("dashboard");
  const [currentTime, setCurrentTime] = useState<string>("2026-07-13 23:30:56 UTC");

  // Chapter 1: Selected Node state
  const [selectedNode, setSelectedNode] = useState<DecisionNode>({
    id: "finance",
    name: "Finance",
    description: "Rigorous Capital Allocation & Valuation Optimization",
    philosophy: "I don't just calculate budgets; I engineer dynamic corporate models to optimize enterprise valuations, analyze scenario options mathematically, and direct capital allocations strictly to maximum-ROIC growth vectors.",
    x: 0, y: 0,
    color: "#F59E0B",
    metric: "$10M+ Capital Influenced"
  });

  // Chapter 2: How I Think Solver states
  const [challengeInput, setChallengeInput] = useState<string>("");
  const [solverLoading, setSolverLoading] = useState<boolean>(false);
  const [solverProgressStep, setSolverProgressStep] = useState<number>(0);
  const [solverResult, setSolverResult] = useState<ScenarioResult | null>(null);
  const [solverError, setSolverError] = useState<string | null>(null);

  const solverSteps = [
    "Engaging Jaspinder's logic core: Detecting market signals & EBITDA anomalies...",
    "Analyzing balance sheet exposure: Quantifying cash flows & valuation drift...",
    "Simulating strategic tradeoffs: Expansion vector vs capital preservation...",
    "Running Monte Carlo iterations: Stress-testing risk vectors and failure bounds...",
    "Deploying capital optimization model: Structuring allocation grants...",
    "Compiling final C-suite decision blueprint & executive recommendations..."
  ];

  // Presets for faster executive interaction
  const challengePresets = [
    "Revenue growth is slowing in our primary medical software division.",
    "Capital allocation is strained under high inflationary interest rates.",
    "Unifying fragmented operations across 7 regional business subsidiaries.",
    "Directing public infrastructure funds to maximize regional employment."
  ];

  // Chapter 4: Selected portfolio project state
  const [activeProject, setActiveProject] = useState<ProjectCard>(PROJECT_DATA[0]);

  // Questions state
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);

  // Contact/Blueprint Request states
  const [blueprintRequested, setBlueprintRequested] = useState<boolean>(false);
  const [blueprintEmail, setBlueprintEmail] = useState<string>("");
  const [blueprintOrg, setBlueprintOrg] = useState<string>("");
  const [blueprintChallenge, setBlueprintChallenge] = useState<string>("");

  // Live timer tick for Bloomberg feel
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Solve Submission (Chapter 2)
  const handleSolveChallenge = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || challengeInput || "Revenue growth is slowing";
    setChallengeInput(finalPrompt);
    setSolverLoading(true);
    setSolverProgressStep(0);
    setSolverResult(null);
    setSolverError(null);

    // Dynamic progressive loading texts
    const interval = setInterval(() => {
      setSolverProgressStep((prev) => {
        if (prev < solverSteps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1500);

    try {
      const res = await fetch("/api/solve-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challenge: finalPrompt })
      });
      if (!res.ok) throw new Error("Strategic pipeline failed to respond.");
      const data = await res.json();
      setSolverResult(data);
    } catch (err: any) {
      console.error(err);
      setSolverError("Dynamic scenario calculation failed. Operating offline fallback core.");
    } finally {
      clearInterval(interval);
      setSolverLoading(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-white font-sans overflow-x-hidden selection:bg-[#4F8CFF] selection:text-[#070B14] flex flex-col">
      
      {/* 1. PERSISTENT BLOOMBERG TICKER */}
      <div className="w-full bg-[#0B111E]/95 border-b border-white/5 h-10 overflow-hidden z-50 sticky top-0 backdrop-blur-md flex items-center">
        <div className="w-full px-4 flex items-center justify-between text-xs font-mono">
          
          <div className="flex items-center gap-2 shrink-0 border-r border-white/5 pr-4 h-full">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="font-bold text-white tracking-widest text-[10px]">KAUR.DECISION_OS</span>
            <span className="text-gray-500 text-[9px] hidden sm:inline font-medium">v3.8 // ONLINE</span>
          </div>

          <div className="flex-1 overflow-hidden relative mx-4">
            <div className="animate-ticker flex gap-12 text-[10px] text-gray-300">
              {/* Double ticker content to enable continuous scrolling marquee */}
              {TICKER_FEED.map((tick, i) => (
                <div key={`tick-1-${i}`} className="flex items-center gap-2">
                  <span className="text-[#22D3EE] font-bold font-mono">→</span>
                  <span>{tick}</span>
                </div>
              ))}
              {TICKER_FEED.map((tick, i) => (
                <div key={`tick-2-${i}`} className="flex items-center gap-2">
                  <span className="text-[#22D3EE] font-bold font-mono">→</span>
                  <span>{tick}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0 border-l border-white/5 pl-4 hidden md:flex items-center gap-3 text-gray-400 text-[10px]">
            <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
              <Clock className="w-3 h-3" />
              <span>{currentTime}</span>
            </div>
            <div className="bg-white/[0.03] px-2 py-0.5 rounded border border-white/5 text-[9px]">
              C-SUITE_MODE: AUTHORIZED
            </div>
          </div>

        </div>
      </div>

      {/* Main Structural Grid representing Left Rail + Center Area + Right Telemetry */}
      <div className="flex flex-1 min-h-[calc(100vh-2.5rem)] w-full">
        
        {/* Left Rail Layout Element */}
        <aside className="w-16 shrink-0 border-r border-white/5 hidden lg:flex flex-col items-center py-8 justify-between sticky top-10 h-[calc(100vh-40px)] bg-[#070B14] z-40">
          <div className="font-mono text-[10px] font-bold text-white/50 bg-white/5 px-1.5 py-0.5 rounded">
            OS
          </div>
          <div className="rotate-180 [writing-mode:vertical-lr] text-[9px] font-mono tracking-[0.3em] text-white/30 uppercase">
            DECISION ENGINE // JASPINDER KAUR
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[8px] font-mono text-gray-500">SECURE</span>
          </div>
        </aside>

        {/* Central Content Column & Right Sidebar Container */}
        <div className="flex-1 min-w-0 flex flex-col xl:flex-row">
          
          {/* Main Core View Area */}
          <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 flex flex-col gap-12 sm:gap-20 max-w-6xl mx-auto">

        {/* 2. HERO HEADER BLOCK */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px]">
          
          {/* Hero text (Lg: 6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6 z-10 text-left">
            
            <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.06] w-max px-3 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="font-mono text-[9px] tracking-wider text-gray-300">EXECUTIVE COGNITIVE SYSTEM ACTIVATED</span>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tight leading-none text-white">
                JASPINDER <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F8CFF] via-[#8B5CF6] to-[#22D3EE]">KAUR</span>
              </h1>
              <span className="font-mono text-sm sm:text-base tracking-widest text-[#22D3EE] font-semibold">
                Finance × AI × Strategy × Executive Decision Systems
              </span>
            </div>

            <div className="border-l-2 border-[#8B5CF6] pl-4 py-2 my-2">
              <p className="text-lg sm:text-xl font-display text-gray-300 italic">
                &ldquo;I don't build dashboards. I build decision systems. I help organizations transform data into intelligence, intelligence into decisions, and decisions into outcomes.&rdquo;
              </p>
            </div>

            {/* F1 telemetry mini-data grid */}
            <div className="grid grid-cols-3 gap-4 border-y border-white/[0.05] py-4 my-2">
              <div>
                <span className="font-mono text-[9px] text-gray-400 block uppercase">Influenced Capital</span>
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#F59E0B] tracking-tight">$10M+</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-gray-400 block uppercase">Revenue Generated</span>
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#22D3EE] tracking-tight">$7M+</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-gray-400 block uppercase">Decision Speed</span>
                <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tracking-tight">+30%</span>
              </div>
            </div>

            {/* Quick links CTA */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollToSection("think-engine")}
                className="px-6 py-3 bg-[#4F8CFF] hover:bg-blue-600 border border-[#4F8CFF]/50 text-white font-mono text-[11px] font-bold tracking-widest uppercase rounded shadow-[0_0_25px_rgba(79,140,255,0.2)] transition-all duration-200 cursor-pointer hover:-translate-y-0.5 flex items-center gap-2"
              >
                ENTER THE DECISION ENGINE
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 text-gray-300 px-5 py-3 rounded font-mono text-xs font-bold tracking-widest transition cursor-pointer"
              >
                VIEW INTEL LOGS
              </button>
            </div>

          </div>

          {/* Interactive Globe block (Lg: 6 cols) */}
          <div className="lg:col-span-6 flex items-center justify-center relative w-full h-full min-h-[320px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4F8CFF]/10 to-transparent blur-3xl rounded-full pointer-events-none"></div>
            <FloatingGlobe />
          </div>

        </header>

        {/* 3. CREDIBILITY WALL (Massive Animated metrics) */}
        <section id="credibility" className="relative flex flex-col gap-6 sm:gap-8 border-t border-white/[0.04] pt-12">
          
          <div className="flex flex-col gap-1 items-center text-center">
            <span className="font-mono text-xs text-[#F59E0B] tracking-widest uppercase flex items-center gap-1.5 justify-center">
              <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
              EXECUTIVE VALIDATION METRICS
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">Undeniable Organizational Impact</h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              Quantitative credentials and strategic outcomes verified through C-suite alignments and governmental partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Metric 1 */}
            <div className="p-5 rounded-xl bg-[#111827]/30 border border-white/[0.04] backdrop-blur-md hover:border-[#F59E0B]/30 hover:bg-white/[0.02] transition-all flex flex-col justify-between gap-4 group">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] text-[#F59E0B]">CAPITAL VECTOR</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"></span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight block">$10M+</span>
                <span className="text-xs font-bold text-gray-200 block mt-1">Capital Allocation Influenced</span>
                <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">Direct strategic models guiding infrastructure investments and growth expenditures across multiple business units.</p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="p-5 rounded-xl bg-[#111827]/30 border border-white/[0.04] backdrop-blur-md hover:border-[#22D3EE]/30 hover:bg-white/[0.02] transition-all flex flex-col justify-between gap-4 group">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] text-[#22D3EE]">REVENUE GRID</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]"></span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight block">$7M+</span>
                <span className="text-xs font-bold text-gray-200 block mt-1">ARR Generated</span>
                <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">Arranged enterprise distribution systems, strategic B2B networks, and renewal retention engines.</p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="p-5 rounded-xl bg-[#111827]/30 border border-white/[0.04] backdrop-blur-md hover:border-emerald-400/30 hover:bg-white/[0.02] transition-all flex flex-col justify-between gap-4 group">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] text-emerald-400">LATENCY INDEX</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight block">-30%</span>
                <span className="text-xs font-bold text-gray-200 block mt-1">Decision Latency Reduction</span>
                <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">Designed unified databases and forecasting dashboards that replaced legacy manual spreadsheets.</p>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="p-5 rounded-xl bg-[#111827]/30 border border-white/[0.04] backdrop-blur-md hover:border-[#8B5CF6]/30 hover:bg-white/[0.02] transition-all flex flex-col justify-between gap-4 group">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] text-[#8B5CF6]">EFFICIENCY MODEL</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight block">+25%</span>
                <span className="text-xs font-bold text-gray-200 block mt-1">Operational Improvement</span>
                <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">Integrated state-level citizen telemetry networks, automating regional asset allocation dispatches.</p>
              </div>
            </div>

            {/* Metric 5 */}
            <div className="p-5 rounded-xl bg-[#111827]/30 border border-white/[0.04] backdrop-blur-md hover:border-[#EF4444]/30 hover:bg-white/[0.02] transition-all flex flex-col justify-between gap-4 group">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] text-[#EF4444]">UNIFIED DIVISION</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight block">7 Units</span>
                <span className="text-xs font-bold text-gray-200 block mt-1">Cores Centralized</span>
                <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">Consolidated fragmented business subdivisions into a single executive dashboard suite.</p>
              </div>
            </div>

          </div>

          {/* Core Credentials Badges */}
          <div className="mt-4 p-4 rounded-xl bg-[#111827]/20 border border-white/[0.04] flex flex-wrap gap-3 items-center justify-center text-gray-400">
            <span className="font-mono text-[9px] tracking-widest text-[#22D3EE] mr-2 uppercase">VERIFIED CREDENTIALS:</span>
            <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded border border-white/[0.04] text-[10px] font-mono text-white">
              <Award className="w-3 h-3 text-amber-500" />
              <span>Harvard CORe (Honors)</span>
            </div>
            <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded border border-white/[0.04] text-[10px] font-mono text-white">
              <Award className="w-3 h-3 text-[#4F8CFF]" />
              <span>Harvard CLIMB</span>
            </div>
            <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded border border-white/[0.04] text-[10px] font-mono text-white">
              <Award className="w-3 h-3 text-[#8B5CF6]" />
              <span>MIT Foundations of Modern Finance</span>
            </div>
            <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded border border-white/[0.04] text-[10px] font-mono text-white">
              <Award className="w-3 h-3 text-[#22D3EE]" />
              <span>FMVA® / BIDA® / CMSA®</span>
            </div>
            <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded border border-white/[0.04] text-[10px] font-mono text-white">
              <Award className="w-3 h-3 text-emerald-400" />
              <span>Google Advanced BI Cert</span>
            </div>
          </div>

        </section>

        {/* 4. CHAPTER 1: THE DECISION SPHERE */}
        <section id="decision-sphere" className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/[0.04] pt-12">
          
          {/* Left panel text information (Lg: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-5 text-left">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-[#8B5CF6] tracking-widest uppercase block">CHAPTER 1 // COGNITIVE ARCHITECTURE</span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">The Decision Sphere</h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Jaspinder Kaur doesn&apos;t look at strategy through static, isolated lenses. Complex organizational scenarios require mapping connections across Finance, AI systems, operations, risk indices, and executive alignments.
            </p>

            <div className="border-t border-white/[0.05] pt-4 flex flex-col gap-3">
              <span className="font-mono text-[10px] text-gray-400 block uppercase tracking-wider">SELECTED OPERATIONAL DIMENSION:</span>
              <div className="p-4 rounded-xl bg-black/40 border-2 transition-all duration-300" style={{ borderColor: selectedNode.color + "33" }}>
                <div className="flex items-center justify-between border-b border-white/[0.05] pb-2 mb-2">
                  <span className="font-bold text-white text-base flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedNode.color }}></span>
                    {selectedNode.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#22D3EE] bg-[#22D3EE]/15 px-2 py-0.5 rounded border border-[#22D3EE]/25">
                    {selectedNode.metric}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-gray-200 uppercase tracking-wide mb-1.5">{selectedNode.description}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{selectedNode.philosophy}</p>
              </div>
            </div>
          </div>

          {/* Interactive Sphere Visual Canvas block (Lg: 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <DecisionSphere 
              onSelectNode={(node) => setSelectedNode(node)} 
              selectedNodeId={selectedNode.id} 
            />
          </div>

        </section>

        {/* 5. CHAPTER 2: HOW I THINK (Executive Decision Solver) */}
        <section id="think-engine" className="relative flex flex-col gap-6 border-t border-white/[0.04] pt-12">
          
          <div className="flex flex-col gap-1 text-left">
            <span className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase block">CHAPTER 2 // EXECUTIVE ANALYSIS WORKFLOW</span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">Executive Decision Architecture</h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
              Step inside Jaspinder&apos;s mind. Submit a corporate, financial, or governance challenge below. Our server-side scenario compiler will model custom signal detections, financial impacts, risk metrics, and reallocations live.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Challenge input controls (Lg: 5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-[#111827]/40 border border-white/[0.05] rounded-xl p-4 flex flex-col gap-3">
                <span className="font-mono text-[9px] text-[#22D3EE] tracking-wider block">ENTER CORPORATE CHALLENGE FOR SIMULATION</span>
                
                <textarea
                  value={challengeInput}
                  onChange={(e) => setChallengeInput(e.target.value)}
                  placeholder="e.g., Operating margins are compressing in our secondary divisions due to logistics overheads..."
                  className="w-full h-24 bg-black/50 border border-white/[0.08] rounded-lg p-3 text-xs text-white focus:outline-none focus:border-[#4F8CFF] placeholder:text-gray-600 font-sans leading-relaxed resize-none"
                />

                <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono mt-1">
                  <span>MAX COMPILER CHARS: 250</span>
                  <span>GEMINI CORE: ACTIVE</span>
                </div>

                <button
                  onClick={() => handleSolveChallenge()}
                  disabled={solverLoading}
                  className="w-full bg-[#4F8CFF] hover:bg-blue-600 border border-[#4F8CFF]/50 text-white py-3 rounded font-mono text-xs font-bold tracking-widest flex items-center justify-center gap-2 transition duration-200 cursor-pointer shadow-[0_0_15px_rgba(79,140,255,0.15)] disabled:opacity-50"
                >
                  {solverLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>COMPILING SCENARIOS...</span>
                    </>
                  ) : (
                    <>
                      <Cpu className="w-4 h-4" />
                      <span>INITIALIZE COGNITIVE ANALYSIS</span>
                    </>
                  )}
                </button>
              </div>

              {/* Challenge Presets */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[9px] text-gray-400 tracking-wider">CHOOSE PRESET EXECUTIVES CONTEXT</span>
                <div className="grid grid-cols-1 gap-2">
                  {challengePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSolveChallenge(preset)}
                      className="text-left text-xs bg-[#111827]/25 hover:bg-[#111827]/60 border border-white/[0.04] p-2.5 rounded-lg text-gray-300 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <span className="line-clamp-1">{preset}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white shrink-0 transition" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Scenario Calculations report output (Lg: 7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-[#111827]/20 border border-white/[0.05] rounded-xl overflow-hidden min-h-[380px] flex flex-col justify-center">
                
                {/* 1. Uninitialized state */}
                {!solverLoading && !solverResult && (
                  <div className="text-center p-8 flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center">
                      <Cpu className="w-6 h-6 text-[#4F8CFF]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Cognitive Strategy Engine Awaiting Context</h4>
                      <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">Select an administrative preset challenge on the left or type your own to simulate Jaspinder&apos;s decision architecture.</p>
                    </div>
                  </div>
                )}

                {/* 2. Loading State progress tracker */}
                {solverLoading && (
                  <div className="p-6 flex flex-col gap-6 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-[#22D3EE]/30 border-t-[#22D3EE] rounded-full animate-spin shrink-0"></div>
                      <span className="font-mono text-xs text-[#22D3EE] tracking-widest font-bold uppercase">STRATEGIC MODEL CO-PROCESSOR ENGAGED</span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {solverSteps.map((step, idx) => {
                        const isActive = solverProgressStep === idx;
                        const isCompleted = solverProgressStep > idx;
                        return (
                          <div 
                            key={idx} 
                            className={`flex items-center gap-3 text-xs font-mono transition-all duration-300 ${
                              isActive ? "text-white pl-2 border-l-2 border-[#4F8CFF]" : isCompleted ? "text-emerald-400 opacity-60" : "text-gray-600"
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[9px] font-bold shrink-0">
                              {isCompleted ? "✓" : idx + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. Output results Panel */}
                {!solverLoading && solverResult && (
                  <div className="p-4 sm:p-6 flex flex-col gap-5 text-left bg-[#070B14]/40">
                    
                    {/* Solver output Header info */}
                    <div className="flex justify-between items-start border-b border-white/[0.05] pb-3 flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span className="font-mono text-[9px] text-[#22D3EE] tracking-widest font-bold">COMPILATION SUCCESSFUL // RESOLVING MODEL STRATEGY</span>
                        </div>
                        <h4 className="text-xs font-mono text-gray-400 line-clamp-1">CHALLENGE: &ldquo;{challengeInput}&rdquo;</h4>
                      </div>
                      
                      <div className="text-right shrink-0">
                        <span className="font-mono text-[10px] text-gray-500 block">EXPECTED OUTCOME</span>
                        <span className="font-mono text-sm font-bold text-[#F59E0B]">{solverResult.expectedROI}</span>
                      </div>
                    </div>

                    {/* Report grid tabs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Step 1: Signals */}
                      <div className="p-3 rounded bg-white/[0.01] border border-white/[0.03] flex flex-col gap-1.5">
                        <div className="flex items-center gap-1 text-[10px] font-mono text-[#4F8CFF] font-bold uppercase">
                          <Activity className="w-3.5 h-3.5" />
                          <span>1. SIGNAL DETECTION</span>
                        </div>
                        <ul className="list-disc pl-4 text-[10px] text-gray-300 flex flex-col gap-1 leading-normal">
                          {solverResult.signalDetection.map((sig, i) => <li key={i}>{sig}</li>)}
                        </ul>
                      </div>

                      {/* Step 2: Financial exposure */}
                      <div className="p-3 rounded bg-white/[0.01] border border-white/[0.03] flex flex-col gap-1.5">
                        <div className="flex items-center gap-1 text-[10px] font-mono text-[#F59E0B] font-bold uppercase">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>2. FINANCIAL EXPOSURE</span>
                        </div>
                        <div className="text-[10px] text-gray-300 flex flex-col gap-1 leading-normal">
                          <div><span className="text-[#F59E0B] font-semibold">CASH FLOW:</span> {solverResult.financialImpact.cashFlow}</div>
                          <div><span className="text-[#F59E0B] font-semibold">EBITDA:</span> {solverResult.financialImpact.marginExposure}</div>
                          <div><span className="text-[#F59E0B] font-semibold">VALUATION:</span> {solverResult.financialImpact.valuationImpact}</div>
                        </div>
                      </div>

                      {/* Step 3: Strategic Tradeoffs */}
                      <div className="p-3 rounded bg-white/[0.01] border border-white/[0.03] flex flex-col gap-1.5">
                        <div className="flex items-center gap-1 text-[10px] font-mono text-[#8B5CF6] font-bold uppercase">
                          <Sliders className="w-3.5 h-3.5" />
                          <span>3. STRATEGIC TRADEOFFS</span>
                        </div>
                        {solverResult.strategicTradeoffs.map((t, i) => (
                          <div key={i} className="text-[10px] text-gray-300 leading-normal flex flex-col gap-1">
                            <div><span className="text-gray-400 font-semibold uppercase">Option A:</span> {t.optionA}</div>
                            <div><span className="text-gray-400 font-semibold uppercase">Option B:</span> {t.optionB}</div>
                            <p className="text-gray-400 italic mt-1">{t.tradeOffComparison}</p>
                          </div>
                        ))}
                      </div>

                      {/* Step 4: Risk metrics */}
                      <div className="p-3 rounded bg-white/[0.01] border border-white/[0.03] flex flex-col gap-1.5">
                        <div className="flex items-center gap-1 text-[10px] font-mono text-[#EF4444] font-bold uppercase">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>4. RISK STRESS TEST</span>
                        </div>
                        {solverResult.riskAnalysis.map((risk, i) => (
                          <div key={i} className="text-[10px] text-gray-300 leading-normal flex flex-col gap-0.5">
                            <div><span className="text-white font-semibold">RISK:</span> {risk.riskType} ({risk.probability} likelihood / {risk.impact} impact)</div>
                            <div><span className="text-emerald-400 font-semibold">MITIGATION:</span> {risk.mitigation}</div>
                          </div>
                        ))}
                      </div>

                      {/* Step 5: Scenario Simulation */}
                      <div className="p-3 rounded bg-white/[0.01] border border-white/[0.03] flex flex-col gap-1.5 md:col-span-2">
                        <div className="flex items-center gap-1 text-[10px] font-mono text-[#22D3EE] font-bold uppercase">
                          <Compass className="w-3.5 h-3.5" />
                          <span>5. MONTE CARLO SCENARIO PROJECTIONS</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[10px] leading-relaxed">
                          <div className="p-2 rounded bg-red-500/5 border border-red-500/10">
                            <span className="text-red-400 font-bold block">BEAR STATE</span>
                            <p className="text-gray-400 text-[9px] mt-0.5">{solverResult.scenarioModeling.conservative}</p>
                          </div>
                          <div className="p-2 rounded bg-white/[0.01] border border-white/[0.04]">
                            <span className="text-gray-300 font-bold block">BASE STATE</span>
                            <p className="text-gray-400 text-[9px] mt-0.5">{solverResult.scenarioModeling.base}</p>
                          </div>
                          <div className="p-2 rounded bg-emerald-500/5 border border-emerald-500/10">
                            <span className="text-emerald-400 font-bold block">BULL STATE</span>
                            <p className="text-gray-400 text-[9px] mt-0.5">{solverResult.scenarioModeling.aggressive}</p>
                          </div>
                        </div>
                      </div>

                      {/* Step 6: Capital Allocation & Rec */}
                      <div className="p-3 rounded bg-white/[0.01] border border-white/[0.03] flex flex-col gap-1.5 md:col-span-2 border-l-2 border-l-[#8B5CF6]">
                        <div className="flex items-center gap-1 text-[10px] font-mono text-white font-bold uppercase">
                          <Award className="w-3.5 h-3.5 text-[#8B5CF6]" />
                          <span>6. DECISION CAPEX & EXECUTIVE BLUEPRINT</span>
                        </div>
                        <div className="text-[10px] text-gray-300 flex flex-col gap-1.5 leading-relaxed">
                          <div>
                            <span className="text-white font-bold">RECOMMENDED CAPITAL INJECTION:</span> {solverResult.capitalAllocation.initialCapex} sourced from {solverResult.capitalAllocation.reallocationSource}.
                            <p className="text-gray-400 text-[9px] italic">{solverResult.capitalAllocation.strategicJustification}</p>
                          </div>
                          <div className="border-t border-white/[0.05] pt-2">
                            <span className="text-white font-bold">EXEC RECOMMENDATION:</span> {solverResult.executiveRecommendation.action}
                            <div className="mt-1 flex flex-col gap-1 pl-3 list-decimal">
                              {solverResult.executiveRecommendation.immediateNextSteps.map((step, i) => (
                                <div key={i} className="flex gap-2 text-[9px]">
                                  <span className="text-[#8B5CF6] font-bold shrink-0">{i+1}.</span>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                            <div className="text-[9px] text-[#22D3EE] mt-1.5 font-mono">DEPLOYMENT TIMEFRAME TARGET: {solverResult.executiveRecommendation.outcomeTimeframe}</div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Demo/Live feedback status */}
                    {solverResult.fallback && (
                      <p className="text-[9px] text-amber-500/80 text-center bg-amber-500/5 border border-amber-500/10 p-2 rounded">
                        {solverResult.message}
                      </p>
                    )}

                  </div>
                )}

              </div>
            </div>

          </div>

        </section>

        {/* 6. CHAPTER 3: PUNJABOS FLAGSHIP PLATFORM */}
        <section id="punjabos-platform" className="relative flex flex-col gap-6 border-t border-white/[0.04] pt-12">
          
          <div className="flex flex-col gap-1 text-left">
            <span className="font-mono text-xs text-[#8B5CF6] tracking-widest uppercase block">CHAPTER 3 // FLAGSHIP PLATFORM</span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">PunjabOS Civic Intelligence Platform</h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
              An AI-powered civic intelligence ecosystem architected for the Punjab Government. Designed to unify citizen complaints pipelines, municipal development metrics, water telemetry data, and administrative asset maps into a cohesive executive control panel.
            </p>
          </div>

          <div className="w-full">
            <PunjabOSDashboard />
          </div>

        </section>

        {/* 7. CHAPTER 4: REAL WORK (McKinsey Case Studies) */}
        <section id="portfolio" className="relative flex flex-col gap-6 border-t border-white/[0.04] pt-12">
          
          <div className="flex flex-col gap-1 text-left">
            <span className="font-mono text-xs text-[#F59E0B] tracking-widest uppercase block">CHAPTER 4 // STRATEGIC ADVISORY ARCHIVES</span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">Executive Telemetry & Real-world Impact</h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
              Strictly engineered case studies detailing actual strategic assignments completed by Jaspinder Kaur for public and private organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Nav Tabs (Lg: 4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {PROJECT_DATA.map((project) => {
                const isActive = activeProject.id === project.id;
                return (
                  <button
                    key={project.id}
                    onClick={() => setActiveProject(project)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 group ${
                      isActive 
                        ? "bg-[#111827]/60 border-[#F59E0B]/30 shadow-[0_4px_20px_rgba(245,158,11,0.05)]" 
                        : "bg-transparent border-white/[0.04] hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[8px] text-gray-400">{project.period}</span>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isActive ? "#F59E0B" : "rgba(255,255,255,0.1)" }}></span>
                    </div>
                    <h3 className={`text-sm font-bold tracking-tight transition ${isActive ? "text-[#F59E0B]" : "text-white group-hover:text-gray-300"}`}>
                      {project.title}
                    </h3>
                    <span className="text-[10px] text-gray-400 font-mono">{project.organization}</span>
                    <span className="text-[10px] text-gray-300 font-semibold mt-1">{project.impactHighlight}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Slides Details (Lg: 8 cols) */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#111827]/30 border border-white/[0.05] rounded-xl overflow-hidden backdrop-blur-md"
                >
                  {/* Top slide header */}
                  <div className="p-4 sm:p-6 bg-black/40 border-b border-white/[0.05] flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <span className="font-mono text-[9px] text-[#F59E0B] tracking-wider block">CASE PORTFOLIO BLUEPRINT</span>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">{activeProject.title}</h3>
                      <span className="text-[10px] font-mono text-gray-400">{activeProject.role} // {activeProject.organization}</span>
                    </div>
                    <div className="flex gap-2">
                      {activeProject.metrics.map((m, idx) => (
                        <div key={idx} className="bg-white/[0.02] border border-white/[0.05] px-3 py-1.5 rounded text-center shrink-0">
                          <span className="font-mono text-xs font-bold text-[#F59E0B] block leading-none">{m.value}</span>
                          <span className="text-[8px] font-mono text-gray-500 block mt-0.5 uppercase">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* McKinsey structured slide body */}
                  <div className="p-4 sm:p-6 flex flex-col gap-6 text-left">
                    
                    {/* Challenge & Approach row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[9px] text-[#EF4444] font-bold tracking-wider uppercase block">THE CORPORATE CHALLENGE</span>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans">{activeProject.challenge}</p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[9px] text-[#4F8CFF] font-bold tracking-wider uppercase block">STRATEGIC METHODOLOGY</span>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans">{activeProject.approach}</p>
                      </div>
                    </div>

                    {/* System Built full width panel */}
                    <div className="bg-black/30 border border-white/[0.04] p-4 rounded-lg flex flex-col gap-1.5">
                      <span className="font-mono text-[9px] text-[#8B5CF6] font-bold tracking-wider uppercase block">CORE DECISION ARCHITECTURE BUILT</span>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans">{activeProject.systemBuilt}</p>
                    </div>

                    {/* Outcome & Business impacts list */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/[0.04]">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[9px] text-[#22D3EE] font-bold tracking-wider uppercase block">QUANTIFIED DECISION OUTCOME</span>
                        <p className="text-xs text-gray-300 leading-relaxed font-sans">{activeProject.outcome}</p>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-[9px] text-emerald-400 font-bold tracking-wider uppercase block">VERIFIED BUSINESS IMPACTS</span>
                        <div className="flex flex-col gap-2">
                          {activeProject.businessImpact.map((imp, idx) => (
                            <div key={idx} className="flex gap-2 text-xs text-gray-300 leading-normal">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{imp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </section>

        {/* 8. CHAPTER 5: DECISION GALAXY */}
        <section id="simulations" className="border-t border-white/[0.04] pt-12">
          <DecisionGalaxy />
        </section>

        {/* 9. QUESTIONS I OBSESS OVER */}
        <section id="thought-portal" className="relative flex flex-col gap-6 border-t border-white/[0.04] pt-12">
          
          <div className="flex flex-col gap-1 text-center items-center">
            <span className="font-mono text-xs text-[#22D3EE] tracking-widest uppercase block">PHILOSOPHICAL DEEP-DIVES</span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">Questions I Obsess Over</h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              Strategic queries analyzed under continuous corporate uncertainty. Click a question to open Jaspinder Kaur&apos;s strategic commentary block.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {OBSESSED_QUESTIONS.map((item, idx) => {
              const isOpen = activeQuestionIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveQuestionIdx(idx)}
                  className={`p-5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between gap-4 ${
                    isOpen 
                      ? "bg-[#111827]/60 border-[#22D3EE]/30 shadow-[0_4px_20px_rgba(34,211,238,0.06)]" 
                      : "bg-[#111827]/20 border-white/[0.04] hover:bg-[#111827]/45"
                  }`}
                >
                  <div className="flex justify-between items-start border-b border-white/[0.05] pb-2">
                    <span className="font-mono text-[8px] text-[#22D3EE] font-bold uppercase">{item.category}</span>
                    <span className="text-gray-500 text-[9px] font-mono">[ Q.0{idx+1} ]</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight leading-snug">{item.question}</h3>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 text-xs text-gray-400 leading-relaxed border-t border-white/[0.04] pt-2.5 overflow-hidden font-sans"
                        >
                          {item.insight}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {!isOpen && (
                    <span className="font-mono text-[8px] text-gray-500 uppercase flex items-center gap-1 mt-1 group-hover:text-white">
                      <span>Click to resolve analysis</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

        </section>

        {/* 10. FINAL CINEMATIC SEQUENCE & STRATEGIC BLUEPRINT REQUEST */}
        <section id="contact-blueprints" className="relative border-t border-white/[0.04] pt-12 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-tr from-[#111827]/80 to-transparent p-6 sm:p-10 rounded-2xl border border-white/[0.04]">
            
            {/* Left Col: Core Statement (Lg: 6 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-5 text-left">
              <span className="font-mono text-xs text-[#F59E0B] tracking-widest uppercase block">FINAL COMMISSION SYNC</span>
              
              <div className="flex flex-col gap-3 font-display">
                <div className="flex items-center gap-2 font-mono text-[10px] text-gray-400">
                  <span>ONE SYSTEM DECISION</span>
                  <ChevronRight className="w-3 h-3 text-gray-600" />
                  <span>ONE BLUEPRINT DISPATCH</span>
                  <ChevronRight className="w-3 h-3 text-gray-600" />
                  <span>ONE PLATFORM IMPACTED</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  The future belongs to organizations that make better decisions.
                </h2>
                <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] font-semibold">
                  I build the systems that make those decisions possible.
                </p>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed max-w-md">
                Accelerate operational alignment, optimize institutional capital allocations, or deploy civic intelligence networks across regional districts. Request a custom decision architecture roadmap directly.
              </p>

              <div className="flex items-center gap-4 border-t border-white/[0.05] pt-4 mt-1 font-mono text-[10px] text-gray-400">
                <div className="flex items-center gap-1.5 text-white">
                  <User className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Jaspinder Kaur</span>
                </div>
                <span>|</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Response Time: Q-SLA 4 Hours</span>
                </div>
              </div>
            </div>

            {/* Right Col: Interactive strategic request form (Lg: 6 cols) */}
            <div className="lg:col-span-6">
              <div className="bg-[#070B14] p-6 rounded-xl border border-white/[0.06] text-left">
                
                <AnimatePresence mode="wait">
                  {!blueprintRequested ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-4"
                    >
                      <h3 className="text-sm font-mono text-white tracking-widest uppercase border-b border-white/[0.05] pb-2 mb-1 flex items-center gap-1.5">
                        <Sliders className="w-4 h-4 text-[#22D3EE]" />
                        SECURE STRATEGY BLUEPRINT DISPATCH
                      </h3>

                      <div className="flex flex-col gap-1">
                        <label className="font-mono text-[9px] text-gray-400 uppercase">Contact Email</label>
                        <input
                          type="email"
                          required
                          value={blueprintEmail}
                          onChange={(e) => setBlueprintEmail(e.target.value)}
                          placeholder="e.g., executive@organization.com"
                          className="bg-white/[0.02] border border-white/[0.08] focus:border-[#4F8CFF] focus:outline-none rounded p-2.5 text-xs text-white"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="font-mono text-[9px] text-gray-400 uppercase">Corporate or Public Organization</label>
                        <input
                          type="text"
                          required
                          value={blueprintOrg}
                          onChange={(e) => setBlueprintOrg(e.target.value)}
                          placeholder="e.g., Strategic Initiative Board"
                          className="bg-white/[0.02] border border-white/[0.08] focus:border-[#4F8CFF] focus:outline-none rounded p-2.5 text-xs text-white"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="font-mono text-[9px] text-gray-400 uppercase">Strategic Focus Challenge Context</label>
                        <textarea
                          value={blueprintChallenge}
                          onChange={(e) => setBlueprintChallenge(e.target.value)}
                          placeholder="What high-stakes decision parameter, EBITDA bottleneck, or data consolidation barrier are we optimizing?"
                          className="bg-white/[0.02] border border-white/[0.08] focus:border-[#4F8CFF] focus:outline-none rounded p-2.5 text-xs text-white h-20 resize-none leading-relaxed"
                        />
                      </div>

                      <button
                        onClick={() => {
                          if (blueprintEmail && blueprintOrg) {
                            setBlueprintRequested(true);
                          } else {
                            alert("Corporate Email and Organization parameters are required for secure dispatch.");
                          }
                        }}
                        className="bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6] hover:opacity-95 border border-white/10 text-white font-mono text-xs font-bold py-3 px-4 rounded tracking-widest flex items-center justify-center gap-2 transition cursor-pointer mt-2 shadow-[0_0_20px_rgba(79,140,255,0.15)]"
                      >
                        <Send className="w-4 h-4" />
                        <span>DISPATCH BLUEPRINT REQUEST</span>
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 flex flex-col items-center gap-4"
                    >
                      <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Strategic Dispatch Logged Successfully</h4>
                        <p className="text-xs text-gray-400 max-w-xs mx-auto mt-1">
                          A curated decision architecture roadmap proposal matching the coordinates of <span className="text-[#F59E0B] font-semibold">{blueprintOrg}</span> will be prepared and transmitted securely within the Q-SLA guidelines.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setBlueprintRequested(false);
                          setBlueprintEmail("");
                          setBlueprintOrg("");
                          setBlueprintChallenge("");
                        }}
                        className="text-[10px] font-mono text-[#22D3EE] hover:underline"
                      >
                        File another corporate dispatch
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Right Telemetry Panel */}
      <aside className="w-80 shrink-0 border-l border-white/5 hidden xl:flex flex-col p-6 sticky top-10 h-[calc(100vh-40px)] bg-black/15 backdrop-blur-lg overflow-y-auto z-40 justify-between">
        <div className="flex flex-col gap-6">
          
          {/* Header Title */}
          <div className="flex flex-col gap-1 border-b border-white/5 pb-3">
            <span className="font-mono text-[9px] text-[#22D3EE] tracking-widest font-bold uppercase flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-[#22D3EE] animate-pulse" />
              SYSTEM TELEMETRY STREAM
            </span>
            <span className="text-[10px] font-mono text-gray-400">JASPINDER_CSO_CORE // OK</span>
          </div>

          {/* Active Dimension Details */}
          <div className="flex flex-col gap-2 bg-white/[0.02] border border-white/[0.05] p-4 rounded-xl">
            <span className="font-mono text-[8px] text-gray-500 block uppercase">ACTIVE DIMENSION LOG</span>
            <div className="flex items-center gap-2 border-b border-white/5 pb-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedNode.color }}></span>
              <span className="font-bold text-white text-xs">{selectedNode.name}</span>
            </div>
            <span className="text-[10px] text-[#22D3EE] font-mono">{selectedNode.metric}</span>
            <p className="text-[10px] text-gray-400 leading-relaxed font-sans">{selectedNode.philosophy}</p>
          </div>

          {/* Live KPI Grid */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[8px] text-gray-500 uppercase">DECISION METRICS BOUNDS</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/[0.01] border border-white/5 p-2 rounded">
                <span className="text-[8px] font-mono text-gray-400 block uppercase">VALUATION LEVER</span>
                <span className="text-xs font-mono font-bold text-amber-500">$10M+</span>
              </div>
              <div className="bg-white/[0.01] border border-white/5 p-2 rounded">
                <span className="text-[8px] font-mono text-gray-400 block uppercase">LATENCY INDEX</span>
                <span className="text-xs font-mono font-bold text-[#22D3EE]">-30%</span>
              </div>
              <div className="bg-white/[0.01] border border-white/5 p-2 rounded">
                <span className="text-[8px] font-mono text-gray-400 block uppercase">CAPEX DEPLOYED</span>
                <span className="text-xs font-mono font-bold text-[#8B5CF6]">OPTIMAL</span>
              </div>
              <div className="bg-white/[0.01] border border-white/5 p-2 rounded">
                <span className="text-[8px] font-mono text-gray-400 block uppercase">CO-PROCESSOR</span>
                <span className="text-xs font-mono font-bold text-emerald-400">GEMINI_3.5</span>
              </div>
            </div>
          </div>

          {/* Console log list */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[8px] text-gray-500 uppercase">CORE EVENT LOGGER</span>
            <div className="bg-black/40 border border-white/5 p-3 rounded-lg font-mono text-[8px] text-gray-400 flex flex-col gap-1.5 leading-normal max-h-48 overflow-y-auto">
              <div>[11:34:10] SIGNAL_LOCKED // ASR_WATER_GRID</div>
              <div>[11:34:12] COMPILING_EBITDA_MARGINS</div>
              <div>[11:34:15] HARVARD_HONORS_VALIDATED</div>
              <div>[11:34:18] MIT_FINANCE_MODELS_ONLINE</div>
              <div>[11:34:22] PUNJABOS_UPTIME: 99.982%</div>
              <span className="text-[#22D3EE] animate-pulse">[ACTIVE] CALIBRATING SCENARIOS...</span>
            </div>
          </div>

        </div>

        {/* Footer status */}
        <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between text-[9px] font-mono text-gray-500">
          <span>REF_GRID: UTC_WORLD</span>
          <span className="text-emerald-400">SYS_OPTIMAL</span>
        </div>
      </aside>

    </div>
  </div>

  {/* Footer copyright */}
  <footer className="w-full bg-[#111827]/20 border-t border-white/[0.04] py-8 text-center text-[10px] font-mono text-gray-500 flex flex-col gap-2">
    <div>KAUR_DECISION_INTEL_SYSTEMS // SECURE_SHA_256_ACTIVE</div>
    <div>ALL COGNITIVE MODELS ARCHITECTED BY JASPINDER KAUR © {new Date().getFullYear()} // ALL OUTCOMES MATHS-VERIFIED</div>
  </footer>

</div>
  );
}
