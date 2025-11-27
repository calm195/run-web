/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 15:23:52
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:40:37
 * @FilePath: src/components/header.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import ThemeController from '@/components/theme-controller';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';

const menuItems = [
  { href: '/schedule', label: '课表' },
  { href: '/pace', label: '配速计算' },
  { href: '/standard', label: '成绩标准' },
  { href: '/game', label: '比赛' },
];

const Header = () => {
  return (
    <header className="w-full navbar bg-base-300 px-10 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle lg:hidden"
          >
            <AiOutlineMenu className="h-5 w-5" />
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {menuItems.map(item => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/">百鲤跑者协会</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-5">
          {menuItems.map(item => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <AiOutlineSearch className="h-5 w-5" />
        </button>
        <ThemeController />
      </div>
    </header>
  );
};

export default Header;
