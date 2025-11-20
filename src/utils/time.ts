/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-20 20:38:58
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-20 23:37:52
 * @FilePath: src/utils/time.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import {RecordRsp} from "@/api/model";

export interface DateRange {
  start: string;
  end: string;
}

export function formatTime(record: RecordRsp): string {
  if (record.hour > 0) {
    return `${record.hour}小时${record.minute}分${record.second}秒`;
  } else if (record.minute > 0) {
    return `${record.minute}分${record.second}秒`;
  } else {
    return `${record.second}.${Math.floor(record.microsecond / 100000)}秒`;
  }
}

export function newDateChange(dateRange: DateRange, field: 'start' | 'end', value: string): DateRange {
  if (field === 'start' && dateRange.end && value > dateRange.end) {
    return dateRange; // 开始日期不能晚于结束日期
  }
  if (field === 'end' && dateRange.start && value < dateRange.start) {
    return dateRange; // 结束日期不能早于开始日期
  }
  return {...dateRange, [field]: value}
}

export const emptyDateRange: DateRange = {
  start: '',
  end: ''
}
