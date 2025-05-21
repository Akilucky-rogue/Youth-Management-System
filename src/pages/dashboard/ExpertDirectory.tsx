
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Star, MessageSquare, Calendar } from "lucide-react";

interface Expert {
  id: number;
  name: string;
  title: string;
  sports: string[];
  rating: number;
  experience: number;
  bio: string;
  available: boolean;
}

const ExpertDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sportFilter, setSportFilter] = useState("");
  
  // Sample expert data
  const [experts] = useState<Expert[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Soccer Coach & Talent Evaluator",
      sports: ["Soccer", "Futsal"],
      rating: 4.9,
      experience: 12,
      bio: "Former professional player with over a decade of coaching experience. Specializes in youth talent development and technical skill assessment.",
      available: true
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Basketball Performance Analyst",
      sports: ["Basketball"],
      rating: 4.8,
      experience: 8,
      bio: "Professional basketball analyst with experience working with college and professional teams. Expert in performance metrics and skill development.",
      available: true
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      title: "Athletic Performance Coach",
      sports: ["Track & Field", "Soccer", "Basketball"],
      rating: 4.7,
      experience: 10,
      bio: "Certified strength and conditioning specialist with a focus on improving athletic performance across multiple sports. Expert in movement analysis.",
      available: false
    },
    {
      id: 4,
      name: "David Wilson",
      title: "Tennis Coach & Scout",
      sports: ["Tennis"],
      rating: 4.9,
      experience: 15,
      bio: "Former ATP tour player now focused on identifying and developing young tennis talent. Extensive experience in technical and tactical assessment.",
      available: true
    }
  ]);
  
  // Get unique sports for filter
  const uniqueSports = [...new Set(experts.flatMap(expert => expert.sports))].sort();
  
  // Filter experts based on search and sport filter
  const filteredExperts = experts.filter(expert => {
    const matchesSearch = 
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.bio.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSport = sportFilter === "" || expert.sports.includes(sportFilter);
    
    return matchesSearch && matchesSport;
  });

  return (
    <DashboardLayout title="Expert Directory">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Find an Expert</CardTitle>
          <CardDescription>
            Connect with sports experts for evaluations and guidance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, sport, or expertise..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={sportFilter} onValueChange={setSportFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Sports</SelectItem>
                {uniqueSports.map(sport => (
                  <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredExperts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExperts.map(expert => (
            <Card key={expert.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex gap-3 items-center">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="" alt={expert.name} />
                      <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{expert.name}</CardTitle>
                      <CardDescription>{expert.title}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={expert.available ? "default" : "outline"}>
                    {expert.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-3">
                  {expert.sports.map(sport => (
                    <span 
                      key={sport} 
                      className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 mb-3 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{expert.rating}</span>
                  <span className="text-muted-foreground"> • {expert.experience} years experience</span>
                </div>
                <p className="text-sm text-muted-foreground">{expert.bio}</p>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex gap-2 w-full">
                  <Button variant="outline" className="flex-1">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button className="flex-1">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No experts found</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6">
              No experts match your current search criteria. Try adjusting your filters.
            </p>
            <Button onClick={() => {
              setSearchTerm("");
              setSportFilter("");
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default ExpertDirectory;
