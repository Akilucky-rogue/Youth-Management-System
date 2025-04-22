
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { BasicProfileForm } from "./profile/BasicProfileForm";
import { YouthAthleteForm } from "./profile/YouthAthleteForm";
import { ExpertProfileForm } from "./profile/ExpertProfileForm";
import {
  useProfilesFetcher,
} from "./profile/ProfileFetchers";
import {
  useBasicProfileHandler,
  useYouthAthleteHandler,
  useExpertProfileHandler,
} from "./profile/ProfileHandlers";

const ProfileForm = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const {
    extendedProfile,
    setExtendedProfile,
    athleteProfile,
    setAthleteProfile,
    expertProfile,
    setExpertProfile,
  } = useProfilesFetcher();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create handler functions using the custom hooks
  const basicProfileHandler = useBasicProfileHandler({ setExtendedProfile });
  const youthAthleteHandler = useYouthAthleteHandler({ athleteProfile, setAthleteProfile });
  const expertProfileHandler = useExpertProfileHandler({ expertProfile, setExpertProfile });

  const handleBasicProfileSubmit = async (formData: any) => {
    setIsSubmitting(true);
    await basicProfileHandler(formData, () => setIsSubmitting(false));
  };

  const handleYouthAthleteSubmit = async (formData: any) => {
    setIsSubmitting(true);
    await youthAthleteHandler(formData, () => setIsSubmitting(false));
  };

  const handleExpertProfileSubmit = async (formData: any) => {
    setIsSubmitting(true);
    await expertProfileHandler(formData, () => setIsSubmitting(false));
  };

  if (!user || !profile) return null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
        <BasicProfileForm 
          profile={extendedProfile} 
          onSubmit={handleBasicProfileSubmit} 
          isSubmitting={isSubmitting}
        />
      </div>
      
      {profile.user_type === "youth" && (
        <div className="pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Athlete Information</h2>
          <YouthAthleteForm 
            athleteProfile={athleteProfile} 
            onSubmit={handleYouthAthleteSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      {profile.user_type === "expert" && (
        <div className="pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Expert Information</h2>
          <ExpertProfileForm 
            expertProfile={expertProfile} 
            onSubmit={handleExpertProfileSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      <div className="flex justify-between pt-6 border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;
