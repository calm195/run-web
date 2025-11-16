/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 15:23:52
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-16 16:53:01
 * @FilePath: src/components/header.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import ThemeController from "@/components/theme-controller";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full navbar bg-base-300 px-4 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/>
            </svg>
          </div>
          <ul
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link href="/">首页</Link></li>
            <li><Link href="/game">比赛</Link></li>
          </ul>
        </div>
        <Link href="/">首页</Link>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">百鲤跑者协会</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
        <ThemeController/>
      </div>
    </header>
  )
}

export default Header;
