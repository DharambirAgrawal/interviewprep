"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Shield, Palette, Upload, X } from "lucide-react";
import { authService } from "../../../lib/auth/authService";
import {
  INDUSTRIES,
  DIFFICULTY_LEVELS,
  INTERVIEW_TYPES,
  INTERVIEW_STYLES,
} from "@/lib/constants/index";
import {
  getUserProfile,
  updateProfile,
  updateBasicInfo,
  uploadFiles,
  type ProfileData,
} from "@/lib/services/profileService";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  bio: z.string().max(500).optional(),
  resume: z.any().optional(),
  profileImage: z.any().optional(),
  targetIndustry: z.string().optional(),
  interviewDifficulty: z.string().optional(),
  interviewType: z.string().optional(),
  interviewStyle: z.string().optional(),
  primarySkills: z.string().optional(),
  weakAreas: z.string().optional(),
  interviewComfortLevel: z.string().optional(),
});

const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  weeklyReports: z.boolean(),
  interviewReminders: z.boolean(),
});

const preferencesSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  language: z.string(),
  timezone: z.string(),
  interviewDifficulty: z.string(),
});

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [resumeUrl, setResumeUrl] = useState<string | null>(
    "http://localhost:3000/dashboard/settings"
  ); // You can set this from user data
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Get tab from URL if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (
        tabParam &&
        ["profile", "notifications", "preferences", "security"].includes(
          tabParam
        )
      ) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      company: "",
      bio: "",
      resume: null,
      profileImage: null,
      targetIndustry: "",
      interviewDifficulty: "",
      interviewType: "",
      interviewStyle: "",
      primarySkills: "",
      weakAreas: "",
      interviewComfortLevel: "",
    },
  });

  // Fetch user profile from the server
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);

        const userData = authService.getUser();
        const user = userData ? JSON.parse(userData) : null;
        const userId = user?.id || "";

        // Fetch profile data from API
        const data: ProfileData = await getUserProfile(userId);

        // Set profile image if available
        if (data.profile?.profileImageUrl) {
          setProfileImageUrl(data.profile.profileImageUrl);
        }

        // Set resume URL if available
        if (data.profile?.resumeUrl) {
          setResumeUrl(data.profile.resumeUrl);
        }

        // Update form with fetched data
        profileForm.reset({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          jobTitle: data.profile?.jobTitle || "",
          company: data.profile?.company || "",
          bio: data.profile?.bio || "",
          targetIndustry: data.profile?.targetIndustry || "",
          interviewDifficulty: data.profile?.interviewDifficulty || "",
          interviewType: data.profile?.interviewType || "",
          interviewStyle: data.profile?.interviewStyle || "",
          primarySkills: data.profile?.primarySkills || "",
          weakAreas: data.profile?.weakAreas || "",
          interviewComfortLevel:
            data.profile?.interviewComfortLevel?.toString() || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        // Handle case where user is not authenticated or profile doesn't exist
        if (error instanceof Error && error.message.includes("401")) {
          // Redirect to login if not authenticated
          window.location.href = "/auth/login";
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [profileForm]);

  const notificationForm = useForm({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      weeklyReports: false,
      interviewReminders: true,
    },
  });

  const preferencesForm = useForm<z.infer<typeof preferencesSchema>>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      theme: "system",
      language: "en",
      timezone: "UTC-5",
      interviewDifficulty: "intermediate",
    },
  });

  const onProfileSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      console.log("Profile values are:", values);
      console.log(authService.getUser());

      // First, handle file uploads if any
      let uploadedFileUrls: any = {};

      if (profileImageFile || resumeFile) {
        const filesToUpload: any = {};
        if (profileImageFile) filesToUpload.profileImage = profileImageFile;
        if (resumeFile) filesToUpload.resume = resumeFile;

        const uploadResult = await uploadFiles(filesToUpload);
        uploadedFileUrls = uploadResult.data;
      }

      // Prepare profile data for update
      const profileData = {
        jobTitle: values.jobTitle,
        company: values.company,
        bio: values.bio,
        targetIndustry: values.targetIndustry,
        interviewDifficulty: values.interviewDifficulty,
        interviewType: values.interviewType,
        interviewStyle: values.interviewStyle,
        primarySkills: values.primarySkills,
        weakAreas: values.weakAreas,
        interviewComfortLevel: values.interviewComfortLevel
          ? parseInt(values.interviewComfortLevel)
          : undefined,
        ...(uploadedFileUrls.profileImageUrl && {
          profileImageUrl: uploadedFileUrls.profileImageUrl,
        }),
        ...(uploadedFileUrls.resumeUrl && {
          resumeUrl: uploadedFileUrls.resumeUrl,
        }),
      };

      // Prepare basic info data for update
      const basicInfoData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      };

      // Update basic info and profile data
      await Promise.all([
        updateBasicInfo(basicInfoData),
        updateProfile(profileData),
      ]);

      // Update local state with new file URLs
      if (uploadedFileUrls.profileImageUrl) {
        setProfileImageUrl(uploadedFileUrls.profileImageUrl);
      }
      if (uploadedFileUrls.resumeUrl) {
        setResumeUrl(uploadedFileUrls.resumeUrl);
      }

      // Clear file states
      setProfileImageFile(null);
      setResumeFile(null);

      // Show success message
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onNotificationSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      console.log("Notification values:", values);
      // TODO: Update notifications
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Notification update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onPreferencesSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      console.log("Preferences values:", values);
      // TODO: Update preferences
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Preferences update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and professional details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form
                  onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                  className="space-y-6"
                >
                  {/* Profile Image Upload */}
                  <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0 mb-4">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        {profileImageUrl ? (
                          <AvatarImage src={profileImageUrl} alt="Profile" />
                        ) : (
                          <AvatarFallback className="text-2xl">
                            {profileForm.getValues("firstName").charAt(0)}
                            {profileForm.getValues("lastName").charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      {profileImageUrl && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm"
                          onClick={() => {
                            setProfileImageUrl(null);
                            setProfileImageFile(null);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <FormField
                        control={profileForm.control}
                        name="profileImage"
                        render={({ field: { onChange, value, ...field } }) => (
                          <FormItem>
                            <FormLabel>Profile Picture</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  id="profileImage"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const imageUrl =
                                        URL.createObjectURL(file);
                                      setProfileImageUrl(imageUrl);
                                      setProfileImageFile(file);
                                      onChange(file);
                                    }
                                  }}
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() =>
                                    document
                                      .getElementById("profileImage")
                                      ?.click()
                                  }
                                  className="flex items-center gap-2"
                                >
                                  <Upload className="h-4 w-4" />
                                  Upload Image
                                </Button>
                              </div>
                            </FormControl>
                            <FormDescription>
                              Upload a profile picture (JPG, PNG or GIF, max
                              5MB)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={profileForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={profileForm.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Software Engineer"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., TechCorp" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about yourself"
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Brief description of your professional background (max
                          500 characters)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Resume Upload */}
                  <div className="mb-6">
                    <FormField
                      control={profileForm.control}
                      name="resume"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Resume</FormLabel>
                          <FormControl>
                            <div className="flex items-center gap-4">
                              <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                id="resumeUpload"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setResumeFile(file);
                                    const url = URL.createObjectURL(file);
                                    setResumeUrl(url); // Optional: Preview or show download link
                                    onChange(file);
                                  }
                                }}
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                  document
                                    .getElementById("resumeUpload")
                                    ?.click()
                                }
                                className="flex items-center gap-2"
                              >
                                <Upload className="h-4 w-4" />
                                Upload Resume
                              </Button>
                              {/* {resumeUrl && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm"
                                  onClick={() => {
                                    setResumeUrl(null);
                                    setResumeFile(null);
                                    onChange(null);
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )} */}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Upload a resume in PDF, DOC, or DOCX format (Max
                            5MB). You can also remove or view the current one.
                          </FormDescription>
                          <FormMessage />
                          {resumeUrl && (
                            <div className="mt-2">
                              <a
                                href={resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 underline"
                              >
                                View Current Resume
                              </a>
                            </div>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-6" />
                  <h3 className="text-lg font-medium mb-4">
                    Interview Preferences
                  </h3>

                  <FormField
                    control={profileForm.control}
                    name="targetIndustry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Industry</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={profileForm.control}
                      name="interviewDifficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Interview Difficulty</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {DIFFICULTY_LEVELS.map((level) => (
                                <SelectItem
                                  key={level.value}
                                  value={level.value}
                                >
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
                      control={profileForm.control}
                      name="interviewType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Interview Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
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
                  </div>

                  <FormField
                    control={profileForm.control}
                    name="interviewStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Interview Style</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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

                  <Separator className="my-6" />
                  <h3 className="text-lg font-medium mb-4">
                    Skills & Experience
                  </h3>

                  <FormField
                    control={profileForm.control}
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
                    control={profileForm.control}
                    name="weakAreas"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Areas for Improvement</FormLabel>
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
                    control={profileForm.control}
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

                  <Button type="submit" disabled={isLoading} className="mt-6">
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified about your interview
                preparation progress.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form
                  onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <FormField
                      control={notificationForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Email Notifications
                            </FormLabel>
                            <div className="text-sm text-gray-500">
                              Receive email notifications about your progress
                              and updates
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="pushNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Push Notifications
                            </FormLabel>
                            <div className="text-sm text-gray-500">
                              Receive push notifications on your device
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="weeklyReports"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Weekly Progress Reports
                            </FormLabel>
                            <div className="text-sm text-gray-500">
                              Get weekly summaries of your interview preparation
                              progress
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="interviewReminders"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Interview Reminders
                            </FormLabel>
                            <div className="text-sm text-gray-500">
                              Receive reminders for scheduled mock interviews
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Preferences"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Application Preferences</CardTitle>
              <CardDescription>
                Customize your application experience and default settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...preferencesForm}>
                <form
                  onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={preferencesForm.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Theme</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={preferencesForm.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={preferencesForm.control}
                    name="interviewDifficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Interview Difficulty</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Preferences"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and privacy settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h4 className="text-base font-medium">Change Password</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Update your password to keep your account secure
                  </p>
                  <Button variant="outline" className="mt-3">
                    Change Password
                  </Button>
                </div>

                <Separator />

                <div className="rounded-lg border p-4">
                  <h4 className="text-base font-medium">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline" className="mt-3">
                    Enable 2FA
                  </Button>
                </div>

                <Separator />

                <div className="rounded-lg border p-4">
                  <h4 className="text-base font-medium">Account Data</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Download or delete your account data
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline">Download Data</Button>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
