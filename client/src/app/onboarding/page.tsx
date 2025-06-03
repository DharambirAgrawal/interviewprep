"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { handleOnboardingAction } from "./actions";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  resume: z.custom<FileList>(
    (val) => {
      return (
        typeof FileList !== "undefined" &&
        val instanceof FileList &&
        val.length > 0
      );
    },
    {
      message: "Resume is required",
    }
  ),
  targetIndustry: z.string().min(1, {
    message: "Please select your target industry.",
  }),
  jobTitle: z.string().min(1, {
    message: "Please enter your current job title.",
  }),

  interviewDifficulty: z.string().min(1, {
    message: "Please select your preferred difficulty level.",
  }),
  additionalNotes: z.string().max(500).optional(),

  // ✅ New fields
  interviewType: z.string().min(1, {
    message: "Select at least one interview type.",
  }),
  interviewStyle: z.string().min(1, {
    message: "Please select your preferred interview style.",
  }),
  primarySkills: z.string().min(1, {
    message: "Please enter at least one primary skill.",
  }),
  weakAreas: z.string().optional(),
  interviewComfortLevel: z.string().refine(
    (val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 1 && num <= 10;
    },
    { message: "Comfort level must be between 1 and 10." }
  ),
});

export default function OnboardingPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      resume: undefined,
      targetIndustry: "",
      jobTitle: "",
      interviewDifficulty: "",
      additionalNotes: "",
      interviewType: "",
      interviewStyle: "",
      primarySkills: "",
      weakAreas: "",
      interviewComfortLevel: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const data = await handleOnboardingAction(values);

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      //   toast({
      //     title: "Onboarding Complete!",
      //     description: "Your information has been submitted successfully.",
      //   });

      // Redirect to next page or dashboard
      // router.push("/dashboard")
    } catch (error) {
      //   toast({
      //     variant: "destructive",
      //     title: "Submission failed",
      //     description: "There was a problem with your submission.",
      //   });
    } finally {
      setIsSubmitting(false);
    }
  }
  // console.log(form.formState.errors);

  return (
    <div className="container mx-auto py-20">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Interview Preparation Onboarding
          </CardTitle>
          <CardDescription className="text-center">
            Please provide your information to help us tailor the perfect
            interview experience for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="professional">
                    Professional Details
                  </TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-6 pt-4">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
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
                            <Input placeholder="doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="resume"
                      render={({
                        field: { value, onChange, ...fieldProps },
                      }) => (
                        <FormItem>
                          <FormLabel>Resume/CV</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => onChange(e.target.files)}
                              {...fieldProps}
                            />
                          </FormControl>
                          <FormDescription>
                            Upload your resume (PDF, DOC, or DOCX format)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {form.getValues("resume") &&
                      form.getValues("resume").length > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Selected: {form.getValues("resume")[0].name}
                        </p>
                      )}

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={() => setActiveTab("professional")}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="professional" className="space-y-6 pt-4">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="targetIndustry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Industry</FormLabel>
                          <FormControl>
                            <Input placeholder="Tech" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Role/Title You're Targeting</FormLabel>
                          <FormControl>
                            <Input placeholder="Software Engineer" {...field} />
                          </FormControl>
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
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setActiveTab("preferences")}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6 pt-4">
                  <div className="space-y-4">
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
                              <SelectItem value="entry">Entry Level</SelectItem>
                              <SelectItem value="intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                              <SelectItem value="expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            This helps us adjust the complexity of interview
                            questions
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="interviewType" // Use singular form, since only one type is allowed
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Type of Interview You Want to Practice
                          </FormLabel>
                          <FormControl>
                            <div className="flex flex-col space-y-2">
                              {[
                                "behavioral",
                                "technical",
                                "systemDesign",
                                "caseStudy",
                                "productStrategy",
                                "whiteboardCoding",
                                "hrCultureFit",
                              ].map((type) => (
                                <label
                                  key={type}
                                  className="flex items-center space-x-2"
                                >
                                  <input
                                    type="radio"
                                    value={type}
                                    checked={field.value === type}
                                    onChange={() => field.onChange(type)}
                                  />
                                  <span className="text-sm">
                                    {type === "behavioral"
                                      ? "Behavioral"
                                      : type === "technical"
                                      ? "Technical"
                                      : type === "systemDesign"
                                      ? "System Design"
                                      : type === "caseStudy"
                                      ? "Case Study"
                                      : type === "productStrategy"
                                      ? "Product/Strategy"
                                      : type === "whiteboardCoding"
                                      ? "Whiteboard Coding"
                                      : "HR / Culture Fit"}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Choose the type you'd like to practice.
                          </FormDescription>
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
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a style" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mock">
                                  1-on-1 Mock Interview
                                </SelectItem>
                                <SelectItem value="timed">Timed Q&A</SelectItem>
                                <SelectItem value="chat">Chat-based</SelectItem>
                                <SelectItem value="voice">
                                  Voice-based
                                </SelectItem>
                                <SelectItem value="star">
                                  STAR Format (Behavioral)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="primarySkills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Primary Skills You Want to Be Quizzed On
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="E.g. Python, SQL, Communication"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Separate multiple skills with commas
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
                          <FormLabel>
                            Weak Areas to Focus On (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Mention specific areas where you need more practice"
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="interviewComfortLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Comfort Level (1–10) with Interviews
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="10"
                              placeholder="Rate from 1 (low) to 10 (high)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Anything else you'd like us to know about your interview preferences or requirements"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveTab("professional")}
                      >
                        Back
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Complete Onboarding"}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Your information helps us create a personalized interview
            experience.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
