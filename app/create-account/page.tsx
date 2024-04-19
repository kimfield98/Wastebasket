import CreateAccountForm from './components/CreateAccountForm';

function CreateAccountPage() {
  return (
    <div className='flex flex-col gap-10 items-center justify-center h-screen pb-10 bg-[#E6ECF4] text-[#5F7A85]'>
      <div className='text-2xl font-bold'>회원가입</div>
      <CreateAccountForm />
    </div>
  );
}

export default CreateAccountPage;
