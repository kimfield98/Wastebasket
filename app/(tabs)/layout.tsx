import TabBar from '@/components/tab-bar';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='px-5 pt-10 pb-24'>{children}</div>
      <TabBar />
    </div>
  );
}
