"use server";

import { z } from "zod";

const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "이메일 입력해주세요",
      required_error: "이메일을 입력해주세요",
    })
    .email({ message: "이메일 형식이 아닙니다" }),
  password: z
    .string({
      invalid_type_error: "비밀번호를 입력해주세요",
      required_error: "비밀번호를 입력해주세요",
    })
    .min(6, { message: "비밀번호는 6자 이상이어야 합니다" }),
});

export async function onSubmit(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const res = LoginSchema.safeParse(data);
  if (!res.success) {
    return res.error.flatten();
  }
}
