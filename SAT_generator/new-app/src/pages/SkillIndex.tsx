import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { subDomains } from "@/data/satData";
import SkillCard from "@/components/SkillCard";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useQuestionBank } from "@/context/QuestionBankContext";


const SkillIndex: React.FC = () => {
  const { subDomainId } = useParams<{ subDomainId: string }>();
  const sub = subDomainId ? subDomains[subDomainId] : null;
  const navigate = useNavigate();

  const {
    selectedSkills,
    toggleSkill,
    resetSkills,
    questions,              // ← 문항 수 계산용
  } = useQuestionBank();

  /* 진입 시 기존 Skill 선택 초기화 */
  React.useEffect(() => {
    resetSkills();
  }, [resetSkills]);

  /* 페이지 가드 */
  if (!sub) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-xl font-semibold text-destructive">
          Invalid category: {subDomainId}
        </h2>
        <Button className="mt-6" onClick={() => navigate("/domains")}>
          Back
        </Button>
      </div>
    );
  }

  const handleContinue = () => {
    if (selectedSkills.length === 0) return;
    navigate(`/difficulties/${subDomainId}`);
  };

  /* 각 skill-별 문항 개수 */
  const getCount = (skillId: string) => {
    const skillName = sub.skills.find((s) => s.id === skillId)?.name;
    return questions.filter((q) => q.skill === skillName).length;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* ───── Bread-crumbs ───── */}
      <Breadcrumbs
        items={[
          { label: "Domains", href: "/domains" },
          { label: "Skills", href: `/skills/${subDomainId}`, active: true },
        ]}
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">{sub.name}</h1>
        <p className="text-muted-foreground">{sub.description}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sub.skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            isSelected={selectedSkills.some((s) => s.id === skill.id)}
            onToggle={() => toggleSkill(skill)}
            questionCount={getCount(skill.id)}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleContinue}
          disabled={selectedSkills.length === 0}
          size="lg"
        >
          {selectedSkills.length === 0
            ? "Select at least one skill"
            : "Choose Difficulty"}
        </Button>
      </div>
    </div>
  );
};

export default SkillIndex;
