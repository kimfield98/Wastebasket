"use client"
import { Checkbox } from "@/components/ui/checkbox"

export default function AgreeComponent() {
  
  return (
    <section className="flex flex-col items-center min-h-screen pt-[96px] pb-[74px] bg-white text-black">
      <header>
        <h2 className="mb-[35px] text-xl font-semibold">약관 동의</h2> 
      </header>
      <div>
        <div className="flex gap-[7.5px] font-semibold">
          <div><Checkbox /></div>
          <div>모두 동의</div>
        </div>
        <hr className="w-[292px] bg-[#C7C9CD] border-[0.1px] mt-[16px]"></hr>
        <div className="flex flex-col items-start">
          <div className="flex justify-center items-center gap-[7.5px] mt-[16px]">
            <div><Checkbox /></div>
            <div>(필수) 서비스 이용약관 동의</div>
          </div>
          <div className="flex justify-center items-center gap-[7.5px]  mt-[16px]">
            <div><Checkbox /></div>
            (필수) 개인정보 수집 및 이용에 대한 동의
          </div>
          <div className="flex justify-center items-center gap-[7.5px]  mt-[16px]">
            <div><Checkbox /></div>
            <div>(필수) 만 14세 이상입니다.</div>
          </div>
          <div className="flex justify-center items-center gap-[7.5px]  mt-[16px]">
            <div><Checkbox /></div>
            <div>(선택) 이벤트 정보 알림 수신에 동의합니다.</div>
          </div>
        </div>
      </div>
      <button
        // onSubmit={handleSignup}
        className="w-[292px] h-[52px] mt-[32px] bg-[#393F7B] rounded text-white"
      >
        다음
      </button>
    </section>
  );
} 