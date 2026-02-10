import { useState, useMemo, useEffect } from 'react';
import { Layout } from '../../components/common/Layout';
import { CommandCenterKPICards } from '../../components/CommandCenter';
import { DisciplinaryToolbar, DisciplinaryTableCard } from '../../components/DisciplinaryManagement';
import type { DisciplinaryRow } from '../../types/disciplinaryManagement.types';

const PAGE_SIZE = 10;
import TeamHrIcon from '@assets/icons/team_and_hr.svg?react';
import CriticalIcon from '@assets/icons/critical.svg?react';
import DisciplinaryReviewsDueIcon from '@assets/icons/disciplinary_reviews_due.svg?react';
import TotalTeamMembersIcon from '@assets/icons/total_team_members.svg?react';

const disciplinaryKPIs = [
  {
    title: 'Critical (12+ PTS)',
    value: '3 Members',
    accentColor: 'red' as const,
    rightIcon: <CriticalIcon className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 text-white" />,
  },
  {
    title: 'Reviews Due',
    value: '5 Documents',
    accentColor: 'gold' as const,
    rightIcon: <DisciplinaryReviewsDueIcon className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 text-white" />,
  },
  {
    title: 'Total Team Members',
    value: '24 Active',
    accentColor: 'blue' as const,
    rightIcon: <TotalTeamMembersIcon className="w-7 h-7 md:w-8 md:h-8 2xl:w-9 2xl:h-9 text-white" />,
  },
];

const mockRows: DisciplinaryRow[] = [
  {
    name: 'Alex Jonson',
    role: 'Store Manager',
    points90Day: 8,
    mostRecent: '01-15-2025',
    status: 'At Risk',
    eSignStatus: { type: 'pending', count: 1 },
  },
  {
    name: 'Maria Garcia',
    role: 'Shift Supervisor',
    points90Day: 12,
    mostRecent: '01-20-2025',
    status: 'Critical',
    eSignStatus: { type: 'pending', count: 2 },
  },
  {
    name: 'James Wilson',
    role: 'Cashier',
    points90Day: 3,
    mostRecent: '01-10-2025',
    status: 'Good Standing',
    eSignStatus: { type: 'compliant' },
  },
  {
    name: 'Sarah Chen',
    role: 'Cook',
    points90Day: 0,
    mostRecent: '12-05-2024',
    status: 'Good Standing',
    eSignStatus: { type: 'compliant' },
  },
  {
    name: 'Michael Brown',
    role: 'Delivery Driver',
    points90Day: 6,
    mostRecent: '01-18-2025',
    status: 'Good Standing',
    eSignStatus: { type: 'pending', count: 3 },
  },
  {
    name: 'Emily Davis',
    role: 'Cashier',
    points90Day: 11,
    mostRecent: '01-22-2025',
    status: 'At Risk',
    eSignStatus: { type: 'compliant' },
  },
  {
    name: 'David Martinez',
    role: 'Shift Supervisor',
    points90Day: 4,
    mostRecent: '01-14-2025',
    status: 'Good Standing',
    eSignStatus: { type: 'pending', count: 1 },
  },
  {
    name: 'Jennifer Lee',
    role: 'Store Manager',
    points90Day: 2,
    mostRecent: '01-08-2025',
    status: 'Good Standing',
    eSignStatus: { type: 'compliant' },
  },
  {
    name: 'Robert Taylor',
    role: 'Cook',
    points90Day: 9,
    mostRecent: '01-19-2025',
    status: 'At Risk',
    eSignStatus: { type: 'pending', count: 2 },
  },
  {
    name: 'Amanda White',
    role: 'Cashier',
    points90Day: 0,
    mostRecent: '12-03-2024',
    status: 'Good Standing',
    eSignStatus: { type: 'compliant' },
  },
  {
    name: 'Christopher Harris',
    role: 'Delivery Driver',
    points90Day: 13,
    mostRecent: '01-23-2025',
    status: 'Critical',
    eSignStatus: { type: 'pending', count: 1 },
  },
  {
    name: 'Jessica Clark',
    role: 'Shift Supervisor',
    points90Day: 5,
    mostRecent: '01-16-2025',
    status: 'Good Standing',
    eSignStatus: { type: 'compliant' },
  },
  {
    name: 'Daniel Lewis',
    role: 'Cashier',
    points90Day: 7,
    mostRecent: '01-17-2025',
    status: 'Good Standing',
    eSignStatus: { type: 'pending', count: 3 },
  },
  {
    name: 'Ashley Robinson',
    role: 'Cook',
    points90Day: 1,
    mostRecent: '01-12-2025',
    status: 'Good Standing',
    eSignStatus: { type: 'compliant' },
  },
  {
    name: 'Matthew Walker',
    role: 'Store Manager',
    points90Day: 10,
    mostRecent: '01-21-2025',
    status: 'At Risk',
    eSignStatus: { type: 'pending', count: 2 },
  },
  {
    name: 'Stephanie Hall',
    role: 'Cashier',
    points90Day: 3,
    mostRecent: '01-11-2025',
    status: 'Good Standing',
    eSignStatus: { type: 'compliant' },
  },
  {
    name: 'Andrew Young',
    role: 'Delivery Driver',
    points90Day: 6,
    mostRecent: '01-13-2025',
    status: 'Good Standing',
    eSignStatus: { type: 'pending', count: 1 },
  },
  {
    name: 'Nicole King',
    role: 'Shift Supervisor',
    points90Day: 14,
    mostRecent: '01-24-2025',
    status: 'Critical',
    eSignStatus: { type: 'compliant' },
  },
  {
    name: 'Kevin Wright',
    role: 'Cook',
    points90Day: 0,
    mostRecent: '12-01-2024',
    status: 'Good Standing',
    eSignStatus: { type: 'compliant' },
  },
  {
    name: 'Rachel Scott',
    role: 'Cashier',
    points90Day: 8,
    mostRecent: '01-20-2025',
    status: 'At Risk',
    eSignStatus: { type: 'pending', count: 2 },
  },
  {
    name: 'Brandon Green',
    role: 'Delivery Driver',
    points90Day: 11,
    mostRecent: '01-22-2025',
    status: 'At Risk',
    eSignStatus: { type: 'pending', count: 1 },
  },
  {
    name: 'Lauren Adams',
    role: 'Shift Supervisor',
    points90Day: 4,
    mostRecent: '01-09-2025',
    status: 'Good Standing',
    eSignStatus: { type: 'compliant' },
  },
  {
    name: 'Ryan Nelson',
    role: 'Cook',
    points90Day: 15,
    mostRecent: '01-25-2025',
    status: 'Critical',
    eSignStatus: { type: 'pending', count: 3 },
  },
  {
    name: 'Megan Hill',
    role: 'Cashier',
    points90Day: 2,
    mostRecent: '01-07-2025',
    status: 'Good Standing',
    eSignStatus: { type: 'compliant' },
  },
  {
    name: 'Justin Baker',
    role: 'Store Manager',
    points90Day: 5,
    mostRecent: '01-18-2025',
    status: 'Good Standing',
    eSignStatus: { type: 'pending', count: 1 },
  },
];

export const DisciplinaryManagement = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return mockRows;
    return mockRows.filter(
      (row) =>
        row.name.toLowerCase().includes(q) || row.role.toLowerCase().includes(q)
    );
  }, [search]);

  const totalItems = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const paginatedRows = useMemo(
    () =>
      filteredRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredRows, page]
  );

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="flex items-center gap-2 text-base md:text-lg 2xl:text-xl font-semibold text-primary">
            <TeamHrIcon className="w-4 h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 text-primary" aria-hidden />
            Disciplinary Management
          </h2>
        </div>

        <CommandCenterKPICards items={disciplinaryKPIs} />

        <DisciplinaryToolbar
          searchValue={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onLogIncident={() => {}}
        />

        <DisciplinaryTableCard
          rows={paginatedRows}
          onView={(row) => {
            console.log('View', row);
          }}
          pagination={{
            currentPage: page,
            totalPages,
            totalItems,
            pageSize: PAGE_SIZE,
            onPageChange: setPage,
          }}
        />
      </div>
    </Layout>
  );
};
