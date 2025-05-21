
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Clipboard, Plus, Search, Filter, Download, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Report = {
  id: number;
  athleteName: string;
  athleteAvatar?: string;
  sport: string;
  date: Date;
  status: "draft" | "completed" | "shared";
  type: "evaluation" | "progress" | "recommendation";
  lastEdited: Date;
};

type FilterOptions = {
  status: "all" | "draft" | "completed" | "shared";
  type: "all" | "evaluation" | "progress" | "recommendation";
  timeframe: "all" | "week" | "month" | "year";
};

const Reports = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    status: "all",
    type: "all",
    timeframe: "all"
  });
  
  // Sample reports data
  const [reports] = useState<Report[]>([]);
  
  // If not an expert, show restricted access message
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

  const filteredReports = reports.filter(report => {
    // Filter by search term
    const matchesSearch = 
      report.athleteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.sport.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = 
      filters.status === "all" || 
      report.status === filters.status;
    
    // Filter by type
    const matchesType = 
      filters.type === "all" || 
      report.type === filters.type;
    
    // Filter by timeframe
    let matchesTimeframe = true;
    if (filters.timeframe !== "all") {
      const now = new Date();
      if (filters.timeframe === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchesTimeframe = report.date >= weekAgo;
      } else if (filters.timeframe === "month") {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        matchesTimeframe = report.date >= monthAgo;
      } else if (filters.timeframe === "year") {
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        matchesTimeframe = report.date >= yearAgo;
      }
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesTimeframe;
  });

  const draftReports = reports.filter(report => report.status === "draft");
  const completedReports = reports.filter(report => report.status === "completed");
  const sharedReports = reports.filter(report => report.status === "shared");

  const getTabReports = (tab: string) => {
    switch(tab) {
      case "draft": return draftReports;
      case "completed": return completedReports;
      case "shared": return sharedReports;
      default: return filteredReports;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <DashboardLayout title="Athlete Reports">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Athlete Reports</h2>
          <p className="text-muted-foreground">Create and manage your athlete evaluation reports</p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" />
          <span>New Report</span>
        </Button>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="all">
          <ReportsList reports={filteredReports} />
        </TabsContent>
        
        <TabsContent value="draft">
          <ReportsList reports={draftReports} />
        </TabsContent>
        
        <TabsContent value="completed">
          <ReportsList reports={completedReports} />
        </TabsContent>
        
        <TabsContent value="shared">
          <ReportsList reports={sharedReports} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

// Reports list component
const ReportsList = ({ reports }: { reports: Report[] }) => {
  return (
    <Card>
      <CardContent className="p-0">
        {reports.length > 0 ? (
          <div className="divide-y">
            {reports.map((report) => (
              <div key={report.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={report.athleteAvatar} alt={report.athleteName} />
                      <AvatarFallback>{report.athleteName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{report.athleteName}</h3>
                      <p className="text-sm text-muted-foreground">{report.sport}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      report.status === "draft" ? "outline" : 
                      report.status === "completed" ? "secondary" : 
                      "default"
                    }>
                      {report.status === "draft" ? "Draft" : 
                       report.status === "completed" ? "Completed" : 
                       "Shared"}
                    </Badge>
                    <Badge variant="outline">{
                      report.type === "evaluation" ? "Evaluation" :
                      report.type === "progress" ? "Progress" :
                      "Recommendation"
                    }</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-muted-foreground">
                    {report.status === "draft" 
                      ? `Last edited on ${formatDate(report.lastEdited)}` 
                      : `Created on ${formatDate(report.date)}`
                    }
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                    <Button size="sm">
                      {report.status === "draft" ? "Continue Editing" : "View Report"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Clipboard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No reports found</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
              You haven't created any reports yet. Create your first report to get started.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-1" />
              Create New Report
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export default Reports;
