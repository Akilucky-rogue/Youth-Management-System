
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Medal } from "lucide-react";
import { EvaluationCard } from "./EvaluationCard";
import { Evaluation } from "@/types/evaluation";

interface EvaluationsTabProps {
  evaluations: Evaluation[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredEvaluations: Evaluation[];
}

export const EvaluationsTab = ({ 
  evaluations,
  searchTerm,
  setSearchTerm,
  filteredEvaluations
}: EvaluationsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Evaluations</CardTitle>
        <CardDescription>
          Your performance assessments from experts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {filteredEvaluations.length > 0 ? (
          <div className="space-y-4">
            {filteredEvaluations.map((evaluation) => (
              <EvaluationCard key={evaluation.id} evaluation={evaluation} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Medal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No evaluations found</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
              {searchTerm 
                ? "No evaluations match your search criteria" 
                : "You haven't received any evaluations yet"
              }
            </p>
            <Button>Request Evaluation</Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline">Export Data</Button>
        <Button>Request New Evaluation</Button>
      </CardFooter>
    </Card>
  );
};
