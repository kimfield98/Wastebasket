import TabBar from '@/components/tab-bar';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='px-5 py-10'>{children}</div>
      <TabBar />
    </div>
  );
}
