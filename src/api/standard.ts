/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-26 22:09:54
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-26 22:14:30
 * @FilePath: src/api/standard.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import request from '@/utils/request';
import { ResponseData, Standard } from '@/api/model';

export async function listStandard() {
  return request.get<ResponseData<Standard[]>>('/run/standard/list', {
    cacheTime: 60,
  });
}
