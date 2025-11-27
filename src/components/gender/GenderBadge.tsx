/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-26 22:06:21
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 15:35:02
 * @FilePath: src/components/gender/GenderBadge.tsx
 * @Description: 性别显示Label
 */

import { GENDER_LABELS, Gender } from '@/data/gender';

interface GenderBadgeProps {
  gender: number;
  className?: string;
}

export default function GenderBadge({
  gender,
  className = '',
}: GenderBadgeProps) {
  const label = GENDER_LABELS[gender] || '未知';
  const color =
    gender === Gender.Male
      ? 'badge-primary'
      : gender === Gender.Female
        ? 'badge-secondary'
        : 'badge-ghost';

  return <span className={`badge ${color} ${className}`}>{label}</span>;
}
