/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 16:30:54
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-20 14:37:47
 * @FilePath: src/app/game/page.tsx
 * @Description: 比赛页
 */
import GameWebViewList from "@/app/game/component/game-list";
import {Suspense} from "react";
import Loading from "@/components/loading";

const GamePage = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <GameWebViewList/>
    </Suspense>
  );
};

export default GamePage;

