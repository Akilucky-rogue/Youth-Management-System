
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Dashboard pages
import Schedule from "./pages/dashboard/Schedule";
import Messages from "./pages/dashboard/Messages";
import Evaluations from "./pages/dashboard/Evaluations";
import Reports from "./pages/dashboard/Reports";

// New pages
import AthleteProfile from "./pages/dashboard/AthleteProfile";
import EvaluationDetails from "./pages/dashboard/EvaluationDetails";
import ExpertDirectory from "./pages/dashboard/ExpertDirectory";
import TrainingPlans from "./pages/dashboard/TrainingPlans";
import AnalyticsDashboard from "./pages/dashboard/AnalyticsDashboard";
import Settings from "./pages/dashboard/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Dashboard routes */}
            <Route path="/dashboard/schedule" element={<Schedule />} />
            <Route path="/dashboard/messages" element={<Messages />} />
            <Route path="/dashboard/evaluations" element={<Evaluations />} />
            <Route path="/dashboard/reports" element={<Reports />} />
            
            {/* New routes */}
            <Route path="/dashboard/athlete/:id" element={<AthleteProfile />} />
            <Route path="/dashboard/evaluations/:id" element={<EvaluationDetails />} />
            <Route path="/dashboard/experts" element={<ExpertDirectory />} />
            <Route path="/dashboard/training" element={<TrainingPlans />} />
            <Route path="/dashboard/analytics" element={<AnalyticsDashboard />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
