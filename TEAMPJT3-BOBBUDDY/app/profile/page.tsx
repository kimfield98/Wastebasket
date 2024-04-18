import ProfileEditForm from "./components/ProfileEditForm";

function ProfilePage() {
  return (
    <div className='flex flex-col gap-5 items-center justify-center h-screen pb-10 bg-[#E6ECF4]'>
      <div className='text-2xl font-bold text-[#5F7A85]'>프로필</div>
      <ProfileEditForm />
    </div>
  );
}

export default ProfilePage;
