import type { OrderTrackerRow } from '../modal/OrderTrackerModal';

const cardClass = 'bg-card-background rounded-xl shadow border border-gray-200 overflow-hidden';

export interface OrderTrackerCardProps {
  /** Rows to display in the card (e.g. first 12) */
  rows: OrderTrackerRow[];
  /** Optional className for the card wrapper (e.g. for grid order and sizing) */
  className?: string;
  /** Called when "View All" is clicked */
  onViewAll: () => void;
}

export const OrderTrackerCard = ({ rows, className = '', onViewAll }: OrderTrackerCardProps) => {
  return (
    <div className={`${cardClass} flex flex-col min-h-0 overflow-hidden ${className}`}>
      <div className="rounded-t-xl bg-primary px-5 py-1 md:py-2 flex items-center justify-center md:justify-start flex-wrap gap-2 flex-shrink-0">
        <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-white">Order Tracker</h3>
      </div>
      <div className="p-5 flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="overflow-auto flex-1 min-h-0">
          <table className="w-full border-collapse text-[10px] md:text-xs 2xl:text-sm">
            <thead>
              <tr className="text-left text-secondary border-b border-gray-200">
                <th className="pb-3 pr-4 pl-2 font-semibold">PO#</th>
                <th className="pb-3 pr-4 font-semibold">Supplier</th>
                <th className="pb-3 pr-4 font-semibold text-center">Date</th>
                <th className="pb-3 pr-2 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-primary">
              {rows.map((row, index) => (
                <tr key={`${row.poNumber}-${row.supplier}-${row.date}-${index}`} className={index % 2 === 1 ? 'bg-[#F3F5F7]' : ''}>
                  <td className="py-3 pr-4 pl-2">{row.poNumber}</td>
                  <td className="py-3 pr-4">{row.supplier}</td>
                  <td className="py-3 pr-4 text-center">{row.date}</td>
                  <td className="py-3 pr-2 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ${
                        row.status === 'Received'
                          ? 'bg-[rgba(93,197,79,0.2)]'
                          : 'bg-[rgba(253,185,14,0.2)]'
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
        <div className="flex justify-end pt-3 flex-shrink-0">
          <button
            type="button"
            onClick={onViewAll}
            className="text-[10px] md:text-xs 2xl:text-sm font-bold text-quaternary hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
};
