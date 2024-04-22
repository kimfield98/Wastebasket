"use server";
import bcrypt from "bcrypt";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkPasswords = ({
  password,
  passwordConfirm,
}: {
  password: string;
  passwordConfirm: string;
}) => password === passwordConfirm;

const formSchema = z
  .object({
    username: z
      .string({
        required_error: "이름을 입력해주세요",
      })
      .toLowerCase()
      .trim(),
    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    passwordConfirm: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 존재하는 이름입니다.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 존재하는 이메일입니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();

    redirect("/profile");
  }
}
