import AlertsIcon from '@assets/icons/alerts.svg?react';
import FinancialAndLaborIcon from '@assets/icons/financial_and_labor.svg?react';
import InventoryAndSupplyChainIcon from '@assets/icons/inventory_and_supply_chain.svg?react';
import ReputationAndHrIcon from '@assets/icons/reputation_and_hr.svg?react';

export type AlertSeverity = 'critical' | 'warning';

export interface AlertItem {
  text: string;
  severity: AlertSeverity;
}

export interface AlertCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  alerts: AlertItem[];
}

const defaultCategories: AlertCategory[] = [
  {
    id: 'financial',
    title: 'Financial & labor',
    icon: <FinancialAndLaborIcon className="w-4 h-4 md:w-4.5 md:h-4.5 2xl:w-5 2xl:h-5 text-primary flex-shrink-0" aria-hidden />,
    alerts: [
      { text: 'High overtime risk pending Clock-Outs', severity: 'critical' },
      { text: 'Sales Slump', severity: 'warning' },
    ],
  },
  {
    id: 'inventory',
    title: 'Inventory & Supply chain',
    icon: <InventoryAndSupplyChainIcon className="w-4 h-4 md:w-4.5 md:h-4.5 2xl:w-5 2xl:h-5 text-primary flex-shrink-0" aria-hidden />,
    alerts: [
      { text: 'Delivery Overdue', severity: 'critical' },
      { text: 'Missing 5 lbs of Cheese', severity: 'warning' },
      { text: 'Low on Meat Stock', severity: 'critical' },
    ],
  },
  {
    id: 'reputation',
    title: 'Reputation & HR',
    icon: <ReputationAndHrIcon className="w-4 h-4 md:w-4.5 md:h-4.5 2xl:w-5 2xl:h-5 text-primary flex-shrink-0" aria-hidden />,
    alerts: [
      { text: '2 Negative Reviews', severity: 'warning' },
      { text: '3 Post Due Employee Reviews', severity: 'critical' },
      { text: '1 Pending Training Review', severity: 'critical' },
    ],
  },
];

export interface AlertsCardProps {
  categories?: AlertCategory[];
}

export const AlertsCard = ({ categories = defaultCategories }: AlertsCardProps) => {
  return (
    <div className="bg-card-background rounded-xl shadow border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-4 flex items-center flex-wrap gap-2 border-b border-gray-200">
        <h3 className="text-sm md:text-base 2xl:text-lg font-semibold text-secondary flex items-center gap-2">
          <AlertsIcon className="w-5 h-5 md:w-6 md:h-6 2xl:w-7 2xl:h-7 flex-shrink-0" aria-hidden />
          Alerts
        </h3>
      </div>

      {/* Categories: one row per category, title above and alerts below */}
      <div className="divide-y divide-gray-200">
        {categories.map((category) => (
          <div key={category.id} className="px-5 py-4">
            {/* Category title row: icon + title, Today + arrow on the right */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="flex items-center gap-2 text-xs md:text-sm 2xl:text-base font-medium text-secondary">
                {category.icon}
                {category.title}
              </h4>
            </div>
            {/* Alerts below the title, indented to align with title text (not the icon) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pl-7">
              {category.alerts.map((alert) => (
                <span
                  key={`${category.id}-${alert.text}`}
                  className="flex items-center gap-1.5 text-[10px] md:text-xs 2xl:text-sm text-primary"
                >
                  <span
                    className={`w-1 h-1 md:w-1.5 md:h-1.5 2xl:w-2 2xl:h-2 rounded-full flex-shrink-0 ${alert.severity === 'critical' ? 'bg-[#F04B5B]' : 'bg-[#FBC52A]'
                      }`}
                    aria-hidden
                  />
                  {alert.text}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
