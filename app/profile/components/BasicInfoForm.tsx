import { Input } from '@/components/ui/input';

function BasicInfoForm() {
  return (
    <div className='flex flex-col items-center'>
      <Input name='username' type='text' placeholder='이름을 입력해주세요' />
      <Input name='email' type='email' placeholder='이메일을 입력해주세요' />
      <Input
        name='phoneNumber'
        type='text'
        placeholder='전화번호를 입력해주세요'
      />
    </div>
  );
}

export default BasicInfoForm;
