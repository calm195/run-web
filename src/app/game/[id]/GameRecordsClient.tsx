/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-22 12:08:15
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 12:36:18
 * @FilePath: src/app/game/[id]/GameRecordsClient.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
'use client';

import React, {useState} from 'react';
import {RecordRsp, GameWebViewRsp} from '@/api/model';
import {deleteRecord, listRecordResults} from '@/api/record';
import EmptyState from '@/components/empty-state';
import ErrorDisplay from '@/components/error-display';
import SearchFilterSection from '@/components/search-filter-section';
import {DateRange, emptyDateRange, newDateChange} from '@/utils/time';
import {formatDateTime, isDateInRange} from '@/utils/date';
import ActiveFiltersDisplay from '@/components/active-filters-display';
import Link from 'next/link';
import {FaPlus, FaTrash} from 'react-icons/fa6';
import {FaEdit} from 'react-icons/fa';
import CreateRecord from '@/app/game/[id]/component/create-record';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import EditRecord from '@/app/game/[id]/component/edit-record';
import TypeBadge from '@/components/type-badge';

interface GameRecordsClientProps {
  game: GameWebViewRsp;
  initialRecords: RecordRsp[];
  gameId: number;
}

export default function GameRecordsClient({
                                            game,
                                            initialRecords,
                                            gameId,
                                          }: GameRecordsClientProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [records, setRecords] = useState<RecordRsp[]>(initialRecords);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RecordRsp | null>(null);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>(emptyDateRange);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('table');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<RecordRsp | null>(null);

  // 刷新数据（用于创建/编辑/删除后）
  const fetchRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const recordsRes = await listRecordResults({id: gameId});
      setRecords(recordsRes.data || []);
    } catch (err) {
      setError('刷新数据失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 时间过滤函数
  const filterByDateRange = (items: RecordRsp[], start?: string, end?: string): RecordRsp[] => {
    if (!start && !end) return items;

    let startDate: Date | undefined;
    let endDate: Date | undefined;
    if (start) {
      startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0);
    }
    if (end) {
      endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999);
    }

    return items.filter(record =>
      isDateInRange(record.created_at, startDate, endDate)
    );
  };

  const getFilteredAndSortedRecords = () => {
    if (!records || !Array.isArray(records) || records.length === 0) {
      return [];
    }

    let filtered = records.filter(record =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (dateRange.start || dateRange.end) {
      filtered = filterByDateRange(filtered, dateRange.start, dateRange.end);
    }

    return filtered.sort((a, b) => {
      const timeA = a.hour * 3600 + a.minute * 60 + a.second + a.microsecond / 1000;
      const timeB = b.hour * 3600 + b.minute * 60 + b.second + b.microsecond / 1000;
      return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
    });
  };

  const toggleSort = () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');

  const formatTime = (record: RecordRsp) => {
    const hours = record.hour.toString().padStart(2, '0');
    const minutes = record.minute.toString().padStart(2, '0');
    const seconds = record.second.toString().padStart(2, '0');
    const milliseconds = Math.floor(record.microsecond).toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    setDateRange(prevState => newDateChange(prevState, field, value));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateRange(emptyDateRange);
  };

  const hasActiveFilters = Boolean(searchTerm || dateRange.start || dateRange.end);

  const handleEdit = (record: RecordRsp) => {
    setEditingRecord(record);
    setShowEditForm(true);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setEditingRecord(null);
  };

  const handleOpenDeleteModal = (record: RecordRsp) => {
    setRecordToDelete(record);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!recordToDelete) return;

    try {
      setLoading(true);
      const response = await deleteRecord({ids: [recordToDelete.id]});
      if (response.code !== 0) {
        setError(response.msg || '删除失败');
        return;
      }
      await fetchRecords();
    } catch (err) {
      setError('删除记录失败');
      console.error(err);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setRecordToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setRecordToDelete(null);
  };

  const sortedRecords = getFilteredAndSortedRecords();

  if (error) {
    return (
      <ErrorDisplay
        message={error}
        onRetry={fetchRecords}
      />
    );
  }

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-primary relative">
        <Link href="/game" className="absolute left-0 text-lg md:text-2xl">
          ← 返回
        </Link>
        <span className="block text-center w-full">{game.name}</span>
        <div className="text-center mt-1">
          <TypeBadge type={game.type} name={game.type_name}/>
        </div>
        <button
          className="absolute right-0 btn btn-primary btn-sm md:btn-md"
          onClick={() => setShowCreateForm(true)}
        >
          <FaPlus className="w-5 h-5 mr-2"/>
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
        hasActiveFilters={hasActiveFilters}
      />

      {sortedRecords.length === 0 ? (
        <EmptyState onClearFilters={clearFilters}/>
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
              <th>完成时间</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody className="text-center">
            {sortedRecords.map((record, index) => (
              <tr key={record.id}>
                <td>
                  <div className="badge badge-primary badge-outline">
                    {index + 1}
                  </div>
                </td>
                <td>{record.name}</td>
                <td className="font-mono">{formatTime(record)}</td>
                <td className="font-mono">{formatDateTime(record.finish)}</td>
                <td>
                  <div className="flex space-x-2 justify-center">
                    <button
                      className="btn btn-sm btn-outline btn-info"
                      onClick={() => handleEdit(record)}
                      title="编辑"
                    >
                      <FaEdit className="w-3 h-3"/>
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleOpenDeleteModal(record)}
                      title="删除"
                    >
                      <FaTrash className="w-3 h-3"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}

      {showCreateForm && (
        <CreateRecord
          onClose={() => setShowCreateForm(false)}
          gameId={gameId}
          onSuccess={fetchRecords}
        />
      )}

      {showEditForm && editingRecord && (
        <EditRecord
          isOpen={showEditForm}
          onClose={handleCancelEdit}
          record={editingRecord}
          onSuccess={fetchRecords}
        />
      )}

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName={recordToDelete?.name}
        title="确认删除成绩"
        message="此操作无法撤销，成绩将永久删除。"
        confirmText="确认删除"
        cancelText="取消"
      />
    </>
  );
}
