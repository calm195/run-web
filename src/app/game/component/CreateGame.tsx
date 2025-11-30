/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 19:57:40
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-30 16:09:48
 * @FilePath: src/app/game/component/CreateGame.tsx
 * @Description: 创建比赛
 */

'use client';

import React, { useState } from 'react';
import { GameCreateReq, GameWebViewRsp } from '@/api/model';
import { createGame } from '@/api/game';
import { KeyedMutator } from 'swr';
import { useEvents } from '@/hooks/useEvents';
import toast from 'react-hot-toast';

interface CreateGameProps {
  mutate: KeyedMutator<GameWebViewRsp[]>;
  onClose: () => void;
}

const CreateGame: React.FC<CreateGameProps> = ({ mutate, onClose }) => {
  const [formData, setFormData] = useState<GameCreateReq>({
    name: '',
    type: -1,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { events, loading: eventsLoading, error: eventsError } = useEvents();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 验证比赛名称
    if (!formData.name.trim()) {
      newErrors.name = '请输入比赛名称';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '比赛名称至少需要2个字符';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = '比赛名称不能超过50个字符';
    }

    // 验证比赛类型
    if (formData.type === -1) {
      newErrors.type = '请选择比赛类型';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'type' ? Number(value) : value,
    }));

    // 清除对应字段的错误信息
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      toast.loading('正在加载运动项目信息');
      return;
    }

    // 提交前验证
    if (!validateForm()) {
      toast.error('比赛新建表单校验失败');
      return;
    }

    setLoading(true);
    try {
      await createGame(formData);
      await mutate();
      onClose();
      toast.success('创建比赛成功');
    } catch {
      toast.error('创建比赛失败');
    } finally {
      setLoading(false);
    }
  };

  if (eventsLoading) {
    return <span className={`badge badge-ghost`}>加载运动类型中...</span>;
  }

  if (eventsError) {
    return <span className={`badge badge-error`}>加载运动类型失败</span>;
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">创建新比赛</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">比赛名称</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
              placeholder="请输入比赛名称"
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.name}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">比赛类型</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`select select-bordered w-full ${errors.type ? 'select-error' : ''}`}
            >
              <option value={-1} disabled>
                请选择比赛类型
              </option>
              {events.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            {errors.type && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.type}</span>
              </label>
            )}
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={loading}
            >
              取消
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-xs mr-2"></span>
                  创建中...
                </>
              ) : (
                '创建比赛'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGame;
