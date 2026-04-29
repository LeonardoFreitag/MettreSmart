import React, { PropsWithChildren } from 'react';

import { ToastProvider } from './toast';

const AppProvider = ({ children }: PropsWithChildren) => (
  <ToastProvider>{children}</ToastProvider>
);

export default AppProvider;
