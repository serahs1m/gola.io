import React from 'react';
import { useNavigate } from 'react-router-dom';
import { domains } from '@/data/satData';
import DomainCard from '@/components/DomainCard';
import { useQuestionBank } from '@/context/QuestionBankContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { selectedDomains, toggleDomainSelection, resetSelections } = useQuestionBank();

  // Reset all selections when returning to home page
  React.useEffect(() => {
    resetSelections();
  }, [resetSelections]);

  const handleContinue = () => {
    if (selectedDomains.length > 0) {
      // When multiple domains are selected, use a special route
      navigate('/skills/combined');
      toast({
        title: "Domains selected",
        description: `You selected ${selectedDomains.length} domain(s).`
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">SAT Question Bank</h1>
        <p className="text-xl text-muted-foreground">
          Select one or more domains to begin your SAT practice
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {domains.map(domain => (
          <DomainCard 
            key={domain.id} 
            domain={domain} 
            isSelected={selectedDomains.some(d => d.id === domain.id)}
            onToggle={toggleDomainSelection}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button 
          onClick={handleContinue}
          disabled={selectedDomains.length === 0}
          size="lg"
        >
          {selectedDomains.length === 0 ? 'Select at least one domain' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default Index;
