import type { RoleRow, RolePermissions } from '../../types/rbac.types';
import { Pagination } from '../common/Pagination';
import EditIcon from '@assets/icons/edit.svg?react';
import DeleteIcon from '@assets/icons/delete.svg?react';

export interface RBACTableCardPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const cardClass = 'bg-card-background rounded-xl shadow border border-gray-200 overflow-hidden';

function formatPermissions(permissions: RolePermissions): { summary: string; title?: string } {
  if (permissions.type === 'all') {
    return { summary: 'All' };
  }
  const pages = permissions.pages;
  const count = pages.length;
  const pageWord = count === 1 ? 'page' : 'pages';
  const summary = count === 0 ? 'None' : `Custom (${count} ${pageWord})`;
  const title = count > 0 ? pages.map((p) => p.pageLabel).join(', ') : undefined;
  return { summary, title };
}

export interface RBACTableCardProps {
  rows: RoleRow[];
  onEdit?: (row: RoleRow, index: number) => void;
  onDelete?: (row: RoleRow, index: number) => void;
  pagination?: RBACTableCardPagination;
}

export const RBACTableCard = ({
  rows,
  onEdit,
  onDelete,
  pagination,
}: RBACTableCardProps) => {
  return (
    <div className={`${cardClass} flex flex-col min-h-0 overflow-hidden`}>
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto min-h-0">
          <table className="w-full border-collapse table-fixed min-w-[32rem] text-[10px] md:text-xs 2xl:text-sm">
            <thead>
              <tr className="bg-button-primary text-white">
                <th className="w-[30%] text-left text-xs 2xl:text-sm font-semibold px-4 lg:px-6 py-3 lg:py-4">
                  Role
                </th>
                <th className="w-[50%] text-left text-xs 2xl:text-sm font-semibold px-4 lg:px-6 py-3 lg:py-4">
                  Permissions
                </th>
                <th className="text-right text-xs 2xl:text-sm font-semibold px-4 lg:px-6 py-3 lg:py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-primary">
              {rows.map((row, index) => {
                const { summary, title } = formatPermissions(row.permissions);
                return (
                  <tr
                    key={row.id ?? `${row.roleName}-${index}`}
                    className={index % 2 === 1 ? 'bg-[#F3F5F7]' : ''}
                  >
                    <td className="w-[30%] px-4 lg:px-6 py-3 lg:py-4">
                      <span className="font-medium text-primary truncate block" title={row.roleName}>
                        {row.roleName}
                      </span>
                    </td>
                    <td className="w-[50%] px-4 lg:px-6 py-3 lg:py-4">
                      <span
                        className="text-secondary truncate block"
                        title={title ?? summary}
                      >
                        {summary}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-3 lg:py-4 text-right">
                      <div className="flex items-center justify-end gap-1 md:gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit?.(row, index)}
                          className="p-1.5 text-secondary hover:text-primary rounded"
                          aria-label="Edit role"
                        >
                          <EditIcon className="w-2.5 h-2.5 md:w-3 md:h-3 2xl:w-3.5 2xl:h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete?.(row, index)}
                          className="p-1.5 text-secondary hover:text-primary rounded"
                          aria-label="Delete role"
                        >
                          <DeleteIcon className="w-2.5 h-2.5 md:w-3 md:h-3 2xl:w-3.5 2xl:h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          pageSize={pagination.pageSize}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
};
