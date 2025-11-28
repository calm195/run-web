/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-20 14:59:00
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-28 11:16:26
 * @FilePath: src/app/game/component/EditGame.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
'use client';

import React, { useState, useEffect } from 'react';
import { GameEditReq, GameWebViewRsp } from '@/api/model';
import { editGame } from '@/api/game';
import { FaTimes, FaSave } from 'react-icons/fa';
import { SportTypeOptions } from '@/data/sport-type';
import { KeyedMutator } from 'swr';

interface EditGameProps {
  game: GameWebViewRsp;
  mutate: KeyedMutator<GameWebViewRsp[]>;
  onClose: () => void;
}

const EditGame: React.FC<EditGameProps> = ({ game, mutate, onClose }) => {
  const [formData, setFormData] = useState({
    name: game.name,
    type: game.type,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  useEffect(() => {
    setFormData({
      name: game.name,
      type: game.type,
    });
  }, [game]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'type' ? parseInt(value, 10) : value,
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
    if (loading) return;

    if (!validateForm()) return;

    setLoading(true);

    const editData: GameEditReq = {
      id: game.id,
      name: formData.name.trim(),
      type: formData.type,
    };

    try {
      await editGame(editData);
      await mutate();
      onClose();
    } catch (err) {
      console.error('更新比赛失败:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">编辑比赛信息</h2>
          <button
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            disabled={loading}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">比赛名称</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
              placeholder="请输入比赛名称"
              disabled={loading}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.name}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">比赛类型</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`select select-bordered w-full ${errors.type ? 'select-error' : ''}`}
              disabled={loading}
            >
              {SportTypeOptions.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
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
              className="btn btn-primary flex items-center"
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-spinner loading-xs mr-2"></span>
              )}
              <FaSave className="mr-2" />
              保存更改
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGame;
