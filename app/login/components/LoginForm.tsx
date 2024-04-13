import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"



const AdminLoginPage = () => {
  
  return (
    <form className="flex flex-col items-center">
      <Input
        placeholder="이름을 입력해주세요"
      />
      <Input
        type="email"
        placeholder="이메일을 입력해주세요"
      />
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요"
      />
      <Button className="w-80 bg-[#5F7A85]">로그인</Button>
    </form>
  );
};
export default AdminLoginPage;
