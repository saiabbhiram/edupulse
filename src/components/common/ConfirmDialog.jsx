import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed with this action? This cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  confirmVariant = 'danger',
  loading = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showClose={false}>
      <div className="flex flex-col items-center text-center p-2">
        <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          {message}
        </p>
        <div className="flex items-center justify-center gap-3 w-full">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            className="flex-1"
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
