export interface StrategicMetric {
  value: string;
  label: string;
  subtext: string;
  highlightColor: string;
}

export interface DecisionNode {
  id: string;
  name: string;
  description: string;
  philosophy: string;
  x: number;
  y: number;
  color: string;
  metric: string;
}

export interface ScenarioResult {
  signalDetection: string[];
  financialImpact: {
    cashFlow: string;
    marginExposure: string;
    valuationImpact: string;
  };
  strategicTradeoffs: {
    optionA: string;
    optionB: string;
    tradeOffComparison: string;
  }[];
  riskAnalysis: {
    riskType: string;
    probability: string;
    impact: string;
    mitigation: string;
  }[];
  scenarioModeling: {
    conservative: string;
    base: string;
    aggressive: string;
  };
  capitalAllocation: {
    initialCapex: string;
    reallocationSource: string;
    strategicJustification: string;
  };
  executiveRecommendation: {
    action: string;
    immediateNextSteps: string[];
    outcomeTimeframe: string;
  };
  expectedROI: string;
  fallback?: boolean;
}

export interface PunjabDistrict {
  id: string;
  name: string;
  complaintsCount: number;
  resolutionRate: string;
  activeBudget: string;
  aiPriority: "Critical" | "High" | "Medium";
  coordinationIndex: string;
}

export interface ProjectCard {
  id: string;
  title: string;
  role: string;
  organization: string;
  period: string;
  impactHighlight: string;
  challenge: string;
  approach: string;
  systemBuilt: string;
  outcome: string;
  businessImpact: string[];
  metrics: { value: string; label: string }[];
}

export interface ObsessedQuestion {
  question: string;
  category: string;
  insight: string;
}
