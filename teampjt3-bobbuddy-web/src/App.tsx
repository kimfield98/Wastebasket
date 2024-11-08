import { useState } from 'react';
import { BookOpen, CircleUserRound, House } from "lucide-react"
import { Card } from './components/ui/card/card';
import { Input } from './components/ui/input/input';
import { Button } from './components/ui/button/button';

function App() {
  const [bobLogs, setBobLogs] = useState<string[]>([]);
  const [newBobLog, setNewBobLog] = useState('');

  const addBobLog = () => {
    if (newBobLog.trim()) {
      setBobLogs([...bobLogs, newBobLog]);
      setNewBobLog('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen py-16">
      <header className="fixed top-0 left-0 w-full bg-gray-50 shadow-lg p-4">
        <h1 className="text-2xl font-bold">Bob Buddy</h1>
      </header>

      <main className="flex-grow p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">진행중인 밥로그</h2>
        <Card className="mb-6">
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">꿈을 추가하세요</h3>
            <div>아직 없어요</div>
          </div>
        </Card>

        <h2 className="text-xl font-bold mb-4">밥로그 만들기</h2>
        <Card className="mb-6">
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">꿈을 추가하세요</h3>
            <div className="flex">
              <Input 
                className="flex-grow mr-2" 
                placeholder="꿈을 입력하세요" 
                value={newBobLog}
                onChange={(e) => setNewBobLog(e.target.value)}
              />
              <Button onClick={addBobLog}>추가</Button>
            </div>
          </div>
        </Card>

        {bobLogs.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4">밥로그 쌓아두기</h2>
            <div className="space-y-4">
              {bobLogs.map((dream, index) => (
                <Card key={index} className="p-4">
                  <h3 className="text-lg font-bold mb-2">언젠가</h3>
                  <div className="flex items-center text-sm border-l-4 border-gray-500 px-3 min-h-7">
                    {dream}
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-gray-50 shadow-lg">
        <nav className="flex justify-between px-16 py-3">
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <House size={24} className="text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <BookOpen size={24} className="text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <CircleUserRound size={24} className="text-gray-700" />
          </button>
        </nav>
      </footer>
    </div>
  )
}

export default App