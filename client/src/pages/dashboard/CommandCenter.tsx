import { Layout } from '../../components/common/Layout';
import {
  CommandCenterKPICards,
  HourlySalesChartCard,
  LaborCostGaugeCard,
  AlertsCard,
} from '../../components/CommandCenter';
import CommandCenterIcon from '@assets/icons/command_center.svg?react';
import DollarIcon from '@assets/icons/dollar.svg?react';
import StarIcon from '@assets/icons/star.svg?react';

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
    badgeClassName: "bg-[rgba(93,197,79,0.2)] text-primary text-[10px] md:text-xs 2xl:text-sm px-4"
  },
  {
    title: 'Review Rating',
    timePeriod: 'Today',
    value: '4.3',
    accentColor: 'gold' as const,
    titleIcon: <StarIcon className="w-4 h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 text-quaternary" aria-hidden />,
    subtitle: 'Good',
    subtitleIcon: <StarIcon className="w-4 h-4 md:w-4 md:h-4 2xl:w-5 2xl:h-5 text-quaternary" aria-hidden />,
    extra: '272 Reviews',
    extraClassName: "bg-[rgba(253,185,14,0.2)] px-4"
  },
];

export const CommandCenter = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="flex items-center gap-2 text-base md:text-lg 2xl:text-xl font-semibold text-primary">
            <CommandCenterIcon className="w-4 h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 text-primary" aria-hidden />
            Command Center
          </h2>
        </div>

        <CommandCenterKPICards items={commandCenterKPIs} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <HourlySalesChartCard
            xAxisData={hourlySalesXAxis}
            series={hourlySalesSeries}
            height={256}
            className="lg:col-span-2"
          />
          <LaborCostGaugeCard
            value={47.7}
            subtitle="Labor vs Goals"
            overTarget={3.7}
            size={340}
          />
        </div>

        <AlertsCard />
      </div>
    </Layout>
  );
};
