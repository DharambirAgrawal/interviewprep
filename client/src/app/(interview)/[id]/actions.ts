"use server";

export async function checkUserExist(id: string) {
  if (!id) {
    return {
      success: false,
      message: "Invalid URL",
    };
  }
  try {
    const response = await fetch(
      `${process.env.SERVER_URL}/onboard/user/${id}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      return {
        success: false,
        message: "Something Went Wrong!",
      };
    }

    const data = await response.json();

    return data;
  } catch (err) {
    return {
      success: false,
      message: "Something Went Wrong!",
    };
  }
}
