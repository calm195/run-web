/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 09:35:32
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 10:38:50
 * @FilePath: src/utils/date.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

export const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (date.getFullYear() === 1) {
      return '-';
    }
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return dateString;
  }
};

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch {
    return dateString;
  }
};

export const parseDate = (dateString: string): Date => {
  try {
    return new Date(dateString);
  } catch {
    return new Date();
  }
};

export const isDateInRange = (
  dateString: string,
  startDate?: Date,
  endDate?: Date
): boolean => {
  const date = parseDate(dateString);

  if (startDate && date < startDate) return false;
  return !(endDate && date > endDate);
};

// 转换 RFC3339 到 datetime-local 格式
export function convertRfc3339ToDateTimeLocal(rfc3339String: string): string {
  if (!rfc3339String) return '';
  const date = new Date(rfc3339String);
  if (isNaN(date.getTime())) return '';

  // 转换为本地时区格式
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// 从 datetime-local 转换回 RFC3339
export function convertDateTimeLocalToRfc3339(
  dateTimeLocalString: string
): string {
  if (!dateTimeLocalString) return '';
  // 添加时区信息，转换为 RFC3339
  return new Date(dateTimeLocalString).toISOString();
}
