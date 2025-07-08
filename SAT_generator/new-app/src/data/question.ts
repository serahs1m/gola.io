import { Difficulty } from "./satData";
import mathRawJson from "./sat_data.json";
import readingRawJson from "./sat_reading_data.json";

// ───── Target 타입: 통합된 질문 형식 ─────
// Question 타입에 선택지(choices) 옵션 추가
export interface Question {
  id: number;
  domain: string;      // "Math" | "Reading"
  skill: string;
  difficulty: Difficulty;
  question: string;
  answer: string;      // Math: "42", Reading: "B"
  explanation: string;
  choices?: string[];  // (선택) Reading 전용
  originalId?: number;
}

// ───── Reading 원본 타입 (보기 + rationale 있음) ─────
interface ReadingRawQuestion {
  Domain: string;
  Skill: string;
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  answer: string;
  rationale: string;
  difficulty: string;
  id: number;
}

// ───── JSON 불러오기 및 단언 ─────
const mathRaw = mathRawJson as Omit<Question, "id">[];
const readingRaw = readingRawJson as ReadingRawQuestion[];

// ───── Reading을 Question으로 변환 ─────
// ...Math 쪽은 그대로 두고, Reading 변환부만 교체
const convertedReading: Question[] = readingRaw.map((r) => ({
  id: -1,                                  // 임시
  domain: "Reading",                       // 고정
  skill: r.Skill.trim(),
  difficulty: r.difficulty as Difficulty,
  question: r.question,                    // 지문 + 물음
  answer: r.answer.toUpperCase(),          // "A" | "B" | "C" | "D"
  explanation: r.rationale,
  // ✅ 보기 4개를 choices 배열로 보존
  choices: [r.a, r.b, r.c, r.d],           // <─── 추가
  originalId: r.id
}));

// ───── 병합 및 고유 ID 재부여 ─────
const raw = [...mathRaw, ...convertedReading];

export const questions: Question[] = raw.map((q, index) => ({
  ...q,
  id: index,
  skill: q.skill.trim(),
  domain: q.domain.trim(),
}));
