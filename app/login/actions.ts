"use server";

import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password")
  };
  return {
    errors: ["잘못된 비밀번호입니다.", "비밀번호는 6자 이상이어야 합니다."]
  }
}