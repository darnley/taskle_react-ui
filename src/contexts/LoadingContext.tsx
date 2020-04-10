import React from 'react';
import ILoadingContext from '@app/interfaces/contexts/ILoadingContext';

const LoadingContext = React.createContext<ILoadingContext>({
  isLoading: false,
  setLoading: value => {},
});

export default LoadingContext;
