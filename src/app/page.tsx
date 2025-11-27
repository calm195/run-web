/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 10:16:57
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:55:41
 * @FilePath: src/app/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import Stat from '@/components/Stat';
import { Suspense } from 'react';
import StatTable from '@/components/stat/StatTable';
import Greeting from '@/components/Greeting';
import LoadingState from '@/components/LoadingState';

export default function Home() {
  return (
    <>
      <Greeting />
      <Suspense fallback={<LoadingState />}>
        <div className="flex">
          <StatTable />
        </div>
      </Suspense>
      <Suspense fallback={<LoadingState />}>
        <div className="flex">
          <Stat />
        </div>
      </Suspense>
    </>
  );
}
