
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Medal, User, Calendar } from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { Evaluation } from "@/types/evaluation";

const EvaluationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // In a real app, you would fetch this data based on the ID
  const [evaluation] = useState<Evaluation>({
    id: parseInt(id || "1"),
    title: "Quarterly Soccer Performance Assessment",
    sport: "Soccer",
    date: new Date("2023-09-15"),
    expertName: "Coach Sarah Johnson",
    skills: {
      technique: 85,
      strength: 70,
      speed: 90,
      endurance: 75,
      gameAwareness: 80
    },
    comments: "Alex demonstrates exceptional speed and technical skills on the field. His ball control and passing accuracy are well above average for his age group. Areas for improvement include physical strength for tackles and defensive positioning. Overall, he shows great potential and is developing at a good pace. Recommend focusing on strength training and tactical awareness drills.",
    status: "completed"
  });

  const goBack = () => {
    navigate(-1);
  };

  const skillLabels = {
    technique: "Technical Ability",
    strength: "Physical Strength",
    speed: "Speed & Agility",
    endurance: "Stamina & Endurance",
    gameAwareness: "Game Intelligence"
  };

  const getSkillColorClass = (value: number) => {
    if (value >= 90) return "bg-talent-green";
    if (value >= 75) return "bg-talent-blue";
    if (value >= 60) return "bg-talent-indigo";
    if (value >= 40) return "bg-talent-orange";
    return "bg-talent-red";
  };

  return (
    <DashboardLayout title="Evaluation Details">
      <Button 
        variant="outline" 
        onClick={goBack} 
        className="mb-6 flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Back to Evaluations</span>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{evaluation.sport}</Badge>
                <Badge 
                  variant={evaluation.status === "completed" ? "default" : "secondary"}
                >
                  {evaluation.status === "completed" ? "Completed" : "Pending"}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{evaluation.title}</CardTitle>
              <CardDescription>{formatDate(evaluation.date)}</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Expert Info */}
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <div className="p-2 rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Evaluated by</p>
              <p className="text-muted-foreground">{evaluation.expertName}</p>
            </div>
          </div>
          
          {/* Skill Ratings */}
          <div>
            <h3 className="font-medium mb-4">Skill Assessment</h3>
            <div className="space-y-4">
              {Object.entries(evaluation.skills).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{skillLabels[key as keyof typeof skillLabels]}</span>
                    <span className="text-sm font-medium">{value}/100</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getSkillColorClass(value)} rounded-full`}
                      style={{ width: `${value}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Comments */}
          <div>
            <h3 className="font-medium mb-4">Expert Comments</h3>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm">{evaluation.comments}</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t pt-6">
          <Button variant="outline" className="w-full sm:w-auto">Download Report</Button>
          <Button className="w-full sm:w-auto">Request Follow-up</Button>
        </CardFooter>
      </Card>
    </DashboardLayout>
  );
};

export default EvaluationDetails;
