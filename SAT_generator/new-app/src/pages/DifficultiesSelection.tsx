import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useQuestionBank } from '@/context/QuestionBankContext';
import { difficulties, domains } from '@/data/satData';
import Breadcrumbs from '@/components/Breadcrumbs';

const DifficultiesSelection = () => {
  const { domainId } = useParams<{ domainId: string }>();
  const navigate = useNavigate();
  const { 
    selectedDomains, 
    selectedSkills, 
    setSelectedDifficulties, 
    setSkillDifficulties,
    questions  
  } = useQuestionBank();

  const [skillDifficulties, setSkillDifficultiesState] = useState<Record<string, string>>(
    selectedSkills.reduce((acc, skill) => {
      acc[skill.id] = 'Medium'; // 기본값
      return acc;
    }, {} as Record<string, string>)
  );

  if (selectedDomains.length === 0 || selectedSkills.length === 0) {
    React.useEffect(() => {
      navigate('/');
    }, [navigate]);
    return null;
  }

  const handleDifficultyChange = (skillId: string, difficulty: string) => {
    setSkillDifficultiesState(prev => ({
      ...prev,
      [skillId]: difficulty
    }));
  };

  const handleSubmit = () => {
    const uniqueDifficulties = Array.from(new Set(Object.values(skillDifficulties)));
    setSelectedDifficulties(uniqueDifficulties as typeof difficulties);

    const skillDifficultyArray = Object.entries(skillDifficulties).map(([skillId, difficulty]) => ({
      skillId,
      difficulty: difficulty as typeof difficulties[number]
    }));

    setSkillDifficulties(skillDifficultyArray);
    navigate('/summary');
  };

  const getSkillNameById = (id: string): string | undefined => {
    for (const domain of domains) {
      const match = domain.skills.find(skill => skill.id === id);
      if (match) return match.name;
    }
    return undefined;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Breadcrumbs
        items={[
          { label: 'Domains', href: '/' },
          { label: 'Skills', href: `/skills/${domainId}` },
          { label: 'Difficulties', href: `/difficulties/${domainId}`, active: true }
        ]}
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Select Difficulty Level for Each Skill</h1>
        <p className="text-muted-foreground">
          Choose the appropriate difficulty level for each selected skill
        </p>
      </div>

      <div className="space-y-6">
        {selectedSkills.map(skill => {
          const domain = selectedDomains.find(d => d.skills.some(s => s.id === skill.id));
          const currentDifficulty = skillDifficulties[skill.id] || 'Medium';
          const matchingCount = questions.filter(q =>
            q.skill === skill.name && q.difficulty === currentDifficulty
          ).length;

          return (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {skill.name}
                  <span className="text-sm text-muted-foreground">[{matchingCount} questions]</span>
                </CardTitle>
                {domain && <CardDescription>From {domain.name}</CardDescription>}
              </CardHeader>
              <CardContent>
              <RadioGroup
                value={skillDifficulties[skill.id] || 'Medium'}
                onValueChange={(value) => handleDifficultyChange(skill.id, value)}
                className="flex flex-col sm:flex-row gap-4"
              >
                {difficulties.map(difficulty => {
                  const count = questions.filter(q => 
                    q.skill === skill.name && q.difficulty === difficulty
                  ).length;

                  return (
                    <div key={difficulty} className="flex items-center space-x-2">
                      <RadioGroupItem value={difficulty} id={`${skill.id}-${difficulty}`} />
                      <label htmlFor={`${skill.id}-${difficulty}`} className="text-sm font-medium">
                        {difficulty} <span className="text-muted-foreground text-xs">[{count}]</span>
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
        <Button onClick={handleSubmit}>
          Generate Questions
        </Button>
      </div>
    </div>
  );
};

export default DifficultiesSelection;
