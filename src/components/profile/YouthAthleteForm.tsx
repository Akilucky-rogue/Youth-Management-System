
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Tables } from "@/integrations/supabase/types";

// Define extended youth athlete type with the new fields
interface ExtendedYouthAthlete extends Tables<"youth_athletes"> {
  school?: string;
  grade?: string;
  secondary_sports?: string[];
  goals?: string[];
  training_availability?: string[];
}

const youthProfileSchema = z.object({
  age: z.string().min(1, { message: "Age is required" }),
  primarySport: z.string().min(1, { message: "Primary sport is required" }),
  experienceYears: z.string().min(1, { message: "Years of experience is required" }),
  currentLevel: z.string().optional(),
  school: z.string().optional(),
  grade: z.string().optional(),
  secondarySports: z.string().optional(),
  goals: z.string().optional(),
  trainingAvailability: z.string().optional(),
});

type YouthProfileFormValues = z.infer<typeof youthProfileSchema>;

interface YouthAthleteFormProps {
  athleteProfile: Tables<"youth_athletes"> | null;
  onSubmit: (data: YouthProfileFormValues) => void;
}

export const YouthAthleteForm = ({ athleteProfile, onSubmit }: YouthAthleteFormProps) => {
  // Cast athlete profile to our extended type to access the new fields
  const extendedAthleteProfile = athleteProfile as ExtendedYouthAthlete | null;
  
  const form = useForm<YouthProfileFormValues>({
    resolver: zodResolver(youthProfileSchema),
    defaultValues: {
      age: athleteProfile?.age?.toString() || "",
      primarySport: athleteProfile?.primary_sport || "",
      experienceYears: athleteProfile?.experience_years?.toString() || "0",
      currentLevel: athleteProfile?.current_level || "",
      school: extendedAthleteProfile?.school || "",
      grade: extendedAthleteProfile?.grade || "",
      secondarySports: extendedAthleteProfile?.secondary_sports?.join(", ") || "",
      goals: extendedAthleteProfile?.goals?.join(", ") || "",
      trainingAvailability: extendedAthleteProfile?.training_availability?.join(", ") || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="primarySport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Sport</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Basketball" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experienceYears"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Level</FormLabel>
              <FormControl>
                <Input placeholder="e.g., High School Varsity" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="school"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School</FormLabel>
              <FormControl>
                <Input placeholder="Your school name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <FormControl>
                <Input placeholder="Your current grade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondarySports"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Sports (comma-separated)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Swimming, Track and Field"
                  className="resize-none h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Athletic Goals (comma-separated)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Make varsity team, Earn college scholarship"
                  className="resize-none h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trainingAvailability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Training Availability (comma-separated)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Monday evenings, Saturday mornings"
                  className="resize-none h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
