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


function BasicInfoForm() {
  return (
    <div>
      <Input type='text' placeholder='이름을 입력해주세요' />
      <Input type='email' placeholder='이메일을 입력해주세요' />
      <Input type='text' placeholder='전화번호를 입력해주세요' />
      <Drawer>
        <DrawerTrigger className='inline-flex items-center justify-center my-3 w-80 h-10 bg-[#758A94] text-white whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
          비밀번호 수정
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-[#5F7A85]">비밀번호 수정</DrawerTitle>
            <DrawerDescription className="mb-5">비밀번호를 입력해주세요.</DrawerDescription>
            <Input type='password' placeholder='기존 비밀번호를 입력해주세요' />
            <Input type='password' placeholder='새로운 비밀번호를 입력해주세요' />
          </DrawerHeader>
          <DrawerFooter>
            <Button className="bg-[#5F7A85]">수정</Button>
            <DrawerClose>
              <Button variant='outline' className="text-[#5F7A85] font-semibold">취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default BasicInfoForm;
