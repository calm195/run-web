/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-22 17:16:41
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 17:55:47
 * @FilePath: src/app/pace/PaceCalculator.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

'use client';

import { useMemo, useState } from 'react';
import { SportTypeOptions } from '@/data/sport-type';
import { FaClock, FaTachometerAlt } from 'react-icons/fa';
import ModeToggle from '@/app/pace/component/ModeToggle';
import UnitToggle from '@/app/pace/component/UnitToggle';
import DistanceInput from '@/app/pace/component/DistanceInput';
import TimeInput from '@/app/pace/component/TimeInput';
import PaceInput from '@/app/pace/component/PaceInput';
import ResultDisplay from '@/app/pace/component/ResultDisplay';

export type PaceCalculatorResult = {
  paceMsPerKm: number;
  totalTimeMs: number;
  speedKmph: number;
  speedMph: number;
  formatPaceDisplay: (ms: number) => string;
  formatTimeDisplay: (ms: number) => string;
};

const PaceCalculator = () => {
  const [mode, setMode] = useState<'timeToPace' | 'paceToTime'>('timeToPace');
  const [unit, setUnit] = useState<'km' | 'mile'>('km');
  const [distanceKm, setDistanceKm] = useState<string>('5');

  // 时间输入
  const [h, setH] = useState<string>('0');
  const [m, setM] = useState<string>('30');
  const [s, setS] = useState<string>('0');
  const [ms, setMs] = useState<string>('000');

  // 配速输入
  const [paceMin, setPaceMin] = useState<string>('5');
  const [paceSec, setPaceSec] = useState<string>('0');
  const [paceMs, setPaceMs] = useState<string>('000');

  // ====== 工具函数（内联在 useMemo 中，或提取为纯函数）======
  const pad = (num: number, size: number): string =>
    num.toString().padStart(size, '0');
  const formatMs = (ms: number) => pad(ms, 3);
  const formatSec = (s: number) => pad(s, 2);

  const formatPaceDisplay = (totalMs: number): string => {
    const min = Math.floor(totalMs / 60000);
    const sec = Math.floor((totalMs % 60000) / 1000);
    const milliseconds = totalMs % 1000;
    return `${min}:${formatSec(sec)}.${formatMs(milliseconds)}`;
  };

  const formatTimeDisplay = (totalMs: number): string => {
    const hours = Math.floor(totalMs / 3600000);
    const minutes = Math.floor((totalMs % 3600000) / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const milliseconds = totalMs % 1000;
    if (hours > 0) {
      return `${hours}:${formatSec(minutes)}:${formatSec(seconds)}.${formatMs(milliseconds)}`;
    }
    return `${minutes}:${formatSec(seconds)}.${formatMs(milliseconds)}`;
  };

  // ====== 核心计算：使用 useMemo ======
  const result = useMemo(() => {
    const distKm = parseFloat(distanceKm);
    if (!distKm || distKm <= 0) return null;

    // 计算总毫秒（时间模式）
    const getTotalTimeMs = (): number => {
      return (
        (parseInt(h) || 0) * 3600000 +
        (parseInt(m) || 0) * 60000 +
        (parseInt(s) || 0) * 1000 +
        (parseInt(ms) || 0)
      );
    };

    // 计算配速总毫秒（配速模式）
    const getPaceTotalMs = (): number => {
      return (
        (parseInt(paceMin) || 0) * 60000 +
        (parseInt(paceSec) || 0) * 1000 +
        (parseInt(paceMs) || 0)
      );
    };

    let paceMsPerKm: number | null = null;
    let totalTimeMs: number | null = null;

    if (mode === 'timeToPace') {
      totalTimeMs = getTotalTimeMs();
      if (!totalTimeMs || totalTimeMs <= 0) return null;
      paceMsPerKm = totalTimeMs / distKm;
    } else {
      paceMsPerKm = getPaceTotalMs();
      if (!paceMsPerKm || paceMsPerKm <= 0) return null;
      totalTimeMs = paceMsPerKm * distKm;
    }

    const speedKmph = paceMsPerKm ? 3600000 / paceMsPerKm : 0;
    const speedMph = speedKmph / 1.609344;

    return {
      paceMsPerKm,
      totalTimeMs,
      speedKmph,
      speedMph,
      formatPaceDisplay,
      formatTimeDisplay,
    };
  }, [mode, distanceKm, h, m, s, ms, paceMin, paceSec, paceMs]);

  // ====== 快捷距离 ======
  const commonDistances = SportTypeOptions.map(opt => ({
    label: opt.label,
    km: opt.distance / 1000,
  }));

  const setDistanceByKm = (km: number) => {
    setDistanceKm(km.toString());
  };

  const displayDistance =
    unit === 'km' ? distanceKm : (parseFloat(distanceKm) / 1.609344).toFixed(3);

  return (
    <div className="card bg-base-100 shadow-xl w-full">
      <div className="card-body">
        <div className="flex items-center gap-3 mb-4">
          <FaTachometerAlt className="text-2xl text-primary" />
          <h2 className="card-title text-xl">配速计算器</h2>
        </div>

        <ModeToggle mode={mode} onModeChange={setMode} />
        <UnitToggle
          unit={unit}
          onUnitChange={setUnit}
          displayDistance={displayDistance}
        />

        <DistanceInput
          unit={unit}
          distanceKm={distanceKm}
          onDistanceChange={setDistanceKm}
          commonDistances={commonDistances}
          onQuickSelect={setDistanceByKm}
        />

        {mode === 'timeToPace' ? (
          <TimeInput
            h={h}
            m={m}
            s={s}
            ms={ms}
            onHChange={setH}
            onMChange={setM}
            onSChange={setS}
            onMsChange={setMs}
          />
        ) : (
          <PaceInput
            unit={unit}
            paceMin={paceMin}
            paceSec={paceSec}
            paceMs={paceMs}
            onMinChange={setPaceMin}
            onSecChange={setPaceSec}
            onMsChange={setPaceMs}
          />
        )}

        {result ? (
          <ResultDisplay mode={mode} unit={unit} result={result} />
        ) : (
          <div className="alert alert-warning shadow-lg">
            <FaClock className="text-xl" />
            <span>请输入有效数据</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaceCalculator;
