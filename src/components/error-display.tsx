/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-19 15:24:40
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-19 15:25:22
 * @FilePath: src/components/error-display.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import React from 'react';
import { FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  onRetry,
  retryText = '重试',
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="card-body text-center">
          <div className="text-red-500 text-5xl mb-4 flex justify-center">
            <FiAlertTriangle className="text-red-500" />
          </div>
          <h2 className="card-title text-xl flex items-center justify-center gap-2">
            <FiAlertTriangle className="text-red-500" />
            加载失败
          </h2>
          <p className="text-gray-600">{message}</p>
          {onRetry && (
            <div className="card-actions justify-center mt-4">
              <button
                onClick={onRetry}
                className="btn btn-primary flex items-center gap-2"
              >
                <FiRefreshCw className="animate-spin" />
                {retryText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
