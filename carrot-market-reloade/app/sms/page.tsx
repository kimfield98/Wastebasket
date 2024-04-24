"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { smsLogin } from "./actions";
import { useFormState } from "react-dom";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">전화번호 인증을 진행해주세요</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            key="token"
            name="token"
            type="number"
            placeholder="인증번호 6자리를 입력하세요"
            required
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
          />
        ) : (
          <Input
            key="phone"
            name="phone"
            type="text"
            placeholder="전화번호를 입력하세요"
            required
            errors={state.error?.formErrors}
          />
        )}
        <Button text={state.token ? "인증하기" : "인증번호 받기"} />
      </form>
    </div>
  );
}
