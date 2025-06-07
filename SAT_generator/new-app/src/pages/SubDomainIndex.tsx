import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { topDomains, subDomains } from "@/data/satData";
import DomainCard from "@/components/DomainCard";
import { Button } from "@/components/ui/button";
import { useQuestionBank } from "@/context/QuestionBankContext";
import { toast } from "@/hooks/use-toast";

const SubDomainIndex: React.FC = () => {
  /* URL 파라미터 → math | reading-writing */
  const { domainId } = useParams<{ domainId: "math" | "reading-writing" }>();
  const navigate = useNavigate();
  const {
    selectedSubDomains,
    toggleSubDomainSelection,
    resetSubDomainSelections,
  } = useQuestionBank();

  /* 올바른 도메인 여부 검증 */
  const domain = topDomains.find((d) => d.id === domainId);
  if (!domain)
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-semibold text-destructive">
          Invalid domain: {domainId}
        </h2>
        <Button className="mt-6" onClick={() => navigate("/domains")}>
          Back to Domains
        </Button>
      </div>
    );

  const subDomainList = domain.subDomains.map((id) => subDomains[id]);

  /* 이 페이지 진입 시 서브도메인 선택 초기화 */
  React.useEffect(() => {
    resetSubDomainSelections();
  }, [resetSubDomainSelections]);

  const handleContinue = () => {
    if (selectedSubDomains.length === 0) return;
    /* 단일 선택만 허용 → 바로 스킬 선택 */
    navigate(`/skills/${selectedSubDomains[0].id}`);
    toast({
      title: "Category selected",
      description: selectedSubDomains[0].name,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">{domain.name}</h1>
        <p className="text-muted-foreground">
          Choose a category to narrow down your practice
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {subDomainList.map((sub) => (
          <DomainCard
            key={sub.id}
            domain={sub}
            isSelected={selectedSubDomains.some((s) => s.id === sub.id)}
            onToggle={() => toggleSubDomainSelection(sub)}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleContinue}
          disabled={selectedSubDomains.length === 0}
          size="lg"
        >
          {selectedSubDomains.length === 0 ? "Select a category" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default SubDomainIndex;
