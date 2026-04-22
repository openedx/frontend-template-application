import React from 'react';
import { AppProvider } from '@edx/frontend-platform/react';
import { FooterSlot } from '@edx/frontend-component-footer';
import Header from '@edx/frontend-component-header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import ExamplePage from './example/ExamplePage';

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <AppProvider wrapWithRouter={false}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/searn-administrator" replace />} />
          <Route path="/searn-administrator" element={<ExamplePage />} />
          <Route path="*" element={<ExamplePage />} />
        </Routes>
        <FooterSlot />
      </QueryClientProvider>
    </AppProvider>
  </BrowserRouter>
);

export default App;
