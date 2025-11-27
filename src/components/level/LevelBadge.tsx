/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-26 21:58:51
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:03:11
 * @FilePath: src/components/level/LevelBadge.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { LEVEL_LABELS } from '@/data/levels';

interface LevelBadgeProps {
  level: number;
  className?: string;
}

export default function LevelBadge({ level, className = '' }: LevelBadgeProps) {
  const label = LEVEL_LABELS[level] ?? '未知等级';
  const colorMap: Record<number, string> = {
    0: 'badge-neutral',
    1: 'badge-error',
    2: 'badge-primary',
    3: 'badge-secondary',
    4: 'badge-accent',
    5: 'badge-info',
    6: 'badge-ghost',
  };

  return (
    <span className={`badge ${colorMap[level] || 'badge-ghost'} ${className}`}>
      {label}
    </span>
  );
}
