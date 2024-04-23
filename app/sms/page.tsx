import FormButton from '@/components/form-button';
import FormInput from '@/components/form-input';

export default function SMSLogin() {
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>SMS 로그인</h1>
        <h2 className='text-xl'>전화번호를 입력해주세요.</h2>
      </div>
      <form className='flex flex-col gap-3'>
        <FormInput
          name='phone'
          type='number'
          placeholder='전화번호'
          required
          errors={[]}
        />
        <FormInput
          name='code'
          type='number'
          placeholder='인증번호'
          required
          errors={[]}
        />
        <FormButton text='인증하기' />
      </form>
    </div>
  );
}
