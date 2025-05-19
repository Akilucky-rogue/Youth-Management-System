
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const Schedule = () => {
  return (
    <DashboardLayout title="Your Schedule">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">Upcoming Sessions</CardTitle>
          <CalendarDays className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No upcoming sessions</h3>
            <p className="text-sm text-muted-foreground">
              Your scheduled training sessions and events will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Schedule;
