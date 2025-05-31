import {
  Brain,
  Target,
  Clock,
  BarChart3,
  Users,
  Award,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react";

// import benefitOneImg from "../../public/img/benefit-one.png";
// import benefitTwoImg from "../../public/img/benefit-two.png";

const benefitOne = {
  title: "AI-Powered Interview Analysis",
  desc: "Get instant, detailed feedback on your interview performance with our advanced AI technology. Our system analyzes your responses, body language, and communication style to provide actionable insights that help you improve faster than traditional methods.",
  image: "", // benefitOneImg ||
  bullets: [
    {
      title: "Real-Time Feedback",
      desc: "Receive immediate analysis of your answers, including technical accuracy, clarity, and confidence level during practice sessions.",
      icon: <Zap />,
    },
    {
      title: "Personalized Learning Path",
      desc: "Our AI creates custom study plans based on your strengths, weaknesses, and target role requirements.",
      icon: <Target />,
    },
    {
      title: "Performance Tracking",
      desc: "Monitor your progress over time with detailed analytics and improvement metrics across all interview categories.",
      icon: <BarChart3 />,
    },
  ],
  cta: {
    text: "Try AI Analysis",
    link: "/demo",
  },
};

const benefitTwo = {
  title: "Comprehensive Interview Preparation",
  desc: "Access thousands of real interview questions from top tech companies, complete with expert solutions and multiple approaches. Practice everything from coding challenges to system design and behavioral questions.",
  image: "", //benefitTwoImg
  bullets: [
    {
      title: "Company-Specific Questions",
      desc: "Practice with actual questions asked at Google, Amazon, Microsoft, Meta, Apple, and 200+ other companies.",
      icon: <Award />,
    },
    {
      title: "Expert-Reviewed Solutions",
      desc: "Learn from detailed explanations and multiple solution approaches reviewed by senior engineers from top tech companies.",
      icon: <Users />,
    },
    {
      title: "Mock Interview Sessions",
      desc: "Experience realistic interview scenarios with time pressure, follow-up questions, and comprehensive evaluation.",
      icon: <Clock />,
    },
  ],
  cta: {
    text: "Explore Question Bank",
    link: "/questions",
  },
};

export { benefitOne, benefitTwo };
