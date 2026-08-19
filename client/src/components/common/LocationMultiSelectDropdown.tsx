import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { LocationListItem } from '../../types';
import { formatLocationTriggerLabel } from '../../utils/locationSelectionHelpers';
import { PortalMenu } from './PortalMenu';

const triggerBaseClass =
  'w-full px-3 py-2 border border-gray-300 rounded-lg text-primary bg-white focus:outline-none focus:ring-2 focus:ring-gray-300/50 min-w-0 text-left flex items-center justify-between gap-2 disabled:opacity-70 disabled:cursor-not-allowed';
const listClass =
  'min-w-0 max-h-48 overflow-y-auto dropdown-list-scrollbar bg-white border border-gray-300 rounded-lg shadow-lg py-1';

export type LocationMultiSelectDropdownProps = {
  locations: LocationListItem[];
  selectedIds: string[];
  onToggleLocation: (id: string) => void;
  onMasterCheckboxChange: () => void;
  disabled?: boolean;
  className?: string;
  triggerLabel?: ReactNode;
  'aria-label'?: string;
  onOpenChange?: (open: boolean) => void;
};

export function LocationMultiSelectDropdown({
  locations,
  selectedIds,
  onToggleLocation,
  onMasterCheckboxChange,
  disabled = false,
  className = '',
  triggerLabel,
  'aria-label': ariaLabel = 'Select locations',
  onOpenChange,
}: Readonly<LocationMultiSelectDropdownProps>) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const masterRef = useRef<HTMLInputElement>(null);

  const allSelected =
    locations.length > 0 && selectedIds.length === locations.length;
  const someSelected = selectedIds.length > 0 && !allSelected;
  const displayLabel = formatLocationTriggerLabel(
    selectedIds,
    locations,
    locations.length,
  );

  useEffect(() => {
    onOpenChange?.(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally only when open changes
  }, [open]);

  useEffect(() => {
    const el = masterRef.current;
    if (el) el.indeterminate = someSelected;
  }, [someSelected, open]);

  const handleMasterChange = () => {
    onMasterCheckboxChange();
  };

  return (
    <div className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          if (disabled) return;
          setOpen((o) => !o);
        }}
        disabled={disabled}
        className={triggerBaseClass}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">{triggerLabel ?? displayLabel}</span>
        <svg
          className={`w-4 h-4 shrink-0 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <PortalMenu
        open={open}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
        align="stretch"
        className={listClass}
        role="listbox"
        aria-label={ariaLabel}
      >
        <label className="flex items-center gap-2 text-sm text-primary cursor-pointer py-2 px-3 hover:bg-gray-100 font-medium border-b border-gray-100">
          <input
            ref={masterRef}
            type="checkbox"
            className="rounded border-gray-300"
            checked={allSelected}
            onChange={handleMasterChange}
            aria-label="Select all locations"
          />
          <span>Select all</span>
        </label>
        {locations.map((loc) => (
          <label
            key={loc._id}
            role="option"
            aria-selected={selectedIds.includes(loc._id)}
            className="flex items-center gap-2 text-sm text-primary cursor-pointer py-2 px-3 hover:bg-gray-100"
          >
            <input
              type="checkbox"
              className="rounded border-gray-300"
              checked={selectedIds.includes(loc._id)}
              onChange={() => onToggleLocation(loc._id)}
            />
            <span className="truncate">{loc.storeName}</span>
          </label>
        ))}
      </PortalMenu>
    </div>
  );
}
