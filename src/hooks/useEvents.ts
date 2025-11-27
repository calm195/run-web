/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-27 15:51:57
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 15:58:21
 * @FilePath: src/hooks/useEvents.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { useEffect } from 'react';
import { listEvent } from '@/api/event';
import { useEventStore } from '@/store/eventStore';

let isFetching = false; // 防止并发请求

export function useEvents() {
  const { events, initialized, loading, error } = useEventStore();

  useEffect(() => {
    if (initialized || isFetching || loading) {
      return; // 已初始化、正在加载、或已在请求中，直接退出
    }

    isFetching = true;
    useEventStore.getState().setLoading(true);
    useEventStore.getState().setError(null);

    listEvent()
      .then(res => {
        const eventData = res.data || [];
        useEventStore.getState().setEvents(eventData);
        useEventStore.getState().setInitialized(true);
      })
      .catch(err => {
        const msg = err instanceof Error ? err.message : '加载失败';
        useEventStore.getState().setError(msg);
        console.error('Failed to fetch events:', err);
      })
      .finally(() => {
        isFetching = false;
        useEventStore.getState().setLoading(false);
      });
  }, [initialized, loading]);

  return {
    events,
    loading,
    error,
  };
}
