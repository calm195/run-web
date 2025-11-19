/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 09:39:27
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-19 19:47:24
 * @FilePath: src/app/game/component/game-table.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import React from 'react';
import {GameWebViewRsp} from '@/api/model';
import {formatDateTime} from '@/utils/date';

interface GameWebViewTableProps {
  games: GameWebViewRsp[];
}

const GameWebViewTable: React.FC<GameWebViewTableProps> = ({games}) => {
  const getTypeBadgeColor = (type: number) => {
    const colors = [
      'badge-primary', 'badge-secondary', 'badge-accent',
      'badge-info', 'badge-success', 'badge-warning', 'badge-error'
    ];
    return colors[type % colors.length] || 'badge-neutral';
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
        <tr>
          <th>比赛名称</th>
          <th>类型</th>
          <th>创建时间</th>
          <th>更新时间</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        {games.map((game) => (
          <tr key={game.id}>
            <td>
              <div className="font-semibold">{game.name}</div>
            </td>
            <td>
              <div className={`badge ${getTypeBadgeColor(game.type)}`}>
                {game.type_name}
              </div>
            </td>
            <td>
              <div className="text-sm">
                {formatDateTime(game.created_at)}
              </div>
            </td>
            <td>
              <div className="text-sm">
                {formatDateTime(game.updated_at)}
              </div>
            </td>
            <td>
              <div className="flex gap-2">
                <button className="btn btn-accent btn-sm">详情</button>
                <button className="btn btn-outline btn-sm">编辑</button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameWebViewTable;
