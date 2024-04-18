"use server";

export async function smsLogin(prevState: any, formData: FormData) {
  const data = {
    token: formData.get("token"),
  };
  console.log("token", data);
}