"use client";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  onboardingSchema,
  type OnboardingFormValues,
} from "@/lib/schemas/auth";
import {
  INDUSTRIES,
  DIFFICULTY_LEVELS,
  INTERVIEW_TYPES,
  INTERVIEW_STYLES,
  COMMON_SKILLS,
} from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      resume: undefined,
      targetIndustry: "",
      jobTitle: "",
      interviewDifficulty: "",
      interviewType: "",
      interviewStyle: "",
      primarySkills: "",
      weakAreas: "",
      interviewComfortLevel: "",
      additionalNotes: "",
    },
  });

  async function onSubmit(values: OnboardingFormValues) {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to save onboarding data
      console.log("Onboarding values:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to interview page after successful onboarding
      router.push("/dashboard/interview");
    } catch (error) {
      console.error("Onboarding error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const canProceedToNext = (currentTab: string) => {
    const values = form.getValues();
    switch (currentTab) {
      case "personal":
        return (
          values.firstName &&
          values.lastName &&
          values.resume &&
          values.targetIndustry &&
          values.jobTitle
        );
      case "preferences":
        return (
          values.interviewDifficulty &&
          values.interviewType &&
          values.interviewStyle
        );
      case "skills":
        return values.primarySkills && values.interviewComfortLevel;
      default:
        return true;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Complete Your Setup
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Help us personalize your interview preparation experience by providing
          some basic information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Interview Preparation Setup
          </CardTitle>
          <CardDescription className="text-center">
            This information will help us create tailored interview experiences
            for you.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger
                    value="preferences"
                    disabled={!canProceedToNext("personal")}
                  >
                    Preferences
                  </TabsTrigger>
                  <TabsTrigger
                    value="skills"
                    disabled={!canProceedToNext("preferences")}
                  >
                    Skills
                  </TabsTrigger>
                  <TabsTrigger
                    value="review"
                    disabled={!canProceedToNext("skills")}
                  >
                    Review
                  </TabsTrigger>
                </TabsList>

                {/* Personal Information Tab */}
                <TabsContent value="personal" className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your first name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your last name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="resume"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>Resume Upload</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => onChange(e.target.files)}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Upload your resume (PDF, DOC, or DOCX format)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetIndustry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Industry</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your target industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {INDUSTRIES.map((industry) => (
                              <SelectItem
                                key={industry.value}
                                value={industry.value}
                              >
                                {industry.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current/Target Job Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Software Engineer, Product Manager"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => setActiveTab("preferences")}
                      disabled={!canProceedToNext("personal")}
                    >
                      Next: Preferences
                    </Button>
                  </div>
                </TabsContent>

                {/* Interview Preferences Tab */}
                <TabsContent value="preferences" className="space-y-4 mt-6">
                  <FormField
                    control={form.control}
                    name="interviewDifficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Interview Difficulty</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {DIFFICULTY_LEVELS.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interviewType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Interview Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select interview type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {INTERVIEW_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interviewStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Interview Style</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select interview style" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {INTERVIEW_STYLES.map((style) => (
                              <SelectItem key={style.value} value={style.value}>
                                {style.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("personal")}
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setActiveTab("skills")}
                      disabled={!canProceedToNext("preferences")}
                    >
                      Next: Skills
                    </Button>
                  </div>
                </TabsContent>

                {/* Skills Assessment Tab */}
                <TabsContent value="skills" className="space-y-4 mt-6">
                  <FormField
                    control={form.control}
                    name="primarySkills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Skills</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List your key skills (e.g., JavaScript, React, Node.js, System Design)"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          List your main technical and professional skills,
                          separated by commas
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weakAreas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Areas for Improvement (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Areas you'd like to focus on improving"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Help us focus on areas where you want to improve
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interviewComfortLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interview Comfort Level (1-10)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="10"
                            placeholder="Rate your comfort level from 1 to 10"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          1 = Very nervous, 10 = Very confident
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("preferences")}
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setActiveTab("review")}
                      disabled={!canProceedToNext("skills")}
                    >
                      Review & Submit
                    </Button>
                  </div>
                </TabsContent>

                {/* Review Tab */}
                <TabsContent value="review" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Review Your Information
                    </h3>

                    <FormField
                      control={form.control}
                      name="additionalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any additional information you'd like to share"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Share any specific goals or requirements for your
                            interview preparation
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                      <p>
                        <strong>Name:</strong> {form.watch("firstName")}{" "}
                        {form.watch("lastName")}
                      </p>
                      <p>
                        <strong>Job Title:</strong> {form.watch("jobTitle")}
                      </p>
                      <p>
                        <strong>Industry:</strong>{" "}
                        {form.watch("targetIndustry")}
                      </p>
                      <p>
                        <strong>Interview Type:</strong>{" "}
                        {form.watch("interviewType")}
                      </p>
                      <p>
                        <strong>Difficulty:</strong>{" "}
                        {form.watch("interviewDifficulty")}
                      </p>
                      <p>
                        <strong>Comfort Level:</strong>{" "}
                        {form.watch("interviewComfortLevel")}/10
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("skills")}
                    >
                      Previous
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700"
                    >
                      {isSubmitting ? "Setting up..." : "Complete Setup"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export const metadata: Metadata = buildPageMetadata({
  title: "Onboarding",
  description: "Tell us about your background to personalize your preparation.",
  alternates: { canonical: "/dashboard/onboarding" },
  robots: { index: false, follow: true },
});
