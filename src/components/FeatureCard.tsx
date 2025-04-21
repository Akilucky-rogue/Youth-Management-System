
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const FeatureCard = ({ icon: Icon, title, description, color }: FeatureCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover-lift">
      <div className={`inline-flex items-center justify-center p-3 rounded-lg bg-${color}/10 mb-4`}>
        <Icon className={`h-6 w-6 text-${color}`} />
      </div>
      <h3 className="font-display font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
