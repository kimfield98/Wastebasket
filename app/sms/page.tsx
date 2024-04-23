import Button from '@/components/button';
import Input from '@/components/input';

export default function SMSLogin() {
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>SMS 로그인</h1>
        <h2 className='text-xl'>전화번호를 입력해주세요.</h2>
      </div>
      <form className='flex flex-col gap-3'>
        <Input
          name='phone'
          type='number'
          placeholder='전화번호'
          required
          errors={[]}
        />
        <Input
          name='code'
          type='number'
          placeholder='인증번호'
          required
          errors={[]}
        />
        <Button text='인증하기' />
      </form>
    </div>
  );
}
