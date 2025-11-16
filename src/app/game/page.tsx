/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-16 16:30:54
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-16 18:23:48
 * @FilePath: src/app/game/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
'use client';
import {listGames, ping} from "@/api/ping";

const EventsPage = () => {

  const events = ['马拉松大赛', '半程跑步比赛', '城市慢跑'] as const;

  async function handleEventClick() {
    let response = await ping();
    console.log('Ping response:', response);

    response = await listGames();
    console.log('List Games response:', response);
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-6">赛事列表</h1>
      <ul>
        {events.map((event) => (
          <li key={event} className="cursor-pointer mb-2 hover:text-blue-600">
            <button onClick={handleEventClick}>
              {event}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;

