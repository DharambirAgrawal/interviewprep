import { SectionTitle } from "@/components/SectionTitle";

const stats = [
  {
    number: "10,000+",
    label: "Successful Interviews",
    description: "Candidates who landed their dream jobs",
  },
  {
    number: "95%",
    label: "Success Rate",
    description: "Of users get job offers within 3 months",
  },
  {
    number: "500+",
    label: "Partner Companies",
    description: "Top tech companies trust our platform",
  },
  {
    number: "24/7",
    label: "AI Support",
    description: "Round-the-clock interview practice",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-blue-50 to-indigo-50/50">
      <div className="container mx-auto px-4">
        <SectionTitle
          preTitle="Proven Results"
          title="Numbers That Speak for Themselves"
          //   className="mb-16"
        >
          Join thousands of successful candidates who have transformed their
          interview performance and landed positions at top companies worldwide.
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
