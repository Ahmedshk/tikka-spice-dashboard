import { Layout } from '../../components/common/Layout';
import {
  SalesLaborKPICards,
  HourlyBreakdownCard,
  SourcesOfSalesCard,
  ClockedInStaffCard,
  DailyTargetsSectionCard,
} from '../../components/SalesLabor';
import SalesAndLaborIcon from '@assets/icons/sales_and_labor.svg?react';
import DollarIcon from '@assets/icons/dollar.svg?react';
import ActualLaborCostIcon from '@assets/icons/actual_labor_cost.svg?react';
import TotalHoursIcon from '@assets/icons/total_hours.svg?react';
import SalesPerManHourIcon from '@assets/icons/sales_per_man_hour.svg?react';
import NoOfTransactionsIcon from '@assets/icons/no_of_transactions.svg?react';
import AverageCheckIcon from '@assets/icons/average_check.svg?react';
import TotalDiscountsIcon from '@assets/icons/total_discounts.svg?react';

const hourlyLabels = ['08 am', '09 am', '10 am', '11 am', '12 pm', '01 pm', '02 pm', '03 pm', '04 pm', '05 pm', '06 pm', '07 pm'];
const hourlySalesData = [120, 280, 420, 580, 720, 650, 480, 520, 610, 750, 680, 390];
const hourlyLaborCostData = [18, 19, 20, 21, 22, 23, 22, 21, 22, 23, 24, 22];

const sourcesOfSalesSegments = [
  { id: 'kiosk', label: 'Kiosk', value: 52, amount: '$4,381', color: '#FBC52A' },
  { id: 'pickup', label: 'Pickup', value: 24, amount: '$2,022', color: '#00BCD4' },
  { id: 'doordash', label: 'DoorDash', value: 16, amount: '$1,348', color: '#EF4444' },
  { id: 'grubhub', label: 'GrubHub', value: 8, amount: '$674', color: '#22C55E' },
];

const clockedInStaffRows = [
  { name: 'Alex Jonson', role: 'Line Cook', clockIn: '10:00 am', currentHours: 6.5, status: 'On Clock' as const },
  { name: 'Kraven meachle', role: 'Prep Cook', clockIn: '8:00 am', currentHours: 6.5, status: 'On Break' as const },
  { name: 'Sarah Miller', role: 'Server', clockIn: '9:30 am', currentHours: 5, status: 'On Clock' as const },
  { name: 'James Wilson', role: 'Line Cook', clockIn: '11:00 am', currentHours: 4, status: 'On Clock' as const },
  { name: 'Emma Davis', role: 'Prep Cook', clockIn: '7:00 am', currentHours: 8, status: 'On Break' as const },
];

const dailyTargetsItems = [
  { label: 'Sales Target', actual: 9425, target: 9000, higherIsBetter: true, formatValue: (n: number) => `$${n.toLocaleString()}` },
  { label: 'Labor Cost %', actual: 22.3, target: 20, higherIsBetter: false, formatValue: (n: number) => `${n}%` },
  { label: 'Hours Target', actual: 122, target: 135, higherIsBetter: false },
  { label: 'SPMH Target', actual: 59.3, target: 66.67, higherIsBetter: true, formatValue: (n: number) => `$${n.toFixed(2)}` },
];

const salesLaborKPIs = [
  {
    title: 'Actual Total Sales',
    timePeriod: 'Today',
    value: '$8,425',
    accentColor: 'green' as const,
    rightIcon: <DollarIcon className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 text-white" />,
  },
  {
    title: 'Actual Labor Cost %',
    timePeriod: 'Today',
    value: '22.3%',
    accentColor: 'blue' as const,
    rightIcon: <ActualLaborCostIcon className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 text-white" />,
  },
  {
    title: 'Total Hours',
    timePeriod: 'Today',
    value: '142',
    accentColor: 'orange' as const,
    rightIcon: <TotalHoursIcon className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 text-white" />,
  },
  {
    title: 'Sales Per Man Hour',
    timePeriod: 'Today',
    value: '$59.30',
    accentColor: 'purple' as const,
    rightIcon: <SalesPerManHourIcon className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 text-white" />,
  },
  {
    title: 'No. of Transactions',
    timePeriod: 'Today',
    value: '425',
    accentColor: 'gray' as const,
    rightIcon: <NoOfTransactionsIcon className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 text-white" />,
  },
  {
    title: 'Average Check',
    timePeriod: 'Today',
    value: '$110',
    accentColor: 'red' as const,
    rightIcon: <AverageCheckIcon className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 text-white" />,
  },
  {
    title: 'Total Discounts',
    timePeriod: 'Today',
    value: '$590.32',
    accentColor: 'azure' as const,
    rightIcon: <TotalDiscountsIcon className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 text-white" />,
  },
  {
    title: 'Total Refunds',
    timePeriod: 'Today',
    value: '$135.30',
    accentColor: 'yellow' as const,
    extra: '#Refunds 02',
    extraClassName: 'bg-quaternary/20 text-primary',
  },
];

export const SalesLaborDetails = () => {
  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="flex items-center gap-2 text-base md:text-lg 2xl:text-xl font-semibold text-primary">
            <SalesAndLaborIcon className="w-4 h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 text-primary" aria-hidden />
            Sales & Labor Detail
          </h2>
        </div>

        <SalesLaborKPICards items={salesLaborKPIs} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <HourlyBreakdownCard
            xAxisLabels={hourlyLabels}
            salesData={hourlySalesData}
            laborCostData={hourlyLaborCostData}
            height={280}
            className="lg:col-span-2"
          />
          <SourcesOfSalesCard
            totalSales="$8,425"
            segments={sourcesOfSalesSegments}
            subtitle="Today"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ClockedInStaffCard rows={clockedInStaffRows} className="lg:col-span-2" />
          <DailyTargetsSectionCard items={dailyTargetsItems} />
        </div>
      </div>
    </Layout>
  );
};
