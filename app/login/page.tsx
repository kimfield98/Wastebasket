import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { redirect } from "next/navigation";

export default function LogIn() {
  async function onSubmit(formData: FormData) {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 5000));
    redirect("/profile")
  }
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">이메일과 비밀번호를 입력해주세요</h2>
      </div>
      <form action={onSubmit} className="flex flex-col gap-3">
        <FormInput name="email" type="email" placeholder="이메일" required errors={[]} />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          errors={[]}
        />
        <FormButton loading={false} text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}