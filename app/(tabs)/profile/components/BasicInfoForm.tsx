import { Input } from '@/components/ui/input';

function BasicInfoForm({ user }: { user: any }) {
  return (
    <div className='flex flex-col items-center'>
      <Input
        name='username'
        type='text'
        placeholder='이름을 입력해주세요'
        defaultValue={user?.username ?? '-'}
      />
      <Input
        name='email'
        type='email'
        placeholder='이메일을 입력해주세요'
        defaultValue={user?.email ?? '-'}
      />
      <Input
        name='phoneNumber'
        type='text'
        placeholder='전화번호를 입력해주세요'
        defaultValue={user?.phoneNumber ?? '-'}
      />
    </div>
  );
}

export default BasicInfoForm;
