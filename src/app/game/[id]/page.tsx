/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-20 20:21:42
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 13:20:20
 * @FilePath: src/app/game/[id]/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import type {Metadata} from 'next';
import {listRecordResults} from '@/api/record';
import GameRecordsClient from '@/app/game/[id]/GameRecordsClient';
import {getGame, listGames} from "@/api/game";
import NotFound from "@/app/not-found";
import {GameWebViewRsp, ResponseData} from "@/api/model";

// 启用 ISR：每 60 秒在后台重新生成页面（按需更新）
export const revalidate = 60;

// 允许访问未预生成的动态路由（按需 SSR）
export const dynamicParams = true;

let cachedGamesPromise: Promise<ResponseData<GameWebViewRsp[]>> | null = null;

function getCachedGames() {
  if (!cachedGamesPromise) {
    cachedGamesPromise = listGames().catch((err) => {
      console.warn('Failed to fetch games for static generation:', err);
      return {
        code: -1,
        msg: 'Failed to load games during static generation',
        data: [],
      };
    });
  }
  return cachedGamesPromise;
}

export async function generateStaticParams() {
  const res = await getCachedGames();
  const games = res.data || [];
  return games.map((game) => ({
    id: String(game.id),
  }));
}

export async function generateMetadata({params}: { params: Promise<{ id: string }> }): Promise<Metadata>  {
  const {id} = await params;
  const gameId = Number(id);

  const gameRes = await getGame({id: gameId});

  if (gameRes.code !== 0 || !gameRes.data) {
    return {
      title: '比赛不存在',
      description: '未找到该比赛的详细信息。',
    };
  }

  return {
    title: `${gameRes.data.name} - 成绩管理`,
    description: `查看 ${gameRes.data.name} 的所有参赛成绩与排名。`,
    openGraph: {
      title: gameRes.data.name,
      description: `官方成绩页面 - ${gameRes.data.name}`,
      url: `/game/${id}`,
      type: 'website',
    },
  };
}

export default async function GamePage({params}: { params: Promise<{ id: string }>  }) {
  const {id} = await params;
  const gameId = Number(id);
  if (isNaN(gameId)) NotFound();

  const [gameRes, recordsRes] = await Promise.all([
    getGame({id: gameId}),
    listRecordResults({id: gameId}),
  ]);

  if (gameRes.code !== 0 || !gameRes.data) {
    NotFound();
  }

  const game = gameRes.data;
  const records = recordsRes.data || [];

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4">
        <GameRecordsClient
          game={game}
          initialRecords={records}
          gameId={gameId}
        />
      </div>
    </div>
  );
}
