
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/AuthProvider";
import {
  ExtendedProfile,
  ExtendedYouthAthlete,
  ExtendedExpert,
} from "./ProfileFetchers";

export function useBasicProfileHandler({ setExtendedProfile }: { setExtendedProfile: React.Dispatch<React.SetStateAction<ExtendedProfile | null>> }) {
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();

  const handleBasicProfileSubmit = async (formData: any, finish?: () => void) => {
    if (!user) return;

    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          bio: formData.bio,
          phone_text: formData.phoneText,
          preferred_contact_method: formData.preferredContactMethod,
          time_zone: formData.timeZone,
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      await refreshProfile();

      // Update local state with properly typed data
      setExtendedProfile(prev => {
        if (!prev) return null;
        return {
          ...prev,
          first_name: formData.firstName,
          last_name: formData.lastName,
          bio: formData.bio || null,
          phone_text: formData.phoneText || null,
          preferred_contact_method: formData.preferredContactMethod,
          time_zone: formData.timeZone || null,
        };
      });

      toast({
        title: "Profile updated successfully",
        description: "Your basic information has been updated",
      });

      if (finish) finish();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to update profile",
        description: error.message,
      });
      if (finish) finish();
    }
  };

  return handleBasicProfileSubmit;
}

export function useYouthAthleteHandler({ athleteProfile, setAthleteProfile }: {
  athleteProfile: ExtendedYouthAthlete | null,
  setAthleteProfile: React.Dispatch<React.SetStateAction<ExtendedYouthAthlete | null>>
}) {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleYouthAthleteSubmit = async (formData: any, finish?: () => void) => {
    if (!user) return;

    try {
      // Parse array data from comma-separated strings
      const secondarySports = formData.secondarySports.split(",").map((s: string) => s.trim()).filter(Boolean);
      const goals = formData.goals.split(",").map((s: string) => s.trim()).filter(Boolean);
      const trainingAvailability = formData.trainingAvailability.split(",").map((s: string) => s.trim()).filter(Boolean);
      
      const { error: youthError } = await supabase
        .from("youth_athletes")
        .upsert({
          id: user.id,
          age: parseInt(formData.age),
          primary_sport: formData.primarySport,
          experience_years: parseInt(formData.experienceYears) || 0,
          current_level: formData.currentLevel || null,
          school: formData.school || null,
          grade: formData.grade || null,
          secondary_sports: secondarySports,
          goals: goals,
          training_availability: trainingAvailability,
        });

      if (youthError) throw youthError;

      // Update local state with properly typed data
      const updatedAthleteProfile: ExtendedYouthAthlete = {
        ...(athleteProfile || {
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }),
        id: user.id,
        age: parseInt(formData.age),
        primary_sport: formData.primarySport,
        experience_years: parseInt(formData.experienceYears) || 0,
        current_level: formData.currentLevel || null,
        school: formData.school || null,
        grade: formData.grade || null,
        secondary_sports: secondarySports,
        goals: goals,
        training_availability: trainingAvailability,
        updated_at: new Date().toISOString(),
      } as ExtendedYouthAthlete;

      setAthleteProfile(updatedAthleteProfile);

      toast({
        title: "Athlete profile updated successfully",
        description: "Your athlete information has been updated",
      });

      navigate("/dashboard");
      if (finish) finish();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to update athlete profile",
        description: error.message,
      });
      if (finish) finish();
    }
  };

  return handleYouthAthleteSubmit;
}

export function useExpertProfileHandler({ expertProfile, setExpertProfile }: {
  expertProfile: ExtendedExpert | null,
  setExpertProfile: React.Dispatch<React.SetStateAction<ExtendedExpert | null>>
}) {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleExpertProfileSubmit = async (formData: any, finish?: () => void) => {
    if (!user) return;

    try {
      // Parse array data from comma-separated strings
      const qualifications = formData.qualifications.split(",").map((s: string) => s.trim()).filter(Boolean);
      const sportsExpertise = formData.sportsExpertise.split(",").map((s: string) => s.trim()).filter(Boolean);
      const certifications = formData.certifications.split(",").map((s: string) => s.trim()).filter(Boolean);
      const preferredTrainingType = formData.preferredTrainingType.split(",").map((s: string) => s.trim()).filter(Boolean);
      const availability = formData.availability.split(",").map((s: string) => s.trim()).filter(Boolean);

      const { error: expertError } = await supabase
        .from("experts")
        .upsert({
          id: user.id,
          specialization: formData.specialization,
          years_experience: parseInt(formData.yearsExperience),
          qualifications: qualifications,
          sports_expertise: sportsExpertise,
          certifications: certifications,
          preferred_training_type: preferredTrainingType,
          availability: availability,
        });

      if (expertError) throw expertError;

      // Update local state with properly typed data
      const updatedExpertProfile: ExtendedExpert = {
        ...(expertProfile || {
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }),
        id: user.id,
        specialization: formData.specialization,
        years_experience: parseInt(formData.yearsExperience),
        qualifications: qualifications,
        sports_expertise: sportsExpertise,
        certifications: certifications,
        preferred_training_type: preferredTrainingType,
        availability: availability,
        rating: expertProfile?.rating || null,
        updated_at: new Date().toISOString(),
      } as ExtendedExpert;

      setExpertProfile(updatedExpertProfile);

      toast({
        title: "Expert profile updated successfully",
        description: "Your expert information has been updated",
      });

      navigate("/dashboard");
      if (finish) finish();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to update expert profile",
        description: error.message,
      });
      if (finish) finish();
    }
  };

  return handleExpertProfileSubmit;
}
