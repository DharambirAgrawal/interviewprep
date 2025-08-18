"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Users, BookOpen, Video, Settings } from "lucide-react";
import Link from "next/link";

export default function InterviewPage() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [notes, setNotes] = useState("");
  const [isStarting, setIsStarting] = useState(false);

  const interviewTypes = [
    {
      id: "technical",
      name: "Technical Interview",
      description: "Coding problems and technical questions",
      duration: "45-60 min",
      icon: BookOpen,
    },
    {
      id: "behavioral",
      name: "Behavioral Interview",
      description: "Soft skills and situational questions",
      duration: "30-45 min",
      icon: Users,
    },
    {
      id: "system-design",
      name: "System Design",
      description: "Architecture and design problems",
      duration: "60-90 min",
      icon: Settings,
    },
    {
      id: "live-coding",
      name: "Live Coding",
      description: "Real-time coding with feedback",
      duration: "60 min",
      icon: Video,
    },
  ];

  const handleStartInterview = async () => {
    if (!selectedType || !selectedDifficulty) return;

    setIsStarting(true);
    try {
      // TODO: Start interview session
      console.log("Starting interview:", {
        type: selectedType,
        difficulty: selectedDifficulty,
        notes,
      });

      // Simulate starting interview
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to actual interview interface
      // router.push(`/dashboard/interview/session?type=${selectedType}&difficulty=${selectedDifficulty}`)
    } catch (error) {
      console.error("Failed to start interview:", error);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Mock Interview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Practice with AI-powered interviews tailored to your needs
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Ready to start
          </Badge>
        </div>
      </div>

      {/* Quick Start Card */}
      <Card className="bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20 border-indigo-200 dark:border-indigo-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5 text-indigo-600" />
            Quick Start Interview
          </CardTitle>
          <CardDescription>
            Select your preferences and start practicing immediately
          </CardDescription>
        </CardHeader>
        {/* <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Interview Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose interview type" />
                </SelectTrigger>
                <SelectContent>
                  {interviewTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty Level</label>
              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleStartInterview}
            disabled={!selectedType || !selectedDifficulty || isStarting}
            className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700"
          >
            {isStarting ? "Starting Interview..." : "Start Interview Now"}
          </Button>
        </CardContent> */}
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Interview Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose interview type" />
                </SelectTrigger>
                <SelectContent>
                  {interviewTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty Level</label>
              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write any specific goals, topics, or notes before starting..."
              className="w-full h-24 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <Button
            onClick={handleStartInterview}
            disabled={!selectedType || !selectedDifficulty || isStarting}
            className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700"
          >
            {isStarting ? "Starting Interview..." : "Start Interview Now"}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Interview Sessions</CardTitle>
          <CardDescription>
            Review your past performance and track improvement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                type: "Technical Interview",
                date: "2 hours ago",
                score: 85,
                duration: "45 min",
                status: "completed",
              },
              {
                id: 2,
                type: "Behavioral Interview",
                date: "Yesterday",
                score: 92,
                duration: "30 min",
                status: "completed",
              },
              {
                id: 3,
                type: "System Design",
                date: "3 days ago",
                score: 78,
                duration: "60 min",
                status: "completed",
              },
            ].map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                    <Video className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">{session.type}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      {session.duration} • {session.date}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-lg font-semibold">
                      {session.score}%
                    </div>
                    <Badge
                      variant={session.score >= 80 ? "default" : "secondary"}
                    >
                      {session.score >= 80 ? "Great" : "Good"}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Link href="/dashboard/interview/history">
              <Button variant="outline">View All Sessions</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
