/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 22:55:09
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-19 23:15:53
 * @FilePath: src/components/active-filters-display.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
'use client';

import React from "react";
import {FiX} from "react-icons/fi";

interface ActiveFiltersDisplayProps {
  searchTerm: string;
  dateRange: { start: string; end: string };
  onSearchClear: () => void;
  onDateStartClear: () => void;
  onDateEndClear: () => void;
  hasActiveFilters: boolean;
}

const ActiveFiltersDisplay: React.FC<ActiveFiltersDisplayProps> = ({
                                                                     searchTerm,
                                                                     dateRange,
                                                                     onSearchClear,
                                                                     onDateStartClear,
                                                                     onDateEndClear,
                                                                     hasActiveFilters
                                                                   }) => {
  if (!hasActiveFilters) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {searchTerm && (
        <div className="badge badge-lg flex items-center gap-2">
          <span>搜索: {searchTerm}</span>
          <button onClick={onSearchClear} className="btn btn-xs btn-circle btn-ghost">
            <FiX/>
          </button>
        </div>
      )}
      {dateRange.start && (
        <div className="badge badge-lg flex items-center gap-2">
          <span>从: {dateRange.start}</span>
          <button
            onClick={onDateStartClear}
            className="btn btn-xs btn-circle btn-ghost"
          >
            <FiX/>
          </button>
        </div>
      )}
      {dateRange.end && (
        <div className="badge badge-lg flex items-center gap-2">
          <span>到: {dateRange.end}</span>
          <button
            onClick={onDateEndClear}
            className="btn btn-xs btn-circle btn-ghost"
          >
            <FiX/>
          </button>
        </div>
      )}
    </div>
  );
};

export default ActiveFiltersDisplay;
