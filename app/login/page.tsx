import SocialLoginComponent from "@/components/socialLogin";

export default function LoginPage() {
  return (
    <div className='flex flex-col items-center justify-between h-screen py-52'>
      <div className="flex flex-col gap-1 items-center">
        <div className="text-3xl font-semibold">로그인</div>
        <div className="text-lg">이메일과 비밀번호를 입력해주세요.</div>
      </div>
      <form className='flex flex-col gap-5 items-center'>
        <input type='email' placeholder='이메일을 입력해주세요' className="w-72 border rounded-md p-2" />
        <input type='password' placeholder='비밀번호를 입력해주세요' className="w-72 border rounded-md p-2" />
        <button className="w-72 sm:w-72 h-10 bg-lime-600 rounded-md text-white font-semibold">로그인</button>
      </form>
      <SocialLoginComponent />
    </div>
  );
}
