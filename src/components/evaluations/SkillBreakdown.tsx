
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import { Evaluation } from "@/types/evaluation";

interface SkillBreakdownProps {
  evaluations: Evaluation[];
  calculateAverageSkill: (skill: keyof Evaluation["skills"]) => number;
}

export const SkillBreakdown = ({ evaluations, calculateAverageSkill }: SkillBreakdownProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Skill Breakdown</CardTitle>
        <CardDescription>
          Your performance across key athletic areas
        </CardDescription>
      </CardHeader>
      <CardContent>
        {evaluations.length > 0 ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Technique</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(calculateAverageSkill("technique") * 10)}%
                </span>
              </div>
              <Progress value={calculateAverageSkill("technique") * 20} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Strength</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(calculateAverageSkill("strength") * 10)}%
                </span>
              </div>
              <Progress value={calculateAverageSkill("strength") * 20} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Speed</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(calculateAverageSkill("speed") * 10)}%
                </span>
              </div>
              <Progress value={calculateAverageSkill("speed") * 20} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Endurance</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(calculateAverageSkill("endurance") * 10)}%
                </span>
              </div>
              <Progress value={calculateAverageSkill("endurance") * 20} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Game Awareness</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(calculateAverageSkill("gameAwareness") * 10)}%
                </span>
              </div>
              <Progress value={calculateAverageSkill("gameAwareness") * 20} className="h-2" />
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Medal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No evaluations yet</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
              Complete your first evaluation with an expert to see your skill breakdown
            </p>
            <Button>Request Evaluation</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
