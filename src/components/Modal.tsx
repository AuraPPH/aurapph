import React, { useEffect, useRef } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  dark?: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  eyebrow,
  dark = false,
  children,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeBtnRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141716]/75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="aurapph-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`w-full max-w-2xl border max-h-[88vh] flex flex-col ${
          dark
            ? 'bg-[#0F1B1C] text-[#F4F2EC] border-[#263638]'
            : 'bg-[#F4F2EC] text-[#141716] border-[#141716]'
        }`}
      >
        <div
          className={`flex items-start justify-between gap-4 px-6 py-4 border-b ${
            dark ? 'border-[#263638]' : 'border-[#CFCAC0]'
          }`}
        >
          <div>
            {eyebrow && (
              <p
                className={`font-mono text-[11px] tracking-[0.12em] uppercase mb-1 ${
                  dark ? 'text-[#A6B4B2]' : 'text-[#525855]'
                }`}
              >
                {eyebrow}
              </p>
            )}
            <h3 id="aurapph-modal-title" className="font-serif text-2xl leading-tight font-normal">
              {title}
            </h3>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className={`min-h-[44px] min-w-[44px] px-3 flex items-center justify-center border font-mono text-xs tracking-[0.08em] uppercase transition-colors cursor-pointer shrink-0 ${
              dark
                ? 'border-[#263638] text-[#F4F2EC] hover:bg-[#F4F2EC] hover:text-[#0F1B1C]'
                : 'border-[#CFCAC0] text-[#141716] hover:bg-[#141716] hover:text-[#F4F2EC]'
            }`}
          >
            CLOSE
          </button>
        </div>

        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
