
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  LineChart, 
  BarChart, 
  Calendar, 
  Download,
  Medal
} from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  BarChart as RechartsBarChart,
  Bar,
  Cell
} from "recharts";

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("3m");
  const [skillCategory, setSkillCategory] = useState("all");

  // Sample performance data - in a real app, this would come from an API
  const performanceData = [
    { month: "Jan", technique: 65, strength: 60, speed: 70, endurance: 55, gameAwareness: 60 },
    { month: "Feb", technique: 68, strength: 62, speed: 72, endurance: 58, gameAwareness: 63 },
    { month: "Mar", technique: 70, strength: 65, speed: 75, endurance: 62, gameAwareness: 67 },
    { month: "Apr", technique: 73, strength: 70, speed: 75, endurance: 65, gameAwareness: 70 },
    { month: "May", technique: 75, strength: 72, speed: 78, endurance: 70, gameAwareness: 73 },
    { month: "Jun", technique: 78, strength: 75, speed: 80, endurance: 73, gameAwareness: 75 }
  ];

  // Sample session data for the charts
  const sessionData = [
    { week: "Week 1", trainingHours: 4, performance: 65 },
    { week: "Week 2", trainingHours: 6, performance: 68 },
    { week: "Week 3", trainingHours: 5, performance: 70 },
    { week: "Week 4", trainingHours: 7, performance: 72 },
    { week: "Week 5", trainingHours: 6.5, performance: 75 },
    { week: "Week 6", trainingHours: 8, performance: 78 }
  ];

  // Sample skill breakdown data for the bar chart
  const skillBreakdown = [
    { name: "Technique", value: 78, color: "#4e78fc" },
    { name: "Strength", value: 75, color: "#7c3aed" },
    { name: "Speed", value: 80, color: "#10b981" },
    { name: "Endurance", value: 73, color: "#f59e0b" },
    { name: "Game Awareness", value: 75, color: "#8b5cf6" }
  ];

  // Stat cards data
  const stats = [
    {
      title: "Training Hours",
      value: "24.5",
      change: "+12%",
      changeDirection: "up",
      description: "vs. previous period"
    },
    {
      title: "Average Performance",
      value: "78%",
      change: "+5%",
      changeDirection: "up",
      description: "vs. previous period"
    },
    {
      title: "Sessions Completed",
      value: "18",
      change: "+3",
      changeDirection: "up",
      description: "vs. previous period"
    },
    {
      title: "Expert Evaluations",
      value: "4",
      change: "+1",
      changeDirection: "up",
      description: "vs. previous period"
    }
  ];

  return (
    <DashboardLayout title="Performance Analytics">
      {/* Top stats section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
              <p className={`text-xs flex items-center ${
                stat.changeDirection === "up" ? "text-talent-green" : "text-talent-red"
              }`}>
                {stat.changeDirection === "up" ? 
                  <TrendingUp className="h-3 w-3 mr-1" /> : 
                  <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                }
                {stat.change} <span className="text-muted-foreground ml-1">{stat.description}</span>
              </p>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Main content */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Track your progress over time</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={skillCategory} onValueChange={setSkillCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Skill Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="technique">Technique</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="speed">Speed</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="awareness">Game Awareness</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: '#6b7280', fontSize: 12 }} 
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  domain={[0, 100]}
                />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="technique" 
                  stroke="#4e78fc" 
                  name="Technique" 
                  strokeWidth={2} 
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  hide={skillCategory !== "all" && skillCategory !== "technique"}
                />
                <Line 
                  type="monotone" 
                  dataKey="strength" 
                  stroke="#7c3aed" 
                  name="Strength" 
                  strokeWidth={2} 
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  hide={skillCategory !== "all" && skillCategory !== "strength"}
                />
                <Line 
                  type="monotone" 
                  dataKey="speed" 
                  stroke="#10b981" 
                  name="Speed" 
                  strokeWidth={2} 
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  hide={skillCategory !== "all" && skillCategory !== "speed"}
                />
                <Line 
                  type="monotone" 
                  dataKey="endurance" 
                  stroke="#f59e0b" 
                  name="Endurance" 
                  strokeWidth={2} 
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  hide={skillCategory !== "all" && skillCategory !== "endurance"}
                />
                <Line 
                  type="monotone" 
                  dataKey="gameAwareness" 
                  stroke="#8b5cf6" 
                  name="Game Awareness" 
                  strokeWidth={2} 
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  hide={skillCategory !== "all" && skillCategory !== "awareness"}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Additional insights */}
      <Tabs defaultValue="training">
        <TabsList className="mb-4">
          <TabsTrigger value="training" className="flex items-center gap-1">
            <LineChart className="h-4 w-4" />
            <span>Training Impact</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            <span>Skill Breakdown</span>
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Session Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="evaluations" className="flex items-center gap-1">
            <Medal className="h-4 w-4" />
            <span>Evaluations</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="training">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Impact</CardTitle>
                <CardDescription>Correlation between training hours and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={sessionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="week" 
                        tick={{ fill: '#6b7280', fontSize: 12 }} 
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis 
                        yAxisId="left" 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        domain={[0, 100]}
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="trainingHours" 
                        stroke="#4e78fc" 
                        name="Training Hours" 
                        strokeWidth={2} 
                        yAxisId="left"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="performance" 
                        stroke="#10b981" 
                        name="Performance Score" 
                        strokeWidth={2} 
                        yAxisId="right"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>Training effectiveness analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="font-medium text-green-800">Positive Correlation</h3>
                    <p className="text-sm text-green-700 mt-1">
                      Your performance score increases consistently with increased training hours, showing a strong positive correlation.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="font-medium text-blue-800">Optimal Training Range</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Your data suggests that 6-8 hours of focused weekly training produces the best performance improvements.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <h3 className="font-medium text-purple-800">Recommended Action</h3>
                    <p className="text-sm text-purple-700 mt-1">
                      Consider maintaining a consistent 7-hour weekly training schedule with focused skill development sessions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="skills">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Skill Levels</CardTitle>
                <CardDescription>Breakdown of your athletic abilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={skillBreakdown} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        type="number" 
                        domain={[0, 100]}
                        tick={{ fill: '#6b7280', fontSize: 12 }} 
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#e5e7eb' }}
                      />
                      <Tooltip />
                      <Bar dataKey="value" name="Skill Level">
                        {skillBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Skill Analysis</CardTitle>
                <CardDescription>Detailed assessment of your skill profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Strengths</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-talent-green"></div>
                        <span className="text-sm">Speed - Your highest rated attribute (80/100)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-talent-blue"></div>
                        <span className="text-sm">Technique - Strong technical foundation (78/100)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Areas for Improvement</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-talent-orange"></div>
                        <span className="text-sm">Endurance - Lowest rated attribute (73/100)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-talent-purple"></div>
                        <span className="text-sm">Game Awareness - Room for tactical development (75/100)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Recommended Focus</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on your profile, we recommend focusing on endurance training and tactical awareness exercises to create a more balanced skill set.
                    </p>
                    <div className="flex mt-3">
                      <Button variant="outline" size="sm" className="text-xs">
                        View Recommended Drills
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>Session Analysis</CardTitle>
              <CardDescription>Coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Session analysis coming soon</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
                  We're working on detailed training session analysis to help you optimize your performance.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="evaluations">
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Insights</CardTitle>
              <CardDescription>Coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Medal className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Evaluation insights coming soon</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
                  We're developing advanced analytics based on your expert evaluations.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AnalyticsDashboard;
