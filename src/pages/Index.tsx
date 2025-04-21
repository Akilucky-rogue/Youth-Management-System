
import { Award, Calendar, MessageCircle, UserCheck, Trophy, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import SportSelector from "@/components/SportSelector";
import TalentCard from "@/components/TalentCard";
import Footer from "@/components/Footer";
import { talents } from "@/data/sportsData";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">How TalentSpark Works</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our platform connects talented youth with sports experts to evaluate, 
                nurture, and showcase their athletic abilities
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                icon={UserCheck}
                title="Register & Profile"
                description="Create your athlete profile and choose your sport of interest"
                color="talent-blue"
              />
              <FeatureCard 
                icon={Trophy}
                title="Showcase Skills"
                description="Upload videos and stats to demonstrate your sporting abilities"
                color="talent-indigo"
              />
              <FeatureCard 
                icon={Star}
                title="Expert Evaluation"
                description="Get assessed by sports professionals and scouts"
                color="talent-purple"
              />
              <FeatureCard 
                icon={MessageCircle}
                title="Feedback & Growth"
                description="Receive detailed analysis to improve your performance"
                color="talent-green"
              />
            </div>
          </div>
        </section>
        
        {/* Sports Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">Choose Your Sport</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We offer opportunities across multiple sports disciplines
                with specialized experts in each field
              </p>
            </div>
            
            <SportSelector />
          </div>
        </section>
        
        {/* Featured Talents */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">Featured Talents</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Meet some of our exceptional young athletes who are making waves in their sports
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {talents.map(talent => (
                <TalentCard key={talent.id} talent={talent} />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-talent-indigo text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">Ready to Showcase Your Talent?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Join our community of young athletes and get discovered by experts in your field.
              Start your sports journey with us today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-talent-indigo hover:bg-gray-100 font-medium rounded-md px-6 py-3">
                Register Now
              </button>
              <button className="border-2 border-white text-white hover:bg-white/10 font-medium rounded-md px-6 py-3">
                Learn More
              </button>
            </div>
            
            <p className="mt-6 text-sm text-white/70">
              Minimal registration fee applies to support platform maintenance and expert evaluations
            </p>
          </div>
        </section>
        
        {/* Testimonials/Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">Why Athletes Choose Us</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Our platform has helped thousands of young athletes discover and develop their talents
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-4xl font-bold text-talent-indigo mb-2">5,000+</p>
                <p className="text-gray-600">Registered Athletes</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-4xl font-bold text-talent-purple mb-2">200+</p>
                <p className="text-gray-600">Expert Coaches</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-4xl font-bold text-talent-green mb-2">15+</p>
                <p className="text-gray-600">Sports Categories</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-4xl font-bold text-talent-orange mb-2">98%</p>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
