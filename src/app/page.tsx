/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 10:16:57
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-17 19:54:25
 * @FilePath: src/app/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import Stat from "@/components/stat";
import {Suspense} from "react";
import Loading from "@/components/loading";
import StatTable from "@/components/stat/stat-table";
import Greeting from "@/components/greeting";


export default function Home() {
  return (
    <>
      <Greeting/>
      <Suspense fallback={<Loading/>}>
        <div className="flex">
          <StatTable/>
        </div>
      </Suspense>
      <Suspense fallback={<Loading/>}>
        <div className="flex">
          <Stat/>
        </div>
      </Suspense>
    </>
  );
}
