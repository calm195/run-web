/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-17 15:58:13
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-17 15:59:02
 * @FilePath: src/components/stat/model.ts
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

interface StatData {
  title: string;
  value: string;
  description: string;
}

interface StatItemProps {
  stat: StatData;
}
