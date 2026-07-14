import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  Cpu, 
  BarChart3, 
  Target, 
  ShieldAlert, 
  CheckCircle, 
  ChevronRight, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Zap, 
  Sliders 
} from "lucide-react";

interface SimulationPlanet {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  color: string;
  icon: any;
  defaultAllocation: number; // in Millions
  defaultMacroRisk: number; // %
  defaultGrowthRate: number; // %
}

export default function DecisionGalaxy() {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>("punjabos");
  
  // Simulation parameters adjustable by visitors
  const [capitalAllocation, setCapitalAllocation] = useState<number>(4.5); // $ Millions
  const [macroRisk, setMacroRisk] = useState<number>(35); // %
  const [growthFocus, setGrowthFocus] = useState<number>(65); // % (Growth vs Risk Preservation)

  const planets: SimulationPlanet[] = [
    {
      id: "punjabos",
      name: "PunjabOS",
      subtitle: "State-level Civic Intelligence Hub",
      description: "Flagship civic operating system centralizing 22 districts' administrative complaints, telemetry sensors, and local development capital allocation maps. Integrates predictive analytics to preempt resource deficits.",
      metric: "99.98%",
      metricLabel: "Uptime & Civic Sync",
      color: "#8B5CF6", // Purple
      icon: Globe,
      defaultAllocation: 8.5,
      defaultMacroRisk: 15,
      defaultGrowthRate: 20
    },
    {
      id: "executive-ai",
      name: "Executive AI Engine",
      subtitle: "Multi-unit corporate data aggregator",
      description: "Aggregates fragmented databases across 7 business units into a unified C-suite telemetry hub. Combines custom models to automate complex reporting and speed decision speeds by over 30%.",
      metric: "-30%",
      metricLabel: "Decision Latency Reduction",
      color: "#4F8CFF", // Blue
      icon: Cpu,
      defaultAllocation: 4.2,
      defaultMacroRisk: 25,
      defaultGrowthRate: 45
    },
    {
      id: "scenario-simulator",
      name: "Financial Scenario Simulator",
      subtitle: "Multi-variable cash flow projections",
      description: "Calculates corporate valuations, debt leverages, and stress-tests operating margins against varying inflation baselines. Translates speculative strategies into strict risk-reward bounds.",
      metric: "$10M+",
      metricLabel: "Capital Allocation Audited",
      color: "#F59E0B", // Gold
      icon: BarChart3,
      defaultAllocation: 6.8,
      defaultMacroRisk: 50,
      defaultGrowthRate: 15
    },
    {
      id: "market-expansion",
      name: "Market Expansion Simulator",
      subtitle: "B2B client and growth trajectory modeling",
      description: "Engineered specifically to model client churn risks, optimize distribution contracts, and map ARR acceleration. Drove $7M+ ARR growth across historical B2B partnership portfolios.",
      metric: "$7M+ ARR",
      metricLabel: "Revenue Track Generated",
      color: "#22D3EE", // Cyan
      icon: Target,
      defaultAllocation: 5.4,
      defaultMacroRisk: 40,
      defaultGrowthRate: 70
    },
    {
      id: "risk-intel",
      name: "Risk Intelligence Platform",
      subtitle: "Stress-testing systemic corporate exposures",
      description: "Constructs probabilistic models mapping operational failure rates and contract vulnerabilities. Implements algorithmic triggers to shift strategic assets automatically during crises.",
      metric: "+25%",
      metricLabel: "Operational Efficiency Gain",
      color: "#EF4444", // Red
      icon: ShieldAlert,
      defaultAllocation: 2.1,
      defaultMacroRisk: 60,
      defaultGrowthRate: 5
    }
  ];

  const activePlanet = planets.find((p) => p.id === selectedPlanetId) || planets[0];

  // Mathematical Simulator calculations driven by parameters
  const calculatedEBITDAExposure = (capitalAllocation * 1.4 * (1 - macroRisk / 150) * (growthFocus / 100)).toFixed(2);
  const calculatedMarginalROI = (((capitalAllocation * 1.8) / (1 + macroRisk / 100)) * (growthFocus / 50)).toFixed(1);
  const calculatedDecisionConfidence = Math.max(10, Math.min(99, 100 - (macroRisk * 0.8) + (capitalAllocation * 2.5))).toFixed(0);
  const calculatedOutcomes = {
    worst: (capitalAllocation * 0.45 * (1 - macroRisk / 100)).toFixed(2),
    base: (capitalAllocation * 1.15 * (1 + (100 - macroRisk) / 200)).toFixed(2),
    best: (capitalAllocation * 1.65 * (1.2 + (100 - macroRisk) / 100)).toFixed(2)
  };

  return (
    <div className="w-full bg-[#111827]/30 border border-white/[0.04] rounded-xl overflow-hidden backdrop-blur-md p-4 sm:p-6 flex flex-col gap-6">
      
      {/* Title block */}
      <div className="flex flex-col gap-1">
        <span className="font-mono text-xs text-[#22D3EE] tracking-widest flex items-center gap-1">
          <Activity className="w-3.5 h-3.5 text-[#22D3EE]" />
          CHAPTER 5 // DECISION GALAXY STRATEGIC SYSTEMS
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Active Modeling & System Simulations</h3>
        <p className="text-xs text-gray-400 max-w-2xl">
          Strategy must be engineered, not guessed. Orbit through the core platforms designed by Jaspinder Kaur, adjust the input variables below, and view calculated model projections live.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Galaxy Orbital Map Visualizer (Lg: 5 cols) */}
        <div className="lg:col-span-5 relative h-[280px] sm:h-[350px] bg-black/45 rounded-xl border border-white/[0.04] overflow-hidden flex items-center justify-center">
          
          {/* Constellation backdrops */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.025)_1.2px,transparent_1.2px)] bg-[size:12px_12px] opacity-60"></div>
          
          {/* Mathematical grid rings (representing system orbits) */}
          <div className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-white/[0.03] animate-spin" style={{ animationDuration: "120s" }}></div>
          <div className="absolute w-[180px] h-[180px] rounded-full border border-white/[0.03] animate-spin" style={{ animationDuration: "60s" }}></div>
          <div className="absolute w-[110px] h-[110px] rounded-full border border-dashed border-[#4F8CFF]/10 animate-spin" style={{ animationDuration: "30s" }}></div>

          {/* Golden Core representation (Jaspinder's Logic Core) */}
          <div className="absolute flex flex-col items-center justify-center z-20">
            <div className="w-12 h-12 rounded-full bg-[#070B14] border-2 border-[#F59E0B] flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              <span className="font-mono text-[9px] font-bold text-[#F59E0B]">CSO</span>
            </div>
            <span className="font-mono text-[8px] text-[#F59E0B]/80 mt-1 tracking-widest font-semibold">LOGIC CORE</span>
          </div>

          {/* Planet Node Placements relative to core */}
          {planets.map((planet, idx) => {
            const isSelected = planet.id === selectedPlanetId;
            const angle = (idx / planets.length) * Math.PI * 2 + 0.5; // spaced angles
            const distance = 95 + idx * 8; // spaced orbital depths
            
            // Cartesian offsets
            const posX = Math.cos(angle) * distance;
            const posY = Math.sin(angle) * distance;

            const PlanetIcon = planet.icon;

            return (
              <button
                key={planet.id}
                onClick={() => {
                  setSelectedPlanetId(planet.id);
                  setCapitalAllocation(planet.defaultAllocation);
                  setMacroRisk(planet.defaultMacroRisk);
                }}
                style={{ 
                  transform: `translate(${posX}px, ${posY}px)`,
                }}
                className="absolute flex flex-col items-center justify-center focus:outline-none z-10 group"
              >
                {/* Planet circular node */}
                <span 
                  style={{ 
                    borderColor: isSelected ? "#FFFFFF" : "transparent",
                    backgroundColor: isSelected ? planet.color : "rgba(17, 24, 39, 0.8)",
                    boxShadow: isSelected ? `0 0 15px ${planet.color}` : "none"
                  }}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-125"
                >
                  <PlanetIcon 
                    style={{ color: isSelected ? "#070B14" : planet.color }} 
                    className="w-4 h-4" 
                  />
                </span>

                {/* Micro Label */}
                <span 
                  className={`mt-1 font-mono text-[8px] px-1 rounded transition whitespace-nowrap ${
                    isSelected 
                      ? "bg-white text-[#070B14] font-bold" 
                      : "bg-black/60 text-gray-400 group-hover:text-white"
                  }`}
                >
                  {planet.name}
                </span>
              </button>
            );
          })}

          <div className="absolute bottom-3 left-3 text-[8px] font-mono text-gray-500">
            SYSTEM_ORBITS: STABLE // GALAXY_GRID_REF
          </div>
        </div>

        {/* Right Side: Interactive Variable Adjuster & Output Telemetry (Lg: 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-5 bg-black/20 border border-white/[0.04] p-4 rounded-xl">
          
          {/* Selected Initiative Overview Header */}
          <div className="flex justify-between items-start border-b border-white/[0.05] pb-3">
            <div>
              <span className="font-mono text-[9px] tracking-wider" style={{ color: activePlanet.color }}>
                {activePlanet.subtitle.toUpperCase()}
              </span>
              <h4 className="text-lg font-bold text-white tracking-tight">{activePlanet.name}</h4>
              <p className="text-xs text-gray-400 leading-normal mt-1">{activePlanet.description}</p>
            </div>
            
            <div className="text-right shrink-0">
              <span className="font-mono text-[10px] text-gray-500 block">BASE METRIC</span>
              <span className="text-lg font-mono font-bold text-white block" style={{ color: activePlanet.color }}>
                {activePlanet.metric}
              </span>
              <span className="text-[8px] font-mono text-gray-400 block">{activePlanet.metricLabel}</span>
            </div>
          </div>

          {/* Simulator Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-white/[0.04] pb-4">
            
            {/* Input 1: Allocation */}
            <div className="flex flex-col gap-1.5 p-2 bg-white/[0.015] border border-white/[0.03] rounded">
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-300">
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-[#F59E0B]" />
                  ALLOCATION
                </span>
                <span className="text-white font-bold">${capitalAllocation.toFixed(1)}M</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="15.0" 
                step="0.5"
                value={capitalAllocation}
                onChange={(e) => setCapitalAllocation(parseFloat(e.target.value))}
                className="w-full accent-[#F59E0B] h-1 bg-white/10 rounded-lg cursor-pointer"
              />
              <span className="text-[8px] font-mono text-gray-500">Scale of strategic capital deployed</span>
            </div>

            {/* Input 2: Macro Risk */}
            <div className="flex flex-col gap-1.5 p-2 bg-white/[0.015] border border-white/[0.03] rounded">
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-300">
                <span className="flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-[#EF4444]" />
                  MACRO RISK
                </span>
                <span className="text-white font-bold">{macroRisk}%</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="95" 
                step="5"
                value={macroRisk}
                onChange={(e) => setMacroRisk(parseInt(e.target.value))}
                className="w-full accent-[#EF4444] h-1 bg-white/10 rounded-lg cursor-pointer"
              />
              <span className="text-[8px] font-mono text-gray-500">Uncertainty index & cost multipliers</span>
            </div>

            {/* Input 3: Strategic Focus */}
            <div className="flex flex-col gap-1.5 p-2 bg-white/[0.015] border border-white/[0.03] rounded">
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-300">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#22D3EE]" />
                  EXPANSION VECTOR
                </span>
                <span className="text-white font-bold">{growthFocus}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="90" 
                step="5"
                value={growthFocus}
                onChange={(e) => setGrowthFocus(parseInt(e.target.value))}
                className="w-full accent-[#22D3EE] h-1 bg-white/10 rounded-lg cursor-pointer"
              />
              <span className="text-[8px] font-mono text-gray-500">Growth focus vs Capital preservation</span>
            </div>

          </div>

          {/* Computed Dynamic Projections */}
          <div>
            <span className="font-mono text-[9px] text-[#22D3EE] tracking-widest block mb-2">LIVE MODEL COMPUTATIONS // SOLVING STRATEGY MATRIX</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              
              <div className="p-2.5 bg-[#111827]/60 border border-white/[0.04] rounded flex flex-col gap-0.5">
                <span className="font-mono text-[8px] text-gray-400">PROJECTED VALUE-ADD</span>
                <span className="text-base font-mono font-bold text-white">+${calculatedEBITDAExposure}M</span>
                <span className="text-[8px] font-mono text-emerald-400">Aggregate EBITDA impact</span>
              </div>

              <div className="p-2.5 bg-[#111827]/60 border border-white/[0.04] rounded flex flex-col gap-0.5">
                <span className="font-mono text-[8px] text-gray-400">EXPECTED ROI MODEL</span>
                <span className="text-base font-mono font-bold text-[#F59E0B]">{calculatedMarginalROI}%</span>
                <span className="text-[8px] font-mono text-gray-500">Risk-adjusted Net ROI</span>
              </div>

              <div className="p-2.5 bg-[#111827]/60 border border-white/[0.04] rounded flex flex-col gap-0.5">
                <span className="font-mono text-[8px] text-gray-400">DECISION CONFIDENCE</span>
                <span className="text-base font-mono font-bold text-[#4F8CFF]">{calculatedDecisionConfidence}%</span>
                <span className="text-[8px] font-mono text-cyan-400">Bayesian reliability score</span>
              </div>

              <div className="p-2.5 bg-[#111827]/60 border border-white/[0.04] rounded flex flex-col gap-0.5">
                <span className="font-mono text-[8px] text-gray-400">DECISION TIMEFRAME</span>
                <span className="text-base font-mono font-bold text-white">Q3 - Q4 2026</span>
                <span className="text-[8px] font-mono text-gray-500">SLA Deployment track</span>
              </div>

            </div>
          </div>

          {/* Probabilistic Scenario Modeling Box */}
          <div className="p-3 bg-black/45 rounded border border-white/[0.03] text-[10px] font-mono flex flex-col gap-2">
            <span className="text-gray-400 font-bold tracking-widest text-[9px] flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-[#8B5CF6]" />
              STRESS-TESTING OUTCOMES: MULTI-VALUATION EXPOSURE
            </span>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
                <span className="text-red-400 block font-bold">BEAR CASE (Conservative)</span>
                <span className="text-white text-xs block mt-1 font-bold">${calculatedOutcomes.worst}M Val</span>
              </div>
              <div className="p-2 rounded bg-white/[0.03] border border-white/[0.05]">
                <span className="text-gray-400 block font-bold">BASE CASE</span>
                <span className="text-white text-xs block mt-1 font-bold">${calculatedOutcomes.base}M Val</span>
              </div>
              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-emerald-400 block font-bold">BULL CASE (Optimistic)</span>
                <span className="text-white text-xs block mt-1 font-bold">${calculatedOutcomes.best}M Val</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
