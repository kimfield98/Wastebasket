import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BasicInfoForm from './BasicInfoForm';
import PreferenceInfoForm from './PreferenceInfoForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';

function ProfilePage() {
  return (
    <form className='flex flex-col items-center'>
      <Avatar className='w-14 h-14 mb-10'>
        <AvatarImage src='https://picsum.photos/250/250' />
        <AvatarFallback>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='32'
            height='32'
            fill='currentColor'
            className='bi bi-person'
            viewBox='0 0 16 16'
          >
            <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z' />
          </svg>
        </AvatarFallback>
      </Avatar>
      <Tabs defaultValue='basic' className='flex flex-col items-center gap-7'>
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
      <Button className='mt-5'>저장</Button>
      <Drawer>
        <DrawerTrigger className='inline-flex items-center justify-center my-5 w-80 h-10 bg-[#758A94] text-white whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
          비밀번호 수정
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className='text-[#5F7A85] mt-5'>
              비밀번호 수정
            </DrawerTitle>
            <DrawerDescription className='mb-5'>
              비밀번호를 입력해주세요.
            </DrawerDescription>
            <Input
              name='password'
              type='password'
              placeholder='기존 비밀번호를 입력해주세요'
              className='w-full'
            />
            <Input
              name='confirmPassword'
              type='password'
              placeholder='새로운 비밀번호를 입력해주세요'
              className='w-full'
            />
          </DrawerHeader>
          <DrawerFooter>
            <Button className='bg-[#5F7A85] font-semibold w-full mb-3'>
              수정
            </Button>
            <DrawerClose>
              <Button
                variant='outline'
                className='text-[#5F7A85] font-semibold w-full mb-3'
              >
                취소
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </form>
  );
}
export default ProfilePage;
