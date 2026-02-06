import { useState } from 'react';
import { Layout } from '../../components/common/Layout';
import {
  InventoryKPICards,
  CostOfGoodsSoldCard,
  VarianceChartCard,
  OrderTrackerCard,
} from '../../components/InventoryFoodCost';
import { OrderTrackerModal } from '../../components/modal/OrderTrackerModal';
import { VarianceChartModal } from '../../components/modal/VarianceChartModal';
import type { VarianceChartItem } from '../../components/InventoryFoodCost/VarianceChartCard';
import InventoryAndFoodCostIcon from '@assets/icons/inventory_and_food_cost.svg?react';
import DollarIcon from '@assets/icons/dollar.svg?react';
import PendingOrdersIcon from '@assets/icons/pending_orders.svg?react';

const ORDER_TRACKER_CARD_SIZE = 12;

const inventoryKPIs = [
  {
    title: 'Current Food Cost',
    timePeriod: 'Today',
    value: '$8,520',
    accentColor: 'green' as const,
    rightIcon: <DollarIcon className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 text-white" />,
  },
  {
    title: 'Inventory value',
    timePeriod: 'Today',
    value: '$47,920',
    accentColor: 'blue' as const,
    rightIcon: <DollarIcon className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 text-white" />,
  },
  {
    title: 'Weekly Waste Cost',
    timePeriod: 'Today',
    value: '$1,230',
    accentColor: 'orange' as const,
    rightIcon: <DollarIcon className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 text-white" />,
  },
  {
    title: 'Pending Orders',
    timePeriod: 'Today',
    value: '06',
    accentColor: 'purple' as const,
    rightIcon: <PendingOrdersIcon className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 text-white" />,
  },
];

type OrderStatus = 'Received' | 'Pending';

const orderTrackerRows: { poNumber: string; supplier: string; date: string; status: OrderStatus }[] = [
  { poNumber: '12345', supplier: 'Fresh Produce', date: 'Mar 25', status: 'Received' },
  { poNumber: '12345', supplier: 'Dairy Supplier', date: 'Mar 26', status: 'Pending' },
  { poNumber: '12345', supplier: 'Meat Distributors', date: 'Mar 27', status: 'Received' },
  { poNumber: '12345', supplier: 'Fresh Produce', date: 'Mar 28', status: 'Received' },
  { poNumber: '12345', supplier: 'Dairy Supplier', date: 'Mar 29', status: 'Received' },
  { poNumber: '12345', supplier: 'Meat Distributors', date: 'Mar 30', status: 'Received' },
  { poNumber: '12345', supplier: 'Fresh Produce', date: 'Apr 15', status: 'Received' },
  { poNumber: '12345', supplier: 'Dairy Supplier', date: 'Apr 16', status: 'Received' },
  { poNumber: '12345', supplier: 'Meat Distributors', date: 'Apr 17', status: 'Pending' },
  { poNumber: '12345', supplier: 'Fresh Produce', date: 'Apr 18', status: 'Pending' },
  { poNumber: '12345', supplier: 'Dairy Supplier', date: 'Apr 19', status: 'Received' },
  { poNumber: '12345', supplier: 'Meat Distributors', date: 'Apr 20', status: 'Received' },
  { poNumber: '12345', supplier: 'Fresh Produce', date: 'Apr 21', status: 'Received' },
  { poNumber: '12345', supplier: 'Dairy Supplier', date: 'Apr 22', status: 'Received' },
  { poNumber: '12345', supplier: 'Meat Distributors', date: 'Apr 23', status: 'Received' },
  { poNumber: '12345', supplier: 'Fresh Produce', date: 'Apr 24', status: 'Pending' },
  { poNumber: '12345', supplier: 'Dairy Supplier', date: 'Apr 25', status: 'Received' },
  { poNumber: '12345', supplier: 'Meat Distributors', date: 'Apr 26', status: 'Received' },
];

const fullVarianceItems: VarianceChartItem[] = [
  { label: 'Meat', varianceCost: 350, actualCost: 1850, theoreticalCost: 1500, actualQuantity: 120, theoreticalQuantity: 100 },
  { label: 'Seafood', varianceCost: -150, actualCost: 850, theoreticalCost: 1000, actualQuantity: 45, theoreticalQuantity: 50 },
  { label: 'Produce', varianceCost: 350, actualCost: 1350, theoreticalCost: 1000, actualQuantity: 220, theoreticalQuantity: 180 },
  { label: 'Dairy', varianceCost: 150, actualCost: 650, theoreticalCost: 500, actualQuantity: 80, theoreticalQuantity: 70 },
  { label: 'Bakery', varianceCost: -50, actualCost: 200, theoreticalCost: 250, actualQuantity: 30, theoreticalQuantity: 35 },
  { label: 'Pantry', varianceCost: 150, actualCost: 450, theoreticalCost: 300, actualQuantity: 95, theoreticalQuantity: 80 },
  { label: 'Chicken Wings', varianceCost: -125, actualCost: 375, theoreticalCost: 500, actualQuantity: 55, theoreticalQuantity: 70 },
  { label: 'Mozzarella Cheese', varianceCost: -98, actualCost: 202, theoreticalCost: 300, actualQuantity: 22, theoreticalQuantity: 28 },
  { label: 'Tomato Sauce', varianceCost: -85, actualCost: 165, theoreticalCost: 250, actualQuantity: 33, theoreticalQuantity: 42 },
  { label: 'Ground Beef', varianceCost: -72, actualCost: 328, theoreticalCost: 400, actualQuantity: 41, theoreticalQuantity: 48 },
  { label: 'French Fries 1', varianceCost: -62, actualCost: 188, theoreticalCost: 250, actualQuantity: 94, theoreticalQuantity: 110 },
  { label: 'French Fries 2', varianceCost: -62, actualCost: 188, theoreticalCost: 250, actualQuantity: 94, theoreticalQuantity: 110 },
  { label: 'French Fries 3', varianceCost: -62, actualCost: 188, theoreticalCost: 250, actualQuantity: 94, theoreticalQuantity: 110 },
  { label: 'French Fries 4', varianceCost: -62, actualCost: 188, theoreticalCost: 250, actualQuantity: 94, theoreticalQuantity: 110 },
  { label: 'French Fries 5', varianceCost: -62, actualCost: 188, theoreticalCost: 250, actualQuantity: 94, theoreticalQuantity: 110 },
  { label: 'French Fries 6', varianceCost: -62, actualCost: 188, theoreticalCost: 250, actualQuantity: 94, theoreticalQuantity: 110 },
  { label: 'French Fries 7', varianceCost: -62, actualCost: 188, theoreticalCost: 250, actualQuantity: 94, theoreticalQuantity: 110 },
  { label: 'French Fries 8', varianceCost: -62, actualCost: 188, theoreticalCost: 250, actualQuantity: 94, theoreticalQuantity: 110 },
  { label: 'French Fries 9', varianceCost: -62, actualCost: 188, theoreticalCost: 250, actualQuantity: 94, theoreticalQuantity: 110 },
  { label: 'French Fries 10', varianceCost: -62, actualCost: 188, theoreticalCost: 250, actualQuantity: 94, theoreticalQuantity: 110 },
  { label: 'French Fries 11', varianceCost: -62, actualCost: 188, theoreticalCost: 250, actualQuantity: 94, theoreticalQuantity: 110 },
];

export const InventoryFoodCost = () => {
  const [orderTrackerModalOpen, setOrderTrackerModalOpen] = useState(false);
  const [varianceModalOpen, setVarianceModalOpen] = useState(false);
  const orderTrackerCardRows = orderTrackerRows.slice(0, ORDER_TRACKER_CARD_SIZE);

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="flex items-center gap-2 text-base md:text-lg 2xl:text-xl font-semibold text-primary">
            <InventoryAndFoodCostIcon className="w-4 h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 text-primary" aria-hidden />
            Inventory & Food Cost
          </h2>
        </div>

        <InventoryKPICards items={inventoryKPIs} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-6 order-1 lg:order-1">
            <CostOfGoodsSoldCard />
            <VarianceChartCard items={fullVarianceItems} onViewAll={() => setVarianceModalOpen(true)} />
          </div>

          <OrderTrackerCard
            rows={orderTrackerCardRows}
            onViewAll={() => setOrderTrackerModalOpen(true)}
            className="order-3 lg:order-2 min-h-0 lg:h-full"
          />
        </div>
      </div>

      <OrderTrackerModal
        isOpen={orderTrackerModalOpen}
        onClose={() => setOrderTrackerModalOpen(false)}
        rows={orderTrackerRows}
      />
      <VarianceChartModal
        isOpen={varianceModalOpen}
        onClose={() => setVarianceModalOpen(false)}
        items={[...fullVarianceItems].sort((a, b) => b.varianceCost - a.varianceCost)}
      />
    </Layout>
  );
};
