
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Medal } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

const Evaluations = () => {
  const { profile } = useAuth();
  
  // This page is specific to youth athletes
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

  return (
    <DashboardLayout title="Your Evaluations">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">Performance Evaluations</CardTitle>
          <Medal className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No evaluations yet</h3>
            <p className="text-sm text-muted-foreground">
              After training sessions, experts will provide evaluations that will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Evaluations;
