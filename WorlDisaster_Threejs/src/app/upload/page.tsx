import LeftSidebar from "../components/LeftSidebar"

export default function Upload() {
  return (
    <>
      <main className='flex flex-row'>
        <LeftSidebar />
        <section className='main-container'>
          <div className='w-full max-w-7xl'>동영상 업로드 페이지 입니다.</div>
        </section>
      </main>
    </>
  )
}