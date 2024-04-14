import { Button } from "@/components/ui/button";
import BasicInfoForm from "./BasicInfoForm";

const ProfilePage = () => {
  return (
    <div>
      <form className='flex flex-col items-center'>
        <BasicInfoForm />
        <Button className='w-80 bg-[#5F7A85]'>저장</Button>
      </form>
    </div>
  );
};
export default ProfilePage;
