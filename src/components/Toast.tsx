import React from 'react';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 left-4 sm:left-auto z-50 max-w-md bg-[#141716] text-[#F4F2EC] border border-[#525855] px-4 py-3 flex items-start justify-between gap-4"
    >
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#CFCAC0]">
          RELEASE STATUS
        </span>
        <p className="text-sm leading-snug text-[#F4F2EC]">{message}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="min-h-[36px] min-w-[36px] px-2 font-mono text-xs text-[#CFCAC0] hover:text-[#F4F2EC] border border-[#525855] cursor-pointer shrink-0"
      >
        ×
      </button>
    </div>
  );
};
