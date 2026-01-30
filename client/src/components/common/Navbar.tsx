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

export const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(placeholderLocations[0]);
  const notificationCount = 2; // Placeholder count

  const locationRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setLocationDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  return (
    <nav className="bg-card-background border-b border-gray-200">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Left Section - Location Selector */}
        <div className="relative" ref={locationRef}>
          <button
            type="button"
            onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <LocationIcon className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm text-text-primary whitespace-nowrap max-w-xs truncate">
              {selectedLocation}
            </span>
            <ArrowDownIcon
              className={`w-3 h-3 transition-transform ${locationDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Location Dropdown */}
          {locationDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-2">
                {placeholderLocations.map((location) => (
                  <button
                    key={location}
                    type="button"
                    onClick={() => {
                      setSelectedLocation(location);
                      setLocationDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors ${selectedLocation === location ? 'bg-button-secondary' : ''
                      }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Section - Notifications and User Profile */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
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

            {/* Notification Dropdown */}
            {notificationDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-text-secondary mb-2">Notifications</h3>
                  <p className="text-sm text-text-primary">No new notifications</p>
                </div>
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="h-8 w-px bg-gray-200" />

          {/* User Profile */}
          <div className="relative" ref={userRef}>
            <button
              type="button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-button-primary flex items-center justify-center text-white text-sm font-semibold">
                {getUserInitials()}
              </div>

              {/* Name and Role */}
              <div className="text-left hidden sm:block">
                <div className="text-sm font-medium text-text-primary">
                  {getUserDisplayName()}
                </div>
                <div className="text-xs text-gray-500">
                  ({getUserRole()})
                </div>
              </div>

              {/* Dropdown Arrow */}
              <ArrowDownIcon
                className={`w-3 h-3 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* User Dropdown */}
            {userDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors"
                  >
                    Profile
                  </button>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-gray-50 transition-colors"
                  >
                    Settings
                  </button>
                  <div className="border-t border-gray-200 my-1" />
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
