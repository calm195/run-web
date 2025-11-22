/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 16:30:54
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 13:06:07
 * @FilePath: src/app/game/page.tsx
 * @Description: 比赛页
 */
import GameWebViewList from "@/app/game/component/game-list";
import {Suspense} from "react";
import LoadingState from "@/components/loading-state";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "比赛中心",
  description: "比赛管理",
};

const GamePage = () => {
  return (
    <Suspense fallback={<LoadingState/>}>
      <GameWebViewList/>
    </Suspense>
  );
};

export default GamePage;

