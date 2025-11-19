/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 09:32:06
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-19 10:52:01
 * @FilePath: src/app/game/component/game-card.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import React from 'react';
import {GameWebViewRsp} from '@/api/model';
import {formatDateTime} from '@/utils/date';

interface GameWebViewCardProps {
  game: GameWebViewRsp;
}

const GameWebViewCard: React.FC<GameWebViewCardProps> = ({game}) => {
  const getTypeBadgeColor = (type: number) => {
    const colors = [
      'badge-primary', 'badge-secondary', 'badge-accent',
      'badge-info', 'badge-success', 'badge-warning', 'badge-error'
    ];
    return colors[type % colors.length] || 'badge-neutral';
  };

  const getCompetitionIcon = (type: number) => {
    const icons = [
      '🏆', '♟️', '🎮', '🧮', '🤖', '🗣️', '💼', '🎨'
    ];
    return icons[type % icons.length] || '🏆';
  };

  return (
    <div
      className="card bg-base-100 shadow-xl border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="card-body p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getCompetitionIcon(game.type)}</span>
            <h2 className="card-title text-lg font-semibold break-words flex-1">
              {game.name}
            </h2>
          </div>
          <div className={`badge ${getTypeBadgeColor(game.type)} text-sm px-3 py-1`}>
            {game.type_name}
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium w-20">类型</span>
            <span className="text-sm">{game.type_name}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium w-20">创建时间</span>
            <span className="text-sm ">{formatDateTime(game.created_at)}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium w-20">更新时间</span>
            <span className="text-sm">{formatDateTime(game.updated_at)}</span>
          </div>
        </div>

        <div className="card-actions justify-end mt-6">
          <button className="btn btn-primary btn-sm w-full sm:w-auto">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            查看详情
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameWebViewCard;
