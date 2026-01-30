interface SidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Arrow Right Icon (points right when sidebar is closed)
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

// Arrow Left Icon (points left when sidebar is open)
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

export const SidebarToggle = ({ isOpen, onToggle }: SidebarToggleProps) => {
  // Only show toggle button when sidebar is closed (to open it)
  if (isOpen) {
    return null; // Button is now part of the sidebar itself
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-[120] bg-button-primary text-white w-8 h-16 flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity rounded-r-lg"
      aria-label="Open sidebar"
    >
      <ArrowRightIcon className="w-4 h-4" />
    </button>
  );
};
