import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl font-bold">InterviewPro</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 mx-auto md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Experience Real Interview Practice
                </h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Our AI interviewer asks questions verbally, you respond naturally. Just like a real interview.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button className="px-8">
                    Start Practicing <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 border-t bg-muted">
          <div className="container px-4 mx-auto md:px-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="flex flex-col items-center p-6 space-y-4 text-center bg-white rounded-lg shadow">
                <div className="p-2 bg-primary/10 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Voice-Based Interviews</h3>
                <p className="text-sm text-gray-500">
                  Experience interviews with real voice interaction - the interviewer asks, you respond naturally.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 space-y-4 text-center bg-white rounded-lg shadow">
                <div className="p-2 bg-primary/10 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Industry-Specific Questions</h3>
                <p className="text-sm text-gray-500">
                  Get questions tailored to your industry, role, and experience level.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 space-y-4 text-center bg-white rounded-lg shadow">
                <div className="p-2 bg-primary/10 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Realistic Environment</h3>
                <p className="text-sm text-gray-500">
                  Practice in an environment that simulates the pressure and flow of a real interview.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t">
        <div className="container px-4 mx-auto md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">© 2025 InterviewPro. All rights reserved.</p>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="#" className="text-sm font-medium hover:underline">
                Terms
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                Privacy
              </Link>
              <Link href="#" className="text-sm font-medium hover:underline">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
