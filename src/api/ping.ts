/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 17:59:23
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-16 18:23:49
 * @FilePath: src/api/ping.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
'use client';
import request from "@/utils/request";
import {GameWebViewRsp} from "@/api/model";

export async function ping() {
  return request.get("/ping", { cacheTime: 0 });
}

export async function listGames() {
  return request.get<GameWebViewRsp>("/run/game/list", { cacheTime: 60 });
}
