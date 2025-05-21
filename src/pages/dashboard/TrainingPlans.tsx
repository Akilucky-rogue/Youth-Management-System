
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, ChevronRight, Dumbbell, Target, Clock, CheckCircle } from "lucide-react";
import { formatDate } from "@/lib/date-utils";

interface TrainingPlan {
  id: number;
  title: string;
  description: string;
  sport: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: number; // weeks
  progress: number; // percentage
  startDate: Date;
  endDate: Date;
  sessions: TrainingSession[];
}

interface TrainingSession {
  id: number;
  title: string;
  description: string;
  duration: number; // minutes
  date: Date;
  completed: boolean;
}

const TrainingPlans = () => {
  const [activeTab, setActiveTab] = useState("active");

  // Sample training plans data
  const [plans] = useState<TrainingPlan[]>([
    {
      id: 1,
      title: "Soccer Skills Development",
      description: "Focus on essential technical skills with progressive drills",
      sport: "Soccer",
      level: "intermediate",
      duration: 8,
      progress: 65,
      startDate: new Date("2023-08-01"),
      endDate: new Date("2023-09-26"),
      sessions: [
        {
          id: 101,
          title: "Passing Precision",
          description: "Focus on short and long passing accuracy with movement",
          duration: 60,
          date: new Date("2023-09-15"),
          completed: true
        },
        {
          id: 102,
          title: "Dribbling & Ball Control",
          description: "Develop close control and change of direction techniques",
          duration: 75,
          date: new Date("2023-09-18"),
          completed: true
        },
        {
          id: 103,
          title: "Shooting & Finishing",
          description: "Practice shooting from different angles and distances",
          duration: 90,
          date: new Date("2023-09-22"),
          completed: false
        }
      ]
    },
    {
      id: 2,
      title: "Speed & Agility Enhancement",
      description: "Improve acceleration, lateral movement, and reaction time",
      sport: "Multi-sport",
      level: "advanced",
      duration: 6,
      progress: 30,
      startDate: new Date("2023-09-01"),
      endDate: new Date("2023-10-13"),
      sessions: [
        {
          id: 201,
          title: "Explosive Acceleration",
          description: "Sprint training with focus on first-step quickness",
          duration: 45,
          date: new Date("2023-09-12"),
          completed: true
        },
        {
          id: 202,
          title: "Lateral Movement",
          description: "Side-to-side agility drills with ladder and cones",
          duration: 60,
          date: new Date("2023-09-19"),
          completed: false
        },
        {
          id: 203,
          title: "Reaction & Change of Direction",
          description: "Reactive drills with visual and audio cues",
          duration: 50,
          date: new Date("2023-09-25"),
          completed: false
        }
      ]
    },
  ]);

  // Empty state for completed plans - in a real app this would have data
  const completedPlans: TrainingPlan[] = [];

  const activePlans = plans.filter(plan => plan.progress < 100);
  const upcomingSessions = plans
    .flatMap(plan => plan.sessions.filter(session => !session.completed))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'beginner':
        return <Badge variant="outline" className="text-talent-green border-talent-green">Beginner</Badge>;
      case 'intermediate':
        return <Badge variant="outline" className="text-talent-blue border-talent-blue">Intermediate</Badge>;
      case 'advanced':
        return <Badge variant="outline" className="text-talent-purple border-talent-purple">Advanced</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout title="Training Plans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Current Progress */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Current Progress</CardTitle>
            <CardDescription>Your active training plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activePlans.length > 0 ? (
                activePlans.map(plan => (
                  <div key={plan.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{plan.title}</h3>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>{plan.sport}</Badge>
                        {getLevelBadge(plan.level)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{plan.progress}%</span>
                      </div>
                      <Progress value={plan.progress} className="h-2" />
                    </div>
                    <div className="flex justify-end mt-3">
                      <Button variant="ghost" size="sm" className="text-sm">
                        View Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No active plans</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
                    You don't have any active training plans yet
                  </p>
                  <Button>Create New Plan</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled training</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map(session => (
                  <div key={session.id} className="border rounded-lg p-3">
                    <h4 className="font-medium text-sm">{session.title}</h4>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-3 w-3" />
                      <span>{formatDate(session.date)}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{session.duration} minutes</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    No upcoming sessions scheduled
                  </p>
                </div>
              )}
              <Button size="sm" variant="outline" className="w-full">
                View Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Training Plans */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Training Plans</CardTitle>
            <Button>Create New Plan</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="active">
                Active Plans
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed
              </TabsTrigger>
              <TabsTrigger value="recommended">
                Recommended
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              {activePlans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {activePlans.map(plan => (
                    <div key={plan.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">{plan.title}</h3>
                        <Badge>{plan.sport}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                      <div className="flex items-center gap-2 mb-3 text-sm">
                        <Dumbbell className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">{plan.duration} week program</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{plan.progress}%</span>
                        </div>
                        <Progress value={plan.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No active training plans</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed">
              {completedPlans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {completedPlans.map(plan => (
                    <div key={plan.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">{plan.title}</h3>
                        <Badge>{plan.sport}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                      <div className="flex items-center gap-2 mb-3 text-sm">
                        <CheckCircle className="h-3.5 w-3.5 text-talent-green" />
                        <span className="text-muted-foreground">Completed on {formatDate(plan.endDate)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No completed plans yet</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Keep working on your current plans to see them here
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="recommended">
              <div className="text-center py-8">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Recommended plans coming soon</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
                  We're working on personalized training recommendations based on your performance data
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TrainingPlans;
