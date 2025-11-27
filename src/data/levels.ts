/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-26 21:59:06
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 15:35:02
 * @FilePath: src/data/levels.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

export enum Level {
  None = 0,
  InternationalElite = 1,
  Elite = 2,
  First = 3,
  Second = 4,
  Third = 5,
  Participate = 6,
}

export const LEVEL_LABELS: Record<number, string> = {
  [Level.None]: '未达标',
  [Level.InternationalElite]: '国际级运动健将',
  [Level.Elite]: '运动健将',
  [Level.First]: '一级运动员',
  [Level.Second]: '二级运动员',
  [Level.Third]: '三级运动员',
  [Level.Participate]: '参与级',
};

export const LEVEL_OPTIONS = Object.entries(LEVEL_LABELS).map(
  ([value, label]) => ({
    value: Number(value),
    label,
  })
);
