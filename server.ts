import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = process.env.GEMINI_API_KEY 
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    })
  : null;

// Endpoint for Executive Decision Architecture solver (Chapter 2)
app.post("/api/solve-challenge", async (req, res) => {
  const { challenge } = req.body;
  if (!challenge || typeof challenge !== "string") {
    return res.status(400).json({ error: "A strategic challenge statement is required." });
  }

  if (!ai) {
    // Graceful fallback if API key is missing
    return res.status(200).json({
      fallback: true,
      message: "Please configure GEMINI_API_KEY to activate live AI simulations. Operating in demonstration mode.",
      signalDetection: [
        `Historical baseline analysis for: "${challenge}"`,
        "Anomaly flagged in multi-unit EBITDA reports",
        "Macro trend: Shifting cost structures and pricing inelasticity"
      ],
      financialImpact: {
        cashFlow: "-15% Operating Cash Flow risk over next 2 quarters.",
        marginExposure: "EBITDA margin compression from 22% to 17.5% in core units.",
        valuationImpact: "Estimated $2.4M reduction in enterprise valuation if unmitigated."
      },
      strategicTradeoffs: [
        {
          optionA: "Aggressive cost restructuring and operational consolidation",
          optionB: "Capital injection into core product optimization & market capture",
          tradeOffComparison: "Restructuring preserves near-term liquidity but risks key talent; expansion increases leverage but captures secular growth."
        }
      ],
      riskAnalysis: [
        {
          riskType: "Execution Deficit",
          probability: "Medium (45%)",
          impact: "High",
          mitigation: "Establish a unified Project Management Office (PMO) with weekly milestone tracking."
        }
      ],
      scenarioModeling: {
        conservative: "Scenario A (Bear): Growth flatlines. Immediate capital preservation triggered. Operating margin stabilized at 15%.",
        base: "Scenario B (Base): 4% sequential recovery by Q3. 1.2x ROI on strategic marketing spend.",
        aggressive: "Scenario C (Bull): 12% revenue acceleration. Fully capture latent market demand. Valuations expand by +20%."
      },
      capitalAllocation: {
        initialCapex: "$850,000 reallocation from non-core business segments",
        reallocationSource: "Secondary division operational overhead rationalization",
        strategicJustification: "Redirecting stagnant capital to high-margin growth vectors maximizes aggregate ROIC."
      },
      executiveRecommendation: {
        action: "Deploy a calibrated operational scaling model while initiating a selective margin defense program.",
        immediateNextSteps: [
          "Consolidate business unit financial tracking into a unified dashboard",
          "Renegotiate vendor terms to salvage 120bps in cost-of-goods",
          "Initiate targeted pricing adjustments based on elasticity analysis"
        ],
        outcomeTimeframe: "6 - 9 Months"
      },
      expectedROI: "22.4% Net Project ROI"
    });
  }

  try {
    const prompt = `You are the ultimate strategic partner, an elite Chief Strategy Officer, and an expert corporate decision architect simulating the cognitive workflow of Jaspinder Kaur (Finance × AI × Strategy).
Analyze the following corporate or public-sector strategic challenge: "${challenge}"

Follow Jaspinder's executive methodology:
1. Signal Detection: Identify key trends, anomalies, and market signals causing or surrounding the challenge.
2. Financial Impact: Quantify the exposure on cash flows, EBITDA/margins, and corporate valuation.
3. Strategic Tradeoffs: Weigh opposing routes (e.g., preservation vs aggressive expansion).
4. Risk Analysis: Identify top potential points of failure, their likelihood, impact, and precise mitigations.
5. Scenario Modeling: Outline Conservative (Bear), Base, and Aggressive (Bull) scenarios with concrete metrics.
6. Capital Allocation: Recommend a clear, quantified capital deployment strategy (CAPEX, source of funds).
7. Executive Recommendation: Deliver a final, high-conviction decision with immediate actionable next steps and expected timeframe.
8. Expected ROI: Give a realistic, mathematically sound ROI estimate.

Ensure your answers are highly rigorous, quantitative, specific, and professional. Avoid generic hand-waving or consultant speak. Speak with numbers, percentages, and financial rigor.

Return the response in the exact JSON format specified by the schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "signalDetection",
            "financialImpact",
            "strategicTradeoffs",
            "riskAnalysis",
            "scenarioModeling",
            "capitalAllocation",
            "executiveRecommendation",
            "expectedROI"
          ],
          properties: {
            signalDetection: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of detected financial or market signals (3 items)."
            },
            financialImpact: {
              type: Type.OBJECT,
              required: ["cashFlow", "marginExposure", "valuationImpact"],
              properties: {
                cashFlow: { type: Type.STRING, description: "Quantified cash flow impact." },
                marginExposure: { type: Type.STRING, description: "Quantified margin/EBITDA effect." },
                valuationImpact: { type: Type.STRING, description: "Quantified enterprise value/capitalization effect." }
              }
            },
            strategicTradeoffs: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["optionA", "optionB", "tradeOffComparison"],
                properties: {
                  optionA: { type: Type.STRING },
                  optionB: { type: Type.STRING },
                  tradeOffComparison: { type: Type.STRING, description: "Synthesized choice evaluation." }
                }
              }
            },
            riskAnalysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["riskType", "probability", "impact", "mitigation"],
                properties: {
                  riskType: { type: Type.STRING },
                  probability: { type: Type.STRING },
                  impact: { type: Type.STRING },
                  mitigation: { type: Type.STRING }
                }
              }
            },
            scenarioModeling: {
              type: Type.OBJECT,
              required: ["conservative", "base", "aggressive"],
              properties: {
                conservative: { type: Type.STRING },
                base: { type: Type.STRING },
                aggressive: { type: Type.STRING }
              }
            },
            capitalAllocation: {
              type: Type.OBJECT,
              required: ["initialCapex", "reallocationSource", "strategicJustification"],
              properties: {
                initialCapex: { type: Type.STRING, description: "Quantified investment requirement." },
                reallocationSource: { type: Type.STRING },
                strategicJustification: { type: Type.STRING }
              }
            },
            executiveRecommendation: {
              type: Type.OBJECT,
              required: ["action", "immediateNextSteps", "outcomeTimeframe"],
              properties: {
                action: { type: Type.STRING },
                immediateNextSteps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "List of 3 concrete next actions."
                },
                outcomeTimeframe: { type: Type.STRING }
              }
            },
            expectedROI: { type: Type.STRING, description: "ROI statement, e.g., '18.5% Net Project ROI'" }
          }
        }
      }
    });

    const jsonStr = response.text.trim();
    const result = JSON.parse(jsonStr);
    res.json(result);
  } catch (error: any) {
    console.error("Gemini decision system error:", error);
    res.status(500).json({ error: "Strategic intelligence modeling failed. Fallback to offline engine." });
  }
});

// Endpoint for PunjabOS simulated citizen complaint feed & operational recommendation (Chapter 3)
app.get("/api/punjab-os/intel", (req, res) => {
  const items = [
    { id: "complaint-101", region: "Ludhiana", category: "Infrastructure", severity: "High", desc: "Industrial park power distribution grid bottleneck", status: "AI Recommended Resource Shift" },
    { id: "complaint-102", region: "Amritsar", category: "Citizen Services", severity: "Medium", desc: "Digital land registry response latency spikes", status: "Optimize cloud node allocation" },
    { id: "complaint-103", region: "Jalandhar", category: "Agriculture", severity: "Critical", desc: "Groundwater level telemetry anomalies in block B", status: "Deploy regional water-restructuring grants" },
    { id: "complaint-104", region: "Patiala", category: "Healthcare", severity: "High", desc: "Rural clinic resource utilization deficit", status: "Dynamic medical transport dispatch recommended" }
  ];
  res.json({ items });
});

// Setup Vite Dev Server / Serve production build
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Executive intelligence OS Server] Active on port ${PORT}`);
  });
}

setupServer();
