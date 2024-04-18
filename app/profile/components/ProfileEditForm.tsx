import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BasicInfoForm from './BasicInfoForm';
import PreferenceInfoForm from './PreferenceInfoForm';

function ProfilePage() {
  return (
    <div className='flex flex-col items-center w-80'>
      <form>
        <Tabs defaultValue='basic' className='flex flex-col items-center'>
          <TabsList>
            <TabsTrigger value='basic'>기본 정보</TabsTrigger>
            <TabsTrigger value='preference'>추가 정보</TabsTrigger>
          </TabsList>
          <TabsContent value='basic'>
            <BasicInfoForm />
          </TabsContent>
          <TabsContent value='preference'>
            <PreferenceInfoForm />
          </TabsContent>
        </Tabs>
        <Button className='bg-[#5F7A85]'>저장</Button>
      </form>
    </div>
  );
}
export default ProfilePage;
