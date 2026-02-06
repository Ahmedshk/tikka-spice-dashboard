import { useState } from 'react';
import { Layout } from '../../components/common/Layout';
import { SalesTrendChartCard, KPIsTableCard, SalesByCategoryCard } from '../../components/SalesTrend';
import SalesAndLaborIcon from '@assets/icons/sales_and_labor.svg?react';

const cardClass = 'bg-card-background rounded-xl shadow border border-gray-200 overflow-hidden';

// Date labels Mar 25 - Apr 20 (27 points)
const salesTrendDateLabels = [
  'Mar 25', 'Mar 26', 'Mar 27', 'Mar 28', 'Mar 29', 'Mar 30', 'Mar 31',
  'Apr 01', 'Apr 02', 'Apr 03', 'Apr 04', 'Apr 05', 'Apr 06', 'Apr 07', 'Apr 08', 'Apr 09', 'Apr 10',
  'Apr 11', 'Apr 12', 'Apr 13', 'Apr 14', 'Apr 15', 'Apr 16', 'Apr 17', 'Apr 18', 'Apr 19', 'Apr 20',
];

const salesTrendSeries = [
  {
    id: 'today',
    label: 'Today',
    data: [4200, 5800, 7200, 6500, 8100, 9200, 8800, 10200, 11500, 12100, 11800, 13200, 14500, 15200, 14800, 16200, 17800, 18500, 19200, 20500, 21800, 22500, 22200, 23800, 24200, 23500, 22800],
    color: '#FBC52A',
  },
  {
    id: 'lastWeek',
    label: 'Last Week',
    data: [3800, 5200, 6500, 6000, 7500, 8400, 8000, 9500, 10800, 11200, 11000, 12200, 13200, 13800, 13500, 14800, 16200, 16800, 17500, 18600, 19800, 20500, 20200, 21500, 21800, 21200, 20600],
    color: '#22C55E',
  },
];

type KpiRow = { label: string; current: string | number; previous: string | number; percent: number };

function getKpiRows(timeRange: string, comparison: string, _metric: string): KpiRow[] {
  // Mock: same structure; values could vary by timeRange/comparison/metric in a real API
  if (timeRange === 'Last 30 Days' && comparison === 'vs. Last Year') {
    return [
      { label: 'Total Net Sales', current: '$224,095', previous: '$186,710', percent: 20 },
      { label: 'Total Transactions', current: '8,238', previous: '7,056', percent: 16.7 },
      { label: 'Average Check Size', current: '$26.10', previous: '$26.46', percent: -1.4 },
      { label: 'Average Daily Sales', current: '$7,470', previous: '$6,224', percent: 20.1 },
      { label: 'Sales Per Hour SPH', current: '$548', previous: '$569', percent: -3.7 },
    ];
  }
  // Alternate mock for other selections
  return [
    { label: 'Total Net Sales', current: '$52,100', previous: '$48,200', percent: 8.1 },
    { label: 'Total Transactions', current: '1,892', previous: '1,756', percent: 7.8 },
    { label: 'Average Check Size', current: '$27.52', previous: '$27.44', percent: 0.3 },
    { label: 'Average Daily Sales', current: '$7,443', previous: '$6,886', percent: 8.1 },
    { label: 'Sales Per Hour SPH', current: '$542', previous: '$518', percent: 4.6 },
  ];
}

function getSalesByCategoryItems(timeRange: string, comparison: string): { label: string; currentValue: number; comparisonValue: number }[] {
  // Mock: could vary by timeRange/comparison when wired to API
  if (timeRange === 'Last 30 Days' && comparison === 'vs. Last Year') {
    return [
      { label: 'Food', currentValue: 187424, comparisonValue: 157424 },
      { label: 'Beverages', currentValue: 48980, comparisonValue: 51700 },
      { label: 'Merchandise', currentValue: 17691, comparisonValue: 14890 },
      { label: 'Catering', currentValue: 12500, comparisonValue: 9800 },
      { label: 'Retail', currentValue: 8450, comparisonValue: 7200 },
      { label: 'Other', currentValue: 4100, comparisonValue: 3500 }
    ];
  }
  return [
    { label: 'Food', currentValue: 43200, comparisonValue: 40100 },
    { label: 'Beverages', currentValue: 11200, comparisonValue: 10800 },
    { label: 'Merchandise', currentValue: 4100, comparisonValue: 3900 },
    { label: 'Catering', currentValue: 3200, comparisonValue: 2900 },
    { label: 'Retail', currentValue: 2100, comparisonValue: 1900 },
    { label: 'Other', currentValue: 600, comparisonValue: 500 },
  ];
}

export const SalesTrendReports = () => {
  const [metric, setMetric] = useState('Sales');
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [comparison, setComparison] = useState('vs. Last Year');
  const [groupBy, setGroupBy] = useState('None');
  const [kpiPeriod, setKpiPeriod] = useState('Last 30 Days');
  const [kpiComparison, setKpiComparison] = useState('vs. Last Year');
  const [categoryPeriod, setCategoryPeriod] = useState('Last 30 Days');
  const [categoryComparison, setCategoryComparison] = useState('vs. Last Year');

  const selectClass = 'border border-gray-300 rounded-lg px-3 py-2 text-sm text-primary bg-white focus:outline-none focus:ring-2 focus:ring-quaternary/30';

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="flex items-center gap-2 text-base md:text-lg 2xl:text-xl font-semibold text-primary mb-4">
            <SalesAndLaborIcon className="w-4 h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 text-primary" aria-hidden />
            Sales Trend Report
          </h2>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor="metric" className="text-xs md:text-sm text-secondary">Metric:</label>
              <select
                id="metric"
                value={metric}
                onChange={(e) => setMetric(e.target.value)}
                className={selectClass}
              >
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="period" className="text-xs md:text-sm text-secondary">Period:</label>
              <select
                id="period"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className={selectClass}
              >
                <option value="Last 30 Days">Last 30 Days</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="comparison" className="text-xs md:text-sm text-secondary">Comparison:</label>
              <select
                id="comparison"
                value={comparison}
                onChange={(e) => setComparison(e.target.value)}
                className={selectClass}
              >
                <option value="vs. Last Year">vs. Last Year</option>
              </select>
            </div>
          </div>
        </div>

        <SalesTrendChartCard
          xAxisData={salesTrendDateLabels}
          series={salesTrendSeries}
          groupBy={groupBy}
          onGroupByChange={setGroupBy}
          height={280}
          yAxis={{
            min: 0,
            max: 25000,
            valueFormatter: (v) => `$${v / 1000}k`,
          }}
        />

        {/* Bottom: KPIs + Sales by Category (50/50) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className={cardClass}>
            <KPIsTableCard
              rows={getKpiRows(kpiPeriod, kpiComparison, metric)}
              title="KPIs"
              currentPeriodLabel={kpiPeriod}
              comparisonPeriodLabel={kpiComparison === 'vs. Last Year' ? 'Last Year' : kpiComparison}
              period={kpiPeriod}
              comparison={kpiComparison}
              onPeriodChange={setKpiPeriod}
              onComparisonChange={setKpiComparison}
            />
          </div>
          <div className={cardClass}>
            <SalesByCategoryCard
              items={getSalesByCategoryItems(categoryPeriod, categoryComparison)}
              currentPeriodLabel={categoryPeriod}
              comparisonPeriodLabel={categoryComparison === 'vs. Last Year' ? 'Last Year' : categoryComparison}
              period={categoryPeriod}
              comparison={categoryComparison}
              onPeriodChange={setCategoryPeriod}
              onComparisonChange={setCategoryComparison}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
