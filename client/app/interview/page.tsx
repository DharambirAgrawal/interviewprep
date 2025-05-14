"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { Input } from "@/components/ui/input"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mic,
  MicOff,
  MessageSquare,
  FileText,
  Clock,
  ChevronRight,
  ChevronLeft,
  Settings,
  Volume2,
  Pause,
  Play,
  AudioWaveformIcon as Waveform,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { AudioVisualizer } from "@/components/audio-visualizer"

export default function InterviewPage() {
  const { toast } = useToast()
  const [isMuted, setIsMuted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [timer, setTimer] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const [interviewStatus, setInterviewStatus] = useState<"waiting" | "interviewer" | "candidate" | "finished">(
    "waiting",
  )
  const totalQuestions = 5

  const audioVisualizerRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)

  // Simulate timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate audio visualization
  useEffect(() => {
    if (isInterviewerSpeaking || isRecording) {
      const simulateAudioVisualization = () => {
        setAudioLevel(Math.random() * 0.5 + 0.2)
        animationFrameRef.current = requestAnimationFrame(simulateAudioVisualization)
      }

      animationFrameRef.current = requestAnimationFrame(simulateAudioVisualization)
    } else {
      setAudioLevel(0)
      cancelAnimationFrame(animationFrameRef.current)
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isInterviewerSpeaking, isRecording])

  // Simulate interview flow
  useEffect(() => {
    if (interviewStatus === "waiting") {
      const timer = setTimeout(() => {
        startInterviewerSpeaking()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [interviewStatus])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleMute = () => setIsMuted(!isMuted)

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion((prev) => prev + 1)
      setInterviewStatus("waiting")
      toast({
        title: "Next Question",
        description: "Moving to the next question...",
      })
    } else {
      toast({
        title: "Interview Complete",
        description: "You've completed all the questions!",
      })
      setInterviewStatus("finished")
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1)
      setInterviewStatus("waiting")
    }
  }

  const startInterviewerSpeaking = () => {
    setIsInterviewerSpeaking(true)
    setInterviewStatus("interviewer")

    // Simulate interviewer speaking for a few seconds
    setTimeout(
      () => {
        setIsInterviewerSpeaking(false)
        setInterviewStatus("candidate")
        toast({
          title: "Your Turn",
          description: "Please answer the question now.",
        })
      },
      5000 + Math.random() * 3000,
    ) // Random duration between 5-8 seconds
  }

  const toggleRecording = () => {
    if (!isRecording) {
      if (interviewStatus !== "candidate") {
        toast({
          title: "Please wait",
          description: "Wait for the interviewer to finish asking the question.",
          variant: "destructive",
        })
        return
      }

      setIsRecording(true)
      toast({
        title: "Recording Started",
        description: "Your response is being recorded.",
      })
    } else {
      setIsRecording(false)
      toast({
        title: "Recording Stopped",
        description: "Your response has been saved.",
      })
    }
  }

  const getStatusText = () => {
    switch (interviewStatus) {
      case "waiting":
        return "Preparing next question..."
      case "interviewer":
        return "Interviewer is speaking..."
      case "candidate":
        return isRecording ? "Recording your answer..." : "Your turn to answer"
      case "finished":
        return "Interview completed"
      default:
        return "Ready"
    }
  }

  const getStatusColor = () => {
    switch (interviewStatus) {
      case "waiting":
        return "bg-yellow-100"
      case "interviewer":
        return "bg-blue-100"
      case "candidate":
        return isRecording ? "bg-red-100" : "bg-green-100"
      case "finished":
        return "bg-gray-100"
      default:
        return "bg-gray-100"
    }
  }

  // Mock questions for the interview
  const questions = [
    "Can you tell me about yourself and your background?",
    "What are your greatest strengths and how do they help you in your work?",
    "Describe a challenging project you worked on and how you overcame obstacles.",
    "Why are you interested in this position and what can you bring to the role?",
    "Where do you see yourself professionally in five years?",
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold">InterviewPro</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(timer)}
            </Badge>
            <Button variant="outline" size="sm">
              End Interview
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-6">
        <div className="container px-4 mx-auto md:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center p-6 space-y-4 text-center">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Interviewer" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 w-6 h-6 ${isInterviewerSpeaking ? "bg-green-500" : "bg-gray-300"} border-4 border-white rounded-full transition-colors`}
                      ></div>
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold">Sarah Johnson</h2>
                      <p className="text-sm text-muted-foreground">Senior Technical Interviewer</p>
                    </div>

                    <div className="w-full max-w-md mx-auto mt-4 overflow-hidden bg-gray-100 rounded-lg h-28">
                      <div className="flex items-center justify-between p-3 bg-gray-200">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${interviewStatus === "interviewer" ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                          ></div>
                          <span className="text-sm font-medium">Audio Channel</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => {
                            if (interviewStatus === "interviewer") {
                              setIsInterviewerSpeaking(!isInterviewerSpeaking)
                            }
                          }}
                        >
                          {isInterviewerSpeaking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                      </div>
                      <div className="flex items-center justify-center h-20">
                        <AudioVisualizer level={isInterviewerSpeaking ? audioLevel : 0} />
                      </div>
                    </div>

                    <div
                      className={`flex items-center justify-center w-full gap-2 p-3 mt-2 rounded-lg ${getStatusColor()}`}
                    >
                      {interviewStatus === "interviewer" && <Waveform className="w-4 h-4 animate-pulse" />}
                      {interviewStatus === "candidate" && isRecording && (
                        <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                      )}
                      <span className="text-sm font-medium">{getStatusText()}</span>
                    </div>

                    <div className="flex items-center justify-center w-full gap-4 mt-4">
                      <Button
                        variant={isMuted ? "destructive" : "outline"}
                        size="icon"
                        onClick={toggleMute}
                        className="w-10 h-10"
                      >
                        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </Button>

                      <Button
                        variant={isRecording ? "destructive" : "default"}
                        onClick={toggleRecording}
                        className="flex-1 gap-2 h-10"
                        disabled={interviewStatus !== "candidate" && !isRecording}
                      >
                        {isRecording ? (
                          <>
                            Stop Recording <MicOff className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Start Recording <Mic className="w-4 h-4" />
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="w-10 h-10"
                        onClick={() => {
                          toast({
                            title: "Audio Settings",
                            description: "Adjusting audio settings...",
                          })
                        }}
                      >
                        <Volume2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">
                        Question {currentQuestion} of {totalQuestions}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={prevQuestion} disabled={currentQuestion === 1}>
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={nextQuestion}
                          disabled={currentQuestion === totalQuestions}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <Progress value={(currentQuestion / totalQuestions) * 100} className="h-2" />

                    <div className="p-4 rounded-lg bg-gray-50">
                      <p className="text-lg">{questions[currentQuestion - 1]}</p>
                    </div>

                    {isRecording && (
                      <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                          <span className="text-sm font-medium text-red-600">Recording in progress</span>
                        </div>
                        <div className="h-12 flex items-center justify-center">
                          <AudioVisualizer level={audioLevel} color="red" />
                        </div>
                        <p className="mt-2 text-xs text-center text-red-500">
                          Recording time: {formatTime(timer % 60)}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Button
                        variant={interviewStatus === "interviewer" ? "outline" : "ghost"}
                        onClick={() => {
                          if (interviewStatus === "interviewer") {
                            setIsInterviewerSpeaking(false)
                            setInterviewStatus("candidate")
                          } else if (interviewStatus === "candidate") {
                            startInterviewerSpeaking()
                          }
                        }}
                        className="gap-2"
                        disabled={interviewStatus === "waiting" || interviewStatus === "finished"}
                      >
                        {interviewStatus === "interviewer" ? (
                          <>
                            Skip <ChevronRight className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Replay <Play className="w-4 h-4" />
                          </>
                        )}
                      </Button>

                      <Button
                        variant="default"
                        onClick={nextQuestion}
                        disabled={currentQuestion === totalQuestions || interviewStatus === "interviewer"}
                      >
                        {currentQuestion === totalQuestions ? "Finish Interview" : "Next Question"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-0">
                  <Tabs defaultValue="notes">
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="notes" className="gap-2">
                        <FileText className="w-4 h-4" /> Notes
                      </TabsTrigger>
                      <TabsTrigger value="chat" className="gap-2">
                        <MessageSquare className="w-4 h-4" /> Chat
                      </TabsTrigger>
                      <TabsTrigger value="settings" className="gap-2">
                        <Settings className="w-4 h-4" /> Settings
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="notes" className="p-4 space-y-4">
                      <Textarea
                        placeholder="Take notes during your interview..."
                        className="min-h-[200px] resize-none"
                      />
                      <Button variant="outline" className="w-full">
                        Save Notes
                      </Button>
                    </TabsContent>

                    <TabsContent value="chat" className="p-4 h-[300px] flex flex-col">
                      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                        <div className="flex items-start gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>AI</AvatarFallback>
                          </Avatar>
                          <div className="p-2 rounded-lg bg-gray-100 max-w-[80%]">
                            <p className="text-sm">
                              Welcome to your interview! I'll be asking you questions verbally. Please respond when it's
                              your turn.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Input placeholder="Type a message..." className="flex-1" />
                        <Button size="sm">Send</Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="settings" className="p-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Microphone Volume</span>
                          <Slider className="w-[60%]" defaultValue={[80]} max={100} step={1} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Speaker Volume</span>
                          <Slider className="w-[60%]" defaultValue={[70]} max={100} step={1} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Audio Input Device</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Default Microphone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default Microphone</SelectItem>
                            <SelectItem value="headset">Headset Microphone</SelectItem>
                            <SelectItem value="external">External Microphone</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Audio Output Device</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Default Speakers" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default Speakers</SelectItem>
                            <SelectItem value="headphones">Headphones</SelectItem>
                            <SelectItem value="external">External Speakers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button variant="outline" className="w-full">
                        Apply Settings
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2 text-lg font-medium">Interview Tips</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 mt-0.5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <p>Speak clearly and at a moderate pace.</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 mt-0.5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <p>Use the STAR method for behavioral questions.</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 mt-0.5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <p>Take a moment to think before answering difficult questions.</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 mt-0.5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <p>Maintain a professional tone throughout the interview.</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
