import React from 'react';

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
export interface ISidebarContext extends ISidebarChangerContext {
  /**
   * The sidebar component.
   */
  sidebarComponent: React.ReactElement;
}

/**
 * The sidebar context for component injection.
 */
const SidebarContext = React.createContext<ISidebarContext>({
  sidebarComponent: <span></span>,
  setSidebarComponent: newComponent => {},
});

export default SidebarContext;
