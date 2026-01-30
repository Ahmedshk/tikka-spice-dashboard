import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import LocationIcon from '@assets/icons/location.svg?react';
import NotificationIcon from '@assets/icons/notification.svg?react';
import ArrowDownIcon from '@assets/icons/arrow_down.svg?react';

// Placeholder locations data
const placeholderLocations = [
  '529 Adams Street Northeast, Albuquerque, NM 87108',
  '123 Main Street, New York, NY 10001',
  '456 Oak Avenue, Los Angeles, CA 90001',
];

const HamburgerIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const LogoutIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(placeholderLocations[0]);
  const notificationCount = 2; // Placeholder count

  const locationRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const notificationMobileRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (locationRef.current && !locationRef.current.contains(target)) {
        setLocationDropdownOpen(false);
      }
      const inNotification = notificationRef.current?.contains(target) || notificationMobileRef.current?.contains(target);
      if (!inNotification) setNotificationDropdownOpen(false);
      const inUser = userRef.current?.contains(target);
      if (!inUser) setUserDropdownOpen(false);
      if (window.innerWidth < 1024 && mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Generate user initials
  const getUserInitials = () => {
    if (!user) return 'U';
    const first = user.firstName.charAt(0).toUpperCase();
    const second = user.lastName.charAt(0).toUpperCase();
    return `${first}${second}`;
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return 'User';
    return `${user.firstName} ${user.lastName}`;
  };

  // Get user role display
  const getUserRole = () => {
    if (!user) return '';
    return user.role;
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="relative z-20 bg-card-background border-b border-gray-200" ref={mobileMenuRef}>
      <div className="flex items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 py-4">
        {/* Location Selector - full width on mobile, reasonable width on desktop */}
        <div className="relative min-w-0 flex-1 w-full lg:flex-initial lg:max-w-md xl:max-w-xl" ref={locationRef}>
          <button
            type="button"
            onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
            className="flex items-center gap-2 w-full px-3 sm:px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <LocationIcon className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 min-w-0 text-sm text-text-primary whitespace-nowrap truncate text-left">
              {selectedLocation}
            </span>
            <ArrowDownIcon
              className={`w-3 h-3 flex-shrink-0 transition-transform ${locationDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {locationDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-full min-w-[280px] max-w-[90vw] lg:w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-2">
                {placeholderLocations.map((location) => (
                  <button
                    key={location}
                    type="button"
                    onClick={() => {
                      setSelectedLocation(location);
                      setLocationDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors ${selectedLocation === location ? 'bg-button-secondary' : ''}`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop: Notifications and User Profile */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative" ref={notificationRef}>
            <button
              type="button"
              onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
              className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              <NotificationIcon className="w-6 h-6" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-text-quaternary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {notificationCount.toString().padStart(2, '0')}
                </span>
              )}
            </button>
            {notificationDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-text-secondary mb-2">Notifications</h3>
                  <p className="text-sm text-text-primary">No new notifications</p>
                </div>
              </div>
            )}
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="relative" ref={userRef}>
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-button-primary flex items-center justify-center text-white text-sm font-semibold">
                {getUserInitials()}
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-text-primary">{getUserDisplayName()}</div>
                <div className="text-xs text-gray-500">({getUserRole()})</div>
              </div>
              <ArrowDownIcon className={`w-3 h-3 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {userDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <button type="button" className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors">Profile</button>
                  <button type="button" className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors">Settings</button>
                  <div className="border-t border-gray-200 my-1" />
                  <button type="button" className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors">Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Hamburger to open right-section menu */}
        <div className="lg:hidden flex-shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <CloseIcon className="w-6 h-6 text-text-primary" />
            ) : (
              <HamburgerIcon className="w-6 h-6 text-text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu: User profile card + action buttons (reference style, all centered) */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-[80vh] opacity-100 overflow-visible' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-card-background flex flex-col items-center gap-3 w-full relative z-10">
          {/* User profile card: light grey background, avatar + name + orange bell centered */}
          <div className="relative flex items-center justify-center gap-3 w-full max-w-sm px-4 py-3 bg-button-secondary rounded-xl">
            <div className="w-12 h-12 rounded-full bg-button-primary flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
              {getUserInitials()}
            </div>
            <div className="min-w-0 text-center">
              <div className="text-sm font-medium text-text-primary truncate">{getUserDisplayName()}</div>
              <div className="text-xs text-gray-500 truncate">({getUserRole()})</div>
            </div>
            <div className="relative flex-shrink-0" ref={notificationMobileRef}>
              <button
                type="button"
                onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                className="relative p-2 hover:opacity-80 rounded-lg transition-opacity cursor-pointer"
              >
                <NotificationIcon className="w-5 h-5 text-text-quaternary" />
                {notificationCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-text-quaternary text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {notificationCount}
                  </span>
                )}
              </button>
              {notificationDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-lg shadow-lg z-[200]">
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-text-secondary mb-2">Notifications</h3>
                    <p className="text-sm text-text-primary">No new notifications</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons: centered, light border */}
          <button
            type="button"
            onClick={closeMobileMenu}
            className="w-full max-w-sm flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-text-primary hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Profile
          </button>
          <button
            type="button"
            onClick={closeMobileMenu}
            className="w-full max-w-sm flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-text-primary hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Settings
          </button>
          <button
            type="button"
            onClick={closeMobileMenu}
            className="w-full max-w-sm flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-text-primary hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <LogoutIcon className="w-5 h-5 flex-shrink-0 text-text-primary" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
