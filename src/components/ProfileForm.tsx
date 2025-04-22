import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { BasicProfileForm } from "./profile/BasicProfileForm";
import { YouthAthleteForm } from "./profile/YouthAthleteForm";
import { ExpertProfileForm } from "./profile/ExpertProfileForm";

interface ExtendedProfile extends Tables<"profiles"> {
  phone_text?: string;
  preferred_contact_method?: "email" | "phone";
  time_zone?: string;
}

interface ExtendedYouthAthlete extends Tables<"youth_athletes"> {
  school?: string;
  grade?: string;
  secondary_sports?: string[];
  goals?: string[];
  training_availability?: string[];
}

interface ExtendedExpert extends Tables<"experts"> {
  sports_expertise?: string[];
  certifications?: string[];
  preferred_training_type?: string[];
  availability?: string[];
}

import { Tables } from "@/integrations/supabase/types";

const ProfileForm = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [athleteProfile, setAthleteProfile] = useState<ExtendedYouthAthlete | null>(null);
  const [expertProfile, setExpertProfile] = useState<ExtendedExpert | null>(null);
  const [extendedProfile, setExtendedProfile] = useState<ExtendedProfile | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!user || !profile) return;

      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select(
            `
            id,
            first_name,
            last_name,
            bio,
            phone_text,
            preferred_contact_method,
            time_zone,
            avatar_url,
            created_at,
            updated_at,
            user_type
            `
          )
          .eq("id", user.id)
          .maybeSingle();

        if (!profileError && profileData) {
          setExtendedProfile(profileData);
        } else {
          setExtendedProfile(null);
        }

        if (profile.user_type === "youth") {
          const { data, error } = await supabase
            .from("youth_athletes")
            .select(
              `
              id,
              age,
              primary_sport,
              experience_years,
              current_level,
              school,
              grade,
              secondary_sports,
              goals,
              training_availability,
              created_at,
              updated_at,
              achievements
              `
            )
            .eq("id", user.id)
            .maybeSingle();

          if (!error && data) {
            setAthleteProfile(data);
          } else {
            setAthleteProfile(null);
          }
        } else if (profile.user_type === "expert") {
          const { data, error } = await supabase
            .from("experts")
            .select(
              `
              id,
              specialization,
              qualifications,
              years_experience,
              sports_expertise,
              certifications,
              preferred_training_type,
              availability,
              created_at,
              updated_at,
              rating
              `
            )
            .eq("id", user.id)
            .maybeSingle();

          if (!error && data) {
            setExpertProfile(data);
          } else {
            setExpertProfile(null);
          }
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, [user, profile]);

  const handleBasicProfileSubmit = async (formData: any) => {
    if (!user) return;
    
    setIsSubmitting(true);
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
      
      setExtendedProfile(prev => {
        if (!prev) return null;
        return {
          ...prev,
          first_name: formData.firstName,
          last_name: formData.lastName,
          bio: formData.bio,
          phone_text: formData.phoneText,
          preferred_contact_method: formData.preferredContactMethod,
          time_zone: formData.timeZone,
        };
      });

      toast({
        title: "Profile updated successfully",
        description: "Your basic information has been updated",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to update profile",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleYouthAthleteSubmit = async (formData: any) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const { error: youthError } = await supabase
        .from("youth_athletes")
        .upsert({
          id: user.id,
          age: parseInt(formData.age),
          primary_sport: formData.primarySport,
          experience_years: parseInt(formData.experienceYears) || 0,
          current_level: formData.currentLevel,
          school: formData.school,
          grade: formData.grade,
          secondary_sports: formData.secondarySports.split(",").map((s: string) => s.trim()).filter(Boolean),
          goals: formData.goals.split(",").map((s: string) => s.trim()).filter(Boolean),
          training_availability: formData.trainingAvailability.split(",").map((s: string) => s.trim()).filter(Boolean),
        });

      if (youthError) throw youthError;
      
      const updatedAthleteProfile = {
        ...(athleteProfile || {}),
        age: parseInt(formData.age),
        primary_sport: formData.primarySport,
        experience_years: parseInt(formData.experienceYears) || 0,
        current_level: formData.currentLevel,
        school: formData.school,
        grade: formData.grade,
        secondary_sports: formData.secondarySports.split(",").map((s: string) => s.trim()).filter(Boolean),
        goals: formData.goals.split(",").map((s: string) => s.trim()).filter(Boolean),
        training_availability: formData.trainingAvailability.split(",").map((s: string) => s.trim()).filter(Boolean),
      } as ExtendedYouthAthlete;
      
      setAthleteProfile(updatedAthleteProfile);

      toast({
        title: "Athlete profile updated successfully",
        description: "Your athlete information has been updated",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to update athlete profile",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExpertProfileSubmit = async (formData: any) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const { error: expertError } = await supabase
        .from("experts")
        .upsert({
          id: user.id,
          specialization: formData.specialization,
          years_experience: parseInt(formData.yearsExperience),
          qualifications: formData.qualifications.split(",").map((s: string) => s.trim()).filter(Boolean),
          sports_expertise: formData.sportsExpertise.split(",").map((s: string) => s.trim()).filter(Boolean),
          certifications: formData.certifications.split(",").map((s: string) => s.trim()).filter(Boolean),
          preferred_training_type: formData.preferredTrainingType.split(",").map((s: string) => s.trim()).filter(Boolean),
          availability: formData.availability.split(",").map((s: string) => s.trim()).filter(Boolean),
        });

      if (expertError) throw expertError;
      
      const updatedExpertProfile = {
        ...(expertProfile || {}),
        specialization: formData.specialization,
        years_experience: parseInt(formData.yearsExperience),
        qualifications: formData.qualifications.split(",").map((s: string) => s.trim()).filter(Boolean),
        sports_expertise: formData.sportsExpertise.split(",").map((s: string) => s.trim()).filter(Boolean),
        certifications: formData.certifications.split(",").map((s: string) => s.trim()).filter(Boolean),
        preferred_training_type: formData.preferredTrainingType.split(",").map((s: string) => s.trim()).filter(Boolean),
        availability: formData.availability.split(",").map((s: string) => s.trim()).filter(Boolean),
      } as ExtendedExpert;
      
      setExpertProfile(updatedExpertProfile);

      toast({
        title: "Expert profile updated successfully",
        description: "Your expert information has been updated",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to update expert profile",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
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
