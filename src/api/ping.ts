/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 17:59:23
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-19 09:39:32
 * @FilePath: src/api/ping.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import request from "@/utils/request";

export async function ping() {
  return request.get("/ping", { cacheTime: 0 });
}
