/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-20 20:21:42
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 11:16:11
 * @FilePath: src/app/game/[id]/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
'use client';

import {listRecordResults, deleteRecord} from '@/api/record';
import {GameWebViewRsp, RecordRsp} from '@/api/model';
import {useParams} from 'next/navigation';
import React, {useEffect, useState} from "react";
import {getGame} from "@/api/game";
import EmptyState from "@/components/empty-state";
import ErrorDisplay from "@/components/error-display";
import LoadingState from "@/components/loading-state";
import SearchFilterSection from "@/components/search-filter-section";
import {DateRange, emptyDateRange, newDateChange} from "@/utils/time";
import {formatDateTime, isDateInRange} from "@/utils/date";
import ActiveFiltersDisplay from "@/components/active-filters-display";
import Link from "next/link";
import {FaPlus, FaTrash} from "react-icons/fa6";
import {FaEdit} from "react-icons/fa";
import CreateRecord from "@/app/game/[id]/component/create-record";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import EditRecord from "@/app/game/[id]/component/edit-record";
import TypeBadge from "@/components/type-badge";

interface ParamsProps {
  id: string;

  [key: string]: string | undefined;
}

export default function GamePage() {
  const params = useParams<ParamsProps>();
  const gameId = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RecordRsp | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [records, setRecords] = useState<RecordRsp[]>([]);
  const [game, setGame] = useState<GameWebViewRsp | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>(emptyDateRange);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  // 删除确认模态框相关状态
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<RecordRsp | null>(null);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(params.type)

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
        const timeA = a.hour * 3600 + a.minute * 60 + a.second + a.microsecond / 1000;
        const timeB = b.hour * 3600 + b.minute * 60 + b.second + b.microsecond / 1000;
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
    const milliseconds = Math.floor(record.microsecond).toString().padStart(3, '0');
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

  // 编辑记录
  const handleEdit = (record: RecordRsp) => {
    setEditingRecord(record);
    setShowEditForm(true);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setEditingRecord(null);
  }

  // 删除记录 - 打开确认模态框
  const handleOpenDeleteModal = (record: RecordRsp) => {
    setRecordToDelete(record);
    setShowDeleteModal(true);
  };

  // 确认删除
  const handleConfirmDelete = async () => {
    if (!recordToDelete) return;

    try {
      setLoading(true);
      const response = await deleteRecord({ids: [recordToDelete.id]});

      if (response.code !== 0) {
        console.log(response.msg);
      }
      fetchRecords().then(); // 重新获取数据
    } catch (err) {
      console.error("删除记录失败:", err);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setRecordToDelete(null);
    }
  };

  // 取消删除
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setRecordToDelete(null);
  };

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

        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-primary relative">
          <Link href="/game" className="absolute left-0 text-lg md:text-2xl">
            ← 返回
          </Link>
          <span className="block text-center w-full">{game?.name}</span>
          <div className="text-center">
            {game && <TypeBadge
              type={game.type}
              name={game.type_name}
            />}
          </div>

          <button
            className="absolute right-0 btn btn-primary btn-sm md:btn-md"
            onClick={() => {setShowCreateForm(true)}}
          >
            <FaPlus className="w-5 h-5 mr-2"/>
            添加成绩
          </button>
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
                {sortOrder === 'asc' ? '升序' : '降序'} - 完成用时
              </button>
            </div>
            <table className="table table-zebra w-full">
              <thead>
              <tr className="text-center">
                <th>排名</th>
                <th>选手</th>
                <th>
                  <button
                    className="btn btn-ghost"
                    onClick={toggleSort}
                  >
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
                  <td className="font-mono">
                    {formatTime(record)}
                  </td>
                  <td className="font-mono">
                    {formatDateTime(record.finish)}
                  </td>
                  <td>
                    <div className="flex space-x-2 justify-center">
                      <button
                        className="btn btn-sm btn-outline btn-info"
                        onClick={() => handleEdit(record)}
                        title="编辑"
                      >
                        <FaEdit className="w-3 h-3" />
                      </button>
                      <button
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => handleOpenDeleteModal(record)}
                        title="删除"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showCreateForm && (
        <CreateRecord
          onClose={() => setShowCreateForm(false)}
          gameId={gameId}
          onSuccess={fetchRecords}
        />
      )}

      {editingRecord && (
        <EditRecord
        isOpen={showEditForm}
        onClose={handleCancelEdit}
        record={editingRecord}
        onSuccess={fetchRecords}
        />
      )}

      {/* 删除确认模态框 */}
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
    </div>
  );
}
