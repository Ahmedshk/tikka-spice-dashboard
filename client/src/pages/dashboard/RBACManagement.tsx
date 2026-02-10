import { useState, useMemo } from 'react';
import { Layout } from '../../components/common/Layout';
import { RBACTableCard } from '../../components/RBAC';
import type { RoleRow } from '../../types/rbac.types';
import AdminSettingsIcon from '@assets/icons/admin_and_settings.svg?react';
import AddIcon from '@assets/icons/add.svg?react';

const PAGE_SIZE = 10;

const mockRows: RoleRow[] = [
  { id: '1', roleName: 'Owner', permissions: { type: 'all' } },
  { id: '2', roleName: 'Director of Operations', permissions: { type: 'all' } },
  { id: '3', roleName: 'District Manager', permissions: { type: 'custom', pages: [
    { pageId: 'command-center', pageLabel: 'Command Center' },
    { pageId: 'sales-labor', pageLabel: 'Sales & Labor' },
    { pageId: 'inventory-food-cost', pageLabel: 'Inventory & Food Cost' },
    { pageId: 'team-hr', pageLabel: 'Team & HR' },
    { pageId: 'calendar-events', pageLabel: 'Calendar & Events' },
  ] } },
  { id: '4', roleName: 'General Manager', permissions: { type: 'custom', pages: [
    { pageId: 'command-center', pageLabel: 'Command Center' },
    { pageId: 'sales-labor', pageLabel: 'Sales & Labor' },
    { pageId: 'team-hr', pageLabel: 'Team & HR' },
  ] } },
  { id: '5', roleName: 'Shift Supervisor', permissions: { type: 'custom', pages: [
    { pageId: 'command-center', pageLabel: 'Command Center' },
    { pageId: 'sales-labor', pageLabel: 'Sales & Labor' },
  ] } },
  { id: '6', roleName: 'Team Member', permissions: { type: 'custom', pages: [
    { pageId: 'command-center', pageLabel: 'Command Center' },
  ] } },
  { id: '7', roleName: 'Viewer', permissions: { type: 'custom', pages: [] } },
];

export const RBACManagement = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(mockRows.length / PAGE_SIZE) || 1;
  const paginatedRows = useMemo(
    () => mockRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page]
  );

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <h2 className="flex items-center gap-2 text-base md:text-lg 2xl:text-xl font-semibold text-primary">
            <AdminSettingsIcon className="w-4 h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 text-primary" aria-hidden />
            RBAC Management
          </h2>
          <button
            type="button"
            onClick={() => {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <AddIcon className="w-4 h-4 shrink-0" aria-hidden />
            Add Role
          </button>
        </div>

        <RBACTableCard
          rows={paginatedRows}
          onEdit={() => {}}
          onDelete={() => {}}
          pagination={{
            currentPage: page,
            totalPages,
            totalItems: mockRows.length,
            pageSize: PAGE_SIZE,
            onPageChange: setPage,
          }}
        />
      </div>
    </Layout>
  );
};
