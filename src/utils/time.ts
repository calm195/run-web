/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-20 20:38:58
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-30 12:35:11
 * @FilePath: src/utils/time.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

export interface DateRange {
  start: string;
  end: string;
}

const pad = (num: number, size: number): string =>
  num.toString().padStart(size, '0');

const formatMs = (ms: number): string => pad(ms, 3);
const formatSec = (s: number): string => pad(s, 2);

export const formatPaceDisplay = (totalMs: number): string => {
  const min = Math.floor(totalMs / 60000);
  const sec = Math.floor((totalMs % 60000) / 1000);
  const milliseconds = totalMs % 1000;
  return `${min}:${formatSec(sec)}.${formatMs(milliseconds)}`;
};

export const formatTimeDisplay = (totalMs: number): string => {
  const hours = Math.floor(totalMs / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);
  const milliseconds = totalMs % 1000;

  if (hours > 0) {
    return `${hours}:${formatSec(minutes)}:${formatSec(seconds)}.${formatMs(milliseconds)}`;
  }
  if (minutes > 0) {
    return `${minutes}:${formatSec(seconds)}.${formatMs(milliseconds)}`;
  }
  return `${formatSec(seconds)}.${formatMs(milliseconds)}`;
};

export function formatTimeToHMS(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) {
    return '--:--:--.---';
  }

  const totalMs = Math.round(seconds * 1000); // 转为毫秒，避免浮点误差

  return formatTimeDisplay(totalMs);
}

export function getTotalTimeMs(
  h: number | string,
  m: number | string,
  s: number | string,
  ms: number | string
): number {
  if (typeof h === 'string') h = parseInt(h);
  if (typeof m === 'string') m = parseInt(m);
  if (typeof s === 'string') s = parseInt(s);
  if (typeof ms === 'string') ms = parseInt(ms);
  return (h || 0) * 3600000 + (m || 0) * 60000 + (s || 0) * 1000 + (ms || 0);
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
