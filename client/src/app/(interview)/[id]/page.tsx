// main video call interface page for interview
import VideoCallInterface from "@/components/interview/VideoCallInterface";
import { checkUserExist } from "./actions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function InterviewPage({ params }: PageProps) {
  const id = (await params).id;
  const userExist = await checkUserExist(id);

  console.log(userExist);

  if (userExist.success) {
    return <VideoCallInterface />;
  } else {
    return <VideoCallInterface />;
  }
}
