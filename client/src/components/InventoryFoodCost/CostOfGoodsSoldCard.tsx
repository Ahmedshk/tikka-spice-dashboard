import { PercentageGauge } from '../gauges/PercentageGauge';

const cardClass = 'bg-card-background rounded-xl shadow border border-gray-200 overflow-hidden';

export interface CostOfGoodsSoldCardProps {
  targetPercent?: number;
  gaugeValue?: number;
  /** Positive = over target (red ▲), negative = under target (green ▼). Shown in the info box as "Current Food Cost". */
  overTarget?: number;
}

export const CostOfGoodsSoldCard = ({
  targetPercent = 28,
  gaugeValue = 24.3,
  overTarget = 3.7,
}: CostOfGoodsSoldCardProps) => {
  const isOverTarget = overTarget != null && overTarget > 0;
  const trendDisplay = overTarget != null && overTarget !== 0
    ? `${Math.abs(overTarget).toFixed(1)}%`
    : '0%';

  return (
    <div className={cardClass}>
      <div className="p-5 flex flex-col h-full min-h-[280px]">
        <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-secondary">Cost of Goods Sold (Gauge)</h3>
        <p className="text-[10px] md:text-xs 2xl:text-sm text-primary mt-0.5">Current Food Cost % vs. Target</p>
        <div className="grid grid-cols-1 md:grid-cols-12 md:items-stretch gap-4 mt-4 flex-1 min-h-0">
          <div className="md:col-span-5 md:self-center border border-gray-200 rounded-lg bg-white px-3 py-2 flex flex-col">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs md:text-sm text-primary">Target</span>
              <span className="font-semibold text-secondary text-sm md:text-base">{targetPercent}%</span>
            </div>
            <div className="flex items-center justify-between gap-4 mt-2 pt-2 border-t border-gray-100">
              <span className="text-xs md:text-sm text-primary">Current Food Cost</span>
              <span
                className={`font-semibold text-sm md:text-base inline-flex items-center gap-0.5 ${isOverTarget ? 'text-red-600' : 'text-green-600'
                  }`}
              >
                {overTarget != null && overTarget !== 0 && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                    className="shrink-0"
                  >
                    {isOverTarget ? (
                      <path d="M7 14l5-5 5 5H7z" />
                    ) : (
                      <path d="M7 10l5 5 5-5H7z" />
                    )}
                  </svg>
                )}
                {trendDisplay}
              </span>
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8 flex items-center justify-center min-h-[200px] md:min-h-0 w-full max-w-full">
            <PercentageGauge
              value={gaugeValue}
              min={0}
              max={40}
              unit=" %"
              segmentStops={[28, 35, 40]}
              segmentColors={['#22C55E', '#EAB308', '#EF4444']}
              size={320}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
