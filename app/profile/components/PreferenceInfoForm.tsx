import { Input } from '@/components/ui/input';

function PreferenceForm() {
  return (
    <div className='flex flex-col items-center'>
      <Input name='mbti' type='text' placeholder='MBTI를 입력해주세요' />
      <Input name='location' type='text' placeholder='지역을 입력해주세요' />
      <Input
        name='food'
        type='text'
        placeholder='싫어하는 음식을 입력해주세요'
      />
    </div>
  );
}

export default PreferenceForm;
