
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Medal, TrendingUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/providers/AuthProvider";
import { StatsCards } from "@/components/evaluations/StatsCards";
import { SkillBreakdown } from "@/components/evaluations/SkillBreakdown";
import { EvaluationsTab } from "@/components/evaluations/EvaluationsTab";
import { Evaluation } from "@/types/evaluation";

const Evaluations = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample evaluations data
  const [evaluations] = useState<Evaluation[]>([]);
  
  // If not a youth athlete, show restricted access message
  if (profile?.user_type !== "youth") {
    return (
      <DashboardLayout title="Evaluations">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-muted-foreground">
                This page is only available for youth athletes.
              </h3>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const filteredEvaluations = evaluations.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.expertName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedEvaluations = evaluations.filter(item => item.status === "completed");
  const pendingEvaluations = evaluations.filter(item => item.status === "pending");

  const calculateAverageSkill = (skill: keyof Evaluation["skills"]) => {
    if (completedEvaluations.length === 0) return 0;
    
    const sum = completedEvaluations.reduce((acc, item) => acc + item.skills[skill], 0);
    return sum / completedEvaluations.length;
  };

  return (
    <DashboardLayout title="Your Evaluations">
      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="evaluations" className="flex items-center gap-1">
              <Medal className="h-4 w-4" />
              <span>All Evaluations</span>
            </TabsTrigger>
          </TabsList>
          
          {activeTab === "evaluations" && (
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search evaluations..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>
        
        <TabsContent value="overview">
          <StatsCards 
            evaluations={evaluations} 
            completedCount={completedEvaluations.length} 
            pendingCount={pendingEvaluations.length} 
          />
          <SkillBreakdown 
            evaluations={evaluations} 
            calculateAverageSkill={calculateAverageSkill} 
          />
        </TabsContent>
        
        <TabsContent value="evaluations">
          <EvaluationsTab 
            evaluations={evaluations}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredEvaluations={filteredEvaluations}
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Evaluations;
