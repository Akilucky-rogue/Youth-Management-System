
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Menu, X } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
      toast({
        title: "Logged out successfully",
        description: "Come back soon!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: error.message,
      });
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-talent-indigo" />
              <span className="font-display font-bold text-xl">TalentSpark</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-600 hover:text-talent-indigo font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-talent-indigo font-medium transition-colors">
              Sports
            </a>
            <a href="#" className="text-gray-600 hover:text-talent-indigo font-medium transition-colors">
              Showcase
            </a>
            <a href="#" className="text-gray-600 hover:text-talent-indigo font-medium transition-colors">
              About
            </a>
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/dashboard")}
                  className="text-talent-indigo hover:text-talent-purple"
                >
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-talent-indigo text-talent-indigo hover:bg-talent-indigo/10"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => navigate("/auth")}
                className="bg-talent-indigo hover:bg-talent-purple"
              >
                Get Started
              </Button>
            )}
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-talent-indigo"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <a href="/" className="block text-gray-600 py-2 font-medium">
              Home
            </a>
            <a href="#" className="block text-gray-600 py-2 font-medium">
              Sports
            </a>
            <a href="#" className="block text-gray-600 py-2 font-medium">
              Showcase
            </a>
            <a href="#" className="block text-gray-600 py-2 font-medium">
              About
            </a>
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/dashboard")}
                  className="w-full justify-start text-talent-indigo hover:text-talent-purple"
                >
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full border-talent-indigo text-talent-indigo hover:bg-talent-indigo/10"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => navigate("/auth")}
                className="w-full bg-talent-indigo hover:bg-talent-purple"
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
