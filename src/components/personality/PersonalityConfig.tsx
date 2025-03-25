import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PersonalityTraits } from "@/lib/agent/config";

interface PersonalityConfigProps {
  onSave: (traits: PersonalityTraits) => void;
  initialTraits?: PersonalityTraits;
}

export function PersonalityConfig({ onSave, initialTraits }: PersonalityConfigProps) {
  const [traits, setTraits] = useState<PersonalityTraits>(initialTraits ?? {
    joy: 50,
    sadness: 50,
    anger: 50,
    fear: 50,
    disgust: 50,
  });

  const handleTraitChange = (trait: keyof PersonalityTraits, value: number[]) => {
    setTraits(prev => ({
      ...prev,
      [trait]: value[0],
    }));
  };

  const emotions = [
    { name: "Joy", color: "bg-yellow-400" },
    { name: "Sadness", color: "bg-blue-400" },
    { name: "Anger", color: "bg-red-400" },
    { name: "Fear", color: "bg-purple-400" },
    { name: "Disgust", color: "bg-green-400" },
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Personality Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {emotions.map(emotion => {
          const traitKey = emotion.name.toLowerCase() as keyof PersonalityTraits;
          return (
            <div key={emotion.name} className="space-y-2">
              <div className="flex justify-between">
                <Label>{emotion.name}</Label>
                <span>{traits[traitKey]}%</span>
              </div>
              <Slider
                value={[traits[traitKey]]}
                onValueChange={(value) => handleTraitChange(traitKey, value)}
                max={100}
                step={1}
                className={emotion.color}
              />
            </div>
          );
        })}
        <Button 
          onClick={() => onSave(traits)}
          className="w-full mt-4"
        >
          Save Personality
        </Button>
      </CardContent>
    </Card>
  );
}