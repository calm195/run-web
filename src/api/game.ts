/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 09:37:42
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-20 16:19:00
 * @FilePath: src/api/game.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
'use client';

import {DeleteReq, GameCreateReq, GameEditReq, GameWebViewRsp, ResponseData} from "@/api/model";
import request from "@/utils/request";

export async function listGames() {
  return request.get<ResponseData<GameWebViewRsp[]>>("/run/game/list", { cacheTime: 60 });
}

export async function createGame(data: GameCreateReq) {
  return request.post<ResponseData<null>>("/run/game/create", { params: data });
}

export async function editGame(data: GameEditReq) {
  return request.put<ResponseData<null>>("/run/game/edit", { params: data });
}

export async function deleteGame(id: DeleteReq) {
  return request.delete<ResponseData<null>>("/run/game/delete", { params: id });
}
