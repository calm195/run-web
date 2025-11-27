/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-26 22:00:23
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:36:56
 * @FilePath: src/components/level/LevelSelect.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { LEVEL_OPTIONS } from '@/data/levels';

export default function LevelSelect({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <select
      className="select select-bordered w-full"
      value={value}
      onChange={e => onChange(Number(e.target.value))}
    >
      <option value="-1">全部</option>
      {LEVEL_OPTIONS.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
