import { useEffect, useRef, useState } from 'react';
import { Pagination } from '../common/Pagination';

const PAGE_SIZE = 12;

export type OrderTrackerRow = {
  poNumber: string;
  supplier: string;
  date: string;
  status: 'Received' | 'Pending';
};

export interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  rows: OrderTrackerRow[];
}

export const OrderTrackerModal = ({ isOpen, onClose, rows }: OrderTrackerModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      setPage(1);
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const totalPages = Math.ceil(rows.length / PAGE_SIZE) || 1;
  const start = (page - 1) * PAGE_SIZE;
  const pageRows = rows.slice(start, start + PAGE_SIZE);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[300] m-0 grid h-screen w-screen min-h-screen min-w-full max-w-none max-h-none place-items-center bg-transparent border-0 p-4 outline-none [&::backdrop]:bg-black/50 [&::backdrop]:cursor-pointer"
      aria-labelledby="order-tracker-modal-title"
      onClose={onClose}
    >
      <div className="relative w-full min-w-0 max-w-full md:max-w-2xl">
        <button
          type="button"
          onClick={() => { dialogRef.current?.close(); onClose(); }}
          className="absolute -top-2 -right-2 md:-top-4 md:-right-4 z-[400] flex h-5 w-5 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 shadow-md ring-1 ring-gray-200 hover:bg-gray-100 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close"
        >
          <span className="text-lg md:text-xl 2xl:text-2xl leading-none">×</span>
        </button>
        <div className="relative max-h-[90vh] flex flex-col bg-card-background rounded-xl shadow-lg border-b border-gray-200 overflow-hidden">
          <div className="relative w-full rounded-t-xl bg-primary px-5 py-3 flex-shrink-0">
            <h2 id="order-tracker-modal-title" className="text-sm md:text-base 2xl:text-lg font-semibold text-white">
              Order Tracker
            </h2>
          </div>
          <div className="flex-1 min-h-0 min-w-0 flex flex-col px-5 pt-4 overflow-hidden border-x border-gray-200">
            <div className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-auto md:[scrollbar-gutter:stable]">
              <table className="w-full min-w-[360px] border-collapse text-[10px] md:text-xs 2xl:text-sm">
                <thead>
                  <tr className="text-left text-secondary border-b border-gray-200">
                    <th className="pb-3 pr-4 pl-2 font-semibold">PO#</th>
                    <th className="pb-3 pr-4 font-semibold">Supplier</th>
                    <th className="pb-3 pr-4 font-semibold text-center">Date</th>
                    <th className="pb-3 pr-2 font-semibold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-primary">
                  {pageRows.map((row, index) => (
                    <tr key={`${row.poNumber}-${row.supplier}-${row.date}-${start + index}`} className={(start + index) % 2 === 1 ? 'bg-[#F3F5F7]' : ''}>
                      <td className="py-3 pr-4 pl-2">{row.poNumber}</td>
                      <td className="py-3 pr-4">{row.supplier}</td>
                      <td className="py-3 pr-4 text-center">{row.date}</td>
                      <td className="py-3 pr-2 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ${row.status === 'Received'
                              ? 'bg-[rgba(34,197,94,0.2)]'
                              : 'bg-[rgba(245,158,11,0.2)]'
                            }`}
                        >
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: row.status === 'Received' ? '#5DC54F' : '#FBC52A' }}
                            aria-hidden
                          />
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={rows.length}
                pageSize={PAGE_SIZE}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};
