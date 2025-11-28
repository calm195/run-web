/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 09:36:38
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-28 11:18:25
 * @FilePath: src/app/game/component/GameList.tsx
 * @Description: 比赛列表
 */
'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { listGames } from '@/api/game';
import GameWebViewCard from '@/app/game/component/GameCard';
import GameWebViewTable from '@/app/game/component/GameTable';
import ErrorDisplay from '@/components/ErrorDisplay';
import CreateGame from '@/app/game/component/CreateGame';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import { FaPlus } from 'react-icons/fa6';
import ActiveFilterDisplay from '@/components/ActiveFilterDisplay';
import SearchFilterSection from '@/components/SearchFilterSection';
import { DateRange, emptyDateRange, newDateChange } from '@/utils/time';
import { useFilteredGames } from '@/hooks/useFilteredGames';

const fetchGames = () => listGames().then(res => res.data || []);

export default function GameWebViewList() {
  const {
    data: games,
    error,
    isLoading,
    mutate,
  } = useSWR('/api/games', fetchGames, {
    fallbackData: [],
    refreshInterval: 15000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>(emptyDateRange);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredGames = useFilteredGames(games, searchTerm, dateRange);

  const handleDateChange = (field: 'start' | 'end', value: string) =>
    setDateRange(prev => newDateChange(prev, field, value));

  const clearFilters = () => {
    setSearchTerm('');
    setDateRange(emptyDateRange);
  };

  const hasActiveFilters = Boolean(
    searchTerm || dateRange.start || dateRange.end
  );

  // 如果有错误，显示错误组件
  if (error) {
    return <ErrorDisplay message="加载比赛失败" onRetry={() => mutate()} />;
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* 标题区域 */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text">
            比赛中心
          </h1>
          <button
            className="btn flex items-center justify-center min-w-fit"
            onClick={() => setShowCreateForm(true)}
          >
            <FaPlus className="w-5 h-5 mr-2" />
            添加比赛
          </button>
        </div>
      </div>

      {/* 搜索和过滤区域 */}
      <div className="bg-base-100 rounded-xl shadow-lg mb-6">
        {/* 操作按钮区域 */}
        <SearchFilterSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          dateRange={dateRange}
          onDateChange={handleDateChange}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          onViewModeChange={setViewMode}
          viewMode={viewMode}
          totalItems={filteredGames.length}
          onRefresh={mutate}
          loading={isLoading}
        />

        {/* 当前过滤条件显示 */}
        <ActiveFilterDisplay
          searchTerm={searchTerm}
          dateRange={dateRange}
          onSearchClear={() => setSearchTerm('')}
          onDateStartClear={() => setDateRange(p => ({ ...p, start: '' }))}
          onDateEndClear={() => setDateRange(p => ({ ...p, end: '' }))}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* 加载状态 */}
      {isLoading && !games?.length && <LoadingState />}

      {/* 结果显示 */}
      {!isLoading && (
        <>
          {filteredGames.length === 0 ? (
            <EmptyState onClearFilters={clearFilters} />
          ) : viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map(game => (
                <GameWebViewCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden">
              <GameWebViewTable games={filteredGames} mutate={mutate} />
            </div>
          )}
        </>
      )}

      {showCreateForm && (
        <CreateGame mutate={mutate} onClose={() => setShowCreateForm(false)} />
      )}
    </div>
  );
}
