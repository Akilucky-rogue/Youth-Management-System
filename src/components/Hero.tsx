
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="hero-pattern relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in">
            Discover and Develop Your
            <span className="gradient-text"> Athletic Talent</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Connect with experts, showcase your skills, and unlock opportunities
            to excel in your chosen sport with personalized feedback and coaching.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button size="lg" className="bg-talent-indigo hover:bg-talent-purple text-white px-8 py-6">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-talent-indigo text-talent-indigo hover:bg-talent-indigo/10 px-8 py-6">
              Explore Sports
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-16 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
