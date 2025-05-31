import Image from "next/image";
import { Container } from "@/components/Container";
import { Linkedin, Twitter, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Senior Engineering Manager",
    company: "Former Google",
    experience: "10+ years",
    image: "/img/team/sarah.jpg",
    bio: "Led hiring for 200+ engineers at Google. Expert in system design and technical leadership interviews.",
    specialties: [
      "System Design",
      "Technical Leadership",
      "Engineering Management",
    ],
    linkedin: "#",
    twitter: "#",
    email: "sarah@aiinterviewprep.com",
  },
  {
    name: "Michael Rodriguez",
    role: "Principal Software Engineer",
    company: "Former Amazon",
    experience: "12+ years",
    image: "/img/team/michael.jpg",
    bio: "Conducted 500+ technical interviews at Amazon. Specialized in algorithms and data structures.",
    specialties: ["Algorithms", "Data Structures", "Coding Interviews"],
    linkedin: "#",
    twitter: "#",
    email: "michael@aiinterviewprep.com",
  },
  {
    name: "Dr. Emily Watson",
    role: "AI Research Scientist",
    company: "Former Microsoft Research",
    experience: "8+ years",
    image: "/img/team/emily.jpg",
    bio: "PhD in Machine Learning. Developed AI assessment algorithms used by Fortune 500 companies.",
    specialties: ["AI Development", "ML Algorithms", "Performance Analytics"],
    linkedin: "#",
    twitter: "#",
    email: "emily@aiinterviewprep.com",
  },
  {
    name: "David Kim",
    role: "Senior Product Manager",
    company: "Former Meta",
    experience: "9+ years",
    image: "/img/team/david.jpg",
    bio: "Built interview platforms used by millions. Expert in product management and behavioral interviews.",
    specialties: [
      "Product Management",
      "Behavioral Interviews",
      "User Experience",
    ],
    linkedin: "#",
    twitter: "#",
    email: "david@aiinterviewprep.com",
  },
  {
    name: "Rachel Thompson",
    role: "Career Development Coach",
    company: "Former Apple",
    experience: "15+ years",
    image: "/img/team/rachel.jpg",
    bio: "Helped 1000+ professionals transition into tech roles. Specializes in career strategy and negotiation.",
    specialties: [
      "Career Coaching",
      "Salary Negotiation",
      "Interview Strategy",
    ],
    linkedin: "#",
    twitter: "#",
    email: "rachel@aiinterviewprep.com",
  },
  {
    name: "Alex Johnson",
    role: "Full Stack Engineer",
    company: "Former Netflix",
    experience: "7+ years",
    image: "/img/team/alex.jpg",
    bio: "Full-stack expert with deep knowledge of modern web technologies and scalable architectures.",
    specialties: [
      "Full Stack Development",
      "System Architecture",
      "Web Technologies",
    ],
    linkedin: "#",
    twitter: "#",
    email: "alex@aiinterviewprep.com",
  },
];

export const ExpertTeam = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
          >
            {/* Profile Image */}
            <div className="relative mb-6">
              <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 p-1">
                <div className="w-full h-full rounded-2xl bg-gray-200 flex items-center justify-center">
                  <div className="text-2xl font-bold text-gray-400">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Member Info */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {member.name}
              </h3>
              <p className="text-blue-600 font-semibold mb-1">{member.role}</p>
              <p className="text-gray-500 text-sm mb-2">
                {member.company} • {member.experience}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Specialties */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Specialties
              </h4>
              <div className="flex flex-wrap gap-2">
                {member.specialties.map((specialty, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4 pt-4 border-t border-gray-100">
              <a
                href={member.linkedin}
                className="w-10 h-10 bg-blue-50 hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-blue-600" />
              </a>
              <a
                href={member.twitter}
                className="w-10 h-10 bg-sky-50 hover:bg-sky-100 rounded-xl flex items-center justify-center transition-colors group"
              >
                <Twitter className="w-5 h-5 text-sky-600" />
              </a>
              <a
                href={`mailto:${member.email}`}
                className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center transition-colors group"
              >
                <Mail className="w-5 h-5 text-gray-600" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="mt-16 text-center">
        <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Get Personal Guidance from Our Experts
          </h3>
          <p className="text-gray-600 mb-6">
            Book a one-on-one session with our industry veterans to get
            personalized feedback and accelerate your interview preparation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200">
              Book Expert Session
            </button>
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};
