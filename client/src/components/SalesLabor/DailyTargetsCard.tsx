import { LinearProgress } from '@mui/material';

export interface TargetActualItem {
  label: string;
  actual: number;
  target: number;
  /** true = higher is better (e.g. sales), false = lower is better (e.g. labor %, hours) */
  higherIsBetter: boolean;
  /** Optional formatter for display (e.g. currency, percent) */
  formatValue?: (n: number) => string;
}

export interface DailyTargetsCardProps {
  items: TargetActualItem[];
}

export const DailyTargetsCard = ({ items }: DailyTargetsCardProps) => {
  return (
    <div className="space-y-5">
      {items.map((item) => {
        const format = item.formatValue ?? String;
        const isUnfavorable = item.higherIsBetter
          ? item.actual < item.target
          : item.actual > item.target;
        const displayPercent = item.target === 0
          ? 0
          : Math.min(100, Math.round((item.actual / item.target) * 100));
        const barColor = isUnfavorable ? '#F04B5B' : '#5DC54F';

        return (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between text-[10px] md:text-xs 2xl:text-sm">
              <span className="font-medium text-secondary">{item.label}</span>
              <span className="text-primary">
                {format(item.actual)} / {format(item.target)}
              </span>
            </div>
            <LinearProgress
              variant="determinate"
              value={displayPercent}
              sx={{
                height: 8,
                borderRadius: 4,
                '& .MuiLinearProgress-bar': { backgroundColor: barColor },
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
