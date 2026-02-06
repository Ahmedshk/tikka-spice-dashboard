import { createContext, useContext, useEffect, useRef, type ComponentProps } from 'react';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BarChart } from '@mui/x-charts/BarChart';
import { ChartsTooltipContainer, useItemTooltip } from '@mui/x-charts/ChartsTooltip';
import type { VarianceChartItem } from '../InventoryFoodCost/VarianceChartCard';

const LABEL_FONT = { fontFamily: 'Onest, sans-serif', fill: '#5B6B79' };

const desktopMargin = { top: 10, right: 0, bottom: 24, left: 0 };
const mobileMargin = { top: 4, right: 0, bottom: 16, left: 0 };

export const VarianceItemsContext = createContext<VarianceChartItem[]>([]);

function formatCurrency(v: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);
}

function VarianceBarTooltipContent() {
  const tooltipData = useItemTooltip();
  const items = useContext(VarianceItemsContext);

  const dataIndex = tooltipData?.identifier?.dataIndex;
  if (tooltipData == null || tooltipData.identifier?.type !== 'bar' || dataIndex == null) {
    return null;
  }

  const item = items[dataIndex];
  if (item == null) return null;

  const costVariance = item.varianceCost;
  const quantityVariance =
    item.actualQuantity != null && item.theoreticalQuantity != null
      ? item.actualQuantity - item.theoreticalQuantity
      : null;
  const formatVarianceCost = (v: number) => (v >= 0 ? `+${formatCurrency(v)}` : formatCurrency(v));
  const formatVarianceQty = (v: number) => (v >= 0 ? `+${v}` : `${v}`);
  let quantityVarianceColor = '';
  if (quantityVariance !== null) {
    quantityVarianceColor = quantityVariance >= 0 ? 'text-red-600' : 'text-green-600';
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg text-left min-w-[200px]">
      <p className="text-sm font-semibold text-primary mb-2">{item.label}</p>
      <dl className="space-y-1 text-xs text-secondary">
        <div className="flex justify-between gap-4">
          <dt>Cost variance</dt>
          <dd className={`font-medium ${costVariance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
            {formatVarianceCost(costVariance)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Quantity variance</dt>
          <dd className={`font-medium ${quantityVarianceColor}`}>
            {quantityVariance === null ? '—' : formatVarianceQty(quantityVariance)}
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-gray-100 pt-1 mt-1">
          <dt>Actual cost</dt>
          <dd className="font-medium text-primary">{item.actualCost == null ? '—' : formatCurrency(item.actualCost)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Theoretical cost</dt>
          <dd className="font-medium text-primary">{item.theoreticalCost == null ? '—' : formatCurrency(item.theoreticalCost)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Actual quantity</dt>
          <dd className="font-medium text-primary">{item.actualQuantity ?? '—'}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Theoretical quantity</dt>
          <dd className="font-medium text-primary">{item.theoreticalQuantity ?? '—'}</dd>
        </div>
      </dl>
    </div>
  );
}

export function VarianceTooltipWithContainer(props: Readonly<ComponentProps<typeof ChartsTooltipContainer>>) {
  return (
    <ChartsTooltipContainer {...props} trigger="item">
      <VarianceBarTooltipContent />
    </ChartsTooltipContainer>
  );
}

const defaultTheme = createTheme({
  palette: { mode: 'light' },
});

export interface VarianceChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: VarianceChartItem[];
}

const DESKTOP_CHART_HEIGHT = 420;
const MOBILE_CHART_HEIGHT = 320;
const DESKTOP_MIN_BAR_WIDTH = 56;
const MOBILE_MIN_BAR_WIDTH = 40;
const DESKTOP_MIN_CHART_WIDTH = 400;
const MOBILE_MIN_CHART_WIDTH = 280;

export const VarianceChartModal = ({ isOpen, onClose, items }: VarianceChartModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const labels = items.map((i) => i.label);
  const values = items.map((i) => i.varianceCost);
  const chartHeight = isDesktop ? DESKTOP_CHART_HEIGHT : MOBILE_CHART_HEIGHT;
  const minBarWidth = isDesktop ? DESKTOP_MIN_BAR_WIDTH : MOBILE_MIN_BAR_WIDTH;
  const minChartWidth = isDesktop ? DESKTOP_MIN_CHART_WIDTH : MOBILE_MIN_CHART_WIDTH;
  const chartWidth = Math.max(minChartWidth, items.length * minBarWidth);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[300] m-0 grid h-screen w-screen min-h-screen min-w-full max-w-none max-h-none place-items-center bg-transparent border-0 p-2 sm:p-4 outline-none [&::backdrop]:bg-black/50 [&::backdrop]:cursor-pointer"
      aria-labelledby="variance-chart-modal-title"
      onClose={onClose}
    >
      <div className="relative w-full max-w-[min(calc(100vw-1rem),48rem)] max-h-[85vh] sm:max-h-[90vh] flex flex-col">
        <button
          type="button"
          onClick={() => { dialogRef.current?.close(); onClose(); }}
          className="absolute -top-2 -right-2 md:-top-4 md:-right-4 z-[400] flex h-8 w-8 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 shadow-md ring-1 ring-gray-200 hover:bg-gray-100 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary touch-manipulation"
          aria-label="Close"
        >
          <span className="text-lg md:text-xl 2xl:text-2xl leading-none">×</span>
        </button>
        <div className="relative max-h-[85vh] sm:max-h-[90vh] flex flex-col bg-card-background rounded-xl shadow-lg border-b border-gray-200 overflow-hidden">
          <div className="relative w-full rounded-t-xl bg-primary px-3 py-2.5 sm:px-5 sm:py-3 flex-shrink-0">
            <h2 id="variance-chart-modal-title" className="text-sm md:text-base 2xl:text-lg font-semibold text-white">
              Food Cost Variance – All Items
            </h2>
          </div>
          <div
            className="flex-1 min-h-0 min-w-0 w-full overflow-y-hidden overflow-x-scroll p-3 sm:p-5 border-x border-gray-200 touch-pan-x"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <VarianceItemsContext.Provider value={items}>
              <ThemeProvider theme={defaultTheme}>
                <div className="touch-pan-x" style={{ height: chartHeight, width: chartWidth }}>
                  <BarChart
                    width={chartWidth}
                    height={chartHeight}
                    margin={isDesktop ? desktopMargin : mobileMargin}
                    xAxis={[
                      {
                        scaleType: 'band',
                        data: labels,
                        tickLabelStyle: { ...LABEL_FONT, fontSize: isDesktop ? 10 : 9 },
                      },
                    ]}
                    yAxis={[
                      {
                        label: 'Variance ($)',
                        tickLabelStyle: { ...LABEL_FONT, fontSize: isDesktop ? 10 : 9 },
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
                        valueFormatter: (v) => (v == null ? '' : formatCurrency(v)),
                      },
                    ]}
                    grid={{ vertical: true, horizontal: true }}
                    hideLegend
                    slotProps={{ tooltip: { trigger: 'item', disablePortal: true } }}
                    slots={{ tooltip: VarianceTooltipWithContainer }}
                  />
                </div>
              </ThemeProvider>
            </VarianceItemsContext.Provider>
          </div>
        </div>
      </div>
    </dialog>
  );
};
