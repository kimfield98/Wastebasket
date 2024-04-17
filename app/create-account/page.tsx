"use client";
import FormButton from "@/components/FormButton";
import FormInput from "@/components/FormInput";
// import SocialLoginComponent from "@/components/SocialLogin";
import Link from "next/link";
import { useFormState } from "react-dom";
import { onSubmit } from "./actions";

export default function CreateAccountPage() {
  const [state, dispatch] = useFormState(onSubmit, null);
  return (
    <div className='flex flex-col gap-5 items-center justify-between h-screen py-32 dark:bg-zinc-950 dark:text-gray-200'>
      <div className='flex flex-col gap-1 items-center'>
        <div className='text-3xl font-semibold'>회원가입</div>
        <div className='text-lg'>가입을 위한 정보를 입력해주세요.</div>
      </div>
      <form action={dispatch} className='flex flex-col gap-3 items-center'>
        <FormInput
          type='text'
          placeholder='이름을 입력해주세요'
          className='w-72 border rounded-md p-2'
          name='name'
          errors={state?.fieldErrors?.name}
        />
        <FormInput
          type='email'
          placeholder='이메일을 입력해주세요'
          className='w-72 border rounded-md p-2'
          name='email'
          errors={state?.fieldErrors?.email}
        />
        <FormInput
          type='password'
          placeholder='비밀번호를 입력해주세요'
          className='w-72 border rounded-md p-2'
          name='password'
          errors={state?.fieldErrors?.password}
        />
        <FormInput
          type='password'
          placeholder='비밀번호를 다시 입력해주세요'
          className='w-72 border rounded-md p-2'
          name='ConfirmPassword'
          errors={state?.fieldErrors?.confirmPassword}
        />
        <FormButton
          text='회원가입'
        />
      </form>
      {/* <SocialLoginComponent /> */}
      <Link href='/login'>
        <span>이미 계정이 있으신가요?</span>
        <span className='font-semibold'> 로그인</span>
      </Link>
    </div>
  );
}
