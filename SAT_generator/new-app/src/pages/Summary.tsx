import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuestionBank } from '@/context/QuestionBankContext';
import Breadcrumbs from '@/components/Breadcrumbs';

const Summary = () => {
  const navigate = useNavigate();
  const { selectedDomains, selectedSkills, selectedDifficulties, skillDifficulties, questions, resetSelections } = useQuestionBank();
  
  if (selectedDomains.length === 0 || selectedSkills.length === 0 || selectedDifficulties.length === 0) {
    React.useEffect(() => {
      navigate('/');
    }, [navigate]);
    return null;
  }

  const handleStartOver = () => {
    resetSelections();
    navigate('/');
  };

  const handleStartPractice = () => {
    navigate("/practice");
  };  

  // 그룹화된 도메인 + 스킬 + 난이도
  const groupedSkills = selectedDomains.map(domain => {
    const domainSkills = selectedSkills.filter(skill => 
      domain.skills.some(s => s.id === skill.id)
    );
    
    return {
      domain,
      skills: domainSkills.map(skill => {
        const skillDiff = skillDifficulties.find(sd => sd.skillId === skill.id);
        const difficulty = skillDiff?.difficulty || 'Medium';

        const count = questions.filter(q => 
          q.skill === skill.name && q.difficulty === difficulty
        ).length;

        return {
          ...skill,
          difficulty,
          count
        };
      })
    };
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <Breadcrumbs
        items={[
          { label: 'Domains', href: '/' },
          { label: 'Skills', href: '/skills/combined' },
          { label: 'Difficulties', href: '#' },
          { label: 'Summary', href: '/summary', active: true }
        ]}
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Your Practice Set</h1>
        <p className="text-muted-foreground">
          Summary of your selected options
        </p>
      </div>

      <div className="space-y-6">
        {groupedSkills.map(({ domain, skills }) => (
          <Card key={domain.id} className="mb-6">
            <CardHeader>
              <CardTitle>{domain.name}</CardTitle>
              <CardDescription>{domain.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {skills.map(skill => (
                  <li key={skill.id} className="flex justify-between items-center">
                    <span>
                      {skill.name}
                      <span className="text-muted-foreground text-sm ml-2">
                        [{skill.count} questions]
                      </span>
                    </span>
                    <Badge variant={
                      skill.difficulty === 'Hard' ? 'destructive' : 
                      skill.difficulty === 'Easy' ? 'outline' : 
                      'secondary'
                    }>
                      {skill.difficulty}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <Button variant="outline" onClick={handleStartOver}>
          Start Over
        </Button>
        <Button onClick={handleStartPractice}>
          Start Practice
        </Button>
      </div>
    </div>
  );
};

export default Summary;
