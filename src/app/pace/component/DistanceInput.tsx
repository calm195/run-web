/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-22 17:19:42
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 17:52:42
 * @FilePath: src/app/pace/component/DistanceInput.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import {FC, useState, useEffect} from 'react';

interface DistanceInputProps {
  unit: 'km' | 'mile';
  distanceKm: string;
  onDistanceChange: (km: string) => void;
  commonDistances: { label: string; km: number }[];
  onQuickSelect: (km: number) => void;
}

const DistanceInput: FC<DistanceInputProps> = ({
                                                 unit,
                                                 distanceKm,
                                                 onDistanceChange,
                                                 commonDistances,
                                                 onQuickSelect,
                                               }) => {
  const [inputValue, setInputValue] = useState('');

  // 当外部 distanceKm 或 unit 变化时，更新输入框（但仅当用户没在输入）
  useEffect(() => {
    if (unit === 'km') {
      setInputValue(distanceKm);
    } else {
      const kmNum = parseFloat(distanceKm);
      if (isNaN(kmNum) || distanceKm === '') {
        setInputValue('');
      } else {
        const miles = kmNum / 1.609344;
        setInputValue(miles.toFixed(3).replace(/\.?0+$/, ''));
      }
    }
  }, [unit, distanceKm]);

  const handleInputChange = (raw: string) => {
    if (!/^\d*\.?\d*$/.test(raw)) return;

    setInputValue(raw); // 立即更新显示

    if (unit === 'km') {
      onDistanceChange(raw);
    } else {
      if (raw === '' || raw === '.') {
        onDistanceChange('');
      } else {
        const miles = parseFloat(raw);
        if (isNaN(miles)) {
          onDistanceChange('');
        } else {
          const km = miles * 1.609344;
          onDistanceChange(km.toString());
        }
      }
    }
  };

  return (
    <div className="form-control mb-4">
      <label className="label mb-3">
        <span className="label-text">距离 ({unit === 'km' ? '公里' : '英里'})</span>
      </label>
      <input
        type="text"
        inputMode="decimal"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        className="input input-bordered mb-2"
        placeholder={`例如：5 ${unit === 'km' ? '公里' : '英里'}`}
      />
      <div className="flex flex-wrap gap-2">
        {commonDistances.map((d) => (
          <button
            key={d.label}
            type="button"
            className="btn btn-xs btn-outline"
            onClick={() => {
              onQuickSelect(d.km);
              // 快捷选择后，inputValue 会通过 useEffect 更新
            }}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DistanceInput;
