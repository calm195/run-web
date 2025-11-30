/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-22 12:08:15
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-30 16:09:16
 * @FilePath: src/app/game/[id]/GameRecordsClient.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { RecordRsp, GameWebViewRsp } from '@/api/model';
import { deleteRecord, listRecordResults } from '@/api/record';
import EmptyState from '@/components/EmptyState';
import ErrorDisplay from '@/components/ErrorDisplay';
import SearchFilterSection from '@/components/SearchFilterSection';
import {
  calculatePaceMsPerKm,
  DateRange,
  emptyDateRange,
  formatTimeDisplay,
  getTotalTimeMs,
  newDateChange,
} from '@/utils/time';
import { formatDateTime } from '@/utils/date';
import ActiveFilterDisplay from '@/components/ActiveFilterDisplay';
import Link from 'next/link';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import CreateRecord from '@/app/game/[id]/component/CreateRecord';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import EditRecord from '@/app/game/[id]/component/EditRecord';
import TypeBadge from '@/components/TypeBadge';
import { useFilteredRecords } from '@/hooks/useFilteredRecords';
import { useEvents } from '@/hooks/useEvents';
import toast from 'react-hot-toast';

interface GameRecordsClientProps {
  game: GameWebViewRsp;
  initialRecords: RecordRsp[];
  gameId: number;
}

const fetchRecords = (gameId: number) =>
  listRecordResults({ id: gameId }).then(res => res.data || []);

export default function GameRecordsClient({
  game,
  initialRecords,
  gameId,
}: GameRecordsClientProps) {
  const {
    data: records,
    error,
    isLoading,
    mutate,
  } = useSWR(`/game/${gameId}/records`, () => fetchRecords(gameId), {
    fallbackData: initialRecords,
    refreshInterval: 10000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });
  const { events, loading: eventsLoading, error: eventsError } = useEvents();
  const distance: number = events.find(e => e.id === game.type)?.distance || -1;

  const [modal, setModal] = useState<
    | { type: 'create' }
    | { type: 'edit'; record: RecordRsp }
    | { type: 'delete'; record: RecordRsp }
    | null
  >(null);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>(emptyDateRange);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('table');

  const filteredRecords = useFilteredRecords(
    records,
    searchTerm,
    dateRange,
    sortOrder
  );

  const handleDateChange = (field: 'start' | 'end', value: string) =>
    setDateRange(prev => newDateChange(prev, field, value));

  const clearFilters = () => {
    setSearchTerm('');
    setDateRange(emptyDateRange);
    toast.success('清除搜索条件');
  };

  const toggleSort = () =>
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));

  const handleConfirmDelete = async () => {
    if (modal?.type !== 'delete') return;
    try {
      const res = await deleteRecord({ ids: [modal.record.id] });
      if (res.code === 0) await mutate();
      toast.success('删除成绩成功');
    } catch {
      toast.error('删除成绩失败');
    } finally {
      setModal(null);
    }
  };

  if (error) {
    return (
      <ErrorDisplay
        message="加载成绩失败"
        onRetry={async () => {
          const success = await mutate();
          if (success) {
            toast.success('数据刷新成功！');
          }
        }}
      />
    );
  }

  // 加载中
  if (eventsLoading) {
    return <span className={`badge badge-ghost`}>加载中...</span>;
  }

  // 加载错误
  if (eventsError) {
    return <span className={`badge badge-error`}>加载失败</span>;
  }

  const hasActiveFilters = Boolean(
    searchTerm || dateRange.start || dateRange.end
  );

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-primary relative">
        <Link href="/game" className="absolute left-0 text-lg md:text-2xl">
          ← 返回
        </Link>
        <span className="block text-center w-full">{game.name}</span>
        <div className="text-center mt-1">
          <TypeBadge type={game.type} name={game.type_name} />
        </div>
        <button
          className="absolute right-0 btn btn-primary btn-sm md:btn-md"
          onClick={() => setModal({ type: 'create' })}
        >
          <FaPlus className="w-5 h-5 mr-2" />
          添加成绩
        </button>
      </h1>

      {/* 搜索和过滤区域 */}
      <div className="bg-base-100 rounded-xl shadow-lg mb-6">
        <SearchFilterSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          dateRange={dateRange}
          onDateChange={handleDateChange}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
          onViewModeChange={setViewMode}
          viewMode={viewMode}
          totalItems={filteredRecords.length}
          onRefresh={mutate}
          loading={isLoading}
        />
      </div>

      {/* 当前过滤条件显示 */}
      <ActiveFilterDisplay
        searchTerm={searchTerm}
        dateRange={dateRange}
        onSearchClear={() => setSearchTerm('')}
        onDateStartClear={() => setDateRange(prev => ({ ...prev, start: '' }))}
        onDateEndClear={() => setDateRange(prev => ({ ...prev, end: '' }))}
        hasActiveFilters={hasActiveFilters}
      />

      {filteredRecords.length === 0 ? (
        <EmptyState onClearFilters={clearFilters} />
      ) : (
        <div className="overflow-x-auto">
          <div className="mb-4 flex justify-end">
            <button className="btn btn-outline btn-sm" onClick={toggleSort}>
              {sortOrder === 'asc' ? '升序' : '降序'} - 完成用时
            </button>
          </div>
          <table className="table table-zebra w-full">
            <thead>
              <tr className="text-center">
                <th>排名</th>
                <th>选手</th>
                <th>
                  <button className="btn btn-ghost" onClick={toggleSort}>
                    完成用时 {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </th>
                <th>
                  <button className="btn btn-ghost" onClick={toggleSort}>
                    配速 {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </th>
                <th>完成时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredRecords.map((record, index) => {
                const totalTimeMs = getTotalTimeMs(
                  record.hour,
                  record.minute,
                  record.second,
                  record.microsecond
                );

                const paceMsPerKm =
                  distance > 0
                    ? calculatePaceMsPerKm(totalTimeMs, distance)
                    : 0;

                return (
                  <tr key={record.id}>
                    <td>
                      <div className="badge badge-primary badge-outline">
                        {index + 1}
                      </div>
                    </td>
                    <td>{record.name}</td>
                    <td className="font-mono">
                      {formatTimeDisplay(totalTimeMs)}
                    </td>
                    <td className="font-mono">
                      {distance > 0 && paceMsPerKm > 0 ? (
                        formatTimeDisplay(paceMsPerKm)
                      ) : (
                        <span className="opacity-60">—</span>
                      )}
                    </td>
                    <td className="font-mono">
                      {formatDateTime(record.finish)}
                    </td>
                    <td>
                      <div className="flex space-x-2 justify-center">
                        <button
                          className="btn btn-sm btn-outline btn-info"
                          onClick={() => setModal({ type: 'edit', record })}
                          title="编辑"
                        >
                          <FaEdit className="w-3 h-3" />
                        </button>
                        <button
                          className="btn btn-sm btn-outline btn-error"
                          onClick={() => setModal({ type: 'delete', record })}
                          title="删除"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {modal?.type === 'create' && (
        <CreateRecord
          onClose={() => setModal(null)}
          gameId={gameId}
          onSuccess={() => mutate()}
        />
      )}
      {modal?.type === 'edit' && (
        <EditRecord
          isOpen
          onClose={() => setModal(null)}
          record={modal.record}
          onSuccess={() => mutate()}
        />
      )}
      {modal?.type === 'delete' && (
        <DeleteConfirmationModal
          isOpen
          onClose={() => setModal(null)}
          onConfirm={handleConfirmDelete}
          itemName={modal.record.name}
          title="确认删除成绩"
          message="此操作无法撤销，成绩将永久删除。"
          confirmText="确认删除"
          cancelText="取消"
        />
      )}
    </>
  );
}
