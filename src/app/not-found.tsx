/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-17 21:20:35
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-17 21:52:51
 * @FilePath: src/app/not-found.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-base-100 shadow-xl rounded-box p-8 text-center">
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold mt-4">页面未找到</h2>
        </div>
        <p className="text-base-content/80 mb-8">
          哎呀！您查找的页面可能已被移除、更改了名称，或暂时无法访问。
        </p>
        <Link href="/" passHref>
          <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
            返回首页
          </button>
        </Link>
      </div>
    </div>
  );
}
