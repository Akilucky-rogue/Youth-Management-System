
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
import { AlertCircle, Loader2 } from "lucide-react";
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
    loading: profileDataLoading,
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
    } catch (error: any) {
      setFormError(error.message || "Failed to update profile. Please try again.");
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
    } catch (error: any) {
      setFormError(error.message || "Failed to update athlete profile. Please try again.");
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
    } catch (error: any) {
      setFormError(error.message || "Failed to update expert profile. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!user || !profile) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">
          Please sign in to manage your profile.
        </p>
      </div>
    );
  }

  if (profileDataLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading profile data...</p>
        </div>
      </div>
    );
  }

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
