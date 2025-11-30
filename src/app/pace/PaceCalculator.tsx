/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-22 17:16:41
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-30 12:35:11
 * @FilePath: src/app/pace/PaceCalculator.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

'use client';

import React, { useMemo, useState } from 'react';
import { FaClock, FaTachometerAlt } from 'react-icons/fa';
import ModeToggle from '@/app/pace/component/ModeToggle';
import UnitToggle from '@/app/pace/component/UnitToggle';
import DistanceInput from '@/app/pace/component/DistanceInput';
import TimeInput from '@/app/pace/component/TimeInput';
import PaceInput from '@/app/pace/component/PaceInput';
import ResultDisplay from '@/app/pace/component/ResultDisplay';
import { useEvents } from '@/hooks/useEvents';
import {
  formatPaceDisplay,
  formatTimeDisplay,
  getTotalTimeMs,
} from '@/utils/time';

export type PaceCalculatorResult = {
  paceMsPerKm: number;
  paceMsPerMile: number;
  totalTimeMs: number;
  speedKmph: number;
  speedMph: number;
  formatPaceDisplay: (ms: number) => string;
  formatTimeDisplay: (ms: number) => string;
};

const PaceCalculator = () => {
  const KM_PER_MILE = 1.609344;
  const { events, loading: eventsLoading, error: eventsError } = useEvents();

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

  const result = useMemo(() => {
    const distKm = parseFloat(distanceKm);
    if (!distKm || distKm <= 0) return null;

    const distMiles = distKm / KM_PER_MILE;

    const getTotalPaceMs = (): number => {
      return (
        (parseInt(paceMin) || 0) * 60000 +
        (parseInt(paceSec) || 0) * 1000 +
        (parseInt(paceMs) || 0)
      );
    };

    let paceMsPerKm: number | null = null;
    let paceMsPerMile: number | null = null;
    let totalTimeMs: number | null = null;

    if (mode === 'timeToPace') {
      totalTimeMs = getTotalTimeMs(h, m, s, ms);
      if (!totalTimeMs || totalTimeMs <= 0) return null;

      if (unit === 'km') {
        paceMsPerKm = totalTimeMs / distKm;
        paceMsPerMile = paceMsPerKm * KM_PER_MILE;
      } else {
        paceMsPerMile = totalTimeMs / distMiles;
        paceMsPerKm = paceMsPerMile / KM_PER_MILE;
      }
    } else {
      const inputPaceMs = getTotalPaceMs();
      if (!inputPaceMs || inputPaceMs <= 0) return null;

      if (unit === 'km') {
        paceMsPerKm = inputPaceMs;
        paceMsPerMile = paceMsPerKm * KM_PER_MILE;
      } else {
        paceMsPerMile = inputPaceMs;
        paceMsPerKm = paceMsPerMile / KM_PER_MILE;
      }

      totalTimeMs = paceMsPerKm * distKm;
    }

    const speedKmph = paceMsPerKm ? 3600000 / paceMsPerKm : 0;
    const speedMph = paceMsPerMile ? 3600000 / paceMsPerMile : 0;

    return {
      paceMsPerKm,
      paceMsPerMile,
      totalTimeMs,
      speedKmph,
      speedMph,
      formatPaceDisplay,
      formatTimeDisplay,
    };
  }, [distanceKm, mode, unit, h, m, s, ms, paceMin, paceSec, paceMs]);
  const commonDistances = events.map(opt => ({
    label: opt.name,
    km: opt.distance / 1000,
  }));

  const setDistanceByKm = (km: number) => {
    setDistanceKm(km.toString());
  };

  const displayDistance =
    unit === 'km' ? distanceKm : (parseFloat(distanceKm) / 1.609344).toFixed(3);

  if (eventsLoading) {
    return <span className="badge badge-ghost">加载运动类型中...</span>;
  }

  if (eventsError) {
    return <span className="badge badge-error">加载运动类型失败</span>;
  }

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
