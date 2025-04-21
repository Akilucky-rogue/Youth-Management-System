
import { useState } from "react";
import { Trophy } from "lucide-react";
import { Sport, sports } from "@/data/sportsData";
import { cn } from "@/lib/utils";

const SportSelector = () => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  
  return (
    <div className="w-full">
      <h3 className="text-xl font-display font-semibold mb-4">Choose Your Sport</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {sports.map((sport) => (
          <button
            key={sport.id}
            onClick={() => setSelectedSport(sport.id)}
            className={cn(
              "flex flex-col items-center justify-center p-4 rounded-lg transition-all",
              selectedSport === sport.id
                ? `bg-${sport.color}/20 border-2 border-${sport.color} shadow-md`
                : "bg-white border-2 border-gray-100 hover:bg-gray-50"
            )}
          >
            <div className={`p-2 rounded-full bg-${sport.color}/10`}>
              <Trophy className={`h-6 w-6 text-${sport.color}`} />
            </div>
            <span className="mt-2 font-medium text-sm">{sport.name}</span>
          </button>
        ))}
      </div>
      
      {selectedSport && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Available Venues</h4>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            {sports.find(s => s.id === selectedSport)?.venues.map((venue, index) => (
              <li key={index}>{venue}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SportSelector;
