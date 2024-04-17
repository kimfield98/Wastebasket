import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">가입을 위한 정보를 입력해주세요.</h2>
      </div>
      <form className="flex flex-col gap-3">
      <FormInput name="name" type="text" placeholder="이름" required errors={[]} />
        <FormInput name="email" type="email" placeholder="이메일" required errors={[]} />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호"
          required
        />
        <FormInput
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          required
        />
        <FormButton text="회원가입" />
      </form>
      <SocialLogin />
    </div>
  );
}