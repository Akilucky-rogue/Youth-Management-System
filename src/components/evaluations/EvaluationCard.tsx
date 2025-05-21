
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/date-utils";
import { Evaluation } from "@/types/evaluation";

interface EvaluationCardProps {
  evaluation: Evaluation;
}

export const EvaluationCard = ({ evaluation }: EvaluationCardProps) => {
  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium mb-1">{evaluation.title}</h3>
          <p className="text-sm text-muted-foreground">{evaluation.sport} • {formatDate(evaluation.date)}</p>
          <p className="text-sm mt-2">Expert: {evaluation.expertName}</p>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium ${
          evaluation.status === "completed" 
            ? "bg-talent-green/10 text-talent-green" 
            : "bg-talent-orange/10 text-talent-orange"
        }`}>
          {evaluation.status === "completed" ? "Completed" : "Pending"}
        </div>
      </div>
      
      {evaluation.status === "completed" && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex gap-8 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold">{evaluation.skills.technique}</div>
              <div className="text-xs text-muted-foreground">Technique</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{evaluation.skills.strength}</div>
              <div className="text-xs text-muted-foreground">Strength</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{evaluation.skills.speed}</div>
              <div className="text-xs text-muted-foreground">Speed</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{evaluation.skills.endurance}</div>
              <div className="text-xs text-muted-foreground">Endurance</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{evaluation.skills.gameAwareness}</div>
              <div className="text-xs text-muted-foreground">Awareness</div>
            </div>
          </div>
          
          <div className="bg-muted/50 p-3 rounded text-sm">
            <p className="font-medium mb-1">Expert Comments:</p>
            <p>{evaluation.comments}</p>
          </div>
        </div>
      )}
      
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </div>
    </div>
  );
};
