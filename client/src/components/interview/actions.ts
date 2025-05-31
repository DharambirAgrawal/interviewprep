"use server";

export const codeCompile = async (language: string, code: string) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/service/code-compile`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: parseInt(language), code }),
    }
  );
  const res = await response.json();

  return res;
};
