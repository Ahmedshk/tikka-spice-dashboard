import { useState } from 'react';
import { TREND_POSITIVE, TREND_NEGATIVE } from '../../constants/trendColors';
import { SalesByCategoryModal } from '../modal/SalesByCategoryModal';

const COMPARISON_BAR_COLOR = '#9CA3AF';
const CARD_ITEM_LIMIT = 4;

type ViewMode = 'table' | 'visual';

export interface SalesByCategoryItem {
  label: string;
  currentValue: number;
  comparisonValue: number;
}

const DEFAULT_PERIOD_OPTIONS = [
  { value: 'Last 7 Days', label: 'Last 7 Days' },
  { value: 'Last 30 Days', label: 'Last 30 Days' },
  { value: 'Last 90 Days', label: 'Last 90 Days' },
];

const DEFAULT_COMPARISON_OPTIONS = [
  { value: 'vs. Last Year', label: 'Last Year' },
  { value: 'vs. Previous Period', label: 'Previous Period' },
];

export interface SalesByCategoryCardProps {
  items: SalesByCategoryItem[];
  currentPeriodLabel: string;
  comparisonPeriodLabel: string;
  period?: string;
  comparison?: string;
  onPeriodChange?: (value: string) => void;
  onComparisonChange?: (value: string) => void;
  periodOptions?: { value: string; label: string }[];
  comparisonOptions?: { value: string; label: string }[];
}

function getTrendColor(currentValue: number, comparisonValue: number) {
  if (comparisonValue === 0) return TREND_POSITIVE;
  return currentValue >= comparisonValue ? TREND_POSITIVE : TREND_NEGATIVE;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function getPercentChange(currentValue: number, comparisonValue: number): number {
  if (comparisonValue === 0) return 0;
  return ((currentValue - comparisonValue) / comparisonValue) * 100;
}

const cardSelectClass = 'border-0 rounded-lg px-2 py-1 text-xs font-medium text-primary bg-white focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer';

export const SalesByCategoryCard = ({
  items,
  currentPeriodLabel,
  comparisonPeriodLabel,
  period = 'Last 30 Days',
  comparison = 'vs. Last Year',
  onPeriodChange,
  onComparisonChange,
  periodOptions = DEFAULT_PERIOD_OPTIONS,
  comparisonOptions = DEFAULT_COMPARISON_OPTIONS,
}: SalesByCategoryCardProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('visual');
  const [modalOpen, setModalOpen] = useState(false);
  const displayItems = items.slice(0, CARD_ITEM_LIMIT);
  const totalCurrent = items.reduce((s, i) => s + i.currentValue, 0);
  const totalComparison = items.reduce((s, i) => s + i.comparisonValue, 0);
  const totalPercentChange = getPercentChange(totalCurrent, totalComparison);
  const cardMaxValue = Math.max(
    ...displayItems.flatMap((i) => [i.currentValue, i.comparisonValue]),
    totalCurrent,
    totalComparison,
    1
  );

  return (
    <div className="flex flex-col h-full">
      <div className="rounded-t-xl bg-primary px-5 py-1 md:py-2 flex flex-col md:flex-row items-center justify-center md:justify-between flex-wrap gap-2">
        <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-white shrink-0">Sales by Category</h3>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {onPeriodChange != null && onComparisonChange != null && (
            <>
              <select
                value={period}
                onChange={(e) => onPeriodChange(e.target.value)}
                className={cardSelectClass}
                aria-label="Period"
              >
                {periodOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <span className="text-white text-xs font-medium shrink-0">vs</span>
              <select
                value={comparison}
                onChange={(e) => onComparisonChange(e.target.value)}
                className={cardSelectClass}
                aria-label="Comparison"
              >
                {comparisonOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </>
          )}
          <div className="flex rounded-lg overflow-hidden bg-white/20">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-2 py-1 text-xs font-medium transition-colors ${viewMode === 'table' ? 'bg-white text-primary' : 'text-white hover:bg-white/10'}`}
              aria-pressed={viewMode === 'table'}
            >
              Table
            </button>
            <button
              type="button"
              onClick={() => setViewMode('visual')}
              className={`px-2 py-1 text-xs font-medium transition-colors ${viewMode === 'visual' ? 'bg-white text-primary' : 'text-white hover:bg-white/10'}`}
              aria-pressed={viewMode === 'visual'}
            >
              Visual
            </button>
          </div>
        </div>
      </div>
      <div className="px-5 pb-4 flex-1 pt-5 space-y-4">
        {viewMode === 'visual' && (
          <div className="flex flex-wrap items-center gap-4 text-xs text-primary">
            <span className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: TREND_POSITIVE }}
                aria-hidden
              />
              {currentPeriodLabel}
              {' '}
              (increase)
            </span>
            <span className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: TREND_NEGATIVE }}
                aria-hidden
              />
              {currentPeriodLabel}
              {' '}
              (decrease)
            </span>
            <span className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: COMPARISON_BAR_COLOR }}
                aria-hidden
              />
              {comparisonPeriodLabel}
            </span>
          </div>
        )}
        {viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[10px] md:text-xs 2xl:text-sm">
              <thead>
                <tr className="text-left text-xs md:text-sm 2xl:text-base text-secondary border-b border-gray-200">
                  <th className="pb-3 pr-4 pl-2 font-semibold">Label</th>
                  <th className="pb-3 pr-4 font-semibold text-right">{currentPeriodLabel}</th>
                  <th className="pb-3 pr-4 font-semibold text-right">{comparisonPeriodLabel}</th>
                  <th className="pb-3 pr-2 font-semibold text-right">Percentage (%)</th>
                </tr>
              </thead>
              <tbody className="text-primary text-[10px] md:text-xs 2xl:text-sm">
                {displayItems.map((item, index) => {
                  const percentChange = getPercentChange(item.currentValue, item.comparisonValue);
                  const isPositive = percentChange >= 0;
                  return (
                    <tr
                      key={item.label}
                      className={index % 2 === 1 ? 'bg-[#F3F5F7]' : ''}
                    >
                      <td className="py-3 pr-4 pl-2 font-medium text-secondary text-xs md:text-sm 2xl:text-base">{item.label}</td>
                      <td className="py-3 pr-4 text-right font-semibold">{formatCurrency(item.currentValue)}</td>
                      <td className="py-3 pr-4 text-right font-semibold">{formatCurrency(item.comparisonValue)}</td>
                      <td className="py-3 pr-2 text-right">
                        <span className={`font-semibold ${isPositive ? 'text-positive' : 'text-negative'}`}>
                          {isPositive ? '+' : ''}{percentChange.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
                <tr className="border-t-2 border-gray-200">
                  <td className="py-3 pr-4 pl-2 font-semibold text-secondary text-xs md:text-sm 2xl:text-base">Total</td>
                  <td className="py-3 pr-4 text-right font-semibold">{formatCurrency(totalCurrent)}</td>
                  <td className="py-3 pr-4 text-right font-semibold">{formatCurrency(totalComparison)}</td>
                  <td className="py-3 pr-2 text-right">
                    <span className={`font-semibold ${totalPercentChange >= 0 ? 'text-positive' : 'text-negative'}`}>
                      {totalPercentChange >= 0 ? '+' : ''}{totalPercentChange.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <>
            {displayItems.map((item) => {
              const currentPercent = cardMaxValue > 0 ? (item.currentValue / cardMaxValue) * 100 : 0;
              const comparisonPercent = cardMaxValue > 0 ? (item.comparisonValue / cardMaxValue) * 100 : 0;
              const currentBarColor = getTrendColor(item.currentValue, item.comparisonValue);
              const percentChange = getPercentChange(item.currentValue, item.comparisonValue);
              const isPositive = percentChange >= 0;
              return (
                <div key={item.label}>
                  <div className="mb-1 text-[10px] md:text-xs 2xl:text-sm font-medium text-secondary flex items-center gap-1.5">
                    <span>{item.label}</span>
                    <span className={`shrink-0 font-semibold ${isPositive ? 'text-positive' : 'text-negative'}`}>
                      {isPositive ? '+' : ''}{percentChange.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-0 rounded overflow-hidden bg-white" style={{ height: 8 }}>
                        <div
                          className="h-full rounded"
                          style={{
                            width: `${currentPercent}%`,
                            backgroundColor: currentBarColor,
                            minWidth: item.currentValue > 0 ? 2 : 0,
                          }}
                        />
                      </div>
                      <span className="text-[10px] md:text-xs 2xl:text-sm text-primary font-semibold shrink-0">
                        {formatCurrency(item.currentValue)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-0 rounded overflow-hidden bg-white" style={{ height: 8 }}>
                        <div
                          className="h-full rounded"
                          style={{
                            width: `${comparisonPercent}%`,
                            backgroundColor: COMPARISON_BAR_COLOR,
                            minWidth: item.comparisonValue > 0 ? 2 : 0,
                          }}
                        />
                      </div>
                      <span className="text-[10px] md:text-xs 2xl:text-sm text-primary font-semibold shrink-0">
                        {formatCurrency(item.comparisonValue)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="border-t-2 border-gray-200 pt-4 mt-1">
              <div className="mb-1 text-[10px] md:text-xs 2xl:text-sm font-semibold text-secondary flex items-center gap-1.5">
                <span>Total</span>
                <span className={`shrink-0 font-semibold ${totalPercentChange >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {totalPercentChange >= 0 ? '+' : ''}{totalPercentChange.toFixed(1)}%
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {(() => {
                  const totalCurrentPct = cardMaxValue > 0 ? (totalCurrent / cardMaxValue) * 100 : 0;
                  const totalComparisonPct = cardMaxValue > 0 ? (totalComparison / cardMaxValue) * 100 : 0;
                  return (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 min-w-0 rounded overflow-hidden bg-white" style={{ height: 8 }}>
                          <div
                            className="h-full rounded"
                            style={{
                              width: `${totalCurrentPct}%`,
                              backgroundColor: getTrendColor(totalCurrent, totalComparison),
                              minWidth: totalCurrent > 0 ? 2 : 0,
                            }}
                          />
                        </div>
                        <span className="text-[10px] md:text-xs 2xl:text-sm text-primary font-semibold shrink-0">
                          {formatCurrency(totalCurrent)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 min-w-0 rounded overflow-hidden bg-white" style={{ height: 8 }}>
                          <div
                            className="h-full rounded"
                            style={{
                              width: `${totalComparisonPct}%`,
                              backgroundColor: COMPARISON_BAR_COLOR,
                              minWidth: totalComparison > 0 ? 2 : 0,
                            }}
                          />
                        </div>
                        <span className="text-[10px] md:text-xs 2xl:text-sm text-primary font-semibold shrink-0">
                          {formatCurrency(totalComparison)}
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="px-5 pb-5 flex justify-end">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="text-[10px] md:text-xs 2xl:text-sm font-bold text-quaternary hover:underline cursor-pointer"
        >
          View All
        </button>
      </div>

      <SalesByCategoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        items={items}
        currentPeriodLabel={currentPeriodLabel}
        comparisonPeriodLabel={comparisonPeriodLabel}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        period={period}
        comparison={comparison}
        onPeriodChange={onPeriodChange}
        onComparisonChange={onComparisonChange}
        periodOptions={periodOptions}
        comparisonOptions={comparisonOptions}
      />
    </div>
  );
};
