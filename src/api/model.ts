/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 18:19:00
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-20 21:57:32
 * @FilePath: src/api/model.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

export interface ResponseData<T> {
  code: number;
  msg: string;
  data: T;
}

export interface GetReq {
  id: number;
}

export interface DeleteReq {
  ids: [number];
}

export interface GameWebViewRsp {
  id: number;
  name: string;
  type: number;
  type_name: string;
  created_at: string;
  updated_at: string;
}

export interface GameCreateReq {
  name: string;
  type: number;
}

export interface GameEditReq {
  id: number;
  name: string;
  type: number;
}

export interface RecordRsp {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  hour: number;
  minute: number;
  second: number;
  microsecond: number;
  finish: string;
}

export interface RecordCreateReq {
  name: string;
  hour: number;
  minute: number;
  second: number;
  microsecond: number;
  finish: string;
}

export interface RecordEditReq {
  id: number;
  name: string;
  hour: number;
  minute: number;
  second: number;
  microsecond: number;
  finish: string;
}
