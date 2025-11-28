/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-27 21:50:54
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 21:56:21
 * @FilePath: src/hooks/useFilteredRecords.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { RecordRsp } from '@/api/model';
import { DateRange } from '@/utils/time';
import { isDateInRange } from '@/utils/date';
import { useMemo } from 'react';

export function useFilteredRecords(
  records: RecordRsp[] | undefined,
  searchTerm: string,
  dateRange: DateRange,
  sortOrder: 'asc' | 'desc'
) {
  return useMemo(() => {
    if (!records?.length) return [];

    let filtered = records.filter(r =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (dateRange.start || dateRange.end) {
      const start = dateRange.start ? new Date(dateRange.start) : undefined;
      const end = dateRange.end ? new Date(dateRange.end) : undefined;
      if (start) start.setHours(0, 0, 0, 0);
      if (end) end.setHours(23, 59, 59, 999);
      filtered = filtered.filter(r => isDateInRange(r.created_at, start, end));
    }

    return filtered.sort((a, b) => {
      const timeA =
        a.hour * 3600 + a.minute * 60 + a.second + (a.microsecond || 0) / 1000;
      const timeB =
        b.hour * 3600 + b.minute * 60 + b.second + (b.microsecond || 0) / 1000;
      return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
    });
  }, [records, searchTerm, dateRange, sortOrder]);
}
