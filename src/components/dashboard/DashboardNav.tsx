
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { 
  ChartBar, 
  CalendarDays, 
  User, 
  MessageSquare,
  Medal,
  Clipboard
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const DashboardNav = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isYouthAthlete = profile?.user_type === "youth";
  const isExpert = profile?.user_type === "expert";
  
  const navItems = [
    {
      label: "Overview",
      icon: ChartBar,
      path: "/dashboard",
      showFor: ["youth", "expert"],
    },
    {
      label: "Schedule",
      icon: CalendarDays,
      path: "/dashboard/schedule",
      showFor: ["youth", "expert"],
    },
    {
      label: "Profile",
      icon: User,
      path: "/profile",
      showFor: ["youth", "expert"],
    },
    {
      label: "Messages",
      icon: MessageSquare,
      path: "/dashboard/messages",
      showFor: ["youth", "expert"],
    },
    {
      label: "Evaluations",
      icon: Medal,
      path: "/dashboard/evaluations",
      showFor: ["youth"],
    },
    {
      label: "Athlete Reports",
      icon: Clipboard,
      path: "/dashboard/reports",
      showFor: ["expert"],
    },
  ];

  const filteredNavItems = navItems.filter(item => 
    !profile?.user_type || item.showFor.includes(profile.user_type)
  );

  return (
    <div className="space-y-1">
      {filteredNavItems.map((item) => (
        <Button
          key={item.path}
          variant={location.pathname === item.path ? "default" : "ghost"}
          className={cn(
            "w-full justify-start gap-2 pl-2",
            location.pathname === item.path ? "bg-accent" : ""
          )}
          onClick={() => navigate(item.path)}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default DashboardNav;
