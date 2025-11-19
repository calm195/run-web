/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 09:35:32
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-19 10:58:33
 * @FilePath: src/utils/date.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

export const formatDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (date.getFullYear() === 1) {
      return '-'
    }
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
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
      day: '2-digit'
    });
  } catch {
    return dateString;
  }
};
