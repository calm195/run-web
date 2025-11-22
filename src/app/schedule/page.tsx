/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-18 17:34:36
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 16:49:11
 * @FilePath: src/app/schedule/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

'use client';

import { useState, useEffect } from 'react';
import {
  FaRunning,
  FaCalendarAlt,
  FaCheck,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaEdit,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import { BiDumbbell } from 'react-icons/bi';
import {SportTypeOptions} from "@/data/sport-type";

// 默认选中 5km（value = 10）
const DEFAULT_SPORT_VALUE = 10;

// ====== 各距离的默认训练计划模板 ======
const generatePlans = (distance: number) => {
  if (distance <= 400) {
    // 短跑
    return [
      { type: '起跑训练', description: '10组30米起跑，注重反应与爆发' },
      { type: '速度训练', description: '6组60米冲刺，全力输出' },
      { type: '休息', description: '完全休息' },
      { type: '弯道技术', description: '200米弯道跑 x 5，注意身体倾斜' },
      { type: '核心力量', description: '平板支撑、药球抛掷等 30 分钟' },
      { type: '加速跑', description: '80米渐进加速 x 6' },
      { type: '拉伸恢复', description: '动态+静态拉伸 20 分钟' },
    ];
  } else if (distance <= 1600) {
    // 中跑
    return [
      { type: '轻松跑', description: '4公里轻松跑' },
      { type: '间歇跑', description: '8x400m @ 目标配速，休息90秒' },
      { type: '休息', description: '完全休息或泡沫轴放松' },
      { type: '节奏跑', description: '5公里，中段3公里节奏配速' },
      { type: '力量训练', description: '下肢+核心 40 分钟' },
      { type: '长间歇', description: '3x800m @ 5K 配速，休息2分钟' },
      { type: '恢复跑', description: '3公里非常轻松' },
    ];
  } else if (distance <= 10000) {
    // 5K/10K
    return [
      { type: '轻松跑', description: '6公里轻松跑' },
      { type: '间歇跑', description: '6x1000m @ 5K 配速，400m 慢跑恢复' },
      { type: '休息', description: '完全休息' },
      { type: '节奏跑', description: '8公里，中间5公里节奏配速' },
      { type: '交叉训练', description: '骑行或游泳 45 分钟' },
      { type: '长距离跑', description: '12公里稳定配速' },
      { type: '恢复跑', description: '4公里轻松' },
    ];
  } else if (distance <= 21098) {
    // 半马
    return [
      { type: '轻松跑', description: '8公里轻松跑' },
      { type: '乳酸阈值', description: '2km热身 + 6km阈值跑 + 2km冷身' },
      { type: '休息', description: '完全休息' },
      { type: '节奏跑', description: '10公里，中间6公里节奏配速' },
      { type: '力量训练', description: '全身力量 45 分钟' },
      { type: '长距离跑', description: '18公里稳定配速' },
      { type: '恢复跑', description: '5公里轻松' },
    ];
  } else {
    // 全马
    return [
      { type: '轻松跑', description: '10公里轻松跑' },
      { type: '间歇跑', description: '5x1600m @ 10K 配速，慢跑恢复800m' },
      { type: '休息', description: '完全休息' },
      { type: '马拉松配速跑', description: '16公里，中间10公里按目标马拉松配速' },
      { type: '交叉训练', description: '游泳或骑行 60 分钟' },
      { type: '长距离跑', description: '32公里长距离，后5公里模拟比赛' },
      { type: '恢复跑', description: '6公里非常轻松' },
    ];
  }
};

// 图标统一（按星期顺序，与计划解耦）
const ICONS = [
  <FaRunning key="d1" className="text-blue-500" />,
  <BiDumbbell key="d2" className="text-red-500" />,
  <FaCheck key="d3" className="text-green-500" />,
  <FaRunning key="d4" className="text-purple-500" />,
  <BiDumbbell key="d5" className="text-teal-500" />,
  <FaRunning key="d6" className="text-orange-500" />,
  <FaCheck key="d7" className="text-gray-500" />,
];

// ====== 存储键 ======
const WEEK_STORAGE_KEY = 'running-schedule-monday';
const SPORT_TYPE_KEY = 'running-schedule-sport-type';
const CUSTOM_PLANS_PREFIX = 'running-schedule-custom-plans-'; // + sportValue

// ====== 工具函数 ======
const getMonday = (d: Date): Date => {
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d);
  monday.setDate(diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
};

const formatDate = (date: Date): string =>
  date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }).replace(/\s/g, '');

const formatMondayStr = (date: Date): string => date.toISOString().split('T')[0];

const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

export default function RunningSchedulePage() {
  // 状态
  const [monday, setMonday] = useState<Date>(() => getMonday(new Date()));
  const [sportTypeValue, setSportTypeValue] = useState<number>(DEFAULT_SPORT_VALUE);
  const [customPlans, setCustomPlans] = useState<any[]>(() => {
    // 初始化时根据 sportTypeValue 加载对应计划
    const saved = typeof window !== 'undefined'
      ? localStorage.getItem(`${CUSTOM_PLANS_PREFIX}${DEFAULT_SPORT_VALUE}`)
      : null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 7) return parsed;
      } catch {}
    }
    const distance = SportTypeOptions.find(opt => opt.value === DEFAULT_SPORT_VALUE)?.distance || 5000;
    return generatePlans(distance);
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editType, setEditType] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // ====== 1. 从 URL 初始化状态 ======
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const weekParam = urlParams.get('week');
    const sportParam = urlParams.get('sport');

    // 处理 week
    if (weekParam) {
      const date = new Date(weekParam);
      if (!isNaN(date.getTime())) {
        setMonday(getMonday(date));
      }
    } else {
      const savedWeek = localStorage.getItem(WEEK_STORAGE_KEY);
      if (savedWeek) {
        const date = new Date(savedWeek);
        if (!isNaN(date.getTime())) {
          setMonday(getMonday(date));
        }
      }
    }

    // 处理 sport
    let sportVal = DEFAULT_SPORT_VALUE;
    if (sportParam) {
      const parsed = parseInt(sportParam, 10);
      if (SportTypeOptions.some(opt => opt.value === parsed)) {
        sportVal = parsed;
      }
    } else {
      const savedSport = localStorage.getItem(SPORT_TYPE_KEY);
      if (savedSport) {
        const parsed = parseInt(savedSport, 10);
        if (SportTypeOptions.some(opt => opt.value === parsed)) {
          sportVal = parsed;
        }
      }
    }
    setSportTypeValue(sportVal);
  }, []);

  // ====== 2. 当 sportTypeValue 变化时，加载对应计划 ======
  useEffect(() => {
    const loadPlans = () => {
      const storageKey = `${CUSTOM_PLANS_PREFIX}${sportTypeValue}`;
      const saved = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length === 7) {
            setCustomPlans(parsed);
            return;
          }
        } catch {}
      }
      // 否则用默认
      const distance = SportTypeOptions.find(opt => opt.value === sportTypeValue)?.distance || 5000;
      setCustomPlans(generatePlans(distance));
    };
    loadPlans();
  }, [sportTypeValue]);

  // ====== 3. 同步状态到 URL 和 localStorage ======
  useEffect(() => {
    localStorage.setItem(WEEK_STORAGE_KEY, monday.toISOString());
    localStorage.setItem(SPORT_TYPE_KEY, String(sportTypeValue));

    const url = new URL(window.location.href);
    url.searchParams.set('week', formatMondayStr(monday));
    url.searchParams.set('sport', String(sportTypeValue));
    window.history.replaceState(null, '', url.toString());
  }, [monday, sportTypeValue]);

  // ====== 4. 保存自定义计划 ======
  useEffect(() => {
    localStorage.setItem(`${CUSTOM_PLANS_PREFIX}${sportTypeValue}`, JSON.stringify(customPlans));
  }, [customPlans, sportTypeValue]);

  // ====== 操作函数 ======
  const handlePrevWeek = () => setMonday(prev => new Date(prev.getTime() - MS_PER_WEEK));
  const handleNextWeek = () => setMonday(prev => new Date(prev.getTime() + MS_PER_WEEK));
  const handleGoToThisWeek = () => setMonday(getMonday(new Date()));

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value, 10);
    setSportTypeValue(val);
  };

  // ====== 编辑逻辑 ======
  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditType(customPlans[index].type);
    setEditDesc(customPlans[index].description);
  };

  const saveEdit = () => {
    if (editingIndex !== null) {
      const newPlans = [...customPlans];
      newPlans[editingIndex] = { type: editType, description: editDesc };
      setCustomPlans(newPlans);
      setEditingIndex(null);
    }
  };

  const cancelEdit = () => setEditingIndex(null);

  // ====== 生成本周日期 ======
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });

  const daysOfWeek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];

  return (
    <div className="min-h-screen bg-base-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FaRunning className="text-3xl text-primary" />
          <h1 className="text-3xl font-bold">跑步训练课表</h1>
        </div>

        {/* 控制栏：运动类型 + 周导航 */}
        <div className="flex flex-col md:flex-row mb-8">
          {/* 运动类型选择 */}
          <div className="flex-1">
            <label className="label block mb-2">
              <span className="label-text">训练目标</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              value={sportTypeValue}
              onChange={handleSportChange}
            >
              {SportTypeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* 周导航 */}
          <div className="flex items-end gap-2">
            <button onClick={handlePrevWeek} className="btn btn-ghost btn-sm md:btn-md" aria-label="上一周">
              <FaChevronLeft />
            </button>
            <button onClick={handleNextWeek} className="btn btn-ghost btn-sm md:btn-md" aria-label="下一周">
              <FaChevronRight />
            </button>
            <button onClick={handleGoToThisWeek} className="btn btn-ghost btn-sm md:btn-md" aria-label="回到本周">
              <FaHome />
            </button>
            <div className="flex items-center gap-1 ml-2 text-sm md:text-base">
              <FaCalendarAlt className="text-secondary" />
              <span>
                {formatDate(monday)} – {formatDate(new Date(monday.getTime() + 6 * 24 * 60 * 60 * 1000))}
              </span>
            </div>
          </div>
        </div>

        {/* 训练计划卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {weekDays.map((date, index) => {
            const dayName = daysOfWeek[index];
            const plan = customPlans[index];
            const icon = ICONS[index];
            const formattedDate = formatDate(date);
            const isTodayFlag = isToday(date);
            const isWeekendFlag = isWeekend(date);

            return (
              <div
                key={date.toISOString()}
                className={`card shadow-md hover:shadow-lg transition-shadow duration-200 ${
                  isTodayFlag ? 'ring-2 ring-primary' : ''
                } ${isWeekendFlag ? 'bg-base-100/500' : 'bg-base-200'}`}
              >
                <div className="card-body p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="text-xl">{icon}</div>
                      <h2 className={`text-lg font-semibold ${isTodayFlag ? 'text-primary' : ''}`}>
                        {dayName}
                      </h2>
                    </div>
                    <span className="text-sm opacity-70">{formattedDate}</span>
                  </div>

                  {isWeekendFlag && <div className="text-xs text-blue-600 mb-1">周末</div>}

                  {editingIndex === index ? (
                    <div className="space-y-2 mt-2">
                      <input
                        type="text"
                        value={editType}
                        onChange={(e) => setEditType(e.target.value)}
                        className="input input-xs input-bordered w-full"
                        placeholder="训练类型"
                      />
                      <textarea
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        className="textarea textarea-xs textarea-bordered w-full"
                        placeholder="训练描述"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <button onClick={saveEdit} className="btn btn-xs btn-success btn-outline">
                          <FaSave /> 保存
                        </button>
                        <button onClick={cancelEdit} className="btn btn-xs btn-ghost">
                          <FaTimes /> 取消
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="badge badge-outline mb-2">{plan.type}</div>
                      <p className="text-sm opacity-80 flex items-start gap-1">
                        <FaClock className="mt-0.5 flex-shrink-0" /> {plan.description}
                      </p>
                      <button
                        onClick={() => startEdit(index)}
                        className="btn btn-ghost btn-xs mt-2"
                        aria-label="编辑"
                      >
                        <FaEdit className="text-gray-500" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
