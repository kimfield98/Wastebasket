import LoginForm from "./components/LoginForm";

function LoginPage() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen pb-10">
      <div className="text-2xl font-bold text-[#5F7A85]">로그인</div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;