/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-27 11:47:17
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:10:16
 * @FilePath: src/store/eventStore.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Event } from '@/api/model';

interface EventState {
  events: Event[];
  initialized: boolean;
  loading: boolean;
  error: string | null;
  setEvents: (events: Event[]) => void;
  setInitialized: (init: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useEventStore = create<EventState>()(
  persist(
    set => ({
      events: [],
      initialized: false,
      loading: false,
      error: null,
      setEvents: events => set({ events }),
      setInitialized: initialized => set({ initialized }),
      setLoading: loading => set({ loading }),
      setError: error => set({ error }),
    }),
    {
      name: 'event-storage',
      partialize: state => ({
        events: state.events,
        initialized: state.initialized,
      }),
    }
  )
);
