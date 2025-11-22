/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-21 20:13:45
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 10:39:03
 * @FilePath: src/app/game/[id]/component/edit-record.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

'use client';

import React, {useState} from 'react';
import {FaTimes, FaEdit} from 'react-icons/fa';
import {RecordEditReq, RecordRsp} from '@/api/model';
import {editRecord} from '@/api/record';
import {convertRfc3339ToDateTimeLocal} from "@/utils/date";

interface EditRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: RecordRsp;
  onSuccess: () => void;
}

export default function EditRecord({
                                     isOpen,
                                     onClose,
                                     record,
                                     onSuccess
                                   }: EditRecordModalProps) {
  const [formData, setFormData] = useState<RecordEditReq>({
    id: record.id,
    name: record.name,
    hour: record.hour,
    minute: record.minute,
    second: record.second,
    microsecond: record.microsecond,
    finish: convertRfc3339ToDateTimeLocal(record.finish),
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value)
    }));

    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '请输入选手姓名';
    }

    if (formData.hour < 0) {
      newErrors.hour = '小时不能为负数';
    }
    if (formData.minute < 0 || formData.minute > 59) {
      newErrors.minute = '分钟必须在0-59之间';
    }
    if (formData.second < 0 || formData.second > 59) {
      newErrors.second = '秒数必须在0-59之间';
    }
    if (formData.microsecond < 0 || formData.microsecond > 999) {
      newErrors.microsecond = '微秒必须在0-999之间';
    }

    // 检查完成用时是否全为0
    if (formData.hour === 0 && formData.minute === 0 && formData.second === 0 && formData.microsecond === 0) {
      newErrors.time = '完成用时不能全为0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // 将时间转换为RFC3339格式
      const rfc3339Finish = new Date(formData.finish).toISOString();

      // 调用API更新记录
      await editRecord({
        ...formData,
        finish: rfc3339Finish
      });

      onSuccess();
      onClose();
    } catch (err) {
      setErrors({submit: err instanceof Error ? err.message : '更新记录失败'});
    } finally {
      setLoading(false);
    }
  };

  const handleTimeChange = (field: 'hour' | 'minute' | 'second' | 'microsecond', value: string) => {
    let numValue = parseInt(value) || 0;

    // 根据字段类型限制数值范围
    if (field === 'hour') {
      numValue = Math.max(0, numValue);
    } else if (field === 'minute' || field === 'second') {
      numValue = Math.max(0, Math.min(59, numValue));
    } else if (field === 'microsecond') {
      numValue = Math.max(0, Math.min(999, numValue));
    }

    setFormData(prev => ({
      ...prev,
      [field]: numValue
    }));

    // 清除对应字段的错误
    if (errors[field] || errors.time) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        delete newErrors.time; // 清除时间全为0的错误
        return newErrors;
      });
    }
  };

  const handleDateChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      finish: value
    }));

    // 清除完成时间字段的错误
    if (errors.finish) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.finish;
        return newErrors;
      });
    }
  };

  return (
    <dialog
      id="edit_record_modal"
      className={`modal ${isOpen ? 'modal-open' : ''}`}
      open={isOpen}
    >
      <div className="modal-box max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">编辑比赛记录</h2>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm hover:bg-base-200 transition-colors"
          >
            <FaTimes size={18}/>
          </button>
        </div>

        {/* 错误提示区域 */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-6">
            {Object.entries(errors).map(([field, message]) => (
              <div key={field} className="alert alert-error mb-2 p-3">
                <span className="text-sm">{message}</span>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 选手姓名 */}
          <div className="form-control">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <label className="label flex-shrink-0">
                <span className="label-text font-medium text-base">选手姓名</span>
              </label>
              <div className="flex-grow w-full">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input input-bordered input-lg w-full ${errors.name ? 'input-error' : ''}`}
                  placeholder="请输入选手姓名"
                />
                {errors.name && <p className="text-error text-sm mt-1">{errors.name}</p>}
              </div>
            </div>
          </div>

          {/* 完成时间 */}
          <div className="form-control">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <label className="label flex-shrink-0">
                <span className="label-text font-medium text-base">完成时间</span>
              </label>
              <div className="flex-grow w-full">
                <input
                  type="datetime-local"
                  value={formData.finish}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className={`input input-bordered input-lg w-full ${errors.finish ? 'input-error' : ''}`}
                />
                {errors.finish && <p className="text-error text-sm mt-1">{errors.finish}</p>}
              </div>
            </div>
          </div>

          {/* 完成用时 - 响应式布局 */}
          <div className="form-control">
            <div className="flex flex-col sm:flex-row items-start sm:items-start gap-3">
              <label className="label flex-shrink-0">
                <span className="label-text font-medium text-base">完成用时</span>
              </label>
              <div className="flex-grow w-full">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-1 text-center">时</span>
                    <input
                      type="number"
                      min="0"
                      value={formData.hour}
                      onChange={(e) => handleTimeChange('hour', e.target.value)}
                      className={`input input-bordered input-sm text-center ${errors.hour ? 'input-error' : ''}`}
                      placeholder="时"
                    />
                    {errors.hour && <p className="text-error text-xs mt-1 text-center">{errors.hour}</p>}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-1 text-center">分</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={formData.minute}
                      onChange={(e) => handleTimeChange('minute', e.target.value)}
                      className={`input input-bordered input-sm text-center ${errors.minute ? 'input-error' : ''}`}
                      placeholder="分"
                    />
                    {errors.minute && <p className="text-error text-xs mt-1 text-center">{errors.minute}</p>}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-1 text-center">秒</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={formData.second}
                      onChange={(e) => handleTimeChange('second', e.target.value)}
                      className={`input input-bordered input-sm text-center ${errors.second ? 'input-error' : ''}`}
                      placeholder="秒"
                    />
                    {errors.second && <p className="text-error text-xs mt-1 text-center">{errors.second}</p>}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-1 text-center">微秒</span>
                    <input
                      type="number"
                      min="0"
                      max="999"
                      value={formData.microsecond}
                      onChange={(e) => handleTimeChange('microsecond', e.target.value)}
                      className={`input input-bordered input-sm text-center ${errors.microsecond ? 'input-error' : ''}`}
                      placeholder="微秒"
                    />
                    {errors.microsecond && <p className="text-error text-xs mt-1 text-center">{errors.microsecond}</p>}
                  </div>
                </div>
                {errors.time && <p className="text-error text-sm mt-1">{errors.time}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-base-200">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost btn-lg hover:bg-base-200 transition-colors"
              disabled={loading}
            >
              取消
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-lg flex items-center gap-2 hover:btn-primary-focus transition-colors min-w-[140px]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-md"></span>
                  提交中...
                </>
              ) : (
                <>
                  <FaEdit size={16}/>
                  更新记录
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
