/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-22 17:19:58
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 17:55:47
 * @FilePath: src/app/pace/component/TimeInput.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { FC } from 'react';

interface TimeInputProps {
  h: string;
  m: string;
  s: string;
  ms: string;
  onHChange: (val: string) => void;
  onMChange: (val: string) => void;
  onSChange: (val: string) => void;
  onMsChange: (val: string) => void;
}

const TimeInput: FC<TimeInputProps> = ({
  h,
  m,
  s,
  ms,
  onHChange,
  onMChange,
  onSChange,
  onMsChange,
}) => {
  const handleNumber = (
    val: string,
    maxLen: number,
    setter: (v: string) => void
  ) => {
    if (/^\d*$/.test(val) && val.length <= maxLen) setter(val);
  };

  const handleMs = (val: string) => {
    if (/^\d*$/.test(val) && val.length <= 3) onMsChange(val);
  };

  return (
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">用时 (时:分:秒.毫秒)</span>
      </label>
      <div className="flex gap-1">
        <input
          type="text"
          inputMode="numeric"
          value={h}
          onChange={e => handleNumber(e.target.value, 3, onHChange)}
          className="input input-bordered text-center w-16"
          placeholder="时"
        />
        <input
          type="text"
          inputMode="numeric"
          value={m}
          onChange={e => handleNumber(e.target.value, 2, onMChange)}
          className="input input-bordered text-center w-16"
          placeholder="分"
        />
        <input
          type="text"
          inputMode="numeric"
          value={s}
          onChange={e => handleNumber(e.target.value, 2, onSChange)}
          className="input input-bordered text-center w-16"
          placeholder="秒"
        />
        <input
          type="text"
          inputMode="numeric"
          value={ms.padEnd(3, '0').substring(0, 3)}
          onChange={e => handleMs(e.target.value)}
          className="input input-bordered text-center w-20 font-mono"
          placeholder="毫秒"
        />
      </div>
    </div>
  );
};

export default TimeInput;
