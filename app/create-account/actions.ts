"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bycript from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const checkPasswords = ({
  password,
  passwordConfirm,
}: {
  password: string;
  passwordConfirm: string;
}) => password === passwordConfirm;
const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });
  return !Boolean(user);
};
const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return !Boolean(user);
};
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "이름을 입력해주세요.",
        required_error: "이름을 입력해주세요.",
      })
      .trim()
      .toLowerCase()
      .refine(checkUniqueUsername, "이미 존재하는 이름입니다."),
    email: z
      .string({ required_error: "이메일을 입력해주세요." })
      .email({ message: "올바른 이메일 형식이 아닙니다." })
      .toLowerCase()
      .refine(checkUniqueEmail, "이미 존재하는 이메일입니다."),
    password: z
      .string({ required_error: "비밀번호를 입력해주세요." })
      .min(PASSWORD_MIN_LENGTH, {
        message: "비밀번호는 6자 이상이어야 합니다.",
      })
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    passwordConfirm: z
      .string()
      .min(PASSWORD_MIN_LENGTH, {
        message: "비밀번호는 6자 이상이어야 합니다.",
      }),
  })
  .refine(checkPasswords, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // 비밀번호 해싱
    const hashedPassword = await bycript.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: { id: true },
    });
    // DB에 저장
    const cookie = await getIronSession(cookies(), {
      cookieName: "user",
      password: process.env.COOKIE_PASSWORD!,
    });
    //@ts-ignore
    cookie.id = user.id;
    await cookie.save();
    // 로그인
    // 리다이렉트
    redirect("/profile");
  }
}
