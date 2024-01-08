import LeftSidebar from "../../components/LeftSidebar"
import RightSidebar from "../../components/RightSidebar"

export default function Disaster() {
  return (
    <>
      <main className='flex flex-row'>
        <LeftSidebar />
        <section className='main-container'>
          <div className='w-full max-w-4xl my-5'>
            <div className='flex flex-1 flex-col justify-start'>
              <h3 className='text-heading4-medium text-light-1'>재난 상세 정보</h3>
              <div className='mt-7 flex w-[350px] flex-col gap-9'>
                <p className='!text-base-regular text-light-3'>No data yet</p>
              </div>
            </div>
          </div>

          <div className='w-full max-w-4xl my-20'>
            <div className='flex flex-1 flex-col justify-start'>
              <h3 className='text-heading4-medium text-light-1'>실시간 영상 및 기사</h3>
              <div className='mt-7 flex w-[350px] flex-col gap-9'>
                <p className='!text-base-regular text-light-3'>No data yet</p>
              </div>
            </div>
          </div>
        </section>
        <RightSidebar />
      </main>
    </>
  )
}