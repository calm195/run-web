/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-22 17:20:12
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 17:31:29
 * @FilePath: src/app/pace/component/PaceInput.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { FC } from 'react';

interface PaceInputProps {
  unit: 'km' | 'mile';
  paceMin: string;
  paceSec: string;
  paceMs: string;
  onMinChange: (val: string) => void;
  onSecChange: (val: string) => void;
  onMsChange: (val: string) => void;
}

const PaceInput: FC<PaceInputProps> = ({
  unit,
  paceMin,
  paceSec,
  paceMs,
  onMinChange,
  onSecChange,
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
        <span className="label-text">
          配速 ({unit === 'km' ? '每公里' : '每英里'})
        </span>
      </label>
      <div className="flex gap-1">
        <input
          type="text"
          inputMode="numeric"
          value={paceMin}
          onChange={e => handleNumber(e.target.value, 3, onMinChange)}
          className="input input-bordered text-center w-16"
          placeholder="分"
        />
        <input
          type="text"
          inputMode="numeric"
          value={paceSec}
          onChange={e => handleNumber(e.target.value, 2, onSecChange)}
          className="input input-bordered text-center w-16"
          placeholder="秒"
        />
        <input
          type="text"
          inputMode="numeric"
          value={paceMs.padEnd(3, '0').substring(0, 3)}
          onChange={e => handleMs(e.target.value)}
          className="input input-bordered text-center w-20 font-mono"
          placeholder="毫秒"
        />
      </div>
    </div>
  );
};

export default PaceInput;
