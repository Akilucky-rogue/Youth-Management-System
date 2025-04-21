
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trophy, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <a href="#" className="text-gray-600 hover:text-talent-indigo font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-talent-indigo font-medium transition-colors">
              Sports
            </a>
            <a href="#" className="text-gray-600 hover:text-talent-indigo font-medium transition-colors">
              Showcase
            </a>
            <a href="#" className="text-gray-600 hover:text-talent-indigo font-medium transition-colors">
              Experts
            </a>
            <a href="#" className="text-gray-600 hover:text-talent-indigo font-medium transition-colors">
              About
            </a>
            <Button className="ml-4 bg-talent-indigo hover:bg-talent-purple">Register Now</Button>
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
            <a href="#" className="block text-gray-600 py-2 font-medium">
              Home
            </a>
            <a href="#" className="block text-gray-600 py-2 font-medium">
              Sports
            </a>
            <a href="#" className="block text-gray-600 py-2 font-medium">
              Showcase
            </a>
            <a href="#" className="block text-gray-600 py-2 font-medium">
              Experts
            </a>
            <a href="#" className="block text-gray-600 py-2 font-medium">
              About
            </a>
            <Button className="w-full bg-talent-indigo hover:bg-talent-purple">Register Now</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
