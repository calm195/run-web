/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 16:30:54
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-19 14:46:58
 * @FilePath: src/app/game/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import GameWebViewList from "@/app/game/component/game-list";
import {Suspense} from "react";
import Loading from "@/components/loading";

const EventsPage = () => {

  return (
    <Suspense fallback={<Loading />}>
      <GameWebViewList/>
    </Suspense>
  );
};

export default EventsPage;

