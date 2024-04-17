import FormButton from "@/components/FormButton";
import SocialLoginComponent from "@/components/SocialLogin"
import FormInput from "@/components/FormInput";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className='flex flex-col gap-10 items-center justify-between h-screen py-44 dark:bg-zinc-950 dark:text-gray-200'>
      <div className='flex flex-col gap-1 items-center'>
        <div className='text-3xl font-semibold'>로그인</div>
        <div className='text-lg'>이메일과 비밀번호를 입력해주세요.</div>
      </div>
      <form className='flex flex-col gap-5 items-center'>
        <FormInput
          name='email'
          type='email'
          placeholder='이메일을 입력해주세요'
          className='w-72 border rounded-md p-2'
        />
        <FormInput
          name='password'
          type='password'
          placeholder='비밀번호를 입력해주세요'
          className='w-72 border rounded-md p-2'
        />
        <FormButton
          className='w-72 sm:w-72 h-10 bg-lime-600 rounded-md text-white font-semibold'
          text='로그인'
        />
      </form>
      <SocialLoginComponent />
      <Link href='/create-account'>
        <span>아직 계정이 없으신가요?</span>
        <span className='font-semibold'> 회원가입</span>
      </Link>
    </div>
  );
}
