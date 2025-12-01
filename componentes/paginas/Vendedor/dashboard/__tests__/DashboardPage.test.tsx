import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

// Mock VendedorLayout to render children with a test id
vi.mock('componentes/layout/VendedorLayout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="vendedor-layout">{children}</div>,
}));

// Mock DashboardPanel to render a simple identifiable element
vi.mock('componentes/organismo/Vendedor/DashboardPanel', () => ({
  __esModule: true,
  default: () => <div data-testid="dashboard-panel">DashboardPanel Mock</div>,
}));

import DashboardPage from '../DashboardPage';

describe('DashboardPage', () => {
  test('renderiza el layout y el panel', () => {
    render(<DashboardPage />);

    expect(screen.getByTestId('vendedor-layout')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-panel')).toBeInTheDocument();
    expect(screen.getByText('DashboardPanel Mock')).toBeInTheDocument();
  });
});
