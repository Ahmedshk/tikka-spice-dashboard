import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { navigationConfig } from '../utils/navigation.config';

export const useSidebar = () => {
  const location = useLocation();
  
  // Auto-expand parent items if any child is active
  const getInitialExpanded = (pathname: string) => {
    const expanded = new Set<string>();
    navigationConfig.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some((child) => pathname === child.path);
        if (hasActiveChild) {
          expanded.add(item.label);
        }
      }
    });
    return expanded;
  };
  
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => 
    getInitialExpanded(location.pathname)
  );

  // Update expanded items when location changes
  useEffect(() => {
    const expanded = getInitialExpanded(location.pathname);
    setExpandedItems(expanded);
  }, [location.pathname]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  // Memoize active path to prevent unnecessary recalculations
  const activePath = useMemo(() => location.pathname, [location.pathname]);

  return {
    activePath,
    expandedItems,
    toggleExpand,
  };
};
