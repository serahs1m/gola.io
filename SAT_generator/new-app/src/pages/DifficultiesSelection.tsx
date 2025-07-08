import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import Breadcrumbs from "@/components/Breadcrumbs";

import {
  difficulties,
  topDomains,
  subDomains,
  type Skill,
} from "@/data/satData";
import { useQuestionBank } from "@/context/QuestionBankContext";
import { getTopDomainBySubId } from "@/utils/breadcrumb";

const DifficultiesSelection: React.FC = () => {
  /* 🔑 라우터 param  이름을 subDomainId 로 맞춤 */
  const { subDomainId } = useParams<{ subDomainId: string }>();
  const navigate = useNavigate();
  const topDom = getTopDomainBySubId(subDomainId!);

  const {
    selectedDomains,
    selectedSkills,
    setSelectedDifficulties,
    setSkillDifficulties,
    questions,
  } = useQuestionBank();

  /* ---------------- 가드 ---------------- */
  React.useEffect(() => {
    if (selectedDomains.length === 0 || selectedSkills.length === 0) {
      navigate("/");
    }
  }, [selectedDomains, selectedSkills, navigate]);

  /* -------------- state -------------- */
  const [skillDiffState, setSkillDiffState] = useState<Record<string, string>>(
    selectedSkills.reduce((acc, skill) => {
      acc[skill.id] = "Medium"; // default
      return acc;
    }, {} as Record<string, string>)
  );

  /* -------------- helpers -------------- */
  const handleDifficultyChange = (skillId: string, diff: string) =>
    setSkillDiffState((prev) => ({ ...prev, [skillId]: diff }));

  const handleSubmit = () => {
    /* ① 전역 difficulty 세트 저장 */
    setSelectedDifficulties(
      Array.from(new Set(Object.values(skillDiffState))) as typeof difficulties
    );

    /* ② per-skill difficulty 배열 저장 */
    setSkillDifficulties(
      Object.entries(skillDiffState).map(([skillId, diff]) => ({
        skillId,
        difficulty: diff as (typeof difficulties)[number],
      }))
    );

    navigate("/summary");
  };

  /** skillId 로 skill 이름 찾기 (subDomains 검색) */
  const getSkillNameById = (id: string): string | undefined =>
    Object.values(subDomains)
      .flatMap((sd) => sd.skills)
      .find((s) => s.id === id)?.name;

  /** skill 이 속한 TopDomain 반환 */
  const getTopDomainForSkill = (skill: Skill) =>
    selectedDomains.find((d) =>
      d.subDomains.some((sd) =>
        subDomains[sd].skills.some((s) => s.id === skill.id)
      )
    );

  /* ------------------- render ------------------- */
  return (
    <div className="container mx-auto py-8 px-4">
    <Breadcrumbs
      items={[
        { label: "Subjects", href: "/domains" },
        { label: topDom?.name!, href: `/domains/${topDom?.id}` },
        { label: "Skills", href: `/skills/${subDomainId}` },
        { label: "Difficulties", href: `/difficulties/${subDomainId}`, active: true },
      ]}
    />

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">
          Select Difficulty Level for Each Skill
        </h1>
        <p className="text-muted-foreground">
          Choose the appropriate difficulty level for each selected skill
        </p>
      </div>

      <div className="space-y-6">
        {selectedSkills.map((skill) => {
          const topDomain = getTopDomainForSkill(skill);
          const currentDifficulty = skillDiffState[skill.id];
          const matchingCount = questions.filter(
            (q) => q.skill === skill.name && q.difficulty === currentDifficulty
          ).length;

          return (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {skill.name}
                  <Badge variant="secondary">[{matchingCount}]</Badge>
                </CardTitle>
                {topDomain && (
                  <CardDescription>From {topDomain.name}</CardDescription>
                )}
              </CardHeader>

              <CardContent>
                <RadioGroup
                  value={currentDifficulty}
                  onValueChange={(v) => handleDifficultyChange(skill.id, v)}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  {difficulties.map((diff) => {
                    const cnt = questions.filter(
                      (q) => q.skill === skill.name && q.difficulty === diff
                    ).length;
                    return (
                      <div key={diff} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={diff}
                          id={`${skill.id}-${diff}`}
                        />
                        <label
                          htmlFor={`${skill.id}-${diff}`}
                          className="text-sm font-medium"
                        >
                          {diff}{" "}
                          <span className="text-muted-foreground text-xs">
                            [{cnt}]
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSubmit}>Generate Questions</Button>
      </div>
    </div>
  );
};

export default DifficultiesSelection;
