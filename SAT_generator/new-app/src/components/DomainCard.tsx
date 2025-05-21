
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Domain } from '@/data/satData';

interface DomainCardProps {
  domain: Domain;
  isSelected: boolean;
  onToggle: (domain: Domain) => void;
}

const DomainCard: React.FC<DomainCardProps> = ({ domain, isSelected, onToggle }) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(domain);
  };

  return (
    <Card 
      className={`h-full transition-colors cursor-pointer ${isSelected ? 'border-2 border-primary' : ''}`}
      onClick={handleToggle}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {domain.name}
          {isSelected && <Check className="h-5 w-5 text-primary" />}
        </CardTitle>
        <CardDescription>{domain.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-between">
        <div className="text-sm text-muted-foreground mb-4">
          {domain.skills.length} skill{domain.skills.length !== 1 ? 's' : ''}
        </div>
        <Button 
          className="mt-2" 
          onClick={handleToggle}
          variant={isSelected ? "secondary" : "default"}
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DomainCard;
