/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-26 22:23:29
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:19:55
 * @FilePath: src/app/standard/components/StandardCard.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { Standard } from '@/api/model';
import LevelBadge from '@/components/level/LevelBadge';
import GenderBadge from '@/components/gender/GenderBadge';
import StandardSystemBadge from '@/components/standard-system/StandardSystemBadge';
import EventBadge from '@/components/event/EventBadge';
import TimeDisplay from '@/components/TimeDisplay';

export default function StandardCard({ standard }: { standard: Standard }) {
  return (
    <div className="card bg-base-200 p-4 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
        <StandardSystemBadge system={standard.standard_system} />
        <GenderBadge gender={standard.gender} />
        <EventBadge eventId={standard.event_id} />
        <LevelBadge level={standard.level} />
        <TimeDisplay seconds={standard.threshold} />
      </div>
    </div>
  );
}
