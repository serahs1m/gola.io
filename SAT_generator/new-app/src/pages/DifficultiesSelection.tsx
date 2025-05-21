
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
    selectedDifficulties, 
    setSelectedDifficulties, 
    setSkillDifficulties 
  } = useQuestionBank();
  
  // Use state to track individual skill difficulties
  const [skillDifficulties, setSkillDifficultiesState] = useState<Record<string, string>>(
    // Initialize with any previously selected difficulties as defaults
    selectedSkills.reduce((acc, skill) => {
      acc[skill.id] = 'Medium'; // Default to Medium
      return acc;
    }, {} as Record<string, string>)
  );
  
  if (selectedDomains.length === 0 || selectedSkills.length === 0) {
    // If no domains are selected or no skills are selected, redirect to home
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
    // Convert skill difficulties to overall selected difficulties
    // This keeps compatibility with the existing context structure
    const uniqueDifficulties = Array.from(new Set(Object.values(skillDifficulties)));
    setSelectedDifficulties(uniqueDifficulties as typeof difficulties);
    
    // Store the skill-specific difficulties in context
    const skillDifficultyArray = Object.entries(skillDifficulties).map(([skillId, difficulty]) => ({
      skillId,
      difficulty: difficulty as typeof difficulties[number]
    }));
    
    setSkillDifficulties(skillDifficultyArray);
    navigate('/summary');
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
          // Find which domain this skill belongs to
          const domain = selectedDomains.find(d => 
            d.skills.some(s => s.id === skill.id)
          );

          return (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle>{skill.name}</CardTitle>
                {domain && <CardDescription>From {domain.name}</CardDescription>}
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={skillDifficulties[skill.id] || 'Medium'}
                  onValueChange={(value) => handleDifficultyChange(skill.id, value)}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  {difficulties.map(difficulty => (
                    <div key={difficulty} className="flex items-center space-x-2">
                      <RadioGroupItem value={difficulty} id={`${skill.id}-${difficulty}`} />
                      <label htmlFor={`${skill.id}-${difficulty}`} className="text-sm font-medium">
                        {difficulty}
                      </label>
                    </div>
                  ))}
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
