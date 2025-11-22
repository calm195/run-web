/**
 * @Author: kurous wx2178@126.com
 * @Date: 2025-11-21 22:04:22
 * @LastEditors: kurous wx2178@126.com
 * @LastEditTime: 2025-11-21 22:06:48
 * @FilePath: src/components/DeleteConfirmationModal.tsx
 * @Description: 这是默认设置,可以在设置》工具》File Description中进行配置
 */

import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  title = '确认删除',
  message = '此操作无法撤销。',
  confirmText = '确认删除',
  cancelText = '取消',
}) => {
  if (!isOpen) return null;

  return (
    <dialog
      id="delete_confirmation_modal"
      className={`modal ${isOpen ? 'modal-open' : ''}`}
      open={isOpen}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <FaExclamationTriangle />
          {title}
        </h3>
        <p className="py-4">
          您确定要删除{itemName ? ` "${itemName}"` : ''} 吗？{message}
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button type="button" className="btn" onClick={onClose}>
              {cancelText}
            </button>
          </form>
          <button type="button" className="btn btn-error" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default DeleteConfirmationModal;
