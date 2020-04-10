import React from 'react';
import ISidebarContext from '@app/interfaces/contexts/ISidebarContext';

/**
 * The sidebar context for component injection.
 */
const SidebarContext = React.createContext<ISidebarContext>({
  sidebarComponent: <span></span>,
  setSidebarComponent: newComponent => {},
});

export default SidebarContext;
