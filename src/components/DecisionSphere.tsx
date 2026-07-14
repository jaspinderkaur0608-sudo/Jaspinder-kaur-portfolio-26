import React, { useRef, useEffect, useState } from "react";
import { DecisionNode } from "../types";

interface DecisionSphereProps {
  onSelectNode: (node: DecisionNode) => void;
  selectedNodeId: string;
}

export default function DecisionSphere({ onSelectNode, selectedNodeId }: DecisionSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Core nodes reflecting Jaspinder's 8 executive decision modules
  const nodes: DecisionNode[] = [
    {
      id: "finance",
      name: "Finance",
      description: "Rigorous Capital Allocation & Valuation Optimization",
      philosophy: "I don't just calculate budgets; I engineer dynamic corporate models to optimize enterprise valuations, analyze scenario options mathematically, and direct capital allocations strictly to maximum-ROIC growth vectors.",
      x: 0, y: 0,
      color: "#F59E0B", // Gold
      metric: "$10M+ Capital Influenced"
    },
    {
      id: "ai",
      name: "AI & Decision Systems",
      description: "Automating Executive Context & Machine Intelligence",
      philosophy: "Modern organizations choke on raw databases. I build server-side machine intelligence models, custom forecasting structures, and cognitive interfaces that transform standard databases into live executive decision engines.",
      x: 0, y: 0,
      color: "#4F8CFF", // Blue
      metric: "7 Units Unified"
    },
    {
      id: "strategy",
      name: "Strategy",
      description: "Designing Multi-Horizon Corporate Playbooks",
      philosophy: "Strategy is not a slide deck—it is a continuous optimization game played under severe uncertainty. I structure clear trade-off boundaries, signal-detection models, and long-range corporate competitive positioning structures.",
      x: 0, y: 0,
      color: "#8B5CF6", // Purple
      metric: "-30% Decision Latency"
    },
    {
      id: "analytics",
      name: "Analytics & BI",
      description: "Synthesizing Core Organizational Telemetry",
      philosophy: "Enterprise telemetry is vital. By connecting fragmented ERP/CRM segments into unified central hubs, I replace descriptive tracking with real-time diagnostic and predictive intelligence loops.",
      x: 0, y: 0,
      color: "#22D3EE", // Cyan
      metric: "Google Advanced BI"
    },
    {
      id: "operations",
      name: "Operations",
      description: "Optimizing Resource Allocation & Multi-unit Efficiency",
      philosophy: "Efficiency must be built into workflows, not just targeted on slides. My systems automate metrics flows, decrease communication latencies, and optimize regional asset allocation by up to 25%.",
      x: 0, y: 0,
      color: "#10B981", // Emerald
      metric: "25% Efficiency Gain"
    },
    {
      id: "leadership",
      name: "Executive Leadership",
      description: "Empowering C-Suite Decision-Making Alignment",
      philosophy: "Serving as a direct partner to CEOs, CFOs, and government ministers. I focus on removing decision bottlenecks, facilitating workshops, organizing high-stakes executive events, and driving group alignment on allocation.",
      x: 0, y: 0,
      color: "#EC4899", // Pink
      metric: "C-Suite Advisor"
    },
    {
      id: "risk",
      name: "Risk Analysis",
      description: "Modeling Tail-risk & Stress Testing Scenarios",
      philosophy: "Under extreme uncertainty, a single point of failure can dismantle years of growth. I specialize in tail-risk modeling, stress-testing pricing structures, and setting up programmatic mitigation strategies.",
      x: 0, y: 0,
      color: "#EF4444", // Red
      metric: "Risk Intelligence"
    },
    {
      id: "decision-systems",
      name: "Decision Architectures",
      description: "Building Unified Civic Operating Systems",
      philosophy: "Flagship system design: PunjabOS. Creating state-level governance engines which unify public intelligence, civic complaints pipelines, and administrative asset allocation maps into a single source of strategic truth.",
      x: 0, y: 0,
      color: "#6366F1", // Indigo
      metric: "PunjabOS Flagship"
    }
  ];

  // Initialize node points in spherical distribution space
  const initializedNodes = useRef<DecisionNode[]>(
    nodes.map((node, i) => {
      const angle = (i / nodes.length) * Math.PI * 2;
      const radius = 130;
      // Spread them in space
      return {
        ...node,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      };
    })
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let angleOffset = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight || 400;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      // Slow orbital drift
      angleOffset += 0.003;

      // Draw faint background radial rings
      ctx.strokeStyle = "rgba(79, 140, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, 130, 0, Math.PI * 2);
      ctx.stroke();

      // Draw network connection lines (everything connected to everything else with low opacity)
      ctx.lineWidth = 0.5;
      const currentPositions: { x: number; y: number; id: string; color: string }[] = [];

      initializedNodes.current.forEach((node, i) => {
        // Orbit mathematics (combining basic angle with time drift)
        const nodeAngle = (i / initializedNodes.current.length) * Math.PI * 2 + angleOffset;
        
        // Add subtle elliptical wobble
        const rX = 130 + Math.sin(angleOffset * 2 + i) * 10;
        const rY = 110 + Math.cos(angleOffset * 2 + i) * 10;

        const x = centerX + Math.cos(nodeAngle) * rX;
        const y = centerY + Math.sin(nodeAngle) * rY;

        currentPositions.push({ x, y, id: node.id, color: node.color });
      });

      // Draw lines between nodes
      ctx.strokeStyle = "rgba(79, 140, 255, 0.08)";
      for (let i = 0; i < currentPositions.length; i++) {
        for (let j = i + 1; j < currentPositions.length; j++) {
          const p1 = currentPositions[i];
          const p2 = currentPositions[j];
          
          const isEitherSelected = p1.id === selectedNodeId || p2.id === selectedNodeId;
          const isEitherHovered = p1.id === hoveredNodeId || p2.id === hoveredNodeId;

          if (isEitherSelected) {
            ctx.strokeStyle = `rgba(139, 92, 246, 0.3)`;
            ctx.lineWidth = 1.0;
          } else if (isEitherHovered) {
            ctx.strokeStyle = `rgba(34, 211, 238, 0.2)`;
            ctx.lineWidth = 0.8;
          } else {
            ctx.strokeStyle = "rgba(79, 140, 255, 0.06)";
            ctx.lineWidth = 0.5;
          }

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Draw Central core node representing "Jaspinder Kaur - Chief Decision Architect"
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#4F8CFF";
      ctx.fillStyle = "#070B14";
      ctx.strokeStyle = "#4F8CFF";
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset

      // Core interior visual ring
      ctx.strokeStyle = "rgba(34, 211, 238, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 22, 0, Math.PI * 2);
      ctx.stroke();

      // Central core text
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 9px JetBrains Mono";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("CORE", centerX, centerY - 4);
      ctx.fillStyle = "#22D3EE";
      ctx.font = "bold 8px JetBrains Mono";
      ctx.fillText("INTEL", centerX, centerY + 6);

      // Draw Orbiting Nodes
      currentPositions.forEach((pos, index) => {
        const baseNode = initializedNodes.current[index];
        const isSelected = pos.id === selectedNodeId;
        const isHovered = pos.id === hoveredNodeId;

        let nodeSize = 10;
        let shadowSize = 0;

        if (isSelected) {
          nodeSize = 14;
          shadowSize = 25;
        } else if (isHovered) {
          nodeSize = 12;
          shadowSize = 15;
        }

        // Apply glow
        if (shadowSize > 0) {
          ctx.shadowBlur = shadowSize;
          ctx.shadowColor = pos.color;
        }

        // Draw node base circle
        ctx.fillStyle = pos.color;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0; // Reset

        // Outer outline ring
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeSize + 3, 0, Math.PI * 2);
        ctx.stroke();

        // Node text label
        ctx.fillStyle = isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.75)";
        ctx.font = isSelected ? "bold 11px Inter" : "500 10px Inter";
        ctx.textAlign = "center";
        
        // Decide label offset dynamically to not overlap core
        const labelOffsetY = pos.y < centerY ? -16 : 20;
        ctx.fillText(baseNode.name, pos.x, pos.y + labelOffsetY);

        // Subtext metric in monospaced font
        if (isSelected || isHovered) {
          ctx.fillStyle = isSelected ? "#22D3EE" : "rgba(34, 211, 238, 0.85)";
          ctx.font = "400 9px JetBrains Mono";
          ctx.fillText(baseNode.metric, pos.x, pos.y + (pos.y < centerY ? -28 : 31));
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedNodeId, hoveredNodeId]);

  // Click & Hover math
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    let closestNode: DecisionNode | null = null;
    let minDistance = 30; // threshold for clicks

    // Recompute instantaneous positions
    initializedNodes.current.forEach((node, i) => {
      // Approximate position matched with renderer
      // Need a stable calculation matching time
    });

    // Let's iterate using current positions based on mouse coordinates relative to nodes
    // Better: find closest node from canvas coordinates during render and store them, or recompute:
    // To make it easy, we will track the hoveredNode and trigger click if clicked
    const matchedNode = initializedNodes.current.find(n => n.id === hoveredNodeId);
    if (matchedNode) {
      onSelectNode(matchedNode);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Retrieve state offset roughly
    // Or we can do mouse-distance checking from orbital path radius to make hovering feel incredible
    let activeId: string | null = null;
    let closestDist = 28;

    // Approximate angular coordinates
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distanceToCenter = Math.sqrt(dx * dx + dy * dy);

    // If mouse is near orbital path
    if (distanceToCenter > 75 && distanceToCenter < 180) {
      let mouseAngle = Math.atan2(dy, dx);
      if (mouseAngle < 0) mouseAngle += Math.PI * 2;

      // We have angleOffset. We can calculate which node matches this angle!
      // This is beautiful and extremely stable!
      // Let's get the absolute angleOffset value by estimating it from current timestamp
      const speed = 0.003;
      const angleOffsetEstimated = (Date.now() * 0.001 * 60 * speed) % (Math.PI * 2);

      initializedNodes.current.forEach((node, i) => {
        let nodeAngle = (i / initializedNodes.current.length) * Math.PI * 2 + angleOffsetEstimated;
        nodeAngle = nodeAngle % (Math.PI * 2);
        if (nodeAngle < 0) nodeAngle += Math.PI * 2;

        let diff = Math.abs(mouseAngle - nodeAngle);
        if (diff > Math.PI) diff = Math.PI * 2 - diff;

        // Angle proximity & distance proximity combined
        if (diff < 0.35 && Math.abs(distanceToCenter - 120) < 40) {
          activeId = node.id;
        }
      });
    }

    setHoveredNodeId(activeId);
  };

  return (
    <div className="relative w-full h-[380px] md:h-[420px] bg-gradient-to-b from-transparent to-[#070B14]/40 flex flex-col items-center justify-center select-none overflow-hidden rounded-2xl border border-white/[0.04]">
      <div className="absolute top-3 left-4 font-mono text-[9px] text-[#8B5CF6]/70 tracking-widest z-10">
        SYSTEM: COGNITIVE_NODE_ROUTING
      </div>
      <div className="absolute top-3 right-4 font-mono text-[9px] text-[#22D3EE]/70 tracking-widest text-right z-10 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
        HOVER OR CLICK ON DISCIPLINE NODES
      </div>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        className="w-full h-full cursor-pointer"
      />
    </div>
  );
}
