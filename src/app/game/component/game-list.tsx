/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 09:36:38
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-19 10:49:41
 * @FilePath: src/app/game/component/game-list.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
'use client';

import React, {useState, useEffect} from 'react';
import {GameWebViewRsp} from "@/api/model";
import {listGames} from "@/api/game";
import GameWebViewCard from '@/app/game/component/game-card';
import GameWebViewTable from '@/app/game/component/game-table';

const GameWebViewList = () => {
  const [games, setGames] = useState<GameWebViewRsp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGames().then(r =>
      console.log(r)
    );
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const data = await listGames();
      console.log(data)
      setGames(data.data || []);
    } catch (err) {
      setError('获取游戏数据失败');
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.type_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <span>{error}</span>
          <button onClick={fetchGames} className="btn btn-sm">重试</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">比赛</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="form-control w-full sm:w-64">
            <input
              type="text"
              placeholder="搜索比赛名称或类型..."
              className="input input-bordered"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <button
              className={`btn ${viewMode === 'card' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('card')}
            >
              卡片视图
            </button>
            <button
              className={`btn ${viewMode === 'table' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('table')}
            >
              表格视图
            </button>
          </div>
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">暂无数据</div>
        </div>
      ) : viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameWebViewCard key={game.id} game={game}/>
          ))}
        </div>
      ) : (
        <GameWebViewTable games={filteredGames}/>
      )}
    </div>
  );
};

export default GameWebViewList;
