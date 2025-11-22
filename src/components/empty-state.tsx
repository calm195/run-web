/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 22:25:30
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-20 14:41:08
 * @FilePath: src/components/empty-state.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import React from 'react';

interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <div className="text-center py-16 bg-base-100 rounded-xl shadow-lg">
      <div className="text-6xl mb-4">🏆</div>
      <h3 className="text-xl font-semibold mb-2">暂无匹配信息</h3>
      <p className="mb-6">尝试调整搜索条件</p>
      <button onClick={onClearFilters} className="btn">
        清除所有搜索条件
      </button>
    </div>
  );
};

export default EmptyState;
