import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link";



const LoginPage = () => {
  
  return (
    <form className="flex flex-col items-center">
      <Input
        type="email"
        placeholder="이메일을 입력해주세요"
      />
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요"
      />
      <Button className="w-80 my-5 bg-[#5F7A85]">로그인</Button>
      <Link href="/signup" className="text-[#758A94] font-semibold">아직 계정이 없으신가요? <span className="font-semibold underline">회원가입</span></Link>
    </form>
  );
};
export default LoginPage;
