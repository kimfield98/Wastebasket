"use client";
import FormButton from "@/components/FormButton";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { useFormState } from "react-dom";
import { onSubmit } from "./actions";
import SocialButtons from "@/components/SocailButtons";

export default function LoginPage() {
  const [state, dispatch] = useFormState(onSubmit, null);
  return (
    <div className='flex flex-col gap-10 items-center justify-between h-screen py-44 dark:bg-zinc-950 dark:text-gray-200'>
      <div className='flex flex-col gap-1 items-center'>
        <div className='text-3xl font-semibold'>로그인</div>
        <div className='text-lg'>이메일과 비밀번호를 입력해주세요.</div>
      </div>
      <form action={dispatch} className='flex flex-col gap-5 items-center'>
        <FormInput
          name='email'
          type='email'
          placeholder='이메일을 입력해주세요'
          className='w-72 border rounded-md p-2'
          errors={state?.fieldErrors?.email}
        />
        <FormInput
          name='password'
          type='password'
          placeholder='비밀번호를 입력해주세요'
          className='w-72 border rounded-md p-2'
          errors={state?.fieldErrors?.password}
        />
        <FormButton
          text='로그인'
        />
      </form>
      <SocialButtons />
      <Link href='/create-account'>
        <span>아직 계정이 없으신가요?</span>
        <span className='font-semibold'> 회원가입</span>
      </Link>
    </div>
  );
}
