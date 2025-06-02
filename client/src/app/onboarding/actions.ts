"use server";

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

    console.log(formData);

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
