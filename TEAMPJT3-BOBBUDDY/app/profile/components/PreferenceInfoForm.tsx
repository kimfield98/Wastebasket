import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

function PreferenceInfoForm() {
  return (
    <div className='flex flex-col items-center my-10'>
      <Drawer>
        <DrawerTrigger>
          <Input type='text' placeholder='MBTI' />
        </DrawerTrigger>
        <DrawerTrigger>
          <Input type='email' placeholder='지역' />
        </DrawerTrigger>
        <DrawerTrigger>
          <Input type='text' placeholder='좋아하는 음식' />
        </DrawerTrigger>
        <DrawerTrigger>
          <Input type='text' placeholder='싫어하는 음식' />
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className='text-[#5F7A85]'>{`{Name} 수정`}</DrawerTitle>
            <DrawerDescription className='mb-5'>
              {`{Name}를 입력해주세요.`}
            </DrawerDescription>
            <Input 
              type='password' 
              placeholder='기존 비밀번호를 입력해주세요' 
              className="w-full" />
            <Input
              type='password'
              placeholder='새로운 비밀번호를 입력해주세요'
              className="w-full"
            />
          </DrawerHeader>
          <DrawerFooter>
            <Button className='bg-[#5F7A85]'>수정</Button>
            <DrawerClose>
              <Button
                variant='outline'
                className='text-[#5F7A85] font-semibold'
              >
                취소
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default PreferenceInfoForm;
