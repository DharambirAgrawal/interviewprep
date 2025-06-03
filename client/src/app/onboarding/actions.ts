"use server";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/api";

export async function handleOnboardingAction(data: any) {
  try {
    const formData = new FormData();

    // Append form fields
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("targetIndustry", data.targetIndustry);
    formData.append("jobTitle", data.jobTitle);
    formData.append("interviewDifficulty", data.interviewDifficulty);
    formData.append("additionalNotes", data.additionalNotes);
    formData.append("interviewType", data.interviewType);
    formData.append("interviewStyle", data.interviewStyle);
    formData.append("primarySkills", data.primarySkills);
    formData.append("weakAreas", data.weakAreas);
    formData.append("interviewComfortLevel", data.interviewComfortLevel);

    // Append file (resume)
    if (data.resume && data.resume.length > 0) {
      formData.append("resume", data.resume[0]); // single file upload
    }
    await handleResumeUpload(data.resume[0]);

    // Send to backend API
    const response = await fetch(`${process.env.SERVER_URL}/onboard/user`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to submit onboarding: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Onboarding submitted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error submitting onboarding:", error);
    throw error;
  }
}

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
    console.error("Error uploading resume:", error);
    throw error;
  }
}
