"use client"
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupComponent() {

  const SignupSchema: ZodType<FormData> = z
    .object({
      name: z
        .string()
        .min(3)
        .max(20),
      email: z
        .string()
        .email("유효한 이메일 형식이 아닙니다."),
      password: z
        .string()
        .min(9)
        .max(20),
      confirmPassword: z
        .string()
        .min(9)
        .max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "비밀번호가 일치하지 않습니다",
      path: ["confirmPassword"],
    })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({resolver: zodResolver(SignupSchema)})

  const submitData = (data: FormData) => {
    console.log("일한다!", data)
  }

  return (
    <section>
      <header>
        <h2>회원가입</h2>
      </header>
      <form onSubmit={handleSubmit(submitData)}>
        <div>
          <label>닉네임</label>
          <input type="text" {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label>이메일</label>
          <input type="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>
        <div>
          <button type="submit">회원가입</button>
        </div>
      </form>
    </section>
  );
}