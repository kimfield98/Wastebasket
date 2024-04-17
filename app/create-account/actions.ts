"use server";

import { z } from "zod";

const formSchema = z.object({
  username: z
    .string({
      invalid_type_error: "이름을 입력해주세요.",
      required_error: "이름을 입력해주세요.",
    })
    .min(3, { message: "이름은 2자 이상이어야 합니다." })
    .max(10, { message: "이름은 10자 이하여야 합니다." })
    .refine((userName) => !userName.includes(" "), "이름에 공백이 포함되어 있습니다."),
  email: z
    .string({ required_error: "이메일을 입력해주세요." })
    .email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z
    .string({ required_error: "비밀번호를 입력해주세요." })
    .min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
  confirm_password: z
    .string()
    .min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
}
