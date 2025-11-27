/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-27 17:04:09
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:33:55
 * @FilePath: src/components/event/EventSelect.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

'use client';

import { useEvents } from '@/hooks/useEvents';
import { Event } from '@/api/model';

interface EventSelectProps {
  value: number;
  onChange: (eventId: number) => void;
}

export default function EventSelect({ value, onChange }: EventSelectProps) {
  const { events, loading, error } = useEvents();

  return (
    <select
      className={`select select-bordered w-full`}
      value={value ?? ''}
      onChange={e => onChange(Number(e.target.value))}
    >
      <option value="-1">全部</option>
      {loading ? (
        <option disabled>加载中...</option>
      ) : error ? (
        <option disabled>加载失败</option>
      ) : (
        events.map((event: Event) => (
          <option key={event.id} value={event.id}>
            {event.name} ({event.distance}m)
          </option>
        ))
      )}
    </select>
  );
}
