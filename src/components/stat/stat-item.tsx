/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-17 11:34:50
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-20 14:41:08
 * @FilePath: src/components/stat/stat-item.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import React from 'react';

const StatItem: React.FC<StatItemProps> = ({stat}) => {
  return (
    <div className="stat place-items-center bg-base-100 p-5 rounded-box">
      <div className="stat-title">{stat.title}</div>
      <div className="text-xl md:text-3xl stat-value">{stat.value}</div>
      <div className="stat-desc">{stat.description}</div>
    </div>
  )
}

export default StatItem;
