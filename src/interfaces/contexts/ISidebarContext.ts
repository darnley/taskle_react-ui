/**
 * The SidebarContext interface with just the setSidebarComponent function.
 */
export interface ISidebarChangerContext {
  /**
   * Set the sidebar component.
   * If it is null, the sidebar will disappear.
   * @field
   */
  setSidebarComponent: (newComponent: any) => void;
}

/**
 * The SidebarContext interface with the setSidebarComponent and sidebarComponent.
 *
 * @extends {ISidebarChangerContext}
 */
export default interface ISidebarContext extends ISidebarChangerContext {
  /**
   * The sidebar component.
   */
  sidebarComponent: any;
}
