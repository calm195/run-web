/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-17 11:33:59
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-19 19:55:36
 * @FilePath: src/components/stat/stat-table.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import StatItem from '@/components/stat/stat-item';
import React, { useMemo } from 'react';
import { generateExampleData } from '@/utils/calculate';
import Title from '@/components/title';

const StatsTable: React.FC<{ data?: StatData[] }> = ({ data = [] }) => {
  // 如果没有传入数据，则使用默认示例数据
  const statsData: StatData[] = useMemo(() => {
    if (data.length > 0) return data;

    // 默认示例数据
    return generateExampleData(9);
  }, [data]);

  if (statsData.length === 0) {
    return (
      <div className="p-4 max-w-6xl mx-auto text-center">
        <p className="text-gray-500">无数据</p>
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      <Title text={'名人榜'} />
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
          {statsData.map((stat, index) => (
            <StatItem key={index} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsTable;
