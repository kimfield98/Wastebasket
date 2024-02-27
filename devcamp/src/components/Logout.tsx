"use client"
import axios from "axios";
import Link from "next/link";
import Image from 'next/image';
import { useUserStore } from "@/stores/userStore";

const LOGOUT_API = "http://13.125.226.155:3000/auth/logout";
const LOGOUT_API2 = "http://13.124.118.158:6583/auth/logout";

export default function LogoutComponent() {

  // `handleSubmit` 사용 제거

  async function handleLogout() {
    const { accessToken, refreshToken } = useUserStore.getState();
    try {
      await axios.post(LOGOUT_API2, {
        accessToken,
        refreshToken
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('로그아웃 성공');
      useUserStore.getState().setAccessToken("");
      // 성공적으로 로그아웃 처리 후 페이지 이동
      window.location.replace("/login");
    } catch (error) {
      console.error(error);
      alert("로그아웃에 실패했습니다. 다시 시도하세요."); // 에러 메시지 개선
    }
  }

  return (
      <section className="flex flex-col justify-center items-center min-h-screen w-[375px] bg-white">
        <div className=''>
          <div className='flex justify-between w-[328px] px-[24px] py-[15.5px]'>
            <div>로그아웃</div>
            <Link href="/">
              <Image
                src={"/assets/x.png"}
                width={24}
                height={24}
                alt={"X"} 
              />
            </Link>
          </div>
          <div className='flex justify-center items-center w-[328px] h-[128px] border-y'>로그아웃 하시겠습니까?</div>
          <div className='flex'>
            <Link href="/mypage">
              <button
                className="w-[140px] h-[52px] mr-[16px] mt-4 border border-[#CACFD7] rounded"
              >
                취소
              </button>
            </Link>
            <button
              onClick={handleLogout} 
              className="w-[140px] h-[52px] mt-4 bg-[#393F7B] rounded text-white font-semibold"
            >
              확인
            </button>
          </div>
        </div>
      </section>
  );
}     