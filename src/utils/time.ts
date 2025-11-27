/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-20 20:38:58
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:18:25
 * @FilePath: src/utils/time.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { RecordRsp } from '@/api/model';

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

export function formatTimeToHMS(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) {
    return '--:--:--.---';
  }

  const totalMs = Math.round(seconds * 1000); // 转为毫秒，避免浮点误差

  const hours = Math.floor(totalMs / (3600 * 1000));
  const minutes = Math.floor((totalMs % (3600 * 1000)) / (60 * 1000));
  const secs = Math.floor((totalMs % (60 * 1000)) / 1000);
  const millis = totalMs % 1000;

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${millis
    .toString()
    .padStart(3, '0')}`;
}

export function newDateChange(
  dateRange: DateRange,
  field: 'start' | 'end',
  value: string
): DateRange {
  if (field === 'start' && dateRange.end && value > dateRange.end) {
    return dateRange; // 开始日期不能晚于结束日期
  }
  if (field === 'end' && dateRange.start && value < dateRange.start) {
    return dateRange; // 结束日期不能早于开始日期
  }
  return { ...dateRange, [field]: value };
}

export const emptyDateRange: DateRange = {
  start: '',
  end: '',
};
