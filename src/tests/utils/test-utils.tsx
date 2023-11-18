import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/dist/query/';
import { AppStore, RootState, setupStore } from '../../store/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {}
): RenderResult {
  setupListeners(store.dispatch);

  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
