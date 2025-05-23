
import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import { Domain, Skill, Difficulty, domains } from '../data/satData';
import { questions as allQuestions, Question } from "@/data/question";

interface SkillDifficulty {
  skillId: string;
  difficulty: Difficulty;
}

interface QuestionBankContextType {
  selectedDomains: Domain[];
  selectedSkills: Skill[];
  selectedDifficulties: Difficulty[];
  skillDifficulties: SkillDifficulty[];
  filteredQuestions: Question[];
  setSelectedDomain: (domain: Domain) => void; // Keep for backward compatibility
  toggleDomainSelection: (domain: Domain) => void;
  setSelectedDomains: (domains: Domain[]) => void;
  setSelectedSkills: (skills: Skill[]) => void;
  setSelectedDifficulties: (difficulties: Difficulty[]) => void;
  setSkillDifficulties: (skillDiffs: SkillDifficulty[]) => void;
  resetSelections: () => void;
}

const QuestionBankContext = createContext<QuestionBankContextType | undefined>(undefined);

export const QuestionBankProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([]);
  const [skillDifficulties, setSkillDifficulties] = useState<SkillDifficulty[]>([]);

  // For backward compatibility
  const setSelectedDomain = (domain: Domain) => {
    setSelectedDomains([domain]);
  };

  const toggleDomainSelection = useCallback((domain: Domain) => {
    setSelectedDomains(prev => {
      const isAlreadySelected = prev.some(d => d.id === domain.id);
      
      if (isAlreadySelected) {
        // Remove the domain and all its skills
        const updatedDomains = prev.filter(d => d.id !== domain.id);
        setSelectedSkills(currentSkills => 
          currentSkills.filter(skill => 
            !domain.skills.some(s => s.id === skill.id)
          )
        );
        return updatedDomains;
      } else {
        // Add the domain
        return [...prev, domain];
      }
    });
  }, []);

  const resetSelections = useCallback(() => {
    setSelectedDomains([]);
    setSelectedSkills([]);
    setSelectedDifficulties([]);
    setSkillDifficulties([]);
  }, []);

  const filteredQuestions = useMemo(() => {
    if (!skillDifficulties.length) return [];
  
    return allQuestions.filter(q => {
      return skillDifficulties.some(sd =>
        q.skill.trim() === getSkillNameById(sd.skillId) &&
        q.difficulty === sd.difficulty
      );
    });
  }, [skillDifficulties]);
    
  function getSkillNameById(skillId: string): string | undefined {
    for (const domain of domains) {
      const match = domain.skills.find(skill => skill.id === skillId);
      if (match) return match.name;
    }
    return undefined;
  }

  return (
    <QuestionBankContext.Provider
      value={{
        selectedDomains,
        selectedSkills,
        selectedDifficulties,
        skillDifficulties,
        setSelectedDomain,
        toggleDomainSelection,
        setSelectedDomains,
        setSelectedSkills,
        setSelectedDifficulties,
        setSkillDifficulties,
        resetSelections,
        filteredQuestions
      }}
    >
      {children}
    </QuestionBankContext.Provider>
  );
};

export const useQuestionBank = () => {
  const context = useContext(QuestionBankContext);
  if (context === undefined) {
    throw new Error('useQuestionBank must be used within a QuestionBankProvider');
  }
  return context;
};
