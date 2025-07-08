import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

import {
  domains as topDomains, // alias for backward compatibility
  subDomains,
  type Domain, // Top-level domain (Math / R&W)
  type SubDomain,
  type Skill,
  type Difficulty,
} from "@/data/satData";
import { questions as allQuestions, Question } from "@/data/question";

/* -------------------------------- Types -------------------------------- */
interface SkillDifficulty {
  skillId: string;
  difficulty: Difficulty;
}

export interface QuestionBankContextType {
  /* legacy (Top‑level) */
  selectedDomains: Domain[];
  toggleDomainSelection: (d: Domain) => void;

  /* sub‑domain */
  selectedSubDomains: SubDomain[];
  toggleSubDomainSelection: (sd: SubDomain) => void;
  resetSubDomainSelections: () => void;

  /* skill */
  selectedSkills: Skill[];
  toggleSkill: (s: Skill) => void; // alias
  resetSkills: () => void;        // alias

  /* difficulty */
  selectedDifficulties: Difficulty[];
  setSelectedDifficulties: (d: Difficulty[]) => void;

  /* per‑skill difficulty */
  skillDifficulties: SkillDifficulty[];
  setSkillDifficulties: (sd: SkillDifficulty[]) => void;

  /* derived */
  filteredQuestions: Question[];
  questions: Question[];

  /* reset */
  resetSelections: () => void; // alias of resetAll
}

const QuestionBankContext = createContext<QuestionBankContextType | undefined>(
  undefined
);

/* ------------------------------ Provider ------------------------------ */
export const QuestionBankProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  /* selections */
  const [selectedDomains, setDomains] = useState<Domain[]>([]);
  const [selectedSubDomains, setSubDomains] = useState<SubDomain[]>([]);
  const [selectedSkills, setSkills] = useState<Skill[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Difficulty[]
  >([]);
  const [skillDifficulties, setSkillDifficulties] = useState<
    SkillDifficulty[]
  >([]);

  /* utility toggle */
  const toggle = <T extends { id: string }>(
    arr: T[],
    setArr: React.Dispatch<React.SetStateAction<T[]>>,
    item: T,
    single = false
  ) =>
    setArr((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) return prev.filter((i) => i.id !== item.id);
      return single ? [item] : [...prev, item];
    });

  /* top‑domain (legacy) */
  const toggleDomainSelection = useCallback(
    (d: Domain) => toggle(selectedDomains, setDomains, d),
    [selectedDomains]
  );

  /* sub‑domain */
  const toggleSubDomainSelection = useCallback(
    (sd: SubDomain) => toggle(selectedSubDomains, setSubDomains, sd, true), // single select
    [selectedSubDomains]
  );
  const resetSubDomainSelections = useCallback(() => setSubDomains([]), []);

  /* skill */
  const toggleSkill = useCallback(
    (s: Skill) => toggle(selectedSkills, setSkills, s),
    [selectedSkills]
  );
  const resetSkills = useCallback(() => setSkills([]), []);

  /* reset all */
  const resetSelections = useCallback(() => {
    setDomains([]);
    setSubDomains([]);
    setSkills([]);
    setSelectedDifficulties([]);
    setSkillDifficulties([]);
  }, []);

  /* derived: filtered questions */
  const filteredQuestions = useMemo(() => {
    if (!skillDifficulties.length) return [];
    const idToName = (id: string) =>
      Object.values(subDomains)
        .flatMap((sd) => sd.skills)
        .find((s) => s.id === id)?.name;

    return allQuestions.filter((q) =>
      skillDifficulties.some(
        (sd) => q.skill.trim() === idToName(sd.skillId) && q.difficulty === sd.difficulty
      )
    );
  }, [skillDifficulties]);

  /* provide */
  const value: QuestionBankContextType = {
    selectedDomains,
    toggleDomainSelection,

    selectedSubDomains,
    toggleSubDomainSelection,
    resetSubDomainSelections,

    selectedSkills,
    toggleSkill,
    resetSkills,

    selectedDifficulties,
    setSelectedDifficulties,

    skillDifficulties,
    setSkillDifficulties,

    filteredQuestions,
    questions: allQuestions,

    resetSelections,
  };

  return (
    <QuestionBankContext.Provider value={value}>
      {children}
    </QuestionBankContext.Provider>
  );
};

/* ------------------------------ Hook ------------------------------ */
export const useQuestionBank = () => {
  const ctx = useContext(QuestionBankContext);
  if (!ctx) throw new Error('useQuestionBank must be used within QuestionBankProvider');
  return ctx;
};
