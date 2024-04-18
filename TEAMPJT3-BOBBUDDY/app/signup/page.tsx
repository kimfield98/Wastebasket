import SignupForm from "./components/SignupForm";

function SignupPage() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen pb-10 bg-[#E6ECF4]">
      <div className="text-2xl font-bold text-[#5F7A85]">회원가입</div>
      <SignupForm />
    </div>
  );
}

export default SignupPage;