"use client"
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import Image from 'next/image'
import { Input } from "@/components/ui/input"

const SIGNUP_API = "http://13.125.226.155:3000/auth/signup"
const SIGNUP_API2 = "http://13.124.118.158:6583/auth/signup";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupComponent() {
  const [isShowButton, setShowButton] = useState(false)
  const [isShowSocialButton, setShowSocialButton] = useState(true)

  function handlebutton() {
    setShowButton(prevState => !prevState);
  }  

  function handleSocialbutton() {
    setShowSocialButton(prevState => !prevState);
  } 

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

  async function handleSignup(inputData:FormData) {
    const res = axios
      .post(SIGNUP_API2, {
        name: inputData.name,
        email: inputData.email,
        password: inputData.password
      })
      .then(() => {
        console.log(res);
        console.log('보냈다')
        window.location.replace('/login')
      })
      .catch((error) => alert("뭔가 잘못됐어"))
      .finally(() => {
        console.log('대답 좀 줘')
      });
  }

  return (
    <section className="flex flex-col items-center min-h-screen pt-[96px] pb-[74px] bg-white">
      <header>
        <h2 className="mb-[35px] text-xl text-[22px] font-extrabold">회원가입</h2> 
      </header>
      {isShowSocialButton &&
      <div>
        <button className="flex justify-center items-center w-[292px] h-[52px] mb-4 bg-[#FEE500] rounded text-[15px] leading-5 font-bold">
          <Image
            src={"/Button/kakao.png"}
            width={24}
            height={24}
            alt={"카카오 로고"}
          />
          <span className="ml-[4px]">카카오로 3초만에 시작하기</span>
        </button>
        <button className="flex justify-center items-center w-[292px] h-[52px] mb-4 bg-[#000000] rounded text-white text-[16px] leading-5 font-medium">
          <Image
            src={"/Button/google.png"}
            width={24}
            height={24}
            alt={"구글 로고"}
          />
          <span className="ml-[8px]">구글로 시작하기</span>
        </button>
        <button className="flex justify-center items-center w-[292px] h-[52px] bg-[#000000] rounded text-white text-[16px] leading-5 font-medium">
          <Image
            src={"/Button/apple.png"}
            width={24}
            height={24}
            alt={"애플 로고"} 
          />
          <span className="ml-[8px]">Apple로 시작하기</span>
        </button>
        <hr className="w-[292px] bg-[#C7C9CD] border-[0.01px] my-[16px]"></hr>
        <button
          onClick={handleSocialbutton}
          className="w-[292px] h-[52px] bg-[#393F7B] rounded text-white"
        >
        이메일 주소로 시작하기
        </button>
      </div>
      }
      {!isShowSocialButton &&
      <div>
        <form className="w-[292px]" onSubmit={handleSubmit(handleSignup)}>
          <div>
            <Input
              id="name"
              type="name"
              required
              placeholder="닉네임을 입력해주세요."
              className="bg-white h-[56px] mb-[16px] text-[16px] font-medium focus:outline-none"
              {...register("name")}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div>
            <Input
              id="email"
              type="email"
              required
              placeholder="이메일 주소를 입력해주세요."
              className="bg-white h-[56px]  mb-[16px] text-[16px] font-medium focus:outline-none"
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
              className="bg-white h-[56px]  mb-[16px] text-[16px] font-medium focus:outline-none"
              {...register("password")}
            />{errors.password && <span>{errors.password.message}</span>}
          </div>
          <div>
            <Input
              type="password"
              id="repassword"
              required
              placeholder="비밀번호를 다시 입력해주세요."
              className="bg-white h-[56px]  mb-[5px] text-[16px] font-medium focus:outline-none"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
          </div>
          <div>
            <button
            className="w-[292px] h-[52px] mt-4 bg-[#393F7B] rounded text-white"
            >
              다음
            </button>
          </div>
        </form>
        <hr className="w-[292px] bg-[#C7C9CD] border-[0.1px] my-[16px]"></hr>
        <button className="flex justify-center items-center w-[292px] min-h-[52px] mb-4 bg-[#FEE500] rounded text-[15px] leading-5 font-bold">
          <Image
            src={"/Button/kakao.png"}
            width={24}
            height={24}
            alt={"카카오 로고"}
          />
          <span className="ml-[4px]">카카오로 3초만에 시작하기</span>
        </button>
        {!isShowButton &&
        <button onClick={handlebutton} className="w-[292px] min-h-[52px] bg-[#000000] rounded text-white text-[15px]">다른 방법으로 시작하기</button>
        }
        {isShowButton &&
        <div>
          <button className="flex justify-center items-center w-[292px] h-[52px] mb-4 bg-[#000000] rounded text-white">
            <Image
              src={"/Button/google.png"}
              width={24}
              height={24}
              alt={"구글 로고"}
            />
            <span className="ml-1">구글로 시작하기</span>
          </button>
          <button className="flex justify-center items-center w-[292px] h-[52px] bg-[#000000] rounded text-white">
            <Image
              src={"/Button/apple.png"}
              width={24}
              height={24}
              alt={"애플 로고"}
            />
            <span className="ml-1">Apple로 시작하기</span>
          </button>
        </div>
        }
      </div>
      }
      <div className="mt-8">
        <span className="text-sm/[18px] text-[#91959D]">이미 계정이 있으신가요? </span>
        <Link href="/login"><span className="text-sm/[18px] text-[#747474] font-bold">로그인</span></Link>
      </div>
    </section>
  );
}