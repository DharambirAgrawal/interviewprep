import { SectionTitle } from "@/components/SectionTitle";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b1a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    content:
      "The AI interview platform helped me identify my weak points and practice until I felt confident. I landed my dream job at Google after just 6 weeks of preparation!",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Product Manager at Meta",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    content:
      "The expert feedback was invaluable. The platform's realistic interview scenarios prepared me for exactly what I faced in my actual interviews. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "Data Scientist at Netflix",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80",
    content:
      "As someone who struggled with interview anxiety, this platform gave me the confidence I needed. The 24/7 availability meant I could practice whenever I felt ready.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <SectionTitle
          preTitle="Success Stories"
          title="What Our Users Say About Their Journey"
          // className="mb-16"
        >
          Real stories from real people who transformed their careers with our
          AI-powered interview preparation platform.
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* User Info */}
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
