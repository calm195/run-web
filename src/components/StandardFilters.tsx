/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-26 22:20:14
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:33:46
 * @FilePath: src/components/StandardFilters.tsx
 * @Description: 运动标准筛选器
 */

import { useState, useEffect } from 'react';
import LevelSelect from '@/components/level/LevelSelect';
import GenderSelect from '@/components/gender/GenderSelect';
import StandardSystemSelect from '@/components/standard-system/StandardSystemSelect';
import EventSelect from '@/components/event/EventSelect';

interface StandardFiltersProps {
  onFilterChange: (filters: {
    level: number;
    gender: number;
    standardSystem: number;
    eventId: number;
  }) => void;
}

export default function StandardFilters({
  onFilterChange,
}: StandardFiltersProps) {
  const [level, setLevel] = useState<number>(-1);
  const [gender, setGender] = useState<number>(-1);
  const [standardSystem, setStandardSystem] = useState<number>(-1);
  const [eventId, setEventId] = useState<number>(-1);

  useEffect(() => {
    onFilterChange({ level, gender, standardSystem, eventId });
  }, [level, gender, standardSystem, eventId, onFilterChange]);

  const clearAll = () => {
    setLevel(-1);
    setGender(-1);
    setStandardSystem(-1);
  };

  return (
    <div className="card bg-base-100 p-4 mb-6 shadow">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="label">
            <span className="label-text">等级</span>
          </label>
          <LevelSelect value={level ?? -1} onChange={e => setLevel(e)} />
        </div>

        <div>
          <label className="label">
            <span className="label-text">性别</span>
          </label>
          <GenderSelect value={gender ?? -1} onChange={e => setGender(e)} />
        </div>

        <div>
          <label className="label">
            <span className="label-text">标准体系</span>
          </label>
          <StandardSystemSelect
            value={standardSystem ?? -1}
            onChange={e => setStandardSystem(e)}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">运动类型</span>
          </label>
          <EventSelect value={eventId ?? -1} onChange={e => setEventId(e)} />
        </div>

        <div className="flex items-end">
          <button
            className="btn btn-ghost btn-sm"
            onClick={clearAll}
            disabled={level === -1 && gender === -1 && standardSystem === -1}
          >
            清除筛选
          </button>
        </div>
      </div>
    </div>
  );
}
