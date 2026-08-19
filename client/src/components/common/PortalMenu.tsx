import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import {
  getFixedMenuPosition,
  getMenuPortalRoot,
  type MenuAlign,
  type MenuPlacement,
} from '../../utils/portalMenuPositionHelpers';

export interface PortalMenuProps {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLElement | null>;
  align?: MenuAlign;
  preferredPlacement?: MenuPlacement;
  className?: string;
  role?: string;
  'aria-label'?: string;
  children: ReactNode;
}

export function PortalMenu({
  open,
  onClose,
  triggerRef,
  align = 'left',
  preferredPlacement = 'below',
  className = '',
  role = 'menu',
  'aria-label': ariaLabel,
  children,
}: Readonly<PortalMenuProps>) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({});
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (!open) {
      setReady(false);
      return;
    }

    const updatePosition = () => {
      const triggerEl = triggerRef.current;
      const menuEl = menuRef.current;
      if (!triggerEl) return;
      const t = triggerEl.getBoundingClientRect();
      const m = menuEl?.getBoundingClientRect();
      const pos = getFixedMenuPosition({
        trigger: {
          top: t.top,
          left: t.left,
          right: t.right,
          bottom: t.bottom,
          width: t.width,
          height: t.height,
        },
        menu: { width: m?.width ?? t.width, height: m?.height ?? 0 },
        viewport: { width: window.innerWidth, height: window.innerHeight },
        align,
        preferredPlacement,
      });
      setStyle({
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        width: pos.width,
        maxHeight: pos.maxHeight,
        zIndex: 500,
        visibility: 'visible',
      });
      setReady(true);
    };

    updatePosition();
    const rafId = requestAnimationFrame(updatePosition);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, align, preferredPlacement, triggerRef]);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      onClose();
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose, triggerRef]);

  if (!open || typeof document === 'undefined') return null;

  const portalRoot = getMenuPortalRoot(triggerRef.current);

  return createPortal(
    <div
      ref={menuRef}
      role={role}
      aria-label={ariaLabel}
      className={className}
      style={{
        ...style,
        visibility: ready ? 'visible' : 'hidden',
      }}
    >
      {children}
    </div>,
    portalRoot,
  );
}
