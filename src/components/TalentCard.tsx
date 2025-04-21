
import { useState } from "react";
import { Star, Trophy, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Talent } from "@/data/sportsData";

interface TalentCardProps {
  talent: Talent;
}

const TalentCard = ({ talent }: TalentCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover-lift">
      <div className="h-48 overflow-hidden">
        <img 
          src={talent.image} 
          alt={talent.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-semibold text-lg">{talent.name}</h3>
          <span className="bg-talent-indigo/10 text-talent-indigo text-xs px-2 py-1 rounded-full">
            {talent.sport}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-3">
          Age: {talent.age} • Level: {talent.level}
        </p>
        
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(talent.rating) 
                  ? "text-yellow-400 fill-yellow-400" 
                  : i < talent.rating 
                    ? "text-yellow-400 fill-yellow-400 opacity-50" 
                    : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">{talent.rating.toFixed(1)}</span>
        </div>
        
        {expanded && (
          <div className="mb-4 animate-fade-in">
            <h4 className="font-medium text-sm mb-1">Achievements</h4>
            <ul className="list-disc pl-5 text-sm text-gray-600">
              {talent.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "View More"}
          </Button>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Trophy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCard;
