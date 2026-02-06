import { ClockedInStaffTable } from './ClockedInStaffTable';
import type { ClockedInStaffRow } from './ClockedInStaffTable';

export interface ClockedInStaffCardProps {
  rows: ClockedInStaffRow[];
  /** Optional className for the card wrapper (e.g. for grid sizing) */
  className?: string;
}

const cardClass = 'bg-card-background rounded-xl shadow border border-gray-200 overflow-hidden';

export const ClockedInStaffCard = ({ rows, className = '' }: ClockedInStaffCardProps) => {
  return (
    <div className={`${cardClass} ${className}`}>
      <div className="rounded-t-xl bg-primary px-5 py-1 md:py-2 flex items-center justify-center md:justify-start flex-wrap gap-2">
        <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-white">List of Currently Clocked-in staff</h3>
      </div>
      <div className="p-5">
        <ClockedInStaffTable rows={rows} />
      </div>
    </div>
  );
};
