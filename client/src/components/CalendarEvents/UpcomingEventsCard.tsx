import { useState, useMemo, useEffect } from 'react';
import { Pagination } from '../common/Pagination';

const cardClass = 'bg-card-background rounded-xl shadow border border-gray-200 overflow-hidden';

const DEFAULT_PAGE_SIZE = 5;

export interface UpcomingEventItem {
  date: string;
  dayLabel?: string;
  time: string;
  eventName: string;
  status: string;
}

export interface UpcomingEventsCardProps {
  events: UpcomingEventItem[];
  pageSize?: number;
  className?: string;
}

export const UpcomingEventsCard = ({
  events,
  pageSize = DEFAULT_PAGE_SIZE,
  className = '',
}: UpcomingEventsCardProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = events.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const clampedPage = Math.min(currentPage, totalPages);
  const displayPage = Math.max(1, clampedPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages >= 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const paginatedEvents = useMemo(() => {
    const start = (displayPage - 1) * pageSize;
    return events.slice(start, start + pageSize);
  }, [events, displayPage, pageSize]);

  return (
    <div className={`${cardClass} flex flex-col min-h-0 overflow-hidden ${className}`}>
      <div className="rounded-t-xl bg-primary px-5 py-1 md:py-2 flex items-center justify-center md:justify-start flex-wrap gap-2 flex-shrink-0">
        <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-white">Upcoming Events</h3>
      </div>
      <div className="p-5 flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="overflow-auto flex-1 min-h-0">
          <table className="w-full border-collapse text-[10px] md:text-xs 2xl:text-sm">
            <thead>
              <tr className="text-left text-secondary border-b border-gray-200">
                <th className="pb-3 pr-4 pl-2 font-semibold">Date</th>
                <th className="pb-3 pr-4 font-semibold">Time</th>
                <th className="pb-3 pr-4 font-semibold">Event</th>
                <th className="pb-3 pr-2 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-primary">
              {paginatedEvents.map((row, index) => (
                <tr key={`${row.date}-${row.time}-${row.eventName}-${index}`} className={index % 2 === 1 ? 'bg-[#F3F5F7]' : ''}>
                  <td className="py-3 pr-4 pl-2">
                    <span className="block">{row.date}</span>
                    {row.dayLabel != null && row.dayLabel !== '' && (
                      <span className="text-gray-500 block text-[9px] md:text-[10px] 2xl:text-xs">{row.dayLabel}</span>
                    )}
                  </td>
                  <td className="py-3 pr-4">{row.time}</td>
                  <td className="py-3 pr-4">{row.eventName}</td>
                  <td className="py-3 pr-2 text-center">
                    <span className="inline-flex items-center justify-end bg-[rgba(93,197,79,0.2)] text-primary text-[9px] md:text-[10px] 2xl:text-xs font-medium px-2 py-0.5 rounded-lg">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={displayPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
