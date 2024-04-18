import Button from "@/components/button";
import Input from "@/components/input";

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">전화번호 인증을 진행해주세요</h2>
      </div>
      <form className="flex flex-col gap-3">
        <Input
          name="phoneNumber"
          type="number"
          placeholder="전화번호"
          required
        />
        <Input
          name="verificationCode"
          type="number"
          placeholder="인증번호"
          required
        />
        <Button text="인증" />
      </form>
    </div>
  );
}