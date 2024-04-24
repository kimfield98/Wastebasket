import LoginForm from './components/LoginForm';
import LoginTopbar from './components/LoginTopbar';

function LoginPage() {
  return (
    <div className='flex flex-col gap-10 items-center justify-center h-screen pb-10 bg-[#E6ECF4] text-[#5F7A85]'>
      <LoginTopbar />
      <div className='text-2xl font-bold'>로그인</div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
