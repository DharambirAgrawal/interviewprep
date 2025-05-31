"use client";
import { useState } from "react";
import { Container } from "@/components/Container";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqdata = [
  {
    question: "How does the AI interview feedback work?",
    answer:
      "Our advanced AI analyzes your responses in real-time, evaluating factors like technical accuracy, communication clarity, problem-solving approach, and confidence level. You receive detailed feedback within seconds of completing each question.",
  },
  {
    question: "What types of interviews can I practice?",
    answer:
      "We offer comprehensive practice for technical coding interviews, system design discussions, behavioral questions, and industry-specific scenarios. Our question bank covers all major programming languages and frameworks used by top tech companies.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! We offer a 7-day free trial that includes access to 50 practice questions, basic AI feedback, and one mock interview session. No credit card required to get started.",
  },
  {
    question: "How accurate is the AI assessment compared to real interviews?",
    answer:
      "Our AI has been trained on thousands of real interview scenarios and feedback from hiring managers at top tech companies. Studies show 94% correlation between our AI assessments and actual interview outcomes.",
  },
  {
    question: "Can I practice with company-specific questions?",
    answer:
      "Absolutely! We have curated question sets for major companies like Google, Amazon, Microsoft, Meta, Apple, and many others. Each set reflects the actual interview style and difficulty level of these companies.",
  },
  {
    question: "What support do you provide besides AI feedback?",
    answer:
      "In addition to AI feedback, premium users get access to live mock interviews with industry experts, personalized study plans, progress tracking, and a community forum where you can connect with other job seekers.",
  },
];

export const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-4">
          {faqdata.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <button
                className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  {activeIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  activeIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="px-6 pb-6">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed mt-4">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional help section */}
        <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our support team is here to help you succeed. Get personalized
              assistance with your interview preparation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200">
                Contact Support
              </button>
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-200">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
