import React, { useEffect, useMemo } from 'react';
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
  const { selectedDomains, selectedSkills, setSelectedDomains, setSelectedSkills, questions } = useQuestionBank();

  useEffect(() => {
    if (domainId === 'combined') {
      if (selectedDomains.length === 0) {
        navigate('/');
        return;
      }
    } else {
      const domain = domains.find(d => d.id === domainId);
      if (!domain) {
        navigate('/');
        return;
      }
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

  const questionCountMap = useMemo(() => {
    const countMap: Record<string, number> = {};
    questions.forEach(q => {
      countMap[q.skill] = (countMap[q.skill] || 0) + 1;
    });
    return countMap;
  }, [questions]);

  const domainsToShow = domainId === 'combined'
    ? selectedDomains
    : selectedDomains.filter(d => d.id === domainId);

  return (
    <div className="container mx-auto py-8 px-4">
      <Breadcrumbs
        items={[
          { label: 'Domains', href: '/' },
          { label: domainId === 'combined' ? 'Skills' : domains.find(d => d.id === domainId)?.name || '', href: `/skills/${domainId}`, active: true }
        ]}
      />

      <div className="text-center mb-10">
        <h1 className="text-5xl font-normal font-['Crimson_Text'] leading-10 mb-2">
          {domainId === 'combined' ? 'Available Skills' : `${domains.find(d => d.id === domainId)?.name} Skills`}
        </h1>
        <p className="text-muted-foreground">Select one or more skills to practice</p>
      </div>

      <div className="grid gap-8">
        {domainsToShow.map((domain: Domain) => (
          <Card key={domain.id}>
            <CardHeader>
              <CardTitle>{domain.name}</CardTitle>
              <CardDescription>{domain.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {domain.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-2 p-4 border rounded shadow-sm">
                    <Checkbox
                      id={skill.id}
                      checked={selectedSkills.some(s => s.id === skill.id)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <label htmlFor={skill.id} className="text-sm font-medium leading-none">
                      {skill.name}{" "}
                      {questionCountMap[skill.name] ? (
                        <span className="text-gray-500">[{questionCountMap[skill.name]}]</span>
                      ) : null}
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