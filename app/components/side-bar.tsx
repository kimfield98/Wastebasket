import Link from 'next/link'
import Image from 'next/image'
import { ThemeSwitcher } from './theme-switcher'
import Footer from './footer'

const navItems = {
  '/': {
    name: 'Home',
  },
  '/blog': {
    name: 'Blog',
  },
}

export function Sidebar() {
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-white dark:bg-neutral-950 shadow-lg flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
              <Image src='/김초원.jpeg' alt='김초원의 프로필 사진' layout="fill" objectFit="cover" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tighter text-center">
              Chowon Kim
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
              Front-end Developer
            </p>
          </div>
          <nav className="space-y-2">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                className="block py-2 px-4 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200"
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="p-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">테마 변경</span>
          <ThemeSwitcher />
        </div>
        <Footer />
      </div>
    </aside>
  )
}