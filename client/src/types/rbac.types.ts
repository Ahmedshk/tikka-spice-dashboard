/**
 * Page-level permission: which components/cards are allowed on a given page.
 * If components is undefined or empty, the role may have access to the whole page (or no access).
 */
export interface PagePermission {
  pageId: string;
  pageLabel: string;
  /** Allowed component/card IDs on this page. Omit or empty = typically all for that page. */
  components?: string[];
}

/** Either full access (all pages and components) or custom per-page permissions. */
export type RolePermissions =
  | { type: 'all' }
  | { type: 'custom'; pages: PagePermission[] };

export interface RoleRow {
  id?: string;
  roleName: string;
  permissions: RolePermissions;
}
