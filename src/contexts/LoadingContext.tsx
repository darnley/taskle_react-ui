import React from 'react';

export interface ILoadingContext {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

const LoadingContext = React.createContext<ILoadingContext>({
  isLoading: false,
  setLoading: value => {},
});

export default LoadingContext;
