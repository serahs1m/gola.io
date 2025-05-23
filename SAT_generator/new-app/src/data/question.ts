// src/data/questions.ts
import { Difficulty } from "./satData";
import raw from "./sat_data.json";     

export interface Question {
  id: number;
  domain: string;
  skill: string;
  difficulty: Difficulty;
  question: string;
  answer: string;
  explanation: string;
}

export const questions: Question[] = (raw as Question[]).map(q => ({
  ...q,
  skill: q.skill.trim(),  
  domain: q.domain.trim()
}));
