
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, CalendarDays, Clock, AlertCircle, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from "@/providers/AuthProvider";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Event = {
  id: number;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: "training" | "evaluation" | "meeting";
};

const Schedule = () => {
  const { profile } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  // Function to get events for the selected date
  const getEventsForSelectedDate = () => {
    if (!date) return [];
    
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };
  
  const selectedDateEvents = getEventsForSelectedDate();

  return (
    <DashboardLayout title="Your Schedule">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Calendar</span>
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
            <CardDescription>
              Select a date to view or add sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mx-auto"
            />
          </CardContent>
        </Card>
        
        {/* Selected Day Events */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl">
                {date ? format(date, "MMMM do, yyyy") : "No Date Selected"}
              </CardTitle>
              <CardDescription>
                {selectedDateEvents.length 
                  ? `${selectedDateEvents.length} scheduled ${selectedDateEvents.length === 1 ? 'event' : 'events'}`
                  : "No scheduled events"
                }
              </CardDescription>
            </div>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              <span>Add Event</span>
            </Button>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className="flex items-start p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="mr-3">
                      <div className={`p-2 rounded-full 
                        ${event.type === 'training' ? 'bg-talent-green/10' : 
                          event.type === 'evaluation' ? 'bg-talent-orange/10' : 'bg-talent-purple/10'}`}>
                        <Clock className={`h-5 w-5 
                          ${event.type === 'training' ? 'text-talent-green' : 
                            event.type === 'evaluation' ? 'text-talent-orange' : 'text-talent-purple'}`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                      <div className="flex items-center mt-2">
                        <CalendarIcon className="h-3 w-3 text-muted-foreground mr-1" />
                        <span className="text-xs text-muted-foreground">
                          {event.startTime} - {event.endTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <Alert className="mb-6">
                  <AlertTitle>No events scheduled</AlertTitle>
                  <AlertDescription>
                    {profile?.user_type === "youth" 
                      ? "Schedule training sessions or evaluations with experts to start building your calendar."
                      : "Create availability slots or schedule sessions with athletes to populate your calendar."
                    }
                  </AlertDescription>
                </Alert>
                <Button>
                  {profile?.user_type === "youth" 
                    ? "Find an Expert" 
                    : "Set Availability"
                  }
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Instructions/Tips Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Schedule Management</CardTitle>
          <CardDescription>
            How to make the most of your calendar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">For Athletes</h3>
              <ul className="text-sm space-y-1 list-disc pl-4 text-muted-foreground">
                <li>Schedule regular training sessions</li>
                <li>Book evaluations with experts</li>
                <li>Set reminders for important deadlines</li>
                <li>Track your progress over time</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">For Experts</h3>
              <ul className="text-sm space-y-1 list-disc pl-4 text-muted-foreground">
                <li>Set your availability for consultations</li>
                <li>Schedule evaluation sessions</li>
                <li>Allocate time for report writing</li>
                <li>Manage multiple athlete appointments</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Tips</h3>
              <ul className="text-sm space-y-1 list-disc pl-4 text-muted-foreground">
                <li>Set realistic goals and timeframes</li>
                <li>Leave buffer time between sessions</li>
                <li>Sync with your personal calendar</li>
                <li>Enable notifications for reminders</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Schedule;
