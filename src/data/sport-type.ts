/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-20 09:42:59
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-22 10:12:49
 * @FilePath: src/data/sport-type.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

export const SportTypeOptions = [
  {value: 1, label: '100m', distance: 100},
  {value: 2, label: '200m', distance: 200},
  {value: 3, label: '400m', distance: 400},
  {value: 4, label: '800m', distance: 800},
  {value: 5, label: '1km', distance: 1000},
  {value: 6, label: '1500m', distance: 1500},
  {value: 7, label: '1600m', distance: 1600},
  {value: 8, label: '3km', distance: 3000},
  {value: 9, label: '4km', distance: 4000},
  {value: 10, label: '5km', distance: 5000},
  {value: 11, label: '10km', distance: 10000},
  {value: 12, label: '半马', distance: 21098},
  {value: 13, label: '30km', distance: 30000},
  {value: 14, label: '全马', distance: 42195}
];

export const sportMap = new Map(SportTypeOptions.map(item => [item.value, item]));
