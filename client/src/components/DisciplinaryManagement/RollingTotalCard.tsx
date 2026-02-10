import { LinearProgress } from '@mui/material';

const cardClass = 'bg-card-background rounded-xl shadow border border-gray-200 overflow-hidden';

const ORANGE_BAR = '#F59E0B';

export interface RollingTotalCardProps {
  currentPoints: number;
  maxPoints: number;
  noteText?: string;
}

export const RollingTotalCard = ({
  currentPoints,
  maxPoints,
  noteText = 'Points older than 90-days are automatically removed from calculation.',
}: RollingTotalCardProps) => {
  const displayPercent = maxPoints === 0 ? 0 : Math.min(100, Math.round((currentPoints / maxPoints) * 100));

  return (
    <div className={`${cardClass} p-5`}>
      <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-primary mb-3">
        90-day Rolling Total
      </h3>
      <div className="mb-1 flex items-center justify-between text-[10px] md:text-xs 2xl:text-sm">
        <span className="font-medium text-secondary">
          {currentPoints}/{maxPoints}
        </span>
      </div>
      <LinearProgress
        variant="determinate"
        value={displayPercent}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(229, 231, 235, 0.8)',
          '& .MuiLinearProgress-bar': { backgroundColor: ORANGE_BAR },
        }}
      />
      <p className="mt-3 text-[10px] md:text-xs 2xl:text-sm text-secondary">{noteText}</p>
    </div>
  );
};
