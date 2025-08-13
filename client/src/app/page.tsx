import DefaultLayout from "./DefaultLayout";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { Hero } from "@/components/landing/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/landing/Benefits";
import { Faq } from "@/components/landing/Faq";
import { Cta } from "@/components/landing/Cta";
import { ContactForm } from "@/components/landing/ContactForm";
import { benefitOne, benefitTwo } from "@/components/landing/data";
import { ExpertTeam } from "@/components/landing/ExpertTeam";
import { TestimonialsSection } from "@/components/landing/TestimonialSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";

export default function Home() {
  return (
    <DefaultLayout>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Stats Section - Build Trust */}
        <StatsSection />

        {/* Platform Benefits */}
        <section className="py-20 lg:py-28">
          <SectionTitle
            id="features"
            preTitle="AI-Powered Preparation"
            title="Master Your Interview Skills with Advanced AI Technology"
            // className="mb-16"
          >
            Our cutting-edge AI interview platform provides personalized
            feedback, realistic mock interviews, and comprehensive skill
            assessment to help you land your dream job with confidence.
          </SectionTitle>

          {/* Feature Grid */}
          <FeaturesGrid />

          {/* Detailed Benefits */}
          <div className="mt-20 space-y-20">
            <Benefits data={benefitOne} />
            <Benefits imgPos="right" data={benefitTwo} />
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Expert Team Section */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 to-blue-50/30">
          <SectionTitle
            preTitle="Meet Our Experts"
            title="Industry Veterans Who Understand What Hiring Managers Want"
            id="team"
            // className="mb-16"
          >
            Our team consists of senior engineers, hiring managers, and career
            coaches from top tech companies who have conducted thousands of
            interviews and know exactly what it takes to succeed.
          </SectionTitle>
          <ExpertTeam />
        </section>

        {/* FAQ Section */}
        <section className="py-20 lg:py-28">
          <SectionTitle
            preTitle="Got Questions?"
            title="Everything You Need to Know About AI Interview Prep"
            id="faq"
            // className="mb-16"
          >
            Find answers to common questions about our AI-powered interview
            preparation platform, pricing, and how we help candidates succeed in
            their job search.
          </SectionTitle>
          <Faq />
        </section>

        {/* Call to Action */}
        <Cta />

        {/* Contact Form */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-blue-50 to-indigo-50/50">
          <div className="container mx-auto px-4">
            <SectionTitle
              preTitle="Get Started Today"
              title="Ready to Ace Your Next Interview?"
              // className="mb-12"
            >
              Join thousands of successful candidates who have landed their
              dream jobs using our AI-powered interview preparation platform.
            </SectionTitle>
            <ContactForm />
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}

export const metadata: Metadata = buildPageMetadata({
  title: "AI Interview Preparation Platform",
  description:
    "Practice mock interviews with AI, get instant feedback, and track your progress to land your next job.",
  alternates: { canonical: "/" },
});
