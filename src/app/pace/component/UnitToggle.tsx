/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-22 17:19:24
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 17:31:29
 * @FilePath: src/app/pace/component/UnitToggle.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import {FC} from 'react';

interface UnitToggleProps {
  unit: 'km' | 'mile';
  onUnitChange: (unit: 'km' | 'mile') => void;
  displayDistance: string;
}

const UnitToggle: FC<UnitToggleProps> = ({unit, onUnitChange, displayDistance}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">公里</span>
          <input
            type="checkbox"
            className="toggle toggle-primary mx-2"
            checked={unit === 'mile'}
            onChange={() => onUnitChange(unit === 'km' ? 'mile' : 'km')}
          />
          <span className="label-text">英里</span>
        </label>
      </div>
      <div className="text-sm text-gray-500">
        距离: {displayDistance} {unit === 'km' ? 'km' : 'mi'}
      </div>
    </div>
  );
};

export default UnitToggle;
