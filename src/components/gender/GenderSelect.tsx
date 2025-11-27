/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-26 22:06:47
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:36:56
 * @FilePath: src/components/gender/GenderSelect.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { GENDER_OPTIONS, Gender } from '@/data/gender';

export default function GenderSelect({
  value,
  onChange,
  includeUnknown = false,
}: {
  value: number;
  onChange: (val: number) => void;
  includeUnknown?: boolean;
}) {
  const options = includeUnknown
    ? [...GENDER_OPTIONS, { value: Gender.Unknown, label: '未知' }]
    : GENDER_OPTIONS;

  return (
    <select
      className="select select-bordered w-full"
      value={value}
      onChange={e => onChange(Number(e.target.value))}
    >
      <option value="-1">全部</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
