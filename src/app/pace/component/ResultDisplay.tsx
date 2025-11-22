/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-22 17:20:27
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 17:55:47
 * @FilePath: src/app/pace/component/ResultDisplay.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { FC } from 'react';
import { FaRunning, FaClock } from 'react-icons/fa';
import { PaceCalculatorResult } from '@/app/pace/PaceCalculator';

interface ResultDisplayProps {
  mode: 'timeToPace' | 'paceToTime';
  unit: 'km' | 'mile';
  result: PaceCalculatorResult;
}

const ResultDisplay: FC<ResultDisplayProps> = ({ mode, unit, result }) => {
  return (
    <div className="space-y-3">
      <div className="alert alert-success shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {mode === 'timeToPace' ? (
            <FaRunning className="text-xl" />
          ) : (
            <FaClock className="text-xl" />
          )}
          <div>
            <div className="font-bold">
              {mode === 'timeToPace' ? '配速' : '预估用时'}
            </div>
            <div className="text-lg font-mono">
              {mode === 'timeToPace'
                ? `${result.formatPaceDisplay(result.paceMsPerKm)} /${unit === 'km' ? 'km' : 'mi'}`
                : result.formatTimeDisplay(result.totalTimeMs)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-base-200 p-3 rounded-lg text-center">
          <div className="text-xs opacity-70">速度</div>
          <div className="font-bold">{result.speedKmph.toFixed(2)} km/h</div>
        </div>
        <div className="bg-base-200 p-3 rounded-lg text-center">
          <div className="text-xs opacity-70">Speed</div>
          <div className="font-bold">{result.speedMph.toFixed(2)} mph</div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
