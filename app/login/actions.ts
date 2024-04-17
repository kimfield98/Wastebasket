"use server";

import { redirect } from "next/navigation";

export async function onSubmit(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  redirect("/");
  return {
    errors: ["잘못된 비밀번호입니다.", "비밀번호는 6자 이상이어야 합니다."]
  }
}