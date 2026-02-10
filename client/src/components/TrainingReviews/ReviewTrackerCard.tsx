import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';

const cardClass = 'bg-card-background rounded-xl shadow border border-gray-200 overflow-hidden';

const defaultTheme = createTheme({
  palette: { mode: 'light' },
});

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 14,
}));

function DonutCenterLabel({ percent, label }: { readonly percent: number; readonly label: string }) {
  const { width, height, left, top } = useDrawingArea();
  const cx = left + width / 2;
  const cy = top + height / 2;
  return (
    <StyledText x={cx} y={cy}>
      <tspan x={cx} dy="0" style={{ fontWeight: 700, fontSize: 22 }}>
        {percent}%
      </tspan>
      <tspan x={cx} dy="24" style={{ fontWeight: 600, fontSize: 14 }}>
        {label}
      </tspan>
    </StyledText>
  );
}

export interface ReviewTrackerCardProps {
  completePercent: number;
  completeCount: number;
  dueCount: number;
}

export const ReviewTrackerCard = ({
  completePercent,
  completeCount,
  dueCount,
}: ReviewTrackerCardProps) => {
  const duePercent = Math.max(0, 100 - completePercent);
  const pieData = [
    { id: 'complete', value: completePercent, color: '#5DC54F', label: 'Up-to-date', count: completeCount },
    { id: 'due', value: duePercent, color: '#FBC52A', label: 'Due', count: dueCount },
  ].filter((d) => d.value > 0);

  const legendItems = [
    { id: 'complete', label: 'Up-to-date', color: '#5DC54F', value: completeCount, percent: completePercent },
    { id: 'due', label: 'Due', color: '#FBC52A', value: dueCount, percent: duePercent },
  ];

  return (
    <div className={`${cardClass} flex flex-col h-full min-h-0`}>
      <div className="p-5 pb-4 flex items-center justify-center flex-shrink-0">
        <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-secondary text-center">Review Tracker</h3>
      </div>
      <div className="p-5 flex flex-col items-center justify-center flex-1 min-h-0">
        <ThemeProvider theme={defaultTheme}>
          <PieChart
            series={[
              {
                data: pieData,
                innerRadius: 70,
                outerRadius: 110,
                paddingAngle: 2,
                highlightScope: { fade: 'global', highlight: 'item' },
                valueFormatter: (item: { value: number; count?: number }) => {
                  const percent = item.value;
                  const count = item.count;
                  if (count !== undefined) return `${count} (${percent}%)`;
                  return `${percent}%`;
                },
              },
            ]}
            width={280}
            height={280}
            hideLegend
          >
            <DonutCenterLabel percent={completePercent} label="Complete" />
          </PieChart>
          {/* Custom legend: label + value (count), like Sources of Sales */}
          <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-primary">
            {legendItems.map((item) => (
              <span key={item.id} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                  aria-hidden
                />
                <span className="font-medium text-secondary">{item.label}</span>
                <span>{item.value}</span>
                <span>({item.percent}%)</span>
              </span>
            ))}
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
};
