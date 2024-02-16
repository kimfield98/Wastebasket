import Image from 'next/image'
import Link from 'next/link';

export default function Mypage() {
  return (
    <section className="flex flex-col items-center min-h-screen pt-[96px] pb-[74px] bg-white">
      <div className="w-[375px] border-t border-[#E3E8EE] pt-[16px] font-medium">
        <div className="mb-[24px] pl-[20px] text-[14px] text-[#90949C]">
          <span>마이페이지 </span>
          &gt;
          <span className="text-[#111D48]"> 계정 관리</span>
        </div>
        <Link href="/logout">
          <div className="h-[36px] text-[15px] font-bold pl-[20px] text-[#111D48] border-b border-[#E3E8EE]">로그아웃</div>
        </Link>
        <div className="h-[36px] text-[15px] font-bold pl-[20px] text-[#111D48] border-b border-[#E3E8EE] mt-[16px] mb-[86px]">계정 삭제</div>
        <div className="pl-[24px] text-[15px] font-bold text-[#111D48]">고객센터
          <span className="pl-[8px] font-light text-[#90949C]">오전 10시 - 오전 7시 (주말, 공휴일 제외)</span>
        </div>
        <button className="flex justify-center items-center w-[292px] h-[52px] mt-[16px] mb-4 ml-[24px] border border-[#111D48] rounded font-bold">
          <Image
            src={"/Button/kakao-white.png"}
            width={24}
            height={24}
            alt={"카카오 로고"}
          />
          <span className="ml-1">고객센터 문의하기</span>
        </button>
      </div>
    </section>
  );
}