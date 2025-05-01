"use client"; // Mark this as a Client Component

import React, { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store'; // Adjust path as needed

interface ReduxProviderProps {
  children: ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
