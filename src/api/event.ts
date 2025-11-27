/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-26 22:30:57
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-26 22:31:41
 * @FilePath: src/api/event.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import request from '@/utils/request';
import { ResponseData, Event } from '@/api/model';

export async function listEvent() {
  return request.get<ResponseData<Event[]>>('/run/event/list', {
    cacheTime: 60,
  });
}
