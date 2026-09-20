import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback(({ type = 'info', message, title, duration = 4000 }) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts(prev => [...prev, { id, type, message, title }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const toast = {
    success: (message, title = 'Success') => addToast({ type: 'success', message, title }),
    error: (message, title = 'Error') => addToast({ type: 'error', message, title }),
    info: (message, title = 'Info') => addToast({ type: 'info', message, title }),
    warning: (message, title = 'Warning') => addToast({ type: 'warning', message, title })
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />;
      default: return <Info className="w-5 h-5 text-indigo-500 flex-shrink-0" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success': return 'border-emerald-500/30 dark:border-emerald-500/20';
      case 'error': return 'border-rose-500/30 dark:border-rose-500/20';
      case 'warning': return 'border-amber-500/30 dark:border-amber-500/20';
      default: return 'border-indigo-500/30 dark:border-indigo-500/20';
    }
  };

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
      {/* Toast Notification Stack */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl bg-white dark:bg-slate-900 border ${getBorderColor(t.type)} transition-all transform translate-y-0 animate-in fade-in slide-in-from-bottom-3 duration-200`}
          >
            {getIcon(t.type)}
            <div className="flex-1 min-w-0">
              {t.title && <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.title}</h4>}
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{t.message}</p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context.toast;
};
