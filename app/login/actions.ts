"use server";

import bcrypt from "bcrypt";
import db from "@/lib/db";
import { z } from "zod";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "이메일이 존재하지 않습니다."),
  password: z.string({
    required_error: "비밀번호를 입력해주세요.",
  }),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxxx"
    );
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["비밀번호가 일치하지 않습니다."],
          email: [],
        },
      };
    }
  }
}