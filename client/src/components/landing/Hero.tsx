import Image from "next/image";
import { Container } from "@/components/Container";
// import heroImg from "../../public/img/hero.png";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 -z-10"></div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full blur-xl opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-100 rounded-full blur-xl opacity-40"></div>

      <Container className="relative">
        <div className="flex flex-wrap items-center min-h-[70vh]">
          <div className="flex items-center w-full lg:w-1/2">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
                <CheckCircle className="w-4 h-4 mr-2" />
                Trusted by 50K+ Job Seekers
              </div>

              <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900 lg:text-6xl xl:text-7xl dark:text-white">
                Ace Your
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {" "}
                  AI Interview
                </span>
                <br />
                With Confidence
              </h1>

              <p className="py-6 text-xl leading-relaxed text-gray-600 lg:text-2xl dark:text-gray-300">
                Master technical interviews with our AI-powered platform. Get
                personalized feedback, practice with real scenarios, and land
                your dream job at top tech companies.
              </p>

              {/* Key benefits */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Real-time AI feedback
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  1000+ practice questions
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Industry expert guidance
                </div>
              </div>

              <div className="flex flex-col items-start space-y-4 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                <Link
                  href="#pricing"
                  className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="#demo"
                  className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="pt-8 mt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-4">
                  Trusted by professionals at
                </p>
                <div className="flex items-center space-x-8 opacity-60">
                  <div className="text-lg font-bold text-gray-400">Google</div>
                  <div className="text-lg font-bold text-gray-400">
                    Microsoft
                  </div>
                  <div className="text-lg font-bold text-gray-400">Amazon</div>
                  <div className="text-lg font-bold text-gray-400">Meta</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-12 lg:w-1/2 lg:mt-0">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl blur-2xl opacity-20 scale-110"></div>

              <div className="relative p-4 bg-white rounded-3xl shadow-2xl">
                {/* <Image
                  src={heroImg}
                  width="616"
                  height="617"
                  className="object-cover rounded-2xl"
                  alt="AI Interview Preparation Platform Dashboard"
                  loading="eager"
                  placeholder="blur"
                /> */}
              </div>

              {/* Floating cards */}
              <div className="absolute -top-6 -right-6 p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    AI Analysis Complete
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">94%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
