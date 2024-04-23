import FormButton from '@/components/form-button';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';

export default function CreateAccount() {
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>회원가입</h1>
        <h2 className='text-xl'>가입을 위한 정보를 입력해주세요.</h2>
      </div>
      <form className='flex flex-col gap-3'>
        <FormInput
          name='username'
          type='text'
          placeholder='이름'
          required
          errors={[]}
        />
        <FormInput
          name='email'
          type='email'
          placeholder='이메일'
          required
          errors={[]}
        />
        <FormInput
          name='password'
          type='password'
          placeholder='비밀번호'
          required
          errors={[]}
        />
        <FormInput
          name='confirmPassword'
          type='password'
          placeholder='비밀번호 확인'
          required
          errors={[]}
        />
        <FormButton text='회원가입' />
      </form>
      <SocialLogin />
    </div>
  );
}
