/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-26 22:24:24
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 15:35:02
 * @FilePath: src/app/standard/components/StandardList.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import StandardCard from './StandardCard';
import { Standard } from '@/api/model';

export default function StandardList({ standards }: { standards: Standard[] }) {
  if (standards.length === 0) {
    return <div className="text-center py-10">暂无符合筛选条件的运动标准</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {standards.map(s => (
        <StandardCard key={s.id} standard={s} />
      ))}
    </div>
  );
}
