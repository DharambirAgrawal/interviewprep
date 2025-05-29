"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
// import { toast } from "@/components/ui/use-toast";
// import { Toaster } from "@/components/ui/toaster";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  resume: z.instanceof(FileList).refine((files) => {
    return files.length > 0;
  }, "Resume is required"),
  yearsOfExperience: z.string().min(1, {
    message: "Please select your years of experience.",
  }),
  fieldType: z.string().min(1, {
    message: "Please select your field.",
  }),
  preferredRole: z.string().min(1, {
    message: "Please enter your preferred role.",
  }),
  interviewDifficulty: z.string().min(1, {
    message: "Please select your preferred difficulty level.",
  }),
  specificTechnologies: z.string(),
  availabilityTimeFrame: z.string().min(1, {
    message: "Please select your availability.",
  }),
  portfolioLink: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  linkedinProfile: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  githubProfile: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  additionalNotes: z.string().max(500).optional(),
  remotePreference: z.boolean(),
});

export default function OnboardingPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      yearsOfExperience: "",
      fieldType: "",
      preferredRole: "",
      interviewDifficulty: "",
      specificTechnologies: "",
      availabilityTimeFrame: "",
      portfolioLink: "",
      linkedinProfile: "",
      githubProfile: "",
      additionalNotes: "",
      remotePreference: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Normally you would make an API call here
      console.log(values);

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

  return (
    <div className="container mx-auto py-10">
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
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john.doe@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="+1 (555) 123-4567"
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
                      name="yearsOfExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0-1">0-1 years</SelectItem>
                              <SelectItem value="1-3">1-3 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="5-10">5-10 years</SelectItem>
                              <SelectItem value="10+">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fieldType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Field</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your field" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="frontend">
                                  Frontend Development
                                </SelectItem>
                                <SelectItem value="backend">
                                  Backend Development
                                </SelectItem>
                                <SelectItem value="fullstack">
                                  Full Stack Development
                                </SelectItem>
                                <SelectItem value="mobile">
                                  Mobile Development
                                </SelectItem>
                                <SelectItem value="devops">DevOps</SelectItem>
                                <SelectItem value="data">
                                  Data Science
                                </SelectItem>
                                <SelectItem value="ml">
                                  Machine Learning
                                </SelectItem>
                                <SelectItem value="cloud">
                                  Cloud Engineering
                                </SelectItem>
                                <SelectItem value="security">
                                  Security
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredRole"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Role</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Senior React Developer"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="specificTechnologies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technologies/Skills</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List specific technologies and skills you're proficient in (e.g., React, Node.js, Python, AWS)"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Separate multiple technologies with commas
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="portfolioLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Portfolio URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://yourportfolio.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="linkedinProfile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn Profile</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://linkedin.com/in/username"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="githubProfile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GitHub Profile</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://github.com/username"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

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
                      name="availabilityTimeFrame"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Availability Time Frame</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your availability" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="immediate">
                                Immediately
                              </SelectItem>
                              <SelectItem value="1week">
                                Within 1 week
                              </SelectItem>
                              <SelectItem value="2weeks">
                                Within 2 weeks
                              </SelectItem>
                              <SelectItem value="1month">
                                Within 1 month
                              </SelectItem>
                              <SelectItem value="3months">
                                Within 3 months
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            When would you like to start practicing interviews?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="remotePreference"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Interested in remote positions
                            </FormLabel>
                            <FormDescription>
                              Check this if you're looking for remote work
                              opportunities
                            </FormDescription>
                          </div>
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
