import FormButton from "@/components/FormButton";
import SocialLoginComponent from "@/components/SocialLogin";
import FormInput from "@/components/FormInput";
import Link from "next/link";

export default function CreateAccountPage() {
  return (
    <div className='flex flex-col gap-5 items-center justify-between h-screen py-32 dark:bg-zinc-950 dark:text-gray-200'>
      <div className='flex flex-col gap-1 items-center'>
        <div className='text-3xl font-semibold'>회원가입</div>
        <div className='text-lg'>가입을 위한 정보를 입력해주세요.</div>
      </div>
      <form className='flex flex-col gap-3 items-center'>
        <FormInput
          type='text'
          placeholder='이름을 입력해주세요'
          className='w-72 border rounded-md p-2'
          name='name'
        />
        <FormInput
          type='email'
          placeholder='이메일을 입력해주세요'
          className='w-72 border rounded-md p-2'
          name='email'
        />
        <FormInput
          type='password'
          placeholder='비밀번호를 입력해주세요'
          className='w-72 border rounded-md p-2'
          name='password'
        />
        <FormInput
          type='password'
          placeholder='비밀번호를 다시 입력해주세요'
          className='w-72 border rounded-md p-2'
          name='ConfirmPassword'
        />
        <FormButton
          className='w-72 sm:w-72 h-10 bg-lime-600 rounded-md text-white font-semibold'
          text='회원가입'
        />
      </form>
      <SocialLoginComponent />
      <Link href='/login'>
        <span>이미 계정이 있으신가요?</span>
        <span className='font-semibold'> 로그인</span>
      </Link>
    </div>
  );
}
