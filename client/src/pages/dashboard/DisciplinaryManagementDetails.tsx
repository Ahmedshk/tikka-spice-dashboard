import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../../components/common/Layout';
import {
  DetailsPageHeader,
  EmployeeWithRollingTotalCard,
  RequiredProtocolCard,
  IncidentHistoryCard,
  DocumentVaultCard,
} from '../../components/DisciplinaryManagement';
import { IncidentHistoryModal } from '../../components/modal/IncidentHistoryModal';
import type {
  DisciplinaryDetailsEmployee,
  DisciplinaryStatus,
  RequiredProtocol,
  IncidentHistoryItem,
  DocumentVaultItem,
} from '../../types/disciplinaryManagement.types';

const POINTS_THRESHOLD = 15;

function formatDateRange(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function get90DayWindow(): { start: string; end: string } {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 90);
  return { start: formatDateRange(start), end: formatDateRange(end) };
}

export interface DisciplinaryDetailsData {
  employee: DisciplinaryDetailsEmployee;
  protocol: RequiredProtocol;
  incidents: IncidentHistoryItem[];
  documents: DocumentVaultItem[];
}

const DEFAULT_INCIDENTS: IncidentHistoryItem[] = [
  { incidentType: 'Unexcused Absence', date: '2023-11-10', documentName: 'Absence_Form.pdf', status: 'pending' },
  { incidentType: 'Unexcused Absence', date: '2023-11-10', documentName: 'Warning_Letter.pdf', status: 'signed' },
  { incidentType: 'Unexcused Absence', date: '2023-11-10', documentName: 'Verbal_Warning.pdf', status: 'signed' },
];

const DEFAULT_DOCUMENTS: DocumentVaultItem[] = [
  { fileName: 'W-4_Form.pdf' },
  { fileName: 'Employee_Handbook_Sig.pdf' },
  { fileName: 'Direct_Deposit.pdf' },
  { fileName: 'I-9_Verification.pdf' },
];

function getNextActionFromPoints(points: number): string {
  if (points >= 15) return 'Termination of employment';
  if (points >= 12) return 'Final warning';
  if (points >= 8) return 'Written warning';
  if (points >= 5) return 'Verbal coaching';
  return 'No action required';
}

function buildProtocol(points: number): RequiredProtocol {
  const nextAction = getNextActionFromPoints(points);
  return {
    message: `Based on your current 90-day points (${points}), the next required action is:`,
    nextAction,
  };
}

const EMPLOYEE_SUMMARIES: Array<{
  id: string;
  name: string;
  role: string;
  status: DisciplinaryStatus;
  points90Day: number;
}> = [
  { id: 'alex-jonson', name: 'Alex Jonson', role: 'Line Cook', status: 'At Risk', points90Day: 8 },
  { id: 'maria-garcia', name: 'Maria Garcia', role: 'Shift Supervisor', status: 'Critical', points90Day: 12 },
  { id: 'james-wilson', name: 'James Wilson', role: 'Cashier', status: 'Good Standing', points90Day: 3 },
  { id: 'sarah-chen', name: 'Sarah Chen', role: 'Cook', status: 'Good Standing', points90Day: 0 },
  { id: 'michael-brown', name: 'Michael Brown', role: 'Delivery Driver', status: 'Good Standing', points90Day: 6 },
  { id: 'emily-davis', name: 'Emily Davis', role: 'Cashier', status: 'At Risk', points90Day: 11 },
  { id: 'david-martinez', name: 'David Martinez', role: 'Shift Supervisor', status: 'Good Standing', points90Day: 4 },
  { id: 'jennifer-lee', name: 'Jennifer Lee', role: 'Store Manager', status: 'Good Standing', points90Day: 2 },
  { id: 'robert-taylor', name: 'Robert Taylor', role: 'Cook', status: 'At Risk', points90Day: 9 },
  { id: 'amanda-white', name: 'Amanda White', role: 'Cashier', status: 'Good Standing', points90Day: 0 },
  { id: 'christopher-harris', name: 'Christopher Harris', role: 'Delivery Driver', status: 'Critical', points90Day: 13 },
  { id: 'jessica-clark', name: 'Jessica Clark', role: 'Shift Supervisor', status: 'Good Standing', points90Day: 5 },
  { id: 'daniel-lewis', name: 'Daniel Lewis', role: 'Cashier', status: 'Good Standing', points90Day: 7 },
  { id: 'ashley-robinson', name: 'Ashley Robinson', role: 'Cook', status: 'Good Standing', points90Day: 1 },
  { id: 'matthew-walker', name: 'Matthew Walker', role: 'Store Manager', status: 'At Risk', points90Day: 10 },
  { id: 'stephanie-hall', name: 'Stephanie Hall', role: 'Cashier', status: 'Good Standing', points90Day: 3 },
  { id: 'andrew-young', name: 'Andrew Young', role: 'Delivery Driver', status: 'Good Standing', points90Day: 6 },
  { id: 'nicole-king', name: 'Nicole King', role: 'Shift Supervisor', status: 'Critical', points90Day: 14 },
  { id: 'kevin-wright', name: 'Kevin Wright', role: 'Cook', status: 'Good Standing', points90Day: 0 },
  { id: 'rachel-scott', name: 'Rachel Scott', role: 'Cashier', status: 'At Risk', points90Day: 8 },
  { id: 'brandon-green', name: 'Brandon Green', role: 'Delivery Driver', status: 'At Risk', points90Day: 11 },
  { id: 'lauren-adams', name: 'Lauren Adams', role: 'Shift Supervisor', status: 'Good Standing', points90Day: 4 },
  { id: 'ryan-nelson', name: 'Ryan Nelson', role: 'Cook', status: 'Critical', points90Day: 15 },
  { id: 'megan-hill', name: 'Megan Hill', role: 'Cashier', status: 'Good Standing', points90Day: 2 },
  { id: 'justin-baker', name: 'Justin Baker', role: 'Store Manager', status: 'Good Standing', points90Day: 5 },
];

const DETAILS_MOCK: Record<string, DisciplinaryDetailsData> = Object.fromEntries(
  EMPLOYEE_SUMMARIES.map((s) => [
    s.id,
    {
      employee: {
        id: s.id,
        name: s.name,
        role: s.role,
        status: s.status,
        points90Day: s.points90Day,
        pointsThreshold: POINTS_THRESHOLD,
      },
      protocol: buildProtocol(s.points90Day),
      incidents: DEFAULT_INCIDENTS,
      documents: DEFAULT_DOCUMENTS,
    },
  ])
);

function getDisciplinaryDetails(employeeId: string): DisciplinaryDetailsData | null {
  return DETAILS_MOCK[employeeId] ?? null;
}

export const DisciplinaryManagementDetails = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();
  const [incidentModalOpen, setIncidentModalOpen] = useState(false);
  const windowRange = get90DayWindow();
  const details = employeeId ? getDisciplinaryDetails(employeeId) : null;

  if (!employeeId || !details) {
    return (
      <Layout>
        <div className="p-6">
          <p className="text-primary mb-4">Employee not found.</p>
          <button
            type="button"
            onClick={() => navigate('/dashboard/disciplinary-management')}
            className="text-quaternary hover:underline font-medium"
          >
            ← Back to Disciplinary Management
          </button>
        </div>
      </Layout>
    );
  }

  const { employee, protocol, incidents, documents } = details;

  return (
    <Layout>
      <div className="p-6">
        <DetailsPageHeader
          dateWindowStart={windowRange.start}
          dateWindowEnd={windowRange.end}
          onBack={() => navigate('/dashboard/disciplinary-management')}
          onSendDocument={() => {}}
          onAssignPoints={() => {}}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-1 min-h-0">
            <EmployeeWithRollingTotalCard
              name={employee.name}
              role={employee.role}
              status={employee.status}
              avatarUrl={employee.avatarUrl}
              currentPoints={employee.points90Day}
              maxPoints={employee.pointsThreshold}
            />
          </div>
          <div className="lg:col-span-2 min-h-0">
            <IncidentHistoryCard
              items={incidents}
              onDownload={() => {}}
              onView={() => {}}
              onViewAll={() => setIncidentModalOpen(true)}
            />
          </div>
          <div className="lg:col-span-1 min-h-0">
            <RequiredProtocolCard
              message={protocol.message ?? ''}
              nextAction={protocol.nextAction}
            />
          </div>
          <div className="lg:col-span-2 min-h-0">
            <DocumentVaultCard
              items={documents}
              onViewAll={() => {}}
              onDownload={() => {}}
            />
          </div>
        </div>
      </div>

      <IncidentHistoryModal
        isOpen={incidentModalOpen}
        onClose={() => setIncidentModalOpen(false)}
        items={incidents}
        onDownload={() => {}}
        onView={() => {}}
      />
    </Layout>
  );
};
