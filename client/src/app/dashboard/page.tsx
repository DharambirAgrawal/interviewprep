"use client";
// import type { Metadata } from "next";
// import { buildPageMetadata } from "@/lib/seo";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  TrendingUp,
  User,
  BookOpen,
  Video,
} from "lucide-react";
import { ROUTES } from "@/lib/constants";

export default function DashboardPage() {
  // Mock data - replace with real data from API
  const stats = [
    {
      name: "Interviews Completed",
      value: "12",
      change: "+20%",
      icon: Video,
    },
    {
      name: "Practice Sessions",
      value: "45",
      change: "+15%",
      icon: BookOpen,
    },
    {
      name: "Hours Practiced",
      value: "28",
      change: "+8%",
      icon: Clock,
    },
    {
      name: "Skill Level",
      value: "Intermediate",
      change: "Level Up!",
      icon: TrendingUp,
    },
  ];

  const recentInterviews = [
    {
      id: 1,
      type: "Technical",
      company: "TechCorp",
      date: "2 days ago",
      score: 85,
      status: "completed",
    },
    {
      id: 2,
      type: "Behavioral",
      company: "StartupXYZ",
      date: "1 week ago",
      score: 92,
      status: "completed",
    },
    {
      id: 3,
      type: "System Design",
      company: "BigTech Inc",
      date: "2 weeks ago",
      score: 78,
      status: "completed",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Complete Data Structures Practice",
      dueDate: "Today",
      priority: "high",
    },
    {
      id: 2,
      title: "Review System Design Concepts",
      dueDate: "Tomorrow",
      priority: "medium",
    },
    {
      id: 3,
      title: "Mock Interview with AI",
      dueDate: "This Week",
      priority: "low",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-indigo-100 mb-4">
          Ready to ace your next interview? Let's continue your preparation
          journey.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={ROUTES.ONBOARDING}>
            <Button variant="secondary" size="sm">
              <User className="w-4 h-4 mr-2" />
              Complete Setup
            </Button>
          </Link>
          <Link href={ROUTES.INTERVIEW}>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white hover:bg-white hover:text-indigo-600"
            >
              <Video className="w-4 h-4 mr-2" />
              Start Interview
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Interviews</CardTitle>
            <CardDescription>Your latest interview performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{interview.type}</Badge>
                      <span className="text-sm text-gray-500">
                        {interview.company}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {interview.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      {interview.score}%
                    </div>
                    <Badge
                      variant={interview.score >= 80 ? "default" : "secondary"}
                    >
                      {interview.score >= 80 ? "Great" : "Good"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>
              Stay on track with your preparation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{task.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant={
                      task.priority === "high"
                        ? "destructive"
                        : task.priority === "medium"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Jump into your preparation activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Link href={ROUTES.INTERVIEW}>
              <Button variant="outline" className="w-full h-20 flex flex-col">
                <Video className="w-6 h-6 mb-2" />
                Start Mock Interview
              </Button>
            </Link>
            <Link href="/dashboard/practice">
              <Button variant="outline" className="w-full h-20 flex flex-col">
                <BookOpen className="w-6 h-6 mb-2" />
                Practice Questions
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button variant="outline" className="w-full h-20 flex flex-col">
                <TrendingUp className="w-6 h-6 mb-2" />
                View Analytics
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// export const metadata: Metadata = buildPageMetadata({
//   title: "Overview",
//   description: "Overview of your interview preparation progress and actions.",
//   alternates: { canonical: "/dashboard" },
//   robots: { index: false, follow: true },
// });
