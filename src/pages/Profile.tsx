
import { useState } from "react";
import ProfileForm from "@/components/ProfileForm";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/providers/AuthProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, Settings, Shield } from "lucide-react";

const Profile = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  const isYouthAthlete = profile?.user_type === "youth";
  const isExpert = profile?.user_type === "expert";

  return (
    <DashboardLayout title="Your Profile">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 pb-0">
          <Tabs defaultValue="profile" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                <span>Personal Info</span>
              </TabsTrigger>
              {isYouthAthlete && (
                <TabsTrigger value="athlete" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Athlete Details</span>
                </TabsTrigger>
              )}
              {isExpert && (
                <TabsTrigger value="expert" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Expert Details</span>
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Manage your personal information and contact details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm activeTab={activeTab} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="athlete">
              <Card>
                <CardHeader>
                  <CardTitle>Athlete Information</CardTitle>
                  <CardDescription>
                    Manage your sports profile, skills, and goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm activeTab={activeTab} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expert">
              <Card>
                <CardHeader>
                  <CardTitle>Expert Information</CardTitle>
                  <CardDescription>
                    Manage your expertise, qualifications, and availability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm activeTab={activeTab} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
