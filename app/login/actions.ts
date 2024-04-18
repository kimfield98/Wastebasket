"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/constants";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string({
    required_error: "비밀번호를 입력해주세요."
  }).min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX)
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password")
  };
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log("로그인 성공", result.data);
  }
}