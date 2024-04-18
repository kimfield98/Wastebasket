"use server";

import { z } from "zod";

const checkUserName = (userName: string) => !userName.includes(" ");
const checkPasswords = ({password, passwordConfirm}:{password: string, passwordConfirm: string}) => password === passwordConfirm;
const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

const formSchema = z.object({
  username: z
    .string({
      invalid_type_error: "이름을 입력해주세요.",
      required_error: "이름을 입력해주세요.",
    })
    .min(3, { message: "이름은 2자 이상이어야 합니다." })
    .max(10, { message: "이름은 10자 이하여야 합니다." })
    // .refine(checkUserName, "이름에 공백이 포함되어 있습니다.")
    // .transform((username) => `🔥 ${username}`)
    .trim()
    .toLowerCase(),
  email: z
    .string({ required_error: "이메일을 입력해주세요." })
    .email({ message: "올바른 이메일 형식이 아닙니다." })
    .toLowerCase(),
  password: z
    .string({ required_error: "비밀번호를 입력해주세요." })
    .min(6, { message: "비밀번호는 6자 이상이어야 합니다." })
    .regex(
      passwordRegex,
      "비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."
    ),
    passwordConfirm: z
    .string()
    .min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
}).refine(checkPasswords, { 
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"]
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
  } else {
    console.log("회원가입 성공", result.data);
  }
}
