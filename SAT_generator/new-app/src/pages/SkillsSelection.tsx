
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuestionBank } from '@/context/QuestionBankContext';
import { domains, Skill, Domain } from '@/data/satData';
import Breadcrumbs from '@/components/Breadcrumbs';

const SkillsSelection = () => {
  const { domainId } = useParams<{ domainId: string }>();
  const navigate = useNavigate();
  const { selectedDomains, selectedSkills, setSelectedDomains, setSelectedSkills } = useQuestionBank();
  
  useEffect(() => {
    if (domainId === 'combined') {
      // For combined view, check if we have selected domains
      if (selectedDomains.length === 0) {
        navigate('/');
        return;
      }
    } else {
      // For single domain view
      const domain = domains.find(d => d.id === domainId);
      
      if (!domain) {
        navigate('/');
        return;
      }
      
      // Add this domain to selected domains if not already there
      if (!selectedDomains.some(d => d.id === domain.id)) {
        setSelectedDomains([...selectedDomains, domain]);
      }
    }
  }, [domainId, navigate, selectedDomains, setSelectedDomains]);
  
  const handleSkillToggle = (skill: Skill) => {
    const isSelected = selectedSkills.some(s => s.id === skill.id);
    
    if (isSelected) {
      setSelectedSkills(selectedSkills.filter(s => s.id !== skill.id));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  const handleSubmit = () => {
    if (selectedSkills.length > 0) {
      navigate(`/difficulties/${domainId}`);
    }
  };

  // Determine which domains to show skills from
  const domainsToShow = domainId === 'combined' 
    ? selectedDomains 
    : selectedDomains.filter(d => d.id === domainId);

  return (
    <div className="container mx-auto py-8 px-4">
      <Breadcrumbs
        items={[
          { label: 'Domains', href: '/' },
          { label: domainId === 'combined' ? 'Skills' : domains.find(d => d.id === domainId)?.name || '', 
            href: `/skills/${domainId}`, 
            active: true }
        ]}
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">
          {domainId === 'combined' ? 'Available Skills' : `${domains.find(d => d.id === domainId)?.name} Skills`}
        </h1>
        <p className="text-muted-foreground">
          Select one or more skills to practice
        </p>
      </div>

      <div className="space-y-6">
        {domainsToShow.map((domain: Domain) => (
          <Card key={domain.id}>
            <CardHeader>
              <CardTitle>{domain.name}</CardTitle>
              <CardDescription>{domain.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {domain.skills.map(skill => (
                  <div key={skill.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={skill.id} 
                      checked={selectedSkills.some(s => s.id === skill.id)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <label htmlFor={skill.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {skill.name}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={selectedSkills.length === 0}
        >
          {selectedSkills.length === 0 ? 'Select at least one skill' : 'Continue to Difficulties'}
        </Button>
      </div>
    </div>
  );
};

export default SkillsSelection;
