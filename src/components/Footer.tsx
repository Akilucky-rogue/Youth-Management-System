
import { Trophy } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-6 w-6 text-talent-blue" />
              <span className="font-display font-bold text-xl">TalentSpark</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering young athletes to discover, develop, and showcase their talents.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sports</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Showcase</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Experts</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Training Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Expert Advice</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community Forum</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: info@talentspark.com</li>
              <li className="text-gray-400">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-400">Address: 123 Sports Avenue, Athletic City</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6">
          <p className="text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} TalentSpark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
