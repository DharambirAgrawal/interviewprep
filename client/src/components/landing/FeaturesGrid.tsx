import {
  CheckCircle,
  Cpu,
  BarChart3,
  Users,
  Clock,
  GraduationCap,
} from "lucide-react";

const features = [
  {
    name: "AI-Powered Mock Interviews",
    description:
      "Practice with our advanced AI interviewer that adapts to your skill level and provides real-time feedback.",
    icon: Cpu,
  },
  {
    name: "Performance Analytics",
    description:
      "Get detailed insights into your interview performance with comprehensive scoring and improvement suggestions.",
    icon: BarChart3,
  },
  {
    name: "Expert Review",
    description:
      "Receive personalized feedback from industry professionals and hiring managers from top companies.",
    icon: Users,
  },
  {
    name: "24/7 Availability",
    description:
      "Practice anytime, anywhere with our always-available AI interview platform that fits your schedule.",
    icon: Clock,
  },
  {
    name: "Industry-Specific Prep",
    description:
      "Tailored interview questions and scenarios for your specific industry and role requirements.",
    icon: GraduationCap,
  },
  {
    name: "Proven Success Methods",
    description:
      "Learn from proven interview strategies that have helped thousands land jobs at top companies.",
    icon: CheckCircle,
  },
];

export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {features.map((feature) => (
        <div
          key={feature.name}
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <feature.icon
              className="h-6 w-6 text-blue-600"
              aria-hidden="true"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {feature.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
