/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-26 22:05:45
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:44:32
 * @FilePath: src/data/gender.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

export enum Gender {
  Unknown = 0,
  Male = 1,
  Female = 2,
}

export const GENDER_LABELS: Record<number, string> = {
  [Gender.Unknown]: '未知',
  [Gender.Male]: '男',
  [Gender.Female]: '女',
};

export const GENDER_OPTIONS = [
  { value: Gender.Male, label: '男' },
  { value: Gender.Female, label: '女' },
];
