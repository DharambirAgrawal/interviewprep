"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Award,
  Target,
  Calendar,
  Activity,
} from "lucide-react";

const mockStats = [
  {
    title: "Total Interviews",
    value: "24",
    change: "+12% from last month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Average Score",
    value: "8.5/10",
    change: "+0.8 from last month",
    icon: Award,
    trend: "up",
  },
  {
    title: "Practice Time",
    value: "42h",
    change: "This month",
    icon: Clock,
    trend: "neutral",
  },
  {
    title: "Success Rate",
    value: "87%",
    change: "+5% from last month",
    icon: Target,
    trend: "up",
  },
];

const recentActivities = [
  {
    type: "interview",
    title: "Completed Technical Interview",
    subtitle: "Software Engineer - Google",
    time: "2 hours ago",
    score: "9.2/10",
  },
  {
    type: "practice",
    title: "Algorithm Practice Session",
    subtitle: "Data Structures & Algorithms",
    time: "1 day ago",
    score: "8.5/10",
  },
  {
    type: "interview",
    title: "Behavioral Interview",
    subtitle: "Product Manager - Meta",
    time: "2 days ago",
    score: "8.8/10",
  },
  {
    type: "feedback",
    title: "Received Feedback",
    subtitle: "System Design Interview",
    time: "3 days ago",
    score: "Improvement needed",
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track your interview preparation progress and performance insights.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <p
                  className={`text-xs flex items-center gap-1 mt-1 ${
                    stat.trend === "up"
                      ? "text-green-600"
                      : stat.trend === "down"
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {stat.trend === "up" && <TrendingUp className="w-3 h-3" />}
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance Trends
            </CardTitle>
            <CardDescription>
              Your interview scores over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-950 dark:to-cyan-950 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  Chart visualization will be implemented here
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Integration with charting library pending
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest interview sessions and practice activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="mt-1">
                    {activity.type === "interview" && (
                      <Users className="w-4 h-4 text-blue-500" />
                    )}
                    {activity.type === "practice" && (
                      <Target className="w-4 h-4 text-green-500" />
                    )}
                    {activity.type === "feedback" && (
                      <Award className="w-4 h-4 text-purple-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.subtitle}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        activity.score.includes("/10")
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                      }`}
                    >
                      {activity.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Start a new interview session or review your progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700">
              Start New Interview
            </Button>
            <Button variant="outline">Practice Algorithms</Button>
            <Button variant="outline">Review Feedback</Button>
            <Button variant="outline">Schedule Session</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
