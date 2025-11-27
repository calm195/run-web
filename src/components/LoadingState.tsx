/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 22:39:29
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-27 17:50:04
 * @FilePath: src/components/LoadingState.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */
import { FiLoader } from 'react-icons/fi';

const LoadingState = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="flex flex-col items-center gap-3">
        <FiLoader className="animate-spin text-4xl" />
        <span>正在加载数据...</span>
      </div>
    </div>
  );
};

export default LoadingState;
