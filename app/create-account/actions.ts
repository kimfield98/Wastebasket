"use server";

import { z } from "zod";

export const checkPasswords = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

export const CreateAccountSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: "이름을 입력해주세요",
        required_error: "이름을 입력해주세요",
      })
      .min(2, { message: "이름은 2자 이상이어야 합니다" })
      .max(20, { message: "이름은 20자 이하여야 합니다" }),
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
    confirmPassword: z
      .string({
        invalid_type_error: "비밀번호를 입력해주세요",
        required_error: "비밀번호를 입력해주세요",
      })
      .min(6, { message: "비밀번호는 6자 이상이어야 합니다" }),
  })
  .refine(checkPasswords, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

export async function onSubmit(prevState: any, formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const res = CreateAccountSchema.safeParse(data);
  if (!res.success) {
    return res.error.flatten();
  }
}
