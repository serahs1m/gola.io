import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { topDomains, subDomains } from "@/data/satData";
import DomainCard from "@/components/DomainCard";
import { Button } from "@/components/ui/button";
import { useQuestionBank } from "@/context/QuestionBankContext";
import { toast } from "@/hooks/use-toast";
import Breadcrumbs from "@/components/Breadcrumbs"; 

const SubDomainIndex: React.FC = () => {
  const { domainId } = useParams<{ domainId: "math" | "reading-writing" }>();
  const navigate = useNavigate();

  const {
    selectedSubDomains,
    toggleSubDomainSelection,
    resetSubDomainSelections,
  } = useQuestionBank();

  const domain = topDomains.find((d) => d.id === domainId);

  // Invalid domainId guard
  if (!domain) {
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
  }

  const subDomainList = domain.subDomains.map((id) => subDomains[id]);

  React.useEffect(() => {
    resetSubDomainSelections();
  }, [resetSubDomainSelections]);

  const handleContinue = () => {
    if (selectedSubDomains.length === 0) return;

    navigate(`/skills/${selectedSubDomains[0].id}`);
    toast({
      title: "Category selected",
      description: selectedSubDomains[0].name,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* ───── BreadCrumbs ───── */}
      <Breadcrumbs
        items={[
          { label: "Subjects", href: "/domains" },
          { label: domain.name, href: `/domains/${domain.id}`, active: true },
        ]}
      />

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
