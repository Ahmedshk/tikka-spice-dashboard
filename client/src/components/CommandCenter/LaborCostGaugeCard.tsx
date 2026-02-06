import { PercentageGauge } from '../gauges/PercentageGauge';

export interface LaborCostGaugeCardProps {
  value: number;
  subtitle?: string;
  overTarget?: number | null;
  size?: number;
  /** Optional className for the card wrapper (e.g. for grid sizing) */
  className?: string;
}

const cardClass = 'bg-card-background rounded-xl shadow border border-gray-200 overflow-hidden';

export const LaborCostGaugeCard = ({
  value,
  subtitle = 'Labor vs Goals',
  overTarget = null,
  size = 340,
  className = '',
}: LaborCostGaugeCardProps) => {
  return (
    <div className={`${cardClass} ${className}`}>
      <div className="p-5 flex flex-col items-center">
        <h3 className="text-sm font-semibold text-secondary mb-4 text-center">Labor Cost Percentage Gauge</h3>
        <div className="flex justify-center w-full">
          <PercentageGauge
            value={value}
            subtitle={subtitle}
            overTarget={overTarget}
            size={size}
          />
        </div>
      </div>
    </div>
  );
};
