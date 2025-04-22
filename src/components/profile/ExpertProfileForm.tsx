
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

const expertProfileSchema = z.object({
  specialization: z.string().min(1, { message: "Specialization is required" }),
  yearsExperience: z.string().min(1, { message: "Years of experience is required" }),
  qualifications: z.string().optional(),
  sportsExpertise: z.string().optional(),
  certifications: z.string().optional(),
  preferredTrainingType: z.string().optional(),
  availability: z.string().optional(),
});

type ExpertProfileFormValues = z.infer<typeof expertProfileSchema>;

interface ExpertProfileFormProps {
  expertProfile: Tables<"experts"> | null;
  onSubmit: (data: ExpertProfileFormValues) => void;
}

export const ExpertProfileForm = ({ expertProfile, onSubmit }: ExpertProfileFormProps) => {
  const form = useForm<ExpertProfileFormValues>({
    resolver: zodResolver(expertProfileSchema),
    defaultValues: {
      specialization: expertProfile?.specialization || "",
      yearsExperience: expertProfile?.years_experience?.toString() || "",
      qualifications: expertProfile?.qualifications?.join(", ") || "",
      sportsExpertise: expertProfile?.sports_expertise?.join(", ") || "",
      certifications: expertProfile?.certifications?.join(", ") || "",
      preferredTrainingType: expertProfile?.preferred_training_type?.join(", ") || "",
      availability: expertProfile?.availability?.join(", ") || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialization</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Basketball Coach" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearsExperience"
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
          name="sportsExpertise"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sports Expertise (comma-separated)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Basketball, Soccer, Swimming"
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
          name="certifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Certifications (comma-separated)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., USA Basketball Level 1, CPR Certified"
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
          name="preferredTrainingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Training Types (comma-separated)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., One-on-one, Group sessions, Online coaching"
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
          name="availability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Availability (comma-separated)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Weekday evenings, Weekend mornings"
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
