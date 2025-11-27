/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-26 22:04:19
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:03:12
 * @FilePath: src/components/standard-system/StandardSystemSelect.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { STANDARD_SYSTEM_OPTIONS } from '@/data/standardSystem';

export default function StandardSystemSelect({
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
      {STANDARD_SYSTEM_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
