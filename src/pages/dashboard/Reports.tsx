
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clipboard } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

const Reports = () => {
  const { profile } = useAuth();
  
  // This page is specific to experts
  if (profile?.user_type !== "expert") {
    return (
      <DashboardLayout title="Athlete Reports">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-muted-foreground">
                This page is only available for expert users.
              </h3>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Athlete Reports">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">Your Athlete Reports</CardTitle>
          <Clipboard className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No reports created yet</h3>
            <p className="text-sm text-muted-foreground">
              Create and manage evaluation reports for your athletes here.
            </p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Reports;
