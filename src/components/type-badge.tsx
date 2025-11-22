/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-22 10:59:43
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 11:03:47
 * @FilePath: src/components/type-badge.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

interface TypeBadgeProps {
  type: number;
  name: string;
}

const TypeBadge = ({ type, name }: TypeBadgeProps) => {
  const getTypeBadgeColor = (type: number) => {
    const colors = [
      'badge-primary',
      'badge-secondary',
      'badge-accent',
      'badge-info',
      'badge-success',
      'badge-warning',
      'badge-error',
    ];
    return colors[type % colors.length] || 'badge-neutral';
  };

  return <div className={`badge ${getTypeBadgeColor(type)}`}>{name}</div>;
};

export default TypeBadge;
