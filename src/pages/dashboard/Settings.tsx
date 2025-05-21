
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Bell, 
  Lock, 
  Shield, 
  Smartphone, 
  Mail,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

const Settings = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Form state
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email_messages: true,
    email_evaluations: true,
    email_reminders: false,
    push_messages: true,
    push_evaluations: true,
    push_reminders: true
  });
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profile_visibility: true,
    public_evaluations: false,
    allow_messaging: true,
    data_analytics: true
  });

  const handleNotificationChange = (key: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key as keyof typeof notificationSettings]
    });
  };
  
  const handlePrivacyChange = (key: string) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key as keyof typeof privacySettings]
    });
  };

  return (
    <DashboardLayout title="Account Settings">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Manage your account preferences and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-6">
              <TabsTrigger value="profile" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-1">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span>Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-1">
                <Lock className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" type="text" defaultValue={profile?.first_name || ""} />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" type="text" defaultValue={profile?.last_name || ""} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Account Type</h3>
                  <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {profile?.user_type === "youth" ? "Youth Athlete" : 
                         profile?.user_type === "expert" ? "Sports Expert" : "Standard Account"}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {profile?.user_type === "youth" ? 
                          "Access to training plans, evaluations, and expert connections" : 
                         profile?.user_type === "expert" ? 
                          "Ability to evaluate athletes, create reports, and offer services" :
                          "Basic account features and access"}
                      </p>
                    </div>
                    <Button variant="outline" className="flex items-center gap-1">
                      <span>View Plan Details</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button>Save Changes</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email_messages">Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails when someone sends you a message
                        </p>
                      </div>
                      <Switch 
                        id="email_messages" 
                        checked={notificationSettings.email_messages}
                        onCheckedChange={() => handleNotificationChange("email_messages")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email_evaluations">Evaluations</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails about new evaluations and reports
                        </p>
                      </div>
                      <Switch 
                        id="email_evaluations" 
                        checked={notificationSettings.email_evaluations}
                        onCheckedChange={() => handleNotificationChange("email_evaluations")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email_reminders">Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email reminders about upcoming sessions
                        </p>
                      </div>
                      <Switch 
                        id="email_reminders" 
                        checked={notificationSettings.email_reminders}
                        onCheckedChange={() => handleNotificationChange("email_reminders")}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push_messages">Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications for new messages
                        </p>
                      </div>
                      <Switch 
                        id="push_messages" 
                        checked={notificationSettings.push_messages}
                        onCheckedChange={() => handleNotificationChange("push_messages")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push_evaluations">Evaluations</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications about evaluation updates
                        </p>
                      </div>
                      <Switch 
                        id="push_evaluations" 
                        checked={notificationSettings.push_evaluations}
                        onCheckedChange={() => handleNotificationChange("push_evaluations")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push_reminders">Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive push notification reminders for sessions
                        </p>
                      </div>
                      <Switch 
                        id="push_reminders" 
                        checked={notificationSettings.push_reminders}
                        onCheckedChange={() => handleNotificationChange("push_reminders")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button>Save Preferences</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="profile_visibility">Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">
                          Make your profile visible to other users on the platform
                        </p>
                      </div>
                      <Switch 
                        id="profile_visibility" 
                        checked={privacySettings.profile_visibility}
                        onCheckedChange={() => handlePrivacyChange("profile_visibility")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="public_evaluations">Public Evaluations</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow your evaluation scores to be publicly visible
                        </p>
                      </div>
                      <Switch 
                        id="public_evaluations" 
                        checked={privacySettings.public_evaluations}
                        onCheckedChange={() => handlePrivacyChange("public_evaluations")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="allow_messaging">Allow Messaging</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow other users to send you direct messages
                        </p>
                      </div>
                      <Switch 
                        id="allow_messaging" 
                        checked={privacySettings.allow_messaging}
                        onCheckedChange={() => handlePrivacyChange("allow_messaging")}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="data_analytics">Data Analytics</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow us to use your data for performance analytics
                        </p>
                      </div>
                      <Switch 
                        id="data_analytics" 
                        checked={privacySettings.data_analytics}
                        onCheckedChange={() => handlePrivacyChange("data_analytics")}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Data Management</h3>
                  <div className="space-y-4">
                    <Button variant="outline">Download My Data</Button>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button>Save Privacy Settings</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Account Security</h3>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button className="mt-2">Change Password</Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                  <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enhance your account security</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Add an extra layer of security to your account with two-factor authentication
                      </p>
                    </div>
                    <Button variant="default">Enable 2FA</Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Connected Devices</h3>
                  <div className="border rounded-lg">
                    <div className="p-4 border-b flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">iPhone 13</p>
                          <p className="text-xs text-muted-foreground">
                            San Francisco, CA • Last active 2 hours ago
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Sign Out</Button>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Current Browser</p>
                          <p className="text-xs text-muted-foreground">
                            Chrome on Windows • Currently active
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Sign Out</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline">Cancel</Button>
          <Button>Save All Changes</Button>
        </CardFooter>
      </Card>
    </DashboardLayout>
  );
};

export default Settings;
