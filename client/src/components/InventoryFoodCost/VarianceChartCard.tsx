import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BarChart } from '@mui/x-charts/BarChart';
import { VarianceItemsContext, VarianceTooltipWithContainer } from '../modal/VarianceChartModal';

const cardClass = 'bg-card-background rounded-xl shadow border border-gray-200 overflow-hidden';
const LABEL_FONT = { fontFamily: 'Onest, sans-serif', fill: '#5B6B79' };

const desktopMargin = { top: 10, right: 15, bottom: 24, left: 15 };
const mobileMargin = { top: 4, right: 0, bottom: 16, left: 0 };

export interface VarianceChartItem {
  label: string;
  varianceCost: number;
  actualCost?: number;
  theoreticalCost?: number;
  actualQuantity?: number;
  theoreticalQuantity?: number;
}

export interface VarianceChartCardProps {
  /** Full list of variance items; card displays top 5 by variance */
  items: VarianceChartItem[];
  onViewAll?: () => void;
}

function getTop5VarianceItems(items: VarianceChartItem[]): VarianceChartItem[] {
  const byAbs = [...items].sort((a, b) => Math.abs(b.varianceCost) - Math.abs(a.varianceCost));
  const top5 = byAbs.slice(0, 5);
  return top5.sort((a, b) => b.varianceCost - a.varianceCost);
}

const defaultTheme = createTheme({
  palette: { mode: 'light' },
});

const currencyFormatter = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);

export const VarianceChartCard = ({ items, onViewAll }: VarianceChartCardProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const top5 = getTop5VarianceItems(items);
  const labels = top5.map((i) => i.label);
  const values = top5.map((i) => i.varianceCost);

  return (
    <div className={cardClass}>
      <div className="p-5 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-secondary">
            Food Cost Variance (Actual - Theoretical)
          </h3>
          <p className="text-[10px] md:text-xs 2xl:text-sm text-primary mt-0.5">
            Top 5 items with highest variance.
          </p>
        </div>
        {onViewAll != null && items.length > 5 && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-[10px] md:text-xs 2xl:text-sm font-bold text-quaternary hover:underline cursor-pointer self-start sm:self-center"
          >
            View All &gt;
          </button>
        )}
      </div>
      <div className="px-5 pb-5">
        <ThemeProvider theme={defaultTheme}>
          <VarianceItemsContext.Provider value={top5}>
            <BarChart
              height={280}
              margin={isDesktop ? desktopMargin : mobileMargin}
              xAxis={[
                {
                  scaleType: 'band',
                  data: labels,
                  tickLabelStyle: { ...LABEL_FONT, fontSize: 11 },
                },
              ]}
              yAxis={[
                {
                  label: 'Variance ($)',
                  tickLabelStyle: { ...LABEL_FONT, fontSize: 11 },
                  valueFormatter: (v: number) => `$${v}`,
                  colorMap: {
                    type: 'piecewise',
                    thresholds: [0],
                    colors: ['#22C55E', '#EF4444'],
                  },
                },
              ]}
              series={[
                {
                  data: values,
                  label: 'Variance',
                  id: 'variance',
                  valueFormatter: (v) => (v == null ? '' : currencyFormatter(v)),
                  barLabel: (item) => (item.value == null ? '' : currencyFormatter(item.value)),
                },
              ]}
              grid={{ vertical: true, horizontal: true }}
              hideLegend
              slotProps={{ tooltip: { trigger: 'item' } }}
              slots={{ tooltip: VarianceTooltipWithContainer }}
            />
          </VarianceItemsContext.Provider>
        </ThemeProvider>
      </div>
    </div>
  );
};
