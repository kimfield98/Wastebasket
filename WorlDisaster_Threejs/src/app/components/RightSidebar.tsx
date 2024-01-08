"use client"

import "../globals.css"

const RightSidebar = () => {

  return (
    <>
    <section className='custom-scrollbar rightsidebar'>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>채팅</h3>
        <div className='mt-7 flex w-[350px] flex-col gap-10'>
          <p className='!text-base-regular text-light-3'>Not Chat yet</p>
        </div>
      </div>
    </section>
    </>
  )
}

export default RightSidebar;