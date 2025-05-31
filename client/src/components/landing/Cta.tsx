import { Container } from "@/components/Container";
import { ArrowRight, Star, Users, Award, TrendingUp } from "lucide-react";
import Link from "next/link";

export const Cta = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"></div>

      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse delay-500"></div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-white/20 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-blue-100 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-white/20 rounded-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">94%</div>
              <div className="text-blue-100 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-white/20 rounded-xl">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">4.9/5</div>
              <div className="text-blue-100 text-sm">User Rating</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-white/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">3x</div>
              <div className="text-blue-100 text-sm">Faster Prep</div>
            </div>
          </div>

          {/* Main CTA content */}
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Land Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Dream Job?
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful candidates who have aced their
              interviews using our AI-powered platform. Start your journey today
              with a free trial.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/signup"
              className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-700 bg-white rounded-2xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/demo"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl hover:bg-white/30 transition-all duration-200"
            >
              Watch Demo
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="border-t border-white/20 pt-8">
            <p className="text-blue-100 mb-4">
              No credit card required • 7-day free trial • Cancel anytime
            </p>

            <div className="flex items-center justify-center space-x-2 text-yellow-300">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-current" />
              ))}
              <span className="ml-2 text-white font-medium">
                Rated 4.9/5 by 10,000+ users
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="relative block w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
};
