import { Layout } from '../../components/common/Layout';
import { KPICard } from '../../components/common/KPICard';
import { AlertsCard } from '../../components/CommandCenter/AlertsCard';
import { TimeSeriesLineChart } from '../../components/charts/TimeSeriesLineChart';
import { PercentageGauge } from '../../components/gauges/PercentageGauge';
import CommandCenterIcon from '@assets/icons/command_center.svg?react';
import DollarIcon from '@assets/icons/dollar.svg?react';
import StarIcon from '@assets/icons/star.svg?react';

const cardClass = 'bg-card-background rounded-xl shadow border border-gray-200 overflow-hidden';

const hourlySalesXAxis = ['08 am', '11 am', '02 pm', '05 pm', '07 pm'];
const hourlySalesSeries = [
  { id: 'today', label: 'Today', data: [20, 100, 250, 450, 380], color: '#FBC52A' },
  { id: 'lastWeek', label: 'Last Week', data: [15, 85, 220, 400, 420], color: '#22C55E' },
];

const commandCenterKPIs = [
  {
    title: 'Net Sales',
    timePeriod: 'Today',
    value: '$723.7',
    accentColor: 'green' as const,
    valueClassName: 'text-green-600',
    rightIcon: <DollarIcon className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 text-white" />,
  },
  {
    title: 'Labor Cost %',
    timePeriod: 'Today',
    value: '47.7%',
    accentColor: 'blue' as const,
    badge: 'Goal 20%',
    badgeClassName: "bg-[rgba(93,197,79,0.2)] text-text-primary text-[10px] md:text-xs 2xl:text-sm px-4"
  },
  {
    title: 'Review Rating',
    timePeriod: 'Today',
    value: '4.3',
    accentColor: 'gold' as const,
    titleIcon: <StarIcon className="w-4 h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 text-text-quaternary" aria-hidden />,
    subtitle: 'Good',
    subtitleIcon: <StarIcon className="w-4 h-4 md:w-4 md:h-4 2xl:w-5 2xl:h-5 text-text-quaternary" aria-hidden />,
    extra: '272 Reviews',
    extraClassName: "bg-[rgba(253,185,14,0.2)] px-4"
  },
];

export const CommandCenter = () => {
  return (
    <Layout>
      <div className="p-6">
        {/* Page header - outside white container */}
        <div className="mb-6">
          <h2 className="flex items-center gap-2 text-base md:text-lg 2xl:text-xl font-semibold text-text-primary">
            <CommandCenterIcon className="w-4 h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 text-text-primary" aria-hidden />
            Command Center
          </h2>
        </div>

        {/* Top row: KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {commandCenterKPIs.map((kpi) => (
            <KPICard key={kpi.title} {...kpi} />
          ))}
        </div>

        {/* Middle row: Chart (2/3) + Gauge (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Hourly Sales: Today vs. Last Week */}
          <div className={`${cardClass} lg:col-span-2`}>
            <div className="p-5 pb-4 flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-sm font-semibold text-text-secondary">Hourly Sales: Today vs. Last Week</h3>
              <button
                type="button"
                className="p-1.5 hover:bg-button-secondary rounded-lg transition-colors cursor-pointer"
                aria-label="More options"
              >
                <span className="text-text-primary text-lg leading-none">⋯</span>
              </button>
            </div>
            <div className="px-5 pb-2 flex items-center gap-4">
              <span className="flex items-center gap-2 text-xs text-text-primary">
                <span className="w-3 h-3 rounded-full bg-text-quaternary" aria-hidden />
                {' '}
                Today
              </span>
              <span className="flex items-center gap-2 text-xs text-text-primary">
                <span className="w-3 h-3 rounded-full bg-green-500" aria-hidden />
                {' '}
                Last Week
              </span>
            </div>
            <div className="h-64 px-5 pb-5">
              <TimeSeriesLineChart
                xAxisData={hourlySalesXAxis}
                series={hourlySalesSeries}
                height={256}
              />
            </div>
          </div>

          {/* Labor Cost Percentage Gauge */}
          <div className={`${cardClass} lg:col-span-1`}>
            <div className="p-5 flex flex-col items-center">
              <h3 className="text-sm font-semibold text-text-secondary mb-4 text-center">Labor Cost Percentage Gauge</h3>
              <div className="flex justify-center w-full">
                <PercentageGauge
                  value={47.7}
                  subtitle="Labor vs Goals"
                  overTarget={3.7}
                  size={340}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Alerts card */}
        <AlertsCard />
      </div>
    </Layout>
  );
};
