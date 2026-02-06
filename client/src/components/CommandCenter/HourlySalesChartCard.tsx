import { TimeSeriesLineChart } from '../charts/TimeSeriesLineChart';
import type { TimeSeriesSeries } from '../charts/TimeSeriesLineChart';

export interface HourlySalesChartCardProps {
  xAxisData: (string | number)[];
  series: TimeSeriesSeries[];
  height?: number;
  /** Optional className for the card wrapper (e.g. for grid sizing) */
  className?: string;
}

const cardClass = 'bg-card-background rounded-xl shadow border border-gray-200 overflow-hidden';

export const HourlySalesChartCard = ({
  xAxisData,
  series,
  height = 256,
  className = '',
}: HourlySalesChartCardProps) => {
  return (
    <div className={`${cardClass} ${className}`}>
      <div className="p-5 pb-4 flex items-center flex-wrap gap-2">
        <h3 className="text-sm font-semibold text-secondary">Hourly Sales: Today vs. Last Week</h3>
      </div>
      <div className="px-5 pb-2 flex items-center gap-4">
        <span className="flex items-center gap-2 text-xs text-primary">
          <span className="w-3 h-3 rounded-full bg-quaternary" aria-hidden />
          {' '}
          Today
        </span>
        <span className="flex items-center gap-2 text-xs text-primary">
          <span className="w-3 h-3 rounded-full bg-green-500" aria-hidden />
          {' '}
          Last Week
        </span>
      </div>
      <div className="h-64 -mx-3 px-3 pb-3 md:mx-0 md:px-5 md:pb-5">
        <TimeSeriesLineChart
          xAxisData={xAxisData}
          series={series}
          height={height}
        />
      </div>
    </div>
  );
};
