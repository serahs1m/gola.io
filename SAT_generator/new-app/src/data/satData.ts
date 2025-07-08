// src/data/satData.ts

/* ───────── 타입 ───────── */
export interface Skill {
  id: string;
  name: string;
}

export interface SubDomain {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

export interface TopDomain {
  id: "math" | "reading-writing";
  name: string;
  description: string;
  subDomains: string[];  // subDomain IDs
}

/* ───────── SubDomains (Math + Reading & Writing) ───────── */
export const subDomains: Record<string, SubDomain> = {
  algebra: {
    id: "algebra",
    name: "Algebra",
    description: "Equations, functions, and algebraic relationships",
    skills: [
      { id: "linear-eq-one-var", name: "Linear equations in one variable" },
      { id: "linear-functions", name: "Linear functions" },
      { id: "linear-eq-two-var", name: "Linear equations in two variables" },
      { id: "systems-linear-eq", name: "Systems of two linear equations in two variables" },
      { id: "linear-inequalities", name: "Linear inequalities in one or two variables" }
    ]
  },
  "advanced-math": {
    id: "advanced-math",
    name: "Advanced Math",
    description: "Higher-level mathematical concepts",
    skills: [
      { id: "nonlinear-functions", name: "Nonlinear functions" }
    ]
  },
  "problem-solving": {
    id: "problem-solving",
    name: "Problem-Solving & Data Analysis",
    description: "Statistics, probability, and data interpretation",
    skills: [
      { id: "ratios-rates", name: "Ratios, rates, proportional relationships, and units" },
      { id: "percentages", name: "Percentages" },
      { id: "one-var-data", name: "One-variable data: Distributions and measures of center and spread" },
      { id: "two-var-data", name: "Two-variable data: Models and scatter plots" },
      { id: "probability", name: "Probability and conditional probability" },
      { id: "inference", name: "Inference from sample statistics and margin of error" },
      { id: "evaluating-claims", name: "Evaluating statistical claims: Observational studies and experiments" }
    ]
  },
  "information-ideas": {
    id: "information-ideas",
    name: "Information and Ideas",
    description: "Central ideas, inferences, evidence",
    skills: [
      { id: "central-ideas-details", name: "Central Ideas and Details" },
      { id: "inferences", name: "Inferences" },
      { id: "command-evidence", name: "Command of Evidence" }
    ]
  },
  "craft-structure": {
    id: "craft-structure",
    name: "Craft and Structure",
    description: "Words in context, structure, cross-text",
    skills: [
      { id: "words-in-context", name: "Words in Context" },
      { id: "text-structure-purpose", name: "Text Structure and Purpose" },
      { id: "cross-text-connections", name: "Cross-Text Connections" }
    ]
  },
  "expression-ideas": {
    id: "expression-ideas",
    name: "Expression of Ideas",
    description: "Rhetorical synthesis, transitions",
    skills: [
      { id: "rhetorical-synthesis", name: "Rhetorical Synthesis" },
      { id: "transitions", name: "Transitions" }
    ]
  },
  "standard-english": {
    id: "standard-english",
    name: "Standard English Conventions",
    description: "Grammar, usage, mechanics",
    skills: [
      { id: "boundaries", name: "Boundaries" },
      { id: "forms-structure-sense", name: "Forms, Structure, and Sense" }
    ]
  }
};

/* ───────── Top Domains ───────── */
export const topDomains: TopDomain[] = [
  {
    id: "math",
    name: "Math",
    description: "Quantitative reasoning and problem solving",
    subDomains: ["algebra", "advanced-math", "problem-solving"]
  },
  {
    id: "reading-writing",
    name: "Reading and Writing",
    description: "Comprehension, rhetoric, and English conventions",
    subDomains: [
      "information-ideas",
      "craft-structure",
      "expression-ideas",
      "standard-english"
    ]
  }
];

/* ───────── 하위 호환을 위한 Alias ───────── */
export type Domain = TopDomain;
export const domains = topDomains;

export type Difficulty = "Easy" | "Medium" | "Hard";
export const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];
