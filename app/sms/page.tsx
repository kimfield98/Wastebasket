"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { smsVerification } from "./actions";
import { useFormState } from "react-dom";

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsVerification, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">전화번호 인증을 진행해주세요</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="phone"
          type="number"
          placeholder="전화번호"
          required
        />
        <Input
          name="token"
          type="number"
          placeholder="인증번호"
          required
        />
        <Button text="인증" />
      </form>
    </div>
  );
}