
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Medal, CalendarDays, TrendingUp } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

const AthleteProfile = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Sample athlete data - in a real app, this would come from an API
  const athlete = {
    name: "Alex Johnson",
    age: 16,
    sports: ["Soccer", "Basketball"],
    location: "San Francisco, CA",
    bio: "Dedicated athlete with 5 years of competitive experience. Looking to improve my skills and performance.",
    achievements: [
      { id: 1, title: "Regional Championship", description: "1st Place in Regional Soccer Tournament", date: "May 2023" },
      { id: 2, title: "MVP Award", description: "Most Valuable Player in School Basketball League", date: "January 2023" },
      { id: 3, title: "All-Star Team", description: "Selected for the All-Star Team in Local League", date: "October 2022" }
    ],
    stats: {
      technique: 85,
      strength: 70,
      speed: 90,
      endurance: 75,
      gameAwareness: 80
    }
  };

  return (
    <DashboardLayout title="Athlete Profile">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Header */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" alt={athlete.name} />
                <AvatarFallback>{athlete.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{athlete.name}</h2>
              <div className="text-sm text-muted-foreground">
                {athlete.age} years • {athlete.location}
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {athlete.sports.map((sport, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors"
                  >
                    {sport}
                  </span>
                ))}
              </div>
              <Button className="w-full mt-4">Contact Athlete</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{athlete.bio}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-1">
            <Medal className="h-4 w-4" />
            <span>Achievements</span>
          </TabsTrigger>
          <TabsTrigger value="evaluations" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>Evaluations</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>Schedule</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Athletic performance metrics and key indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Technique</span>
                      <span className="text-sm font-medium">{athlete.stats.technique}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-talent-blue rounded-full" 
                        style={{ width: `${athlete.stats.technique}%` }} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Strength</span>
                      <span className="text-sm font-medium">{athlete.stats.strength}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-talent-indigo rounded-full" 
                        style={{ width: `${athlete.stats.strength}%` }} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Speed</span>
                      <span className="text-sm font-medium">{athlete.stats.speed}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-talent-green rounded-full" 
                        style={{ width: `${athlete.stats.speed}%` }} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Endurance</span>
                      <span className="text-sm font-medium">{athlete.stats.endurance}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-talent-orange rounded-full" 
                        style={{ width: `${athlete.stats.endurance}%` }} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Game Awareness</span>
                      <span className="text-sm font-medium">{athlete.stats.gameAwareness}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-talent-purple rounded-full" 
                        style={{ width: `${athlete.stats.gameAwareness}%` }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievements & Milestones</CardTitle>
              <CardDescription>Track record of athletic accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {athlete.achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className="flex items-start p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="mr-3">
                      <div className="p-2 rounded-full bg-talent-gold/10">
                        <Medal className="h-5 w-5 text-talent-gold" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                      <div className="flex items-center mt-2">
                        <CalendarDays className="h-3 w-3 text-muted-foreground mr-1" />
                        <span className="text-xs text-muted-foreground">{achievement.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="evaluations">
          <Card>
            <CardHeader>
              <CardTitle>Evaluations</CardTitle>
              <CardDescription>Expert assessments and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Medal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No evaluations yet</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
                  This athlete hasn't received any performance evaluations yet
                </p>
                <Button>Schedule an Evaluation</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Training Schedule</CardTitle>
              <CardDescription>Upcoming sessions and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Schedule is empty</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
                  No upcoming training sessions or evaluations scheduled
                </p>
                <Button>View Calendar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AthleteProfile;
