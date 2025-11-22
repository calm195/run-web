/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-22 17:18:56
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 17:31:29
 * @FilePath: src/app/pace/component/ModeToggle.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import {FC} from 'react';

interface ModeToggleProps {
  mode: 'timeToPace' | 'paceToTime';
  onModeChange: (mode: 'timeToPace' | 'paceToTime') => void;
}

const ModeToggle: FC<ModeToggleProps> = ({mode, onModeChange}) => {
  return (
    <div className="tabs tabs-boxed mb-4">
      <button
        className={`tab ${mode === 'timeToPace' ? 'tab-active' : ''}`}
        onClick={() => onModeChange('timeToPace')}
      >
        时间 → 配速
      </button>
      <button
        className={`tab ${mode === 'paceToTime' ? 'tab-active' : ''}`}
        onClick={() => onModeChange('paceToTime')}
      >
        配速 → 时间
      </button>
    </div>
  );
};

export default ModeToggle;
