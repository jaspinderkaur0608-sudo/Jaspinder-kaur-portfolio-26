import React, { useRef, useEffect, useState } from "react";

interface FlowLine {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
  progress: number;
  speed: number;
  color: string;
}

export default function FloatingGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeNodeName, setActiveNodeName] = useState("Global System");

  // Globe parameters
  const GLOBE_RADIUS = 160;
  
  // Custom latitude/longitude points of key global cities (representing data centers, capital flows, government hubs)
  const cityNodes = [
    { name: "New York Hub", lat: 40.7128, lon: -74.0060, value: "$4.5M Flow", label: "Fintech Grid" },
    { name: "London Node", lat: 51.5074, lon: -0.1278, value: "AI Analytics", label: "Strategy Center" },
    { name: "PunjabOS HQ", lat: 30.9010, lon: 75.8573, value: "Active Governance", label: "Civic OS" },
    { name: "Tokyo Core", lat: 35.6762, lon: 139.6503, value: "+30% Decision Velocity", label: "F1 Telemetry" },
    { name: "San Francisco Gateway", lat: 37.7749, lon: -122.4194, value: "Model Serving", label: "OpenAI Layer" },
    { name: "Sydney Node", lat: -33.8688, lon: 151.2093, value: "Risk Intel", label: "Oceanic Capital" },
    { name: "Frankfurt Hub", lat: 50.1109, lon: 8.6821, value: "Billion-row Query", label: "Bloomberg Stream" }
  ];

  // Active pulsing flows between nodes
  const [flows, setFlows] = useState<FlowLine[]>([
    { lat1: 37.7749, lon1: -122.4194, lat2: 30.9010, lon2: 75.8573, progress: 0, speed: 0.008, color: "#4F8CFF" }, // SF -> Punjab
    { lat1: 40.7128, lon1: -74.0060, lat2: 51.5074, lon2: -0.1278, progress: 0.2, speed: 0.007, color: "#F59E0B" }, // NY -> London
    { lat1: 51.5074, lon1: -0.1278, lat2: 30.9010, lon2: 75.8573, progress: 0.5, speed: 0.009, color: "#8B5CF6" }, // London -> Punjab
    { lat1: 35.6762, lon1: 139.6503, lat2: 30.9010, lon2: 75.8573, progress: 0.1, speed: 0.006, color: "#22D3EE" }, // Tokyo -> Punjab
    { lat1: -33.8688, lon1: 151.2093, lat2: 37.7749, lon2: -122.4194, progress: 0.7, speed: 0.008, color: "#4F8CFF" } // Sydney -> SF
  ]);

  // Generate background 3D points on the sphere (representing the globe)
  const spherePoints = useRef<{ x: number; y: number; z: number }[]>([]);
  if (spherePoints.current.length === 0) {
    const pts = [];
    const numPoints = 350;
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = GLOBE_RADIUS * Math.cos(phi);
      pts.push({ x, y, z });
    }
    spherePoints.current = pts;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let localRotationY = rotation.y;
    let localRotationX = rotation.x;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight || 500;
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

      // Auto rotation when not dragging
      if (!isDragging) {
        localRotationY += 0.002; // Spin slowly
      } else {
        localRotationX = rotation.x;
        localRotationY = rotation.y;
      }

      // Projection utilities
      const project = (x: number, y: number, z: number) => {
        // Rotate Y (horizontal)
        const cosY = Math.cos(localRotationY);
        const sinY = Math.sin(localRotationY);
        let rx = x * cosY - z * sinY;
        let rz = x * sinY + z * cosY;

        // Rotate X (vertical pitch)
        const cosX = Math.cos(localRotationX);
        const sinX = Math.sin(localRotationX);
        let ry = y * cosX - rz * sinX;
        rz = y * sinX + rz * cosX;

        // Simple orthographic/perspective projection
        const scale = 400 / (400 + rz); // depth scaling
        return {
          sx: centerX + rx * scale,
          sy: centerY + ry * scale,
          depth: rz,
          visible: rz > -GLOBE_RADIUS // Front-facing
        };
      };

      // Draw starry outer atmosphere halo
      const grad = ctx.createRadialGradient(centerX, centerY, GLOBE_RADIUS * 0.7, centerX, centerY, GLOBE_RADIUS * 1.5);
      grad.addColorStop(0, "rgba(79, 140, 255, 0.05)");
      grad.addColorStop(0.5, "rgba(139, 92, 246, 0.03)");
      grad.addColorStop(1, "rgba(7, 11, 20, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, GLOBE_RADIUS * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw faint orbit guide lines
      ctx.strokeStyle = "rgba(79, 140, 255, 0.07)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, GLOBE_RADIUS, 0, Math.PI * 2);
      ctx.stroke();

      // Draw background globe particles (dots forming sphere grid)
      spherePoints.current.forEach((pt) => {
        const proj = project(pt.x, pt.y, pt.z);
        
        // Depth-based opacity
        const opacity = Math.max(0.08, (GLOBE_RADIUS - proj.depth) / (GLOBE_RADIUS * 2));
        ctx.fillStyle = `rgba(34, 211, 238, ${opacity * 0.5})`;
        ctx.beginPath();
        // front dots are slightly larger
        const r = proj.depth < 0 ? 1.5 : 1.0;
        ctx.arc(proj.sx, proj.sy, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Lat/Lon to 3D Cartesian coordinates helper
      const latLonToCartesian = (lat: number, lon: number) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        return {
          x: GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta),
          y: GLOBE_RADIUS * Math.cos(phi),
          z: GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta),
        };
      };

      // Draw connection Flow lines
      flows.forEach((flow) => {
        // Animate progress
        flow.progress += flow.speed;
        if (flow.progress > 1) flow.progress = 0;

        const p1 = latLonToCartesian(flow.lat1, flow.lon1);
        const p2 = latLonToCartesian(flow.lat2, flow.lon2);

        const proj1 = project(p1.x, p1.y, p1.z);
        const proj2 = project(p2.x, p2.y, p2.z);

        // Draw curved bezier line representing flow
        // To make a curved arc in 3D, we interpolate coordinates outwards
        const steps = 24;
        ctx.beginPath();
        ctx.lineWidth = 1.2;
        let activePoint = { sx: 0, sy: 0, depth: 0 };

        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          // Spherical lerp approximation
          const currLat = flow.lat1 + (flow.lat2 - flow.lat1) * t;
          const currLon = flow.lon1 + (flow.lon2 - flow.lon1) * t;
          
          // Add a bulge factor based on curve height
          const bulge = Math.sin(t * Math.PI) * 28;
          const cart = latLonToCartesian(currLat, currLon);
          
          // Stretch Cartesian coordinates outward to simulate arc
          const dist = Math.sqrt(cart.x * cart.x + cart.y * cart.y + cart.z * cart.z);
          const factor = (dist + bulge) / dist;
          const arcX = cart.x * factor;
          const arcY = cart.y * factor;
          const arcZ = cart.z * factor;

          const projArc = project(arcX, arcY, arcZ);

          if (i === 0) {
            ctx.moveTo(projArc.sx, projArc.sy);
          } else {
            ctx.lineTo(projArc.sx, projArc.sy);
          }

          // Track the particle coordinate at current progress
          if (Math.abs(t - flow.progress) < 1 / steps) {
            activePoint = projArc;
          }
        }

        // Draw path gradient
        const lineGrad = ctx.createLinearGradient(proj1.sx, proj1.sy, proj2.sx, proj2.sy);
        lineGrad.addColorStop(0, "rgba(79, 140, 255, 0.05)");
        lineGrad.addColorStop(0.5, flow.color + "50");
        lineGrad.addColorStop(1, "rgba(34, 211, 238, 0.05)");
        ctx.strokeStyle = lineGrad;
        ctx.stroke();

        // Draw floating dynamic signal particle
        if (activePoint.sx !== 0) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = flow.color;
          ctx.fillStyle = flow.color;
          ctx.beginPath();
          ctx.arc(activePoint.sx, activePoint.sy, 3.5, 0, Math.PI * 2);
          ctx.fill();
          
          // Outer ping ring
          ctx.strokeStyle = flow.color + "66";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(activePoint.sx, activePoint.sy, 7, 0, Math.PI * 2);
          ctx.stroke();
          
          ctx.shadowBlur = 0; // Reset shadow
        }
      });

      // Draw Key Corporate nodes (HQ, Capital hubs)
      cityNodes.forEach((node) => {
        const cart = latLonToCartesian(node.lat, node.lon);
        const proj = project(cart.x, cart.y, cart.z);

        if (proj.visible) {
          const isCore = node.name.includes("PunjabOS");
          const size = isCore ? 6 : 4;
          const glowColor = isCore ? "#8B5CF6" : "#4F8CFF";

          // Pulsing highlight
          const pulse = 1 + Math.sin(Date.now() * 0.004) * 0.25;

          // Drawing glowing node shadow
          ctx.shadowBlur = 12 * pulse;
          ctx.shadowColor = glowColor;

          ctx.fillStyle = glowColor;
          ctx.beginPath();
          ctx.arc(proj.sx, proj.sy, size, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowBlur = 0; // Reset

          // Secondary halo
          ctx.strokeStyle = glowColor + "40";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(proj.sx, proj.sy, size * 2 * pulse, 0, Math.PI * 2);
          ctx.stroke();

          // Text labels for premium executive interface style
          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.font = "500 11px Inter";
          ctx.textAlign = "left";
          ctx.fillText(node.name, proj.sx + 10, proj.sy - 2);

          ctx.fillStyle = isCore ? "#A78BFA" : "rgba(34, 211, 238, 0.7)";
          ctx.font = "400 9px JetBrains Mono";
          ctx.fillText(node.label, proj.sx + 10, proj.sy + 8);
        }
      });

      // Center crosshair (F1 telemetry style)
      ctx.strokeStyle = "rgba(79, 140, 255, 0.15)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(centerX - 20, centerY);
      ctx.lineTo(centerX + 20, centerY);
      ctx.moveTo(centerX, centerY - 20);
      ctx.lineTo(centerX, centerY + 20);
      ctx.stroke();

      // Circle target coordinates
      ctx.strokeStyle = "rgba(79, 140, 255, 0.08)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, GLOBE_RADIUS + 40, 0, Math.PI * 2);
      ctx.stroke();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [rotation, isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setRotation((prev) => ({
      x: prev.x + deltaY * 0.005,
      y: prev.y + deltaX * 0.005,
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-[320px] md:h-[450px] bg-gradient-to-b from-transparent to-[#070B14]/40 flex items-center justify-center select-none overflow-hidden rounded-2xl border border-white/[0.04] bg-[#111827]/10 backdrop-blur-md">
      {/* Telemetry frame details */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-[#22D3EE]/60 tracking-wider flex flex-col gap-1 z-10">
        <div>SYS.ID: DECISION_GLOBE_3D</div>
        <div>ROT: [{(rotation.x * (180 / Math.PI)).toFixed(1)}°, {(rotation.y * (180 / Math.PI)).toFixed(1)}°]</div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span>LIVE TELEMETRY STREAM</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 font-mono text-[9px] text-[#4F8CFF]/60 text-right tracking-wider flex flex-col gap-1 z-10">
        <div>COORDINATES: UTC_REF_GRID</div>
        <div>CAPITAL OUTFLOWS: OK</div>
        <div>DRAG TO ROTATE GLOBE</div>
      </div>

      <div className="absolute bottom-4 left-4 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-white/[0.05] text-[10px] font-mono text-white/80">
        <span className="text-[#F59E0B] font-bold">★ FOCUS METRIC:</span> Unified PunjabOS Central Core (30.9010° N, 75.8573° E)
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
