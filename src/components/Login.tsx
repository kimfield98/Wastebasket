"use client"
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";
import Link from "next/link";
import Image from 'next/image'
import { Input } from "@/components/ui/input"

const LOGIN_API = "http://13.125.226.155:3000/auth/login"

type FormData = {
  email: string;
  password: string;
}

export default function LoginComponent() {

  // 유저이면 메인 페이지로 리다이렉트 시키는 코드

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

  async function handleLogin(inputData: FormData) {
    try {
      const res = await axios.post(LOGIN_API,{
        email: inputData.email,
        password: inputData.password,
      },{
        headers: {
          'Content-Type':'application/json',
      }})
      console.log(res)
      // 토큰 쿠키에 저장하는 코드
      window.location.replace("/")
    } catch (error) {
      alert("로그인이 실패했습니다. 다시 시도하세요")
    }
  }

  return (
    <section className="flex flex-col items-center min-h-screen pt-[96px] pb-[74px] bg-white">
      <header>
        <h2 className="mb-[35px] text-xl text-[22px] font-extrabold">로그인</h2> 
      </header>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div>
          <Input
            id="email"
            type="email"
            required
            placeholder="이메일 주소를 입력해주세요."
            className="bg-white h-[56px] mb-[16px] text-[16px] focus:outline-none"
            {...register("email")}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <Input
            type="password"
            id="password"
            required
            placeholder="비밀번호를 입력해주세요."
            className="bg-white h-[56px]  mb-[5px] text-[16px] focus:outline-none"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <Link href="/">
          <div className="flex justify-end w-[292px] text-sm/[18px] font-semibold text=[#111D48]">비밀번호를 잊으셨나요?</div>
        </Link>
        <button type="submit" className="w-[292px] h-[52px] mt-4 bg-[#111D48] rounded text-white">로그인</button>
      </form>
      <hr className="w-[292px] bg-[#C7C9CD] border-[0.1px] my-[16px]"></hr>
      <button className="flex justify-center items-center w-[292px] h-[52px] mb-4 bg-[#FEE500] rounded font-bold">
        <Image
          src={"/Button/kakao.png"}
          width={24}
          height={24}
          alt={"카카오 로고"}
        />
        <span className="ml-1">카카오로 3초만에 시작하기</span>
      </button>
      <button className="flex justify-center items-center w-[292px] h-[52px] mb-4 bg-[#000000] rounded text-white font-semibold">
        <Image
          src={"/Button/google.png"}
          width={24}
          height={24}
          alt={"구글 로고"}
        />
        <span className="ml-1">구글로 시작하기</span>
      </button>
      <button className="flex justify-center items-center w-[292px] h-[52px] bg-[#000000] rounded text-white font-semibold">
        <Image
          src={"/Button/apple.png"}
          width={24}
          height={24}
          alt={"애플 로고"} 
        />
        <span className="ml-1">Apple로 시작하기</span>
      </button>
      <div className="mt-8">
        <span className="text-sm/[18px] text-[#91959D]">회원이 아니신가요? </span>
        <Link href="/signup"><span className="text-sm/[18px] text-[#747474] font-bold">회원가입</span></Link>
      </div>
    </section>
  );
}