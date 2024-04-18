"use client";

import FormButton from "@/components/FormButton";
import FormInput from "@/components/FormInput";
import { useFormState } from "react-dom";
import { smsLogin } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

export default function SmsPage() {
  const [state, dispatch] = useFormState(smsLogin, initialState);
  return (
    <div className='flex flex-col gap-10 items-center justify-center h-screen pb-20 dark:bg-zinc-950 dark:text-gray-200'>
      <div className='flex flex-col gap-1 items-center'>
        <div className='text-3xl font-semibold'>SMS</div>
        <div className='text-lg'>전화번호와 인증번호를 입력해주세요.</div>
      </div>
      <form action={dispatch}  className='flex flex-col gap-5 items-center'>
        {state.token ? (<FormInput
          key='token'
          name='token'
          type='text'
          placeholder='인증번호를 입력해주세요'
        />) : (<FormInput
        key='phoneNumber'
        name='phoneNumber'
        type='text'
        placeholder='전화번호를 입력해주세요'
        errors={state?.error?.formErrors}
      />)}
        <FormButton
          text={state.token ? '인증하기' : '인증번호 받기'}
        />
      </form>
    </div>
  );
}
