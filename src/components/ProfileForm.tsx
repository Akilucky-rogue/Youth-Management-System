
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { BasicProfileForm } from "./profile/BasicProfileForm";
import { YouthAthleteForm } from "./profile/YouthAthleteForm";
import { ExpertProfileForm } from "./profile/ExpertProfileForm";

const ProfileForm = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [athleteProfile, setAthleteProfile] = useState(null);
  const [expertProfile, setExpertProfile] = useState(null);

  // Fetch user-specific profiles when component mounts
  useEffect(() => {
    const fetchSpecificProfiles = async () => {
      if (!user || !profile) return;
      
      try {
        if (profile.user_type === "youth") {
          const { data, error } = await supabase
            .from("youth_athletes")
            .select()
            .eq("id", user.id)
            .single();
            
          if (!error) {
            setAthleteProfile(data);
          }
        } else if (profile.user_type === "expert") {
          const { data, error } = await supabase
            .from("experts")
            .select()
            .eq("id", user.id)
            .single();
            
          if (!error) {
            setExpertProfile(data);
          }
        }
      } catch (error) {
        console.error("Error fetching user specific profile:", error);
      }
    };

    fetchSpecificProfiles();
  }, [user, profile]);

  const onSubmit = async (formData: any) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Update basic profile information
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

      // Handle user type specific data
      if (profile?.user_type === "youth") {
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
            secondary_sports: formData.secondarySports.split(",").map((s: string) => s.trim()),
            goals: formData.goals.split(",").map((s: string) => s.trim()),
            training_availability: formData.trainingAvailability.split(",").map((s: string) => s.trim()),
          });

        if (youthError) throw youthError;
      } else if (profile?.user_type === "expert") {
        const { error: expertError } = await supabase
          .from("experts")
          .upsert({
            id: user.id,
            specialization: formData.specialization,
            years_experience: parseInt(formData.yearsExperience),
            qualifications: formData.qualifications.split(",").map((s: string) => s.trim()),
            sports_expertise: formData.sportsExpertise.split(",").map((s: string) => s.trim()),
            certifications: formData.certifications.split(",").map((s: string) => s.trim()),
            preferred_training_type: formData.preferredTrainingType.split(",").map((s: string) => s.trim()),
            availability: formData.availability.split(",").map((s: string) => s.trim()),
          });

        if (expertError) throw expertError;
      }

      await refreshProfile();

      toast({
        title: "Profile updated successfully",
        description: "Your profile has been updated",
      });

      navigate("/dashboard");
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

  if (!user || !profile) return null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
        <BasicProfileForm profile={profile} onSubmit={onSubmit} />
      </div>
      
      {profile.user_type === "youth" && (
        <div className="pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Athlete Information</h2>
          <YouthAthleteForm athleteProfile={athleteProfile} onSubmit={onSubmit} />
        </div>
      )}

      {profile.user_type === "expert" && (
        <div className="pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Expert Information</h2>
          <ExpertProfileForm expertProfile={expertProfile} onSubmit={onSubmit} />
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
          Cancel
        </Button>
        <Button 
          type="button" 
          disabled={isSubmitting}
          onClick={() => {
            const formElement = document.querySelector("form");
            if (formElement) {
              const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
              formElement.dispatchEvent(submitEvent);
            }
          }}
        >
          {isSubmitting ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;
