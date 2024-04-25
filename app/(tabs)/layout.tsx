import TabBar from '@/components/tab-bar';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='p-10'>{children}</div>
      <TabBar />
    </div>
  );
}
