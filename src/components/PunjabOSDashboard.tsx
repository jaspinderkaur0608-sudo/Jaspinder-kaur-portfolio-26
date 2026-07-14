import React, { useState, useEffect } from "react";
import { PunjabDistrict } from "../types";
import { 
  Building2, 
  Map, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle, 
  Layers, 
  Cpu, 
  Compass, 
  RefreshCw, 
  Sliders, 
  ChevronRight 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function PunjabOSDashboard() {
  const [activeLayer, setActiveLayer] = useState<"complaints" | "budget" | "ai_networks">("complaints");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("ludhiana");
  const [complaintFeed, setComplaintFeed] = useState<any[]>([]);
  const [isSimulating, setIsSimulating] = useState(true);
  const [systemUptime, setSystemUptime] = useState("99.982%");

  // Detailed telemetry datasets for Punjab districts
  const districts: Record<string, PunjabDistrict> = {
    ludhiana: { id: "ludhiana", name: "Ludhiana", complaintsCount: 1420, resolutionRate: "94.2%", activeBudget: "₹12.4 Cr", aiPriority: "Critical", coordinationIndex: "0.91" },
    amritsar: { id: "amritsar", name: "Amritsar", complaintsCount: 980, resolutionRate: "91.5%", activeBudget: "₹9.8 Cr", aiPriority: "High", coordinationIndex: "0.88" },
    jalandhar: { id: "jalandhar", name: "Jalandhar", complaintsCount: 750, resolutionRate: "95.8%", activeBudget: "₹8.2 Cr", aiPriority: "Medium", coordinationIndex: "0.94" },
    patiala: { id: "patiala", name: "Patiala", complaintsCount: 680, resolutionRate: "93.1%", activeBudget: "₹7.4 Cr", aiPriority: "High", coordinationIndex: "0.89" },
    bathinda: { id: "bathinda", name: "Bathinda", complaintsCount: 590, resolutionRate: "89.4%", activeBudget: "₹6.9 Cr", aiPriority: "High", coordinationIndex: "0.82" },
    mohali: { id: "mohali", name: "S.A.S. Nagar (Mohali)", complaintsCount: 450, resolutionRate: "97.6%", activeBudget: "₹11.1 Cr", aiPriority: "Medium", coordinationIndex: "0.96" },
    hoshiarpur: { id: "hoshiarpur", name: "Hoshiarpur", complaintsCount: 310, resolutionRate: "96.2%", activeBudget: "₹4.5 Cr", aiPriority: "Medium", coordinationIndex: "0.93" },
    gurdaspur: { id: "gurdaspur", name: "Gurdaspur", complaintsCount: 480, resolutionRate: "90.1%", activeBudget: "₹5.1 Cr", aiPriority: "High", coordinationIndex: "0.84" },
    firozpur: { id: "firozpur", name: "Firozpur", complaintsCount: 390, resolutionRate: "87.5%", activeBudget: "₹4.8 Cr", aiPriority: "Critical", coordinationIndex: "0.78" },
    ropar: { id: "ropar", name: "Rupnagar (Ropar)", complaintsCount: 220, resolutionRate: "95.0%", activeBudget: "₹3.9 Cr", aiPriority: "Medium", coordinationIndex: "0.92" },
    sangrur: { id: "sangrur", name: "Sangrur", complaintsCount: 410, resolutionRate: "92.4%", activeBudget: "₹5.5 Cr", aiPriority: "Medium", coordinationIndex: "0.87" },
    muktser: { id: "muktser", name: "Sri Muktsar Sahib", complaintsCount: 290, resolutionRate: "88.9%", activeBudget: "₹3.4 Cr", aiPriority: "High", coordinationIndex: "0.81" }
  };

  // Preset geographic positions to draw a schematic, stylized interactive canvas/map of Punjab
  const districtPositions: Record<string, { cx: number; cy: number; color: string; label: string }> = {
    pathankot: { cx: 58, cy: 12, color: "#22D3EE", label: "PTK" },
    gurdaspur: { cx: 52, cy: 23, color: "#8B5CF6", label: "GSP" },
    amritsar: { cx: 33, cy: 38, color: "#F59E0B", label: "ASR" },
    tarn_taran: { cx: 35, cy: 52, color: "#4F8CFF", label: "TTN" },
    kapurthala: { cx: 51, cy: 43, color: "#10B981", label: "KPT" },
    jalandhar: { cx: 56, cy: 52, color: "#22D3EE", label: "JAL" },
    hoshiarpur: { cx: 68, cy: 35, color: "#8B5CF6", label: "HSP" },
    ropar: { cx: 78, cy: 56, color: "#4F8CFF", label: "ROP" },
    mohali: { cx: 84, cy: 68, color: "#10B981", label: "SAS" },
    ludhiana: { cx: 60, cy: 66, color: "#EF4444", label: "LDH" },
    firozpur: { cx: 28, cy: 68, color: "#EF4444", label: "FZP" },
    fazilka: { cx: 18, cy: 82, color: "#8B5CF6", label: "FAZ" },
    muktser: { cx: 30, cy: 84, color: "#F59E0B", label: "MKT" },
    faridkot: { cx: 36, cy: 75, color: "#22D3EE", label: "FDK" },
    bathinda: { cx: 40, cy: 90, color: "#EF4444", label: "BTA" },
    barnala: { cx: 52, cy: 80, color: "#4F8CFF", label: "BNL" },
    mansa: { cx: 48, cy: 94, color: "#8B5CF6", label: "MNS" },
    sangrur: { cx: 62, cy: 85, color: "#10B981", label: "SGR" },
    malerkotla: { cx: 64, cy: 75, color: "#22D3EE", label: "MLK" },
    patiala: { cx: 75, cy: 84, color: "#F59E0B", label: "PTA" },
    fatehgarh: { cx: 74, cy: 72, color: "#4F8CFF", label: "FGS" }
  };

  // Simulate a live operational feedback loop of citizen tickets being solved
  useEffect(() => {
    // Initial feed
    const initialItems = [
      { id: 1, district: "Ludhiana", category: "Infrastructure", time: "Just now", desc: "Heavy commercial traffic overloading secondary link roads", impact: "$120k Capital Shifted" },
      { id: 2, district: "Amritsar", category: "Citizen Services", time: "2m ago", desc: "E-governance land registry system latency exceeding 1.2s", impact: "Framer API Re-routing" },
      { id: 3, district: "Firozpur", category: "Agriculture", time: "4m ago", desc: "Telemetry breakdown in groundwater flow sensor group B", impact: "Water Reserve Triggered" },
      { id: 4, district: "Patiala", category: "Healthcare", time: "8m ago", desc: "District medical warehouse report mismatch flagging insulin shortage", impact: "Direct Dispatch Initiated" }
    ];
    setComplaintFeed(initialItems);

    if (!isSimulating) return;

    const interval = setInterval(() => {
      const categories = ["Infrastructure", "Citizen Services", "Agriculture", "Energy Grid", "Healthcare"];
      const descriptions = [
        "Primary canal gate telemetry report signal out-of-bounds",
        "Public transit GPS coordinate refresh failure",
        "Paddy stubble satellite thermal anomaly detected",
        "Substation power grid thermal variance spike in sector 4",
        "Administrative personnel allocation audit alert"
      ];
      const selectedDistKey = Object.keys(districts)[Math.floor(Math.random() * Object.keys(districts).length)];
      const distObj = districts[selectedDistKey];
      const randomCat = categories[Math.floor(Math.random() * categories.length)];
      const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];

      const newTicket = {
        id: Date.now(),
        district: distObj.name,
        category: randomCat,
        time: "Just now",
        desc: randomDesc,
        impact: `AI: Reallocated ₹${(Math.random() * 4 + 1).toFixed(1)} Lakhs`
      };

      setComplaintFeed((prev) => [newTicket, ...prev.slice(0, 4)]);
      // Subtle variations in uptime
      setSystemUptime(`99.${(980 + Math.floor(Math.random() * 15)).toString()}%`);
    }, 4500);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const activeDistDetails = districts[selectedDistrict] || districts.ludhiana;

  return (
    <div className="w-full bg-[#111827]/40 border border-white/[0.05] rounded-xl overflow-hidden backdrop-blur-md">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/[0.05] px-4 py-3 bg-black/30">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#8B5CF6]" />
          <span className="font-mono text-xs font-bold tracking-widest text-white">PUNJABOS v3.8 // CITIZEN INTEL COGNITIVE GRID</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>SYSTEM MONITORING ACTIVE</span>
          </div>
          <div>UPTIME: <span className="text-white font-semibold">{systemUptime}</span></div>
          <button 
            onClick={() => setIsSimulating(!isSimulating)}
            className="flex items-center gap-1 bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.05] px-2 py-0.5 rounded transition"
          >
            <RefreshCw className={`w-3 h-3 ${isSimulating ? "animate-spin" : ""}`} />
            <span>{isSimulating ? "LIVE SIM" : "PAUSED"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Interactive Map Visual Block (Lg: 7 cols) */}
        <div className="p-4 lg:col-span-7 border-r border-white/[0.04] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#22D3EE]" />
                <span className="text-xs font-semibold tracking-wider text-gray-200">INTERACTIVE REGIONAL MATRIX</span>
              </div>
              
              {/* Dynamic Layer Toggles */}
              <div className="flex gap-1 bg-black/40 p-1 rounded-lg border border-white/[0.04] text-[10px] font-mono">
                <button
                  onClick={() => setActiveLayer("complaints")}
                  className={`px-2 py-1 rounded transition ${activeLayer === "complaints" ? "bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30" : "text-gray-400 hover:text-white"}`}
                >
                  COMPLAINT DENSITY
                </button>
                <button
                  onClick={() => setActiveLayer("budget")}
                  className={`px-2 py-1 rounded transition ${activeLayer === "budget" ? "bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30" : "text-gray-400 hover:text-white"}`}
                >
                  BUDGET EXPOSURE
                </button>
                <button
                  onClick={() => setActiveLayer("ai_networks")}
                  className={`px-2 py-1 rounded transition ${activeLayer === "ai_networks" ? "bg-[#4F8CFF]/20 text-[#4F8CFF] border border-[#4F8CFF]/30" : "text-gray-400 hover:text-white"}`}
                >
                  AI LINK NETWORKS
                </button>
              </div>
            </div>

            {/* Schematic Map Container */}
            <div className="relative w-full h-[280px] sm:h-[350px] bg-black/25 rounded-lg border border-white/[0.04] overflow-hidden flex items-center justify-center p-4">
              {/* Telemetry coordinate marks */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
              
              <div className="absolute top-2 left-2 text-[8px] font-mono text-gray-500">
                W_GRID_BOUNDS: [32.50° N, 73.80° E] TO [29.50° N, 76.90° E]
              </div>

              {/* F1 Telemetry Target circles */}
              <div className="absolute w-[220px] h-[220px] rounded-full border border-white/[0.02] flex items-center justify-center pointer-events-none">
                <div className="w-[120px] h-[120px] rounded-full border border-white/[0.015]"></div>
              </div>

              {/* Vector abstract background layout mapping district nodes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Draw connection lines dynamically based on selected layer */}
                {activeLayer === "ai_networks" && (
                  <>
                    <line x1="33" y1="38" x2="60" y2="66" stroke="rgba(79, 140, 255, 0.4)" strokeWidth="0.5" strokeDasharray="2,2" />
                    <line x1="56" y1="52" x2="60" y2="66" stroke="rgba(79, 140, 255, 0.5)" strokeWidth="0.5" />
                    <line x1="84" y1="68" x2="60" y2="66" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="0.5" />
                    <line x1="60" y1="66" x2="75" y2="84" stroke="rgba(79, 140, 255, 0.5)" strokeWidth="0.5" />
                    <line x1="40" y1="90" x2="62" y2="85" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="0.5" strokeDasharray="1,2" />
                    <line x1="28" y1="68" x2="33" y2="38" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.5" />
                  </>
                )}
                {activeLayer === "budget" && (
                  <>
                    <line x1="60" y1="66" x2="84" y2="68" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="0.7" />
                    <line x1="60" y1="66" x2="56" y2="52" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="0.5" />
                    <line x1="84" y1="68" x2="75" y2="84" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="0.6" />
                  </>
                )}
              </svg>

              {/* District Node Elements */}
              {Object.entries(districtPositions).map(([id, pos]) => {
                const isSelected = selectedDistrict === id || (id === "ludhiana" && selectedDistrict === "ludhiana");
                const districtData = districts[id] || { name: id.toUpperCase(), complaintsCount: 150, activeBudget: "₹1.5 Cr", aiPriority: "Medium" };
                
                // Color mapping based on layer
                let nodeColor = "rgba(79, 140, 255, 0.5)"; // base blue
                let glowColor = "rgba(79, 140, 255, 0.3)";
                
                if (activeLayer === "complaints") {
                  if (districtData.aiPriority === "Critical") {
                    nodeColor = "rgb(239, 68, 68)";
                    glowColor = "rgba(239, 68, 68, 0.7)";
                  } else if (districtData.aiPriority === "High") {
                    nodeColor = "rgb(249, 115, 22)";
                    glowColor = "rgba(249, 115, 22, 0.5)";
                  } else {
                    nodeColor = "rgb(34, 211, 238)";
                    glowColor = "rgba(34, 211, 238, 0.4)";
                  }
                } else if (activeLayer === "budget") {
                  nodeColor = "rgb(245, 158, 11)"; // Finance gold
                  glowColor = "rgba(245, 158, 11, 0.6)";
                } else {
                  nodeColor = "rgb(139, 92, 246)"; // Strategy purple
                  glowColor = "rgba(139, 92, 246, 0.6)";
                }

                return (
                  <button
                    key={id}
                    onClick={() => {
                      if (districts[id]) {
                        setSelectedDistrict(id);
                      }
                    }}
                    style={{ left: `${pos.cx}%`, top: `${pos.cy}%` }}
                    className="absolute group transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 focus:outline-none"
                  >
                    {/* Ring glow */}
                    <span 
                      style={{ 
                        boxShadow: isSelected ? `0 0 16px ${glowColor}` : "none",
                        backgroundColor: isSelected ? "#FFFFFF" : nodeColor,
                        borderColor: isSelected ? nodeColor : "transparent"
                      }}
                      className="w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 flex items-center justify-center cursor-pointer group-hover:scale-125"
                    >
                      {/* Active core indicator */}
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: nodeColor }}></span>}
                    </span>

                    {/* Small tag identifier */}
                    <span 
                      className={`mt-1 font-mono text-[8px] px-1 rounded tracking-tight transition ${
                        isSelected 
                          ? "bg-white text-[#070B14] font-bold" 
                          : "bg-black/80 text-gray-400 group-hover:text-white"
                      }`}
                    >
                      {pos.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick layer description legend */}
          <div className="mt-4 p-2.5 rounded bg-black/40 border border-white/[0.04] text-[10px] font-mono text-gray-400 flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#22D3EE] font-bold">INFO:</span>
              <span>Layer represents state-level macro indicators mapped onto localized hubs.</span>
            </div>
            <div className="flex gap-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#EF4444]"></span> Critical</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span> High</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#22D3EE]"></span> Stable</span>
            </div>
          </div>
        </div>

        {/* Right Side: Administrative Insights Dashboard Panel (Lg: 5 cols) */}
        <div className="lg:col-span-5 p-4 flex flex-col justify-between gap-4">
          {/* Detailed District Telemetry Card */}
          <div className="bg-black/35 border border-white/[0.04] rounded-lg p-4 flex flex-col gap-3">
            <div className="flex justify-between items-start border-b border-white/[0.06] pb-2">
              <div>
                <span className="font-mono text-[9px] text-[#22D3EE]">DISTRICT TELEMETRY MODULE</span>
                <h3 className="text-base font-bold text-white tracking-tight">{activeDistDetails.name}</h3>
              </div>
              <span 
                className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                  activeDistDetails.aiPriority === "Critical" 
                    ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                    : activeDistDetails.aiPriority === "High"
                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                }`}
              >
                {activeDistDetails.aiPriority.toUpperCase()} PRIORITY
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 my-1">
              <div className="p-2 bg-white/[0.02] border border-white/[0.04] rounded">
                <span className="font-mono text-[9px] text-gray-400 block">CIVIC COMPLAINTS</span>
                <span className="text-lg font-mono font-bold text-white">{activeDistDetails.complaintsCount}</span>
                <span className="text-[8px] font-mono text-[#EF4444] block">+4.2% monthly trend</span>
              </div>
              <div className="p-2 bg-white/[0.02] border border-white/[0.04] rounded">
                <span className="font-mono text-[9px] text-gray-400 block">SLA RESOLUTION</span>
                <span className="text-lg font-mono font-bold text-white text-emerald-400">{activeDistDetails.resolutionRate}</span>
                <span className="text-[8px] font-mono text-emerald-500 block">Within mandate guidelines</span>
              </div>
              <div className="p-2 bg-white/[0.02] border border-white/[0.04] rounded">
                <span className="font-mono text-[9px] text-gray-400 block">ALLOCATED CAPITAL</span>
                <span className="text-lg font-mono font-bold text-[#F59E0B]">{activeDistDetails.activeBudget}</span>
                <span className="text-[8px] font-mono text-gray-500 block">FY26 Development Fund</span>
              </div>
              <div className="p-2 bg-white/[0.02] border border-white/[0.04] rounded">
                <span className="font-mono text-[9px] text-gray-400 block">INTER-SEGMENT INDEX</span>
                <span className="text-lg font-mono font-bold text-white">{activeDistDetails.coordinationIndex}</span>
                <span className="text-[8px] font-mono text-[#4F8CFF] block">Target optimal: 0.95</span>
              </div>
            </div>

            <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 p-2.5 rounded text-[10px] text-gray-200">
              <div className="flex items-center gap-1.5 font-bold text-[#A78BFA] mb-1 font-mono">
                <Cpu className="w-3.5 h-3.5" />
                <span>PUNJABOS AI RECOMMENDATION SUMMARY:</span>
              </div>
              {activeDistDetails.id === "ludhiana" && (
                <p>Detecting secondary link infrastructure load anomalies. Shifting ₹42 Lakhs from non-committed operational segments to direct arterial maintenance.</p>
              )}
              {activeDistDetails.id === "amritsar" && (
                <p>E-governance node experiencing high traffic bursts. Automated allocation scaling triggered. Re-route 15% citizen traffic to Jalandhar cluster servers.</p>
              )}
              {activeDistDetails.id === "firozpur" && (
                <p>Groundwater levels telemetry reporting critical fluctuations. Dispatch regional sensor inspection teams immediately. Pre-allocating backup water resource grants.</p>
              )}
              {activeDistDetails.id !== "ludhiana" && activeDistDetails.id !== "amritsar" && activeDistDetails.id !== "firozpur" && (
                <p>Operational SLA stable. Maintain current resource allocation baseline. Shifting minor overhead buffer to active regional project completions.</p>
              )}
            </div>
          </div>

          {/* Citizen complaint ticker feed */}
          <div className="bg-black/25 border border-white/[0.04] rounded-lg p-3">
            <span className="font-mono text-[9px] text-gray-400 tracking-wider block mb-2">LIVE COMPLAINTS RESOLUTION PIPELINE</span>
            <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {complaintFeed.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-2 rounded bg-white/[0.015] border border-white/[0.03] text-[9px] flex justify-between items-start gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="font-bold text-white">{ticket.district}</span>
                        <span className="text-gray-500 font-mono">|</span>
                        <span className="text-gray-400">{ticket.category}</span>
                      </div>
                      <p className="text-gray-300 leading-normal line-clamp-1">{ticket.desc}</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1 shrink-0">
                      <span className="text-gray-500 font-mono">{ticket.time}</span>
                      <span className="font-mono px-1 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/10">
                        {ticket.impact}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
