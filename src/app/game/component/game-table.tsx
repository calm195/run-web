/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 09:39:27
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 11:19:28
 * @FilePath: src/app/game/component/game-table.tsx
 * @Description: 比赛表格
 */

import React, { useState } from 'react';
import { GameWebViewRsp } from '@/api/model';
import { formatDateTime } from '@/utils/date';
import EditGame from '@/app/game/component/edit-game';
import { FaEye } from 'react-icons/fa';
import { deleteGame } from '@/api/game';
import Link from 'next/link';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import TypeBadge from '@/components/type-badge';

interface GameWebViewTableProps {
  games: GameWebViewRsp[];
  onRefresh?: () => void;
}

const GameWebViewTable: React.FC<GameWebViewTableProps> = ({
  games,
  onRefresh,
}) => {
  const [editingGame, setEditingGame] = useState<GameWebViewRsp | null>(null);
  const [gameToDelete, setGameToDelete] = useState<GameWebViewRsp | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (game: GameWebViewRsp) => {
    setEditingGame(game);
  };

  const handleCloseEdit = () => {
    setEditingGame(null);
  };

  const handleSubmitEdit = () => {
    setEditingGame(null);
    if (onRefresh) {
      onRefresh();
    }
  };

  // 处理删除按钮点击
  const handleDeleteClick = (game: GameWebViewRsp) => {
    setGameToDelete(game);
    setIsDeleteModalOpen(true);
  };

  // 确认删除
  const confirmDelete = async () => {
    if (gameToDelete) {
      try {
        await deleteGame({ ids: [gameToDelete.id] });
        if (onRefresh) {
          onRefresh();
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsDeleteModalOpen(false);
    setGameToDelete(null);
  };

  // 取消删除
  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setGameToDelete(null);
  };

  return (
    <>
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
            {games.map(game => (
              <tr key={game.id}>
                <td>
                  <div className="font-semibold">{game.name}</div>
                </td>
                <td>
                  <TypeBadge type={game.type} name={game.type_name} />
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
                    <Link
                      href={`/game/${game.id}`}
                      className="w-full sm:w-auto"
                    >
                      <button className="btn btn-sm w-full sm:w-auto flex items-center justify-center">
                        <FaEye className="w-4 h-4 mr-1" />
                        查看成绩
                      </button>
                    </Link>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleEdit(game)}
                    >
                      编辑
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDeleteClick(game)}
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingGame && (
        <EditGame
          game={editingGame}
          afterSubmit={() => {
            handleSubmitEdit();
          }}
          onClose={handleCloseEdit}
        />
      )}

      {/* 删除确认模态框 */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        itemName={gameToDelete?.name}
      />
    </>
  );
};

export default GameWebViewTable;
