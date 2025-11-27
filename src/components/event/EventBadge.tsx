/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-27 17:04:00
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:44:32
 * @FilePath: src/components/event/EventBadge.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

'use client';

import { useEvents } from '@/hooks/useEvents';
import { Event } from '@/api/model';

interface EventBadgeProps {
  eventId: number;
  className?: string;
}

function getBadgeStyle(distance: number) {
  if (distance <= 0) {
    return { type: '无效', className: 'badge-neutral' };
  }
  if (distance <= 400) {
    return { type: '短跑', className: 'badge-success' };
  }
  if (distance <= 3000) {
    return { type: '中跑', className: 'badge-info' };
  }
  if (distance <= 10000) {
    return { type: '长跑', className: 'badge-warning' };
  }
  return { type: '超长跑', className: 'badge-error' };
}

export default function EventBadge({
  eventId,
  className = '',
}: EventBadgeProps) {
  const { events, loading: eventsLoading, error: eventsError } = useEvents();

  const event = events.find((e: Event) => e.id === eventId);

  // 加载中
  if (eventsLoading) {
    return <span className={`badge badge-ghost ${className}`}>加载中...</span>;
  }

  // 加载错误
  if (eventsError) {
    return <span className={`badge badge-error ${className}`}>加载失败</span>;
  }

  // 未找到
  if (!event) {
    return <span className={`badge badge-neutral ${className}`}>未知项目</span>;
  }

  // 根据 distance 分类
  const { type, className: typeClass } = getBadgeStyle(event.distance);

  return (
    <span
      className={`badge ${typeClass} ${className}`}
      title={`${event.name} · ${event.distance} 米 · ${type}`}
    >
      {event.name}
    </span>
  );
}
