/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-26 22:03:12
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:03:11
 * @FilePath: src/components/standard-system/StandardSystemBadge.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { STANDARD_SYSTEM_LABELS } from '@/data/standardSystem';

interface StandardSystemBadgeProps {
  system: number;
  className?: string;
}

export default function StandardSystemBadge({
  system,
  className = '',
}: StandardSystemBadgeProps) {
  const label = STANDARD_SYSTEM_LABELS[system] || '未知标准';

  const colorMap: Record<number, string> = {
    1: 'badge-primary',
    2: 'badge-secondary',
    3: 'badge-accent',
    4: 'badge-success',
  };

  return (
    <span className={`badge ${colorMap[system] || 'badge-ghost'} ${className}`}>
      {label}
    </span>
  );
}
