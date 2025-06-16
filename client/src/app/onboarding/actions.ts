"use server";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/api";

export async function handleResumeUpload(file: File) {
  try {
    const formData = new FormData();
    formData.append("resume", file);

    // Send to backend API
    const response = await fetch(`${baseUrl}/resume-text`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload resume: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Resume uploaded successfully:", result);
    return result;
  } catch (error) {
    return {
      error: true,
      message: "",
    };
  }
}

// connecting to python backend
export async function handleOnboardingAction(data: any) {
  try {
    // Append file (resume)

    console.log(data);
    if (data.resume && data.resume.length > 0) {
      const resume = await handleResumeUpload(data.resume[0]);
      data.resume = resume.text;
    }

    // Send to backend API
    const response = await fetch(`${process.env.SERVER_URL}/onboard/user`, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Failed to submit onboarding: ${response.statusText}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error submitting onboarding:", error);
    throw error;
  }
}
