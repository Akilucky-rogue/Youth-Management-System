import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CalendarClock, 
  MessageSquare, 
  Medal, 
  Clipboard, 
  User, 
  BarChart3, 
  Clock,
  ArrowRight,
  Loader2
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const [progress, setProgress] = useState(65);

  // If still loading, show a loading indicator inside the dashboard layout
  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // If not loading but no user/profile, show a message instead of returning null
  if (!user || !profile) {
    return (
      <DashboardLayout title="Dashboard">
        <Card>
          <CardContent className="text-center py-8">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Profile not available</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
              Please make sure you're logged in or try refreshing the page.
            </p>
            <Button asChild>
              <Link to="/auth">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const isYouthAthlete = profile.user_type === "youth";
  const isExpert = profile.user_type === "expert";
  
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 gap-6">
        {/* Welcome Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {greeting()}, {profile.first_name}!
            </CardTitle>
            <CardDescription>
              Here's what's happening with your {isYouthAthlete ? "athletic journey" : "expertise"} today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Profile Completion</h3>
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Your profile is {progress}% complete. 
                  <Link to="/profile" className="text-talent-indigo ml-1 hover:underline">
                    Complete your profile
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming Sessions</p>
                  <h4 className="text-2xl font-bold mt-1">0</h4>
                </div>
                <div className="p-2 bg-talent-indigo/10 rounded-full">
                  <CalendarClock className="h-5 w-5 text-talent-indigo" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unread Messages</p>
                  <h4 className="text-2xl font-bold mt-1">2</h4>
                </div>
                <div className="p-2 bg-talent-purple/10 rounded-full">
                  <MessageSquare className="h-5 w-5 text-talent-purple" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {isYouthAthlete && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Evaluations</p>
                    <h4 className="text-2xl font-bold mt-1">0</h4>
                  </div>
                  <div className="p-2 bg-talent-green/10 rounded-full">
                    <Medal className="h-5 w-5 text-talent-green" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {isExpert && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Reports Due</p>
                    <h4 className="text-2xl font-bold mt-1">0</h4>
                  </div>
                  <div className="p-2 bg-talent-green/10 rounded-full">
                    <Clipboard className="h-5 w-5 text-talent-green" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                  <h4 className="text-2xl font-bold mt-1">6</h4>
                </div>
                <div className="p-2 bg-talent-orange/10 rounded-full">
                  <User className="h-5 w-5 text-talent-orange" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content section - different for youth vs expert */}
        {isYouthAthlete ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest progress and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Timeline items */}
                  <div className="flex items-start">
                    <div className="mr-4 p-2 bg-talent-indigo/10 rounded-full">
                      <User className="h-4 w-4 text-talent-indigo" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Profile Created</p>
                      <p className="text-sm text-muted-foreground">You joined TalentSpark</p>
                      <p className="text-xs text-muted-foreground mt-1">Today</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your scheduled sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-sm font-medium mb-1">No upcoming events</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Schedule sessions with experts to improve your skills
                  </p>
                  <Button variant="outline" size="sm">
                    Schedule Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Athletes Overview</CardTitle>
                <CardDescription>Manage your athletes and evaluations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <User className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-sm font-medium mb-1">No athletes assigned yet</h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Connect with young athletes to provide evaluations and guidance
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Browse Athletes
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
                <CardDescription>Your expert profile stats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Evaluations</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Rate</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Avg. Rating</span>
                    <span className="font-medium">N/A</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" size="sm" className="w-full flex items-center justify-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Access commonly used features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/profile">
                <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <User className="h-6 w-6 mb-2 text-talent-indigo" />
                  <span className="text-sm font-medium">Profile</span>
                </div>
              </Link>
              <Link to="/dashboard/messages">
                <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <MessageSquare className="h-6 w-6 mb-2 text-talent-purple" />
                  <span className="text-sm font-medium">Messages</span>
                </div>
              </Link>
              <Link to="/dashboard/schedule">
                <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <CalendarClock className="h-6 w-6 mb-2 text-talent-green" />
                  <span className="text-sm font-medium">Schedule</span>
                </div>
              </Link>
              {isYouthAthlete ? (
                <Link to="/dashboard/evaluations">
                  <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Medal className="h-6 w-6 mb-2 text-talent-orange" />
                    <span className="text-sm font-medium">Evaluations</span>
                  </div>
                </Link>
              ) : (
                <Link to="/dashboard/reports">
                  <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Clipboard className="h-6 w-6 mb-2 text-talent-orange" />
                    <span className="text-sm font-medium">Reports</span>
                  </div>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
