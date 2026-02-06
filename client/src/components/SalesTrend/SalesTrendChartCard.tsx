import { TimeSeriesLineChart } from '../charts/TimeSeriesLineChart';
import type { TimeSeriesSeries, TimeSeriesLineChartYAxisOverrides } from '../charts/TimeSeriesLineChart';

export interface SalesTrendChartCardProps {
  xAxisData: (string | number)[];
  series: TimeSeriesSeries[];
  groupBy: string;
  onGroupByChange: (value: string) => void;
  yAxis?: TimeSeriesLineChartYAxisOverrides;
  height?: number;
  /** Optional className for the card wrapper */
  className?: string;
}

const cardClass = 'bg-card-background rounded-xl shadow border border-gray-200 overflow-hidden';

export const SalesTrendChartCard = ({
  xAxisData,
  series,
  groupBy,
  onGroupByChange,
  yAxis,
  height = 280,
  className = '',
}: SalesTrendChartCardProps) => {
  return (
    <div className={`${cardClass} mb-6 ${className}`}>
      <div className="p-5 pb-4 flex items-center justify-between flex-wrap gap-2">
        <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-secondary">Sales Trend</h3>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-secondary">Group by:</span>
          <select
            value={groupBy}
            onChange={(e) => onGroupByChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-1 text-xs text-primary bg-white focus:outline-none focus:ring-2 focus:ring-quaternary/30"
          >
            <option value="None">None</option>
          </select>
        </div>
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
      <div className="px-5 pb-5 -mx-3 md:mx-0">
        <TimeSeriesLineChart
          xAxisData={xAxisData}
          series={series}
          height={height}
          yAxis={yAxis}
        />
      </div>
    </div>
  );
};
