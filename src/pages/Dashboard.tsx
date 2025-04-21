
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { UserCheck, Settings } from "lucide-react";

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const isProfileIncomplete = () => {
    if (!profile) return true;
    
    // Check if basic profile is complete
    if (!profile.first_name || !profile.last_name) return true;
    
    return false;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h1>
      
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">My Profile</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/profile")}>
              <Settings className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
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
        </div>
        
        {/* Additional dashboard content will be added here based on user type */}
      </div>
    </div>
  );
};

export default Dashboard;
