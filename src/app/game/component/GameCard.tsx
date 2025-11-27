/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 09:32:06
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:55:41
 * @FilePath: src/app/game/component/GameCard.tsx
 * @Description: 比赛卡片
 */

import React from 'react';
import { GameWebViewRsp } from '@/api/model';
import { formatDateTime } from '@/utils/date';
import {
  FaTrophy,
  FaChess,
  FaGamepad,
  FaCalculator,
  FaRobot,
  FaComments,
  FaBriefcase,
  FaPalette,
  FaEye,
} from 'react-icons/fa';
import Link from 'next/link';
import TypeBadge from '@/components/TypeBadge';

interface GameWebViewCardProps {
  game: GameWebViewRsp;
}

const GameWebViewCard: React.FC<GameWebViewCardProps> = ({ game }) => {
  const getCompetitionIcon = (type: number) => {
    const icons = [
      <FaTrophy key="trophy" className="text-yellow-500" />,
      <FaChess key="chess" className="text-blue-500" />,
      <FaGamepad key="gamepad" className="text-green-500" />,
      <FaCalculator key="calculator" className="text-purple-500" />,
      <FaRobot key="robot" className="text-red-500" />,
      <FaComments key="comments" className="text-indigo-500" />,
      <FaBriefcase key="briefcase" className="text-orange-500" />,
      <FaPalette key="palette" className="text-pink-500" />,
    ];
    return (
      icons[type % icons.length] || (
        <FaTrophy key="default" className="text-yellow-500" />
      )
    );
  };

  return (
    <div className="card bg-base-100 shadow-xl border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="card-body p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3 truncate">
            <span className="text-2xl">{getCompetitionIcon(game.type)}</span>
            <h2
              className="card-title text-lg font-semibold break-words flex-1 truncate"
              title={game.name}
            >
              {game.name}
            </h2>
          </div>
          <TypeBadge type={game.type} name={game.type_name} />
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
          <Link href={`/game/${game.id}`} className="w-full sm:w-auto">
            <button className="btn btn-sm w-full sm:w-auto flex items-center justify-center">
              <FaEye className="w-4 h-4 mr-1" />
              查看成绩
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameWebViewCard;
