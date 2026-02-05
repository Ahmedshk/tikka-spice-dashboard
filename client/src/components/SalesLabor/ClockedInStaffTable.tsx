export interface ClockedInStaffRow {
  name: string;
  role: string;
  clockIn: string;
  currentHours: number;
  status: 'On Clock' | 'On Break';
}

export interface ClockedInStaffTableProps {
  rows: ClockedInStaffRow[];
}

const statusClass: Record<ClockedInStaffRow['status'], string> = {
  'On Clock': 'rounded-full px-2 py-0.5 text-xs font-medium bg-[rgba(93,197,79,0.2)] text-primary',
  'On Break': 'rounded-full px-2 py-0.5 text-xs font-medium bg-[rgba(253,185,14,0.2)] text-primary',
};

export const ClockedInStaffTable = ({ rows }: ClockedInStaffTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[10px] md:text-xs 2xl:text-sm">
        <thead>
          <tr className="text-left text-secondary">
            <th className="pb-3 pr-4 pl-2 md:pl-5 font-semibold">Name</th>
            <th className="pb-3 pr-4 font-semibold text-center">Role</th>
            <th className="pb-3 pr-4 font-semibold text-center">Clock In</th>
            <th className="pb-3 pr-4 font-semibold text-center">Current hours</th>
            <th className="pb-3 pr-2 md:pr-0 font-semibold text-center">Status</th>
          </tr>
        </thead>
        <tbody className="text-primary">
          {rows.map((row, index) => (
            <tr
              key={`${row.name}-${index}`}
              className={index % 2 === 1 ? 'bg-[#F3F5F7]' : ''}
            >
              <td className="py-3 pr-4 pl-2 md:pl-5">{row.name}</td>
              <td className="py-3 pr-4 text-center">{row.role}</td>
              <td className="py-3 pr-4 text-center">{row.clockIn}</td>
              <td className="py-3 pr-4 text-center">{row.currentHours}</td>
              <td className="py-3 pr-2 md:pr-0">
                <div className="flex justify-center">
                  <span className={`inline-block text-center ${statusClass[row.status]}`}>{row.status}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
