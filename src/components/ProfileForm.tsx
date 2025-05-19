
import { useState, useEffect } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ProfileFormProps {
  activeTab?: string;
}

const ProfileForm = ({ activeTab = "profile" }: ProfileFormProps) => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    extendedProfile,
    setExtendedProfile,
    athleteProfile,
    setAthleteProfile,
    expertProfile,
    setExpertProfile,
  } = useProfilesFetcher();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Create handler functions using the custom hooks
  const basicProfileHandler = useBasicProfileHandler({ setExtendedProfile });
  const youthAthleteHandler = useYouthAthleteHandler({ athleteProfile, setAthleteProfile });
  const expertProfileHandler = useExpertProfileHandler({ expertProfile, setExpertProfile });

  const handleBasicProfileSubmit = async (formData: any) => {
    setIsSubmitting(true);
    setFormError(null);
    try {
      await basicProfileHandler(formData, () => setIsSubmitting(false));
      toast({
        title: "Profile updated",
        description: "Your basic information has been saved successfully.",
      });
    } catch (error) {
      setFormError("Failed to update profile. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleYouthAthleteSubmit = async (formData: any) => {
    setIsSubmitting(true);
    setFormError(null);
    try {
      await youthAthleteHandler(formData, () => setIsSubmitting(false));
      toast({
        title: "Athlete profile updated",
        description: "Your athlete information has been saved successfully.",
      });
    } catch (error) {
      setFormError("Failed to update athlete profile. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleExpertProfileSubmit = async (formData: any) => {
    setIsSubmitting(true);
    setFormError(null);
    try {
      await expertProfileHandler(formData, () => setIsSubmitting(false));
      toast({
        title: "Expert profile updated",
        description: "Your expert information has been saved successfully.",
      });
    } catch (error) {
      setFormError("Failed to update expert profile. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!user || !profile) return null;

  return (
    <div className="space-y-6">
      {formError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      
      {activeTab === "profile" && (
        <BasicProfileForm 
          profile={extendedProfile} 
          onSubmit={handleBasicProfileSubmit} 
          isSubmitting={isSubmitting}
        />
      )}
      
      {activeTab === "athlete" && profile.user_type === "youth" && (
        <YouthAthleteForm 
          athleteProfile={athleteProfile} 
          onSubmit={handleYouthAthleteSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      {activeTab === "expert" && profile.user_type === "expert" && (
        <ExpertProfileForm 
          expertProfile={expertProfile} 
          onSubmit={handleExpertProfileSubmit}
          isSubmitting={isSubmitting}
        />
      )}

      <div className="flex justify-between pt-6 border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;
