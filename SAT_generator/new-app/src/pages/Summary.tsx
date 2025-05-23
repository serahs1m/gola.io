
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuestionBank } from '@/context/QuestionBankContext';
import Breadcrumbs from '@/components/Breadcrumbs';

const Summary = () => {
  const navigate = useNavigate();
  const { selectedDomains, selectedSkills, selectedDifficulties, skillDifficulties, resetSelections } = useQuestionBank();
  
  if (selectedDomains.length === 0 || selectedSkills.length === 0 || selectedDifficulties.length === 0) {
    // If any selection is missing, redirect to home
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

  // Group skills by domain
  const groupedSkills = selectedDomains.map(domain => {
    // Find skills for this domain
    const domainSkills = selectedSkills.filter(skill => 
      domain.skills.some(s => s.id === skill.id)
    );
    
    return {
      domain,
      skills: domainSkills.map(skill => {
        // Find the difficulty for this skill
        const skillDiff = skillDifficulties.find(sd => sd.skillId === skill.id);
        return {
          ...skill,
          difficulty: skillDiff?.difficulty || 'Medium' // Default to Medium if not found
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
                    <span>{skill.name}</span>
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

      <div className="mt-8 flex justify-center">
        <Button onClick={handleStartPractice}>
          Start Practice
        </Button>
      </div>
    </div>
  );
};

export default Summary;
