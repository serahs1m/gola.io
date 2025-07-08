// src/pages/TopDomainIndex.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

import { topDomains } from "@/data/satData";         
import DomainCard from "@/components/DomainCard";
import { useQuestionBank } from "@/context/QuestionBankContext";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const TopDomainIndex: React.FC = () => {
  const navigate = useNavigate();
  const { selectedDomains, toggleDomainSelection, resetSelections } =
    useQuestionBank();

  /* 홈으로 돌아올 때마다 도메인 선택 초기화 */
  React.useEffect(() => {
    resetSelections();
  }, [resetSelections]);

  /* Continue 버튼 핸들러 */
  const handleContinue = () => {
    if (selectedDomains.length === 0) return;
  
    const ids = selectedDomains.map((d) => d.id);
  
    if (ids.length === 1) {
      // 하나만 고른 경우: 해당 도메인으로 진입
      navigate(`/domains/${ids[0]}`);
    } else {
      // 둘 다 고른 경우: 혼합 세트
      navigate("/skills/combined");
    }
  
    toast({
      title: "Domains selected",
      description: `${selectedDomains.length} domain(s) chosen`,
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* 헤드라인 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">SAT Question Bank</h1>
        <p className="text-xl text-muted-foreground">
          Select one or both domains to begin your SAT practice
        </p>
      </div>

      {/* 도메인 카드(2개) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {topDomains.map((domain) => (
          <DomainCard
            key={domain.id}
            domain={domain}
            isSelected={selectedDomains.some((d) => d.id === domain.id)}
            onToggle={toggleDomainSelection}
          />
        ))}
      </div>

      {/* Continue 버튼 */}
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleContinue}
          disabled={selectedDomains.length === 0}
          size="lg"
        >
          {selectedDomains.length === 0
            ? "Select at least one domain"
            : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default TopDomainIndex;
