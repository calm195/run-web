/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 19:57:40
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-19 22:06:54
 * @FilePath: src/app/game/component/create-game.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

'use client';

import React, { useState } from "react";
import {GameCreateReq} from "@/api/model";
import {createGame} from "@/api/game";
import {typeOptions} from "@/utils/calculate";

interface CreateGameProps {
  afterSubmit: () => void;
  onClose: () => void;
}

const CreateGame: React.FC<CreateGameProps> = ({ afterSubmit, onClose }) => {
  const [formData, setFormData] = useState<GameCreateReq>({
    name: '',
    type: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'type' ? Number(value) : value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createGame(formData);
      onClose();
      afterSubmit();
    } catch (error) {
      console.error('创建比赛失败:', error);
    } finally {
      setLoading(false);
    }
  };

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
              className="input input-bordered w-full"
              placeholder="请输入比赛名称"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">比赛类型</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              {typeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
  )
}

export default CreateGame;
