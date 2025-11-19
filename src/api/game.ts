/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 09:37:42
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-19 21:24:45
 * @FilePath: src/api/game.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
'use client';

import {GameCreateReq, GameWebViewRsp, ResponseData} from "@/api/model";
import request from "@/utils/request";

export async function listGames() {
  return request.get<ResponseData<GameWebViewRsp[]>>("/run/game/list", { cacheTime: 60 });
}

export async function createGame(data: GameCreateReq) {
  return request.post<ResponseData<null>>("/run/game/create", { params: data });
}
