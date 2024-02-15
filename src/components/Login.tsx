"use client"
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

type FormData = {
  email: string;
  password: string;
}

export default function LoginComponent() {

  const LoginSchema: ZodType<FormData> = z
    .object({
      email: z
        .string()
        .email("유효한 이메일 형식이 아닙니다."),
      password: z
        .string()
        .min(9)
        .max(20),
    })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({resolver: zodResolver(LoginSchema)})

  const submitData = (data: FormData) => {
    console.log("일한다!", data)
  }

  return (
    <section>
      <header>
        <h2>로그인</h2>
      </header>
      <form onSubmit={handleSubmit(submitData)}>
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
          <button type="submit">로그인</button>
        </div>
      </form>
    </section>
  );
}