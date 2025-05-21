
export interface Skill {
  id: string;
  name: string;
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

export const domains: Domain[] = [
  {
    id: "algebra",
    name: "Algebra",
    description: "Mastering equations, functions, and algebraic relationships",
    skills: [
      { id: "linear-eq-one-var", name: "Linear equations in one variable" },
      { id: "linear-functions", name: "Linear functions" },
      { id: "linear-eq-two-var", name: "Linear equations in two variables" },
      { id: "systems-linear-eq", name: "Systems of two linear equations in two variables" },
      { id: "linear-inequalities", name: "Linear inequalities in one or two variables" }
    ]
  },
  {
    id: "advanced-math",
    name: "Advanced Math",
    description: "Higher-level mathematical concepts and applications",
    skills: [
      { id: "nonlinear-functions", name: "Nonlinear functions" }
    ]
  },
  {
    id: "problem-solving",
    name: "Problem-Solving and Data Analysis",
    description: "Statistical concepts, data interpretation, and analytical reasoning",
    skills: [
      { id: "ratios-rates", name: "Ratios, rates, proportional relationships, and units" },
      { id: "percentages", name: "Percentages" },
      { id: "one-var-data", name: "One-variable data: Distributions and measures of center and spread" },
      { id: "two-var-data", name: "Two-variable data: Models and scatter plots" },
      { id: "probability", name: "Probability and conditional probability" },
      { id: "inference", name: "Inference from sample statistics and margin of error" },
      { id: "evaluating-claims", name: "Evaluating statistical claims: Observational studies and experiments" }
    ]
  }
];

export type Difficulty = "Easy" | "Medium" | "Hard";
export const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];
