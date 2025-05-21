
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Medal, FileText, Star, TrendingUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/providers/AuthProvider";
import { Progress } from "@/components/ui/progress";

type Evaluation = {
  id: number;
  title: string;
  sport: string;
  date: Date;
  expertName: string;
  skills: {
    technique: number;
    strength: number;
    speed: number;
    endurance: number;
    gameAwareness: number;
  };
  comments: string;
  status: "pending" | "completed";
};

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

  const filteredEvaluations = evaluations.filter(eval => 
    eval.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eval.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eval.expertName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedEvaluations = evaluations.filter(eval => eval.status === "completed");
  const pendingEvaluations = evaluations.filter(eval => eval.status === "pending");

  const calculateAverageSkill = (skill: keyof Evaluation["skills"]) => {
    if (completedEvaluations.length === 0) return 0;
    
    const sum = completedEvaluations.reduce((acc, eval) => acc + eval.skills[skill], 0);
    return sum / completedEvaluations.length;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Cards */}
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
                  {completedEvaluations.length} completed, {pendingEvaluations.length} pending
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
          
          {/* Skill Breakdown */}
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
        </TabsContent>
        
        <TabsContent value="evaluations">
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
                    <div key={evaluation.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
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
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Evaluations;
