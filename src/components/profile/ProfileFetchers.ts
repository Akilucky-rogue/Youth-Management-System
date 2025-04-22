
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useAuth } from "@/providers/AuthProvider";

type BaseProfile = Tables<"profiles">;
type BaseYouthAthlete = Tables<"youth_athletes">;
type BaseExpert = Tables<"experts">;

export interface ExtendedProfile extends Omit<BaseProfile, "phone_text" | "preferred_contact_method" | "time_zone"> {
  phone_text?: string | null;
  preferred_contact_method?: "email" | "phone" | null;
  time_zone?: string | null;
}

export interface ExtendedYouthAthlete extends Omit<BaseYouthAthlete, "school" | "grade" | "secondary_sports" | "goals" | "training_availability" | "achievements" | "current_level"> {
  school?: string | null;
  grade?: string | null;
  secondary_sports?: string[] | null;
  goals?: string[] | null;
  training_availability?: string[] | null;
  achievements?: string[] | null;
  current_level?: string | null;
}

export interface ExtendedExpert extends Omit<BaseExpert, "sports_expertise" | "certifications" | "preferred_training_type" | "availability" | "qualifications" | "rating"> {
  sports_expertise?: string[] | null;
  certifications?: string[] | null;
  preferred_training_type?: string[] | null;
  availability?: string[] | null;
  qualifications?: string[] | null;
  rating?: number | null;
}

export function useProfilesFetcher() {
  const { user, profile } = useAuth();
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
          setExtendedProfile(profileData as ExtendedProfile);
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
            setAthleteProfile(data as ExtendedYouthAthlete);
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
            setExpertProfile(data as ExtendedExpert);
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

  return { extendedProfile, athleteProfile, expertProfile, setExtendedProfile, setAthleteProfile, setExpertProfile };
}
