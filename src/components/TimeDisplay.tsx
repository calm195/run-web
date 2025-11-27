/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-27 17:18:35
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:44:31
 * @FilePath: src/components/TimeDisplay.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { formatTimeToHMS } from '@/utils/time';

export interface TimeDisplayProps {
  seconds?: number | null;
  className?: string;
  placeholder?: string;
}

export default function TimeDisplay({
  seconds,
  className = '',
  placeholder = '--:--:--.---',
}: TimeDisplayProps) {
  if (seconds == null || isNaN(seconds)) {
    return <span className={`font-mono ${className}`}>{placeholder}</span>;
  }

  const formatted = formatTimeToHMS(seconds);

  return <span className={`font-mono ${className}`}>{formatted}</span>;
}
