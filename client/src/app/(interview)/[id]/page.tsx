// AI-powered interview interface page
import VideoCallInterface from "@/components/interview/VideoCallInterface";
import { checkUserExist } from "./actions";

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
