
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useAuth } from "@/providers/AuthProvider";

// Define base types from database schema
type BaseProfile = Tables<"profiles">;
type BaseYouthAthlete = Tables<"youth_athletes">;
type BaseExpert = Tables<"experts">;

// Define extended interfaces with proper optional types
export interface ExtendedProfile {
  id: string;
  first_name: string;
  last_name: string;
  user_type: string;
  bio: string | null;
  phone_text: string | null;
  preferred_contact_method: "email" | "phone" | null;
  time_zone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExtendedYouthAthlete {
  id: string;
  age: number;
  primary_sport: string;
  experience_years: number;
  current_level: string | null;
  school: string | null;
  grade: string | null;
  secondary_sports: string[] | null;
  goals: string[] | null;
  training_availability: string[] | null;
  achievements: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface ExtendedExpert {
  id: string;
  specialization: string;
  years_experience: number;
  sports_expertise: string[] | null;
  certifications: string[] | null;
  preferred_training_type: string[] | null;
  availability: string[] | null;
  qualifications: string[] | null;
  rating: number | null;
  created_at: string;
  updated_at: string;
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
        // Fetch basic profile data
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
          // Handle potentially incorrect preferred_contact_method value
          const preferred = profileData.preferred_contact_method;
          const safePreferred = (preferred === "email" || preferred === "phone") ? preferred : null;
          
          setExtendedProfile({
            ...profileData,
            preferred_contact_method: safePreferred
          } as ExtendedProfile);
        } else {
          console.error("Error fetching profile:", profileError);
          setExtendedProfile(null);
        }

        // Fetch youth athlete data if applicable
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
            console.error("Error fetching youth athlete profile:", error);
            setAthleteProfile(null);
          }
        } 
        // Fetch expert data if applicable
        else if (profile.user_type === "expert") {
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
            console.error("Error fetching expert profile:", error);
            setExpertProfile(null);
          }
        }
      } catch (error) {
        console.error("Error in fetchProfiles:", error);
      }
    };

    fetchProfiles();
  }, [user, profile]);

  return { 
    extendedProfile, 
    athleteProfile, 
    expertProfile, 
    setExtendedProfile, 
    setAthleteProfile, 
    setExpertProfile 
  };
}
