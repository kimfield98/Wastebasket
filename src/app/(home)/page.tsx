import NavigationBar from "../../components/NavigationBar";

export default function Home() {
  return (
    <div className='flex flex-col items-center gap-[15.17px] h-screen relative bg-[#26294C]'>
      <NavigationBar />
      <button className="w-[231.25px] h-[54px] absolute bottom-[107.38px] rounded-[30px] bg-gradient-to-r from-[#5F68FC] to-[#D071FF] text-white font-bold">
        지금 신청하기
      </button>
      <button className="w-[231.25px] h-[54px] absolute bottom-[35.42px] rounded-[30px] border-2 border-[#B3B7BA] text-[#F2F4F7]">
        혜택...이게 끝인가요?
      </button>
    </div>
  );
}