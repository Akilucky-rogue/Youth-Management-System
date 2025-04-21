
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/providers/AuthProvider";

// Define form schema for basic profile
const profileFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Additional form fields for youth athletes
const youthFormSchema = z.object({
  age: z
    .string()
    .min(1, { message: "Age is required" })
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
      message: "Age must be a positive number",
    }),
  primarySport: z.string().min(1, { message: "Primary sport is required" }),
  experienceYears: z
    .string()
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
      message: "Experience must be a valid number",
    }),
  currentLevel: z.string().optional(),
});

type YouthFormValues = z.infer<typeof youthFormSchema>;

// Additional form fields for experts
const expertFormSchema = z.object({
  specialization: z.string().min(1, { message: "Specialization is required" }),
  yearsExperience: z
    .string()
    .min(1, { message: "Years of experience is required" })
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
      message: "Years of experience must be a positive number",
    }),
  qualifications: z.string().optional(),
});

type ExpertFormValues = z.infer<typeof expertFormSchema>;

const ProfileForm = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create form for basic profile
  const basicForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: profile?.first_name || "",
      lastName: profile?.last_name || "",
      bio: profile?.bio || "",
    },
  });

  // Create form for youth-specific fields
  const youthForm = useForm<YouthFormValues>({
    resolver: zodResolver(youthFormSchema),
    defaultValues: {
      age: "",
      primarySport: "",
      experienceYears: "0",
      currentLevel: "",
    },
  });

  // Create form for expert-specific fields
  const expertForm = useForm<ExpertFormValues>({
    resolver: zodResolver(expertFormSchema),
    defaultValues: {
      specialization: "",
      yearsExperience: "",
      qualifications: "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Update basic profile information
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          bio: data.bio,
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Handle user type specific data
      if (profile?.user_type === "youth") {
        const youthData = youthForm.getValues();
        const { error: youthError } = await supabase
          .from("youth_athletes")
          .upsert({
            id: user.id,
            age: parseInt(youthData.age),
            primary_sport: youthData.primarySport,
            experience_years: parseInt(youthData.experienceYears) || 0,
            current_level: youthData.currentLevel || null,
          });

        if (youthError) throw youthError;
      } else if (profile?.user_type === "expert") {
        const expertData = expertForm.getValues();
        const qualificationsArray = expertData.qualifications
          ? expertData.qualifications.split(',').map(item => item.trim())
          : [];

        const { error: expertError } = await supabase
          .from("experts")
          .upsert({
            id: user.id,
            specialization: expertData.specialization,
            years_experience: parseInt(expertData.yearsExperience),
            qualifications: qualificationsArray.length > 0 ? qualificationsArray : null,
          });

        if (expertError) throw expertError;
      }

      // Refresh profile data
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
        <Form {...basicForm}>
          <form onSubmit={basicForm.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={basicForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={basicForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={basicForm.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself"
                      className="resize-none h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Conditional form fields based on user type */}
            {profile.user_type === "youth" && (
              <div className="pt-6 border-t">
                <h2 className="text-xl font-semibold mb-4">Athlete Information</h2>
                <div className="space-y-4">
                  <FormField
                    control={youthForm.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={youthForm.control}
                    name="primarySport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Sport</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Basketball, Soccer, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={youthForm.control}
                    name="experienceYears"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={youthForm.control}
                    name="currentLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Level</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Beginner, High School, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {profile.user_type === "expert" && (
              <div className="pt-6 border-t">
                <h2 className="text-xl font-semibold mb-4">Expert Information</h2>
                <div className="space-y-4">
                  <FormField
                    control={expertForm.control}
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialization</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Basketball Coach, Soccer Trainer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={expertForm.control}
                    name="yearsExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={expertForm.control}
                    name="qualifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Qualifications</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List your qualifications (comma separated)"
                            className="resize-none h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileForm;
