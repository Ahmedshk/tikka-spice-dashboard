import { useState, useMemo } from 'react';
import { Layout } from '../../components/common/Layout';
import { UserManagementTableCard } from '../../components/UserManagement';
import type { UserRow } from '../../types/userManagement.types';
import AdminSettingsIcon from '@assets/icons/admin_and_settings.svg?react';
import AddIcon from '@assets/icons/add.svg?react';
import SyncIcon from '@assets/icons/sync.svg?react';

const PAGE_SIZE = 10;

const mockRows: UserRow[] = [
  { name: 'Alex Jonson', email: 'alex.j@yourdomain.com', role: 'Owner', status: 'Active' },
  { name: 'John Doe', email: 'john.d@yourdomain.com', role: 'Director of Operations', status: 'Active' },
  { name: 'Kim Jolie', email: 'kim.j@yourdomain.com', role: 'District Manager', status: 'Active' },
  { name: 'Kraven Meachle', email: 'kraven.m@yourdomain.com', role: 'General Manager', status: 'Active' },
  { name: 'Alex Jonson', email: 'alex.j2@yourdomain.com', role: 'Team Member', status: 'Active' },
  { name: 'John Doe', email: 'john.d2@yourdomain.com', role: 'Shift Supervisor', status: 'Active' },
  { name: 'Kim Jolie', email: 'kim.j2@yourdomain.com', role: 'Shift Supervisor', status: 'Suspended' },
  { name: 'Kraven Meachle', email: 'kraven.m2@yourdomain.com', role: 'Team Member', status: 'Suspended' },
  { name: 'Sarah Chen', email: 'sarah.c@yourdomain.com', role: 'District Manager', status: 'Active' },
  { name: 'Marcus Webb', email: 'marcus.w@yourdomain.com', role: 'General Manager', status: 'Active' },
  { name: 'Emma Davis', email: 'emma.d@yourdomain.com', role: 'Shift Supervisor', status: 'Active' },
  { name: 'James Wilson', email: 'james.w@yourdomain.com', role: 'Team Member', status: 'Active' },
  { name: 'Olivia Brown', email: 'olivia.b@yourdomain.com', role: 'Team Member', status: 'Suspended' },
  { name: 'Liam Taylor', email: 'liam.t@yourdomain.com', role: 'Shift Supervisor', status: 'Active' },
  { name: 'Ava Martinez', email: 'ava.m@yourdomain.com', role: 'District Manager', status: 'Active' },
  { name: 'Noah Anderson', email: 'noah.a@yourdomain.com', role: 'General Manager', status: 'Active' },
  { name: 'Sophia Thomas', email: 'sophia.t@yourdomain.com', role: 'Team Member', status: 'Active' },
  { name: 'Ethan Jackson', email: 'ethan.j@yourdomain.com', role: 'Shift Supervisor', status: 'Suspended' },
  { name: 'Isabella White', email: 'isabella.w@yourdomain.com', role: 'Team Member', status: 'Active' },
  { name: 'Mason Harris', email: 'mason.h@yourdomain.com', role: 'Director of Operations', status: 'Active' },
  { name: 'Mia Clark', email: 'mia.c@yourdomain.com', role: 'Team Member', status: 'Active' },
];

export const UserManagement = () => {
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
            User Management
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {}}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-secondary text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <SyncIcon className="w-4 h-4 shrink-0" aria-hidden />
              Sync from Square
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <AddIcon className="w-4 h-4 shrink-0" aria-hidden />
              Add User
            </button>
          </div>
        </div>

        <UserManagementTableCard
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
