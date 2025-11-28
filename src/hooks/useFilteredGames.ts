/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-27 21:55:56
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-28 11:25:23
 * @FilePath: src/hooks/useFilteredGames.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { useMemo } from 'react';
import { GameWebViewRsp } from '@/api/model';
import { DateRange } from '@/utils/time';
import { isDateInRange } from '@/utils/date';

export function useFilteredGames(
  games: GameWebViewRsp[] | undefined,
  searchTerm: string,
  dateRange: DateRange
) {
  return useMemo(() => {
    if (!games?.length) return [];

    let filtered = games.filter(
      game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.type_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (dateRange.start || dateRange.end) {
      const start = dateRange.start ? new Date(dateRange.start) : undefined;
      const end = dateRange.end ? new Date(dateRange.end) : undefined;
      if (start) start.setHours(0, 0, 0, 0);
      if (end) end.setHours(23, 59, 59, 999);
      filtered = filtered.filter(
        game =>
          isDateInRange(game.created_at, start, end) ||
          isDateInRange(game.updated_at, start, end)
      );
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [games, searchTerm, dateRange]);
}
