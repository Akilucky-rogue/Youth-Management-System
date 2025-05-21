
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Star, TrendingUp } from "lucide-react";
import { Evaluation } from "@/types/evaluation";

interface StatsCardsProps {
  evaluations: Evaluation[];
  completedCount: number;
  pendingCount: number;
}

export const StatsCards = ({ evaluations, completedCount, pendingCount }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Total Evaluations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold">{evaluations.length}</div>
            <div className="p-2 bg-talent-indigo/10 rounded-full">
              <FileText className="h-5 w-5 text-talent-indigo" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {completedCount} completed, {pendingCount} pending
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Average Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold">
              {evaluations.length > 0 ? "4.2" : "N/A"}
            </div>
            <div className="p-2 bg-talent-green/10 rounded-full">
              <Star className="h-5 w-5 text-talent-green" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {evaluations.length > 0 
              ? "Above average in your age group" 
              : "No evaluations completed yet"
            }
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Growth Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold">
              {evaluations.length > 0 ? "3" : "0"}
            </div>
            <div className="p-2 bg-talent-orange/10 rounded-full">
              <TrendingUp className="h-5 w-5 text-talent-orange" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {evaluations.length > 0 
              ? "Identified improvement opportunities" 
              : "Complete an evaluation to identify"
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
