/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-20 20:21:22
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-20 23:37:52
 * @FilePath: src/api/record.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
'use client';

import {RecordRsp, GetReq, ResponseData, RecordCreateReq, RecordEditReq, DeleteReq} from "@/api/model";
import request from "@/utils/request";

export async function listRecordResults(params: GetReq) {
  return request.get<ResponseData<RecordRsp[]>>("/run/record/list", {
    params,
    cacheTime: 60
  });
}

export async function createRecord(data: RecordCreateReq) {
  return request.post<ResponseData<null>>("/run/record/create", {params: data});
}

export async function editRecord(data: RecordEditReq) {
  return request.put<ResponseData<null>>("/run/record/edit", {params: data});
}

export async function deleteRecord(id: DeleteReq) {
  return request.delete<ResponseData<null>>("/run/record/delete", {params: id});
}
