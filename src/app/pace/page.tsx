/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-18 17:34:42
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 17:31:29
 * @FilePath: src/app/pace/page.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import { Metadata } from 'next';
import PaceCalculator from '@/app/pace/PaceCalculator';

export const metadata: Metadata = {
  title: '配速计算器',
  description: '跑步配速与时间换算工具，支持毫秒精度',
};

export default function PacePage() {
  return (
    <div className="min-h-screen bg-base-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <PaceCalculator />
      </div>
    </div>
  );
}
