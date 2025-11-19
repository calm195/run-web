/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 09:36:38
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-19 22:06:54
 * @FilePath: src/app/game/component/game-list.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
'use client';

import React, {useState, useEffect} from 'react';
import {GameWebViewRsp} from "@/api/model";
import {listGames} from "@/api/game";
import GameWebViewCard from '@/app/game/component/game-card';
import GameWebViewTable from '@/app/game/component/game-table';
import {isDateInRange} from "@/utils/date";
import {FiSearch, FiCalendar, FiX, FiRefreshCw, FiGrid, FiList, FiLoader} from 'react-icons/fi';
import ErrorDisplay from '@/components/error-display';
import CreateGame from "@/app/game/component/create-game";

const GameWebViewList = () => {
  const [games, setGames] = useState<GameWebViewRsp[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });
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
      setError('获取游戏数据失败');
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  // 时间过滤函数
  const filterByDateRange = (games: GameWebViewRsp[], start?: string, end?: string) => {
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

    return games.filter(game =>
      isDateInRange(game.created_at, startDate, endDate) ||
      isDateInRange(game.updated_at, startDate, endDate)
    );
  };

  // 搜索和时间过滤
  const filteredGameWebViews = Array.isArray(games)
    ? games
      .filter(game =>
        game.name.includes(searchTerm) ||
        game.type_name.includes(searchTerm)
      )
      .filter(game =>
        filterByDateRange([game], dateRange.start, dateRange.end).length > 0
      )
    : [];

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateRange({start: '', end: ''});
  };

  const hasActiveFilters = searchTerm || dateRange.start || dateRange.end;

  // 如果有错误，显示错误组件
  if (error) {
    return <ErrorDisplay
      message={error}
      onRetry={fetchGames}
      retryText="重试加载"
    />;
  }

  function refreshData() {
    fetchGames().then()
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* 标题区域 */}
      <div className="mb-8">
        <h1
          className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text">
          比赛中心
        </h1>
        <p className="text-gray-600 mt-2">管理您的比赛项目</p>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateForm(true)}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          添加比赛
        </button>
      </div>

      {/* 搜索和过滤区域 */}
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
                onChange={(e) => setSearchTerm(e.target.value)}
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
                onChange={(e) => handleDateChange('start', e.target.value)}
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
                onChange={(e) => handleDateChange('end', e.target.value)}
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
                onClick={() => setViewMode('card')}
              >
                <FiGrid/>
                卡片视图
              </button>
              <button
                className={`btn ${viewMode === 'table' ? 'btn-active' : 'btn-outline'} flex items-center gap-2`}
                onClick={() => setViewMode('table')}
              >
                <FiList/>
                表格视图
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm">
              共找到 <span className="font-semibold text-primary">{filteredGameWebViews.length}</span> 条记录
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="btn btn-outline btn-sm flex items-center gap-1"
              >
                <FiX/>
                清除过滤
              </button>
            )}

            <button
              onClick={fetchGames}
              className="btn btn-ghost btn-sm flex items-center gap-1"
              disabled={loading}
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''}/>
              刷新
            </button>
          </div>
        </div>

        {/* 当前过滤条件显示 */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {searchTerm && (
              <div className="badge badge-primary badge-lg flex items-center gap-2">
                <span>搜索: {searchTerm}</span>
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn btn-xs btn-circle btn-ghost"
                >
                  <FiX/>
                </button>
              </div>
            )}
            {dateRange.start && (
              <div className="badge badge-secondary badge-lg flex items-center gap-2">
                <span>从: {dateRange.start}</span>
                <button
                  onClick={() => setDateRange(prev => ({...prev, start: ''}))}
                  className="btn btn-xs btn-circle btn-ghost"
                >
                  <FiX/>
                </button>
              </div>
            )}
            {dateRange.end && (
              <div className="badge badge-secondary badge-lg flex items-center gap-2">
                <span>到: {dateRange.end}</span>
                <button
                  onClick={() => setDateRange(prev => ({...prev, end: ''}))}
                  className="btn btn-xs btn-circle btn-ghost"
                >
                  <FiX/>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 加载状态 */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center gap-3">
            <FiLoader className="text-primary animate-spin text-4xl"/>
            <span className="text-gray-600">正在加载数据...</span>
          </div>
        </div>
      )}

      {/* 结果显示 */}
      {!loading && (
        <>
          {Array.isArray(filteredGameWebViews) && filteredGameWebViews.length === 0 ? (
            <div className="text-center py-16 bg-base-100 rounded-xl shadow-lg">
              <div className="text-gray-400 text-6xl mb-4">
                🏆
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">暂无匹配的比赛信息</h3>
              <p className="text-gray-500 mb-6">尝试调整搜索条件或时间范围</p>
              <button
                onClick={clearFilters}
                className="btn btn-primary"
              >
                清除所有过滤条件
              </button>
            </div>
          ) : Array.isArray(filteredGameWebViews) && viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGameWebViews.map((game) => (
                <GameWebViewCard key={game.id} game={game}/>
              ))}
            </div>
          ) : Array.isArray(filteredGameWebViews) ? (
            <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden">
              <GameWebViewTable games={filteredGameWebViews}/>
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
