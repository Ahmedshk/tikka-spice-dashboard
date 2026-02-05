import { useRef, useEffect } from 'react';
import { Spinner } from '../common/Spinner';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  variant?: 'default' | 'danger';
  isLoading?: boolean;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  variant = 'default',
  isLoading = false,
}: ConfirmDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [isOpen]);

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleConfirm = async () => {
    try {
      await Promise.resolve(onConfirm());
      onClose();
    } catch {
      // Caller handles error; dialog stays open
    }
  };

  const confirmButtonClass =
    variant === 'danger'
      ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
      : 'bg-button-primary text-white hover:opacity-90 focus:ring-button-primary';

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      className="fixed inset-0 z-[300] m-auto w-full max-w-md rounded-xl border border-gray-200 bg-card-background p-6 shadow-lg [&::backdrop]:bg-black/50"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
    >
      <h2 id="confirm-dialog-title" className="text-lg font-semibold text-secondary mb-2">
        {title}
      </h2>
      <p id="confirm-dialog-message" className="text-sm text-primary mb-6">
        {message}
      </p>
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-primary hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-60"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isLoading}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer disabled:opacity-60 ${confirmButtonClass}`}
        >
          {isLoading ? (
            <>
              <Spinner size="sm" className="text-inherit" />
              Please wait...
            </>
          ) : (
            confirmLabel
          )}
        </button>
      </div>
    </dialog>
  );
};
