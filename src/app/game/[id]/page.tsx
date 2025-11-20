/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-20 20:21:42
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-20 23:37:52
 * @FilePath: src/app/game/[id]/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
'use client';

import {listRecordResults} from '@/api/record';
import {GameWebViewRsp, RecordRsp} from '@/api/model';
import {useParams} from 'next/navigation';
import React, {useEffect, useState} from "react";
import {getGame} from "@/api/game";
import EmptyState from "@/components/empty-state";
import ErrorDisplay from "@/components/error-display";
import LoadingState from "@/components/loading-state";
import SearchFilterSection from "@/components/search-filter-section";
import {DateRange, emptyDateRange, newDateChange} from "@/utils/time";
import {isDateInRange} from "@/utils/date";
import ActiveFiltersDisplay from "@/components/active-filters-display";

interface ParamsProps {
  id: string;

  [key: string]: string | undefined;
}

export default function GamePage() {
  const params = useParams<ParamsProps>();
  const gameId = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [records, setRecords] = useState<RecordRsp[]>([]);
  const [game, setGame] = useState<GameWebViewRsp | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>(emptyDateRange);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');


  const fetchRecords = async () => {
    try {
      setLoading(true);
      setError(null);

      const [gameRsp, recordsRsp] = await Promise.all([
        getGame({id: gameId}),
        listRecordResults({id: gameId})
      ]);

      if (gameRsp.code !== 0) {
        setError("比赛不存在");
        return;
      }

      setGame(gameRsp.data);
      setRecords(recordsRsp.data || []);
    } catch (err) {
      setError("获取数据失败");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords().then();
  }, []);

  // 时间过滤函数
  const filterByDateRange = (records: RecordRsp[], start?: string, end?: string) => {
    if (!start && !end) return records;

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

    return records.filter(record =>
      isDateInRange(record.created_at, startDate, endDate)
    );
  };

  const getSortedRecords = () => {
    if (!records || records.length === 0 || !Array.isArray(records)) return [];

    return [...records]
      .filter(records =>
        records.name.includes(searchTerm)
      )
      .filter(records =>
        filterByDateRange([records], dateRange.start, dateRange.end).length > 0
      )
      .sort((a, b) => {
        const timeA = a.hour * 3600 + a.minute * 60 + a.second + a.microsecond / 1000000;
        const timeB = b.hour * 3600 + b.minute * 60 + b.second + b.microsecond / 1000000;
        if (sortOrder === 'asc') {
          return timeA - timeB; // 升序：最快时间在前
        } else {
          return timeB - timeA; // 降序：最慢时间在前
        }
      });
  };

  const toggleSort = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // 格式化时间为 HH:MM:SS.mmm 格式
  const formatTime = (record: RecordRsp) => {
    const hours = record.hour.toString().padStart(2, '0');
    const minutes = record.minute.toString().padStart(2, '0');
    const seconds = record.second.toString().padStart(2, '0');
    const milliseconds = Math.floor(record.microsecond / 1000).toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const sortedRecords = getSortedRecords();

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    setDateRange(prevState => (newDateChange(prevState, field, value)));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateRange(emptyDateRange);
  };

  const hasActiveFilters = searchTerm || dateRange.start || dateRange.end;

  if (loading) {
    return <LoadingState/>;
  }

  if (error) {
    return <ErrorDisplay
      message={error}
      onRetry={fetchRecords}
    />;
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4">

        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          {game?.name}
        </h1>

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
            totalItems={sortedRecords.length}
            onRefresh={fetchRecords}
            loading={loading}
          />
        </div>

        {/* 当前过滤条件显示 */}
        <ActiveFiltersDisplay
          searchTerm={searchTerm}
          dateRange={dateRange}
          onSearchClear={() => setSearchTerm('')}
          onDateStartClear={() => setDateRange(prev => ({...prev, start: ''}))}
          onDateEndClear={() => setDateRange(prev => ({...prev, end: ''}))}
          hasActiveFilters={hasActiveFilters !== ''}
        />

        {sortedRecords.length === 0 ? (
          <EmptyState onClearFilters={() => {
          }}/>
        ) : (
          <div className="overflow-x-auto">
            <div className="mb-4 flex justify-end">
              <button
                className="btn btn-outline btn-sm"
                onClick={toggleSort}
              >
                {sortOrder === 'asc' ? '升序' : '降序'} - 完成时间
              </button>
            </div>
            <table className="table table-zebra w-full">
              <thead>
              <tr>
                <th>排名</th>
                <th>选手</th>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={toggleSort}
                  >
                    完成时间 {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </th>
                <th>提交时间</th>
              </tr>
              </thead>
              <tbody>
              {sortedRecords.map((record, index) => (
                <tr key={record.id}>
                  <td>
                    <div className="badge badge-primary badge-outline">
                      {index + 1}
                    </div>
                  </td>
                  <td>{record.name}</td>
                  <td>
                    {formatTime(record)}
                  </td>
                  <td>{new Date(record.created_at).toLocaleDateString('zh-CN')}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
