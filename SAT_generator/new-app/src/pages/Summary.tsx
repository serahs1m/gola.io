import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button
} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuestionBank } from "@/context/QuestionBankContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import { subDomains } from "@/data/satData";

const Summary: React.FC = () => {
  const navigate = useNavigate();
  const {
    selectedDomains,          // Top-level (Math / R&W)
    selectedSkills,
    selectedDifficulties,
    skillDifficulties,
    questions,
    setSkillDifficulties,
    resetSelections
  } = useQuestionBank();

  /* 선택 정보가 없다면 홈으로 리다이렉트 */
  React.useEffect(() => {
    if (
      selectedDomains.length === 0 ||
      selectedSkills.length === 0 ||
      selectedDifficulties.length === 0
    ) {
      navigate("/");
    }
  }, [selectedDomains, selectedSkills, selectedDifficulties, navigate]);

  const handleStartOver = () => {
    resetSelections();
    navigate("/");
  };

  const handleStartPractice = () => {
    /* 아직 per-skill 난이도 매핑이 없으면 기본 Medium 으로 생성 */
    if (skillDifficulties.length === 0) {
      setSkillDifficulties(
        selectedSkills.map((s) => ({ skillId: s.id, difficulty: "Medium" }))
      );
    }
    navigate("/practice");
  };

  /* ───── 그룹화: TopDomain → 포함된 skill 집계 ───── */
  const groupedSkills = selectedDomains.map((domain) => {
    /* 1️⃣ 해당 TopDomain 이 포함하는 모든 skillId 수집 */
    const skillIdsForDomain = domain.subDomains.flatMap(
      (sdId) => subDomains[sdId].skills.map((s) => s.id)
    );

    /* 2️⃣ 선택된 skill 중 이 domain 소속만 필터 */
    const domainSkills = selectedSkills.filter((skill) =>
      skillIdsForDomain.includes(skill.id)
    );

    /* 3️⃣ 난이도·문항 수 계산 */
    return {
      domain,
      skills: domainSkills.map((skill) => {
        const skillDiff = skillDifficulties.find(
          (sd) => sd.skillId === skill.id
        );
        const difficulty = skillDiff?.difficulty || "Medium";

        const count = questions.filter(
          (q) => q.skill === skill.name && q.difficulty === difficulty
        ).length;

        return { ...skill, difficulty, count };
      })
    };
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <Breadcrumbs
        items={[
          { label: "Domains", href: "/domains" },
          { label: "Skills", href: "#" },
          { label: "Difficulties", href: "#" },
          { label: "Summary", href: "/summary", active: true }
        ]}
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Your Practice Set</h1>
        <p className="text-muted-foreground">
          Summary of your selected options
        </p>
      </div>

      <div className="space-y-6">
        {groupedSkills.map(({ domain, skills }) => (
          <Card key={domain.id}>
            <CardHeader>
              <CardTitle>{domain.name}</CardTitle>
              <CardDescription>{domain.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {skills.map((skill) => (
                  <li
                    key={skill.id}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {skill.name}
                      <span className="text-muted-foreground text-sm ml-2">
                        [{skill.count} question
                        {skill.count !== 1 ? "s" : ""}]
                      </span>
                    </span>
                    <Badge
                      variant={
                        skill.difficulty === "Hard"
                          ? "destructive"
                          : skill.difficulty === "Easy"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {skill.difficulty}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <Button variant="outline" onClick={handleStartOver}>
          Start Over
        </Button>
        <Button onClick={handleStartPractice}>Start Practice</Button>
      </div>
    </div>
  );
};

export default Summary;
