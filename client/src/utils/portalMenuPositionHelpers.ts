export type MenuAlign = "left" | "right" | "stretch";
export type MenuPlacement = "below" | "above";

export interface RectLike {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

export interface FixedMenuPosition {
  top: number;
  left: number;
  width?: number;
  maxHeight: number;
  openAbove: boolean;
}

const DEFAULT_GAP = 4;
const DEFAULT_PADDING = 8;

export function getFixedMenuPosition({
  trigger,
  menu,
  viewport,
  align,
  preferredPlacement = "below",
  gap = DEFAULT_GAP,
  padding = DEFAULT_PADDING,
}: {
  trigger: RectLike;
  menu: { width: number; height: number };
  viewport: { width: number; height: number };
  align: MenuAlign;
  preferredPlacement?: MenuPlacement;
  gap?: number;
  padding?: number;
}): FixedMenuPosition {
  const spaceBelow = viewport.height - trigger.bottom - gap - padding;
  const spaceAbove = trigger.top - gap - padding;
  const menuHeight = menu.height;

  let openAbove = preferredPlacement === "above";
  if (menuHeight > 0) {
    if (preferredPlacement === "below") {
      openAbove = menuHeight > spaceBelow && spaceAbove > spaceBelow;
    } else {
      openAbove = !(menuHeight > spaceAbove && spaceBelow > spaceAbove);
    }
  }

  const maxHeight = Math.max(0, openAbove ? spaceAbove : spaceBelow);
  const usedHeight =
    menuHeight > 0 ? Math.min(menuHeight, maxHeight || menuHeight) : 0;
  const top = openAbove
    ? trigger.top - gap - usedHeight
    : trigger.bottom + gap;

  const menuWidth =
    align === "stretch" ? trigger.width : menu.width || trigger.width;
  let left = align === "right" ? trigger.right - menuWidth : trigger.left;
  const maxLeft = Math.max(padding, viewport.width - menuWidth - padding);
  left = Math.min(Math.max(padding, left), maxLeft);

  return {
    top: Math.max(padding, top),
    left,
    ...(align === "stretch" ? { width: trigger.width } : {}),
    maxHeight,
    openAbove,
  };
}

export function getMenuPortalRoot(trigger: Element | null): HTMLElement {
  const dialog = trigger?.closest("dialog");
  if (dialog instanceof HTMLElement) return dialog;
  return document.body;
}
