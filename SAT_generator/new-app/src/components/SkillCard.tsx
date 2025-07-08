import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skill } from "@/data/satData";

interface SkillCardProps {
  skill: Skill;
  isSelected: boolean;
  onToggle: () => void;
  questionCount?: number; // ← 받을 준비는 되어 있음
}

const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  isSelected,
  onToggle,
  questionCount = 0, // ← 기본값 0
}) => {
  return (
    <Card
      onClick={onToggle}
      className={`p-4 cursor-pointer transition-all border-2 ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-muted"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
        <span className="font-medium">
        {skill.name} <span className="text-xs text-muted-foreground ml-1">[{questionCount}]</span>
      </span>
        </div>

        {isSelected && <Badge variant="secondary">Selected</Badge>}
      </div>
    </Card>
  );
};

export default SkillCard;
