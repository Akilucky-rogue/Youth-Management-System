
import { useAuth } from "@/providers/AuthProvider";
import { UserCheck, Settings, CalendarDays, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const isProfileIncomplete = () => {
    if (!profile) return true;
    
    // Check if basic profile is complete
    if (!profile.first_name || !profile.last_name) return true;
    
    return false;
  };

  const isYouthAthlete = profile?.user_type === "youth";
  const isExpert = profile?.user_type === "expert";

  return (
    <DashboardLayout title="Welcome to Your Dashboard">
      {isProfileIncomplete() && (
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <UserCheck className="h-5 w-5 text-amber-600" />
            <h2 className="font-semibold text-amber-800">Complete Your Profile</h2>
          </div>
          <p className="text-amber-700 mb-3">
            Please complete your profile to get the most out of TalentSpark.
          </p>
          <Button
            onClick={() => navigate("/profile")}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Complete Profile
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              My Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {profile ? `${profile.first_name} ${profile.last_name}` : "Not set"}
              </p>
              <p>
                <span className="font-medium">User Type:</span>{" "}
                {profile?.user_type ? profile.user_type.charAt(0).toUpperCase() + profile.user_type.slice(1) : "Not set"}
              </p>
              <p>
                <span className="font-medium">Bio:</span>{" "}
                {profile?.bio || "No bio provided"}
              </p>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" onClick={() => navigate("/profile")}>
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Upcoming Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-sm text-muted-foreground mb-4">
              You have no upcoming events scheduled.
            </p>
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/schedule")}>
              View Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Youth-specific cards */}
      {isYouthAthlete && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="h-5 w-5" />
                Latest Evaluations
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-muted-foreground mb-4">
                No evaluations yet. Connect with coaches to get feedback.
              </p>
              <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/evaluations")}>
                View Evaluations
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Skills Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-muted-foreground">
                Start training to track your progress.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Expert-specific cards */}
      {isExpert && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                My Athletes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-muted-foreground mb-4">
                You haven't connected with any athletes yet.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clipboard className="h-5 w-5" />
                Evaluation Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-muted-foreground mb-4">
                Create and manage athlete evaluations.
              </p>
              <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/reports")}>
                Manage Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;

// Missing import is fixed
import { User } from "lucide-react";
