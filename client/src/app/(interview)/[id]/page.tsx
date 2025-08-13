// AI-powered interview interface page
import VideoCallInterface from "@/components/interview/VideoCallInterface";
import { checkUserExist } from "./actions";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InterviewPage({ params }: PageProps) {
  const id = (await params).id;
  const userExist = await checkUserExist(id);

  console.log("Interview session check:", userExist);

  // For now, always show the interview interface
  // In production, you might want to check user permissions or session validity
  return <VideoCallInterface />;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = (await params).id;
  return buildPageMetadata({
    title: `Interview Session ${id}`,
    description:
      "Real-time AI interview with feedback, scoring, and analytics to improve your performance.",
    alternates: { canonical: `/interview/${id}` },
    robots: { index: false, follow: true },
  });
}
