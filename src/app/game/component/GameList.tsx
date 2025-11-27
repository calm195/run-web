/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 09:36:38
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 20:25:16
 * @FilePath: src/app/game/component/GameList.tsx
 * @Description: 比赛列表
 */
'use client';

import React, { useState, useEffect } from 'react';
import { GameWebViewRsp } from '@/api/model';
import { listGames } from '@/api/game';
import GameWebViewCard from '@/app/game/component/GameCard';
import GameWebViewTable from '@/app/game/component/GameTable';
import { isDateInRange } from '@/utils/date';
import ErrorDisplay from '@/components/ErrorDisplay';
import CreateGame from '@/app/game/component/CreateGame';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import { FaPlus } from 'react-icons/fa6';
import ActiveFilterDisplay from '@/components/ActiveFilterDisplay';
import SearchFilterSection from '@/components/SearchFilterSection';
import { DateRange, emptyDateRange, newDateChange } from '@/utils/time';

const GameWebViewList = () => {
  const [games, setGames] = useState<GameWebViewRsp[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>(emptyDateRange);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchGames().then();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listGames();
      setGames(data.data || []);
    } catch (err) {
      setError('获取数据失败');
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  // 时间过滤函数
  const filterByDateRange = (
    games: GameWebViewRsp[],
    start?: string,
    end?: string
  ) => {
    if (!start && !end) return games;

    let startDate: Date | undefined;
    let endDate: Date | undefined;
    if (start) {
      startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0); // 设置为当天开始时间
    }
    if (end) {
      endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999); // 设置为当天结束时间
    }

    return games.filter(
      game =>
        isDateInRange(game.created_at, startDate, endDate) ||
        isDateInRange(game.updated_at, startDate, endDate)
    );
  };

  // 搜索和时间过滤
  const filteredGameWebViews = Array.isArray(games)
    ? games
        .filter(
          game =>
            game.name.includes(searchTerm) ||
            game.type_name.includes(searchTerm)
        )
        .filter(
          game =>
            filterByDateRange([game], dateRange.start, dateRange.end).length > 0
        )
    : [];

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    setDateRange(prevState => newDateChange(prevState, field, value));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateRange(emptyDateRange);
  };

  const hasActiveFilters = searchTerm || dateRange.start || dateRange.end;

  // 如果有错误，显示错误组件
  if (error) {
    return (
      <ErrorDisplay message={error} onRetry={fetchGames} retryText="重试加载" />
    );
  }

  function refreshData() {
    fetchGames().then();
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* 标题区域 */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text">
              比赛中心
            </h1>
          </div>
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
          hasActiveFilters={hasActiveFilters !== ''}
          onViewModeChange={setViewMode}
          viewMode={viewMode}
          totalItems={filteredGameWebViews.length}
          onRefresh={fetchGames}
          loading={loading}
        />

        {/* 当前过滤条件显示 */}
        <ActiveFilterDisplay
          searchTerm={searchTerm}
          dateRange={dateRange}
          onSearchClear={() => setSearchTerm('')}
          onDateStartClear={() =>
            setDateRange(prev => ({ ...prev, start: '' }))
          }
          onDateEndClear={() => setDateRange(prev => ({ ...prev, end: '' }))}
          hasActiveFilters={hasActiveFilters !== ''}
        />
      </div>

      {/* 加载状态 */}
      {loading && <LoadingState />}

      {/* 结果显示 */}
      {!loading && (
        <>
          {Array.isArray(filteredGameWebViews) &&
          filteredGameWebViews.length === 0 ? (
            <EmptyState onClearFilters={clearFilters} />
          ) : Array.isArray(filteredGameWebViews) && viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGameWebViews.map(game => (
                <GameWebViewCard key={game.id} game={game} />
              ))}
            </div>
          ) : Array.isArray(filteredGameWebViews) ? (
            <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden">
              <GameWebViewTable
                games={filteredGameWebViews}
                onRefresh={fetchGames}
              />
            </div>
          ) : (
            <div className="text-center py-12 bg-base-100 rounded-lg">
              <div className="text-red-500 text-xl">数据格式错误</div>
            </div>
          )}
        </>
      )}

      {/* 创建表单模态框 */}
      {showCreateForm && (
        <CreateGame
          afterSubmit={refreshData}
          onClose={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
};

export default GameWebViewList;
