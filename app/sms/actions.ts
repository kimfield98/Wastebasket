"use server";

export async function smsVerification(prevState: any, formData: FormData) {
  const data = {
    token: formData.get("token"),
  };
  console.log("token", data);
}