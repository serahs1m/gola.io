import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Domain, SubDomain, Skill } from "@/data/satData";

/* 두 타입을 모두 허용하는 Alias */
type AnyDomain = Domain | SubDomain;

/** 공통 + 선택적으로 skills 가 있을 수도 */
interface DomainCardProps {
  domain: AnyDomain;
  isSelected: boolean;
  onToggle: (d: AnyDomain) => void;
}

const DomainCard: React.FC<DomainCardProps> = ({
  domain,
  isSelected,
  onToggle,
}) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(domain);
  };

  /* skills 배열이 있는지 안전하게 확인 */
  const skillCount =
    "skills" in domain && Array.isArray(domain.skills)
      ? (domain.skills as Skill[]).length
      : null;

  return (
    <Card
      className={`h-full cursor-pointer transition-colors ${
        isSelected ? "border-2 border-primary" : ""
      }`}
      onClick={handleToggle}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {domain.name}
          {isSelected && <Check className="w-5 h-5 text-primary" />}
        </CardTitle>
        <CardDescription>{domain.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-start">
        {skillCount !== null && (
          <p className="text-sm text-muted-foreground mb-4">
            {skillCount} skill{skillCount !== 1 ? "s" : ""}
          </p>
        )}

        <Button
          onClick={handleToggle}
          variant={isSelected ? "secondary" : "default"}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DomainCard;
