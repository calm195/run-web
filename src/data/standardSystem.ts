/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-26 22:02:22
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 15:35:02
 * @FilePath: src/data/standardSystem.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

export enum StandardSystem {
  Unknown = 0,
  PE = 1,
  China = 2,
  World = 3,
  Self = 4,
}

export const STANDARD_SYSTEM_LABELS: Record<number, string> = {
  [StandardSystem.Unknown]: '未知',
  [StandardSystem.PE]: '学生体测',
  [StandardSystem.China]: '中国田协',
  [StandardSystem.World]: '国际田联',
  [StandardSystem.Self]: '自定义等级',
};

export const STANDARD_SYSTEM_OPTIONS = Object.entries(
  STANDARD_SYSTEM_LABELS
).map(([value, label]) => ({
  value: Number(value),
  label,
}));
