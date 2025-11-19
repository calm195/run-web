/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 22:51:41
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-19 23:13:36
 * @FilePath: src/components/search-filter-section.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import {FiCalendar, FiGrid, FiList, FiRefreshCw, FiSearch, FiX} from "react-icons/fi";
import React from "react";

interface SearchFilterSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  dateRange: { start: string; end: string };
  onDateChange: (field: 'start' | 'end', value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  onViewModeChange: (mode: 'card' | 'table') => void;
  viewMode: 'card' | 'table';
  totalItems: number;
  onRefresh: () => void;
  loading: boolean;
}

const SearchFilterSection: React.FC<SearchFilterSectionProps> = ({
                                                                   searchTerm,
                                                                   onSearchChange,
                                                                   dateRange,
                                                                   onDateChange,
                                                                   onClearFilters,
                                                                   hasActiveFilters,
                                                                   onViewModeChange,
                                                                   viewMode,
                                                                   totalItems,
                                                                   onRefresh,
                                                                   loading
                                                                 }) => {
  // 当前搜索和过滤区域的JSX代码
  return (
    <div className="bg-base-100 rounded-xl shadow-lg p-6 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 搜索框 */}
        <div className="flex flex-col gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="text-gray-400"/>
            </div>
            <input
              type="text"
              placeholder="搜索比赛名称或类型..."
              className="input input-bordered w-full pl-10 h-12 text-lg"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* 日期选择器 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FiCalendar/>
              <span>开始日期</span>
            </div>
            <input
              type="date"
              className="input input-bordered w-full"
              value={dateRange.start}
              onChange={(e) => onDateChange('start', e.target.value)}
            />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FiCalendar/>
              <span>结束日期</span>
            </div>
            <input
              type="date"
              className="input input-bordered w-full"
              value={dateRange.end}
              onChange={(e) => onDateChange('end', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 操作按钮区域 */}
      <div
        className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button
              className={`btn ${viewMode === 'card' ? 'btn-active' : 'btn-outline'} flex items-center gap-2`}
              onClick={() => onViewModeChange('card')}
            >
              <FiGrid/>
              卡片视图
            </button>
            <button
              className={`btn ${viewMode === 'table' ? 'btn-active' : 'btn-outline'} flex items-center gap-2`}
              onClick={() => onViewModeChange('table')}
            >
              <FiList/>
              表格视图
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm">
            共找到 <span className="font-semibold text-primary">{totalItems}</span> 条记录
          </div>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="btn btn-outline btn-sm flex items-center gap-1"
            >
              <FiX/>
              清除过滤
            </button>
          )}

          <button
            onClick={onRefresh}
            className="btn btn-ghost btn-sm flex items-center gap-1"
            disabled={loading}
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''}/>
            刷新
          </button>
        </div>
      </div>
    </div>
  )
};

export default SearchFilterSection;
