import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock ClienteLayout
vi.mock('../../../layout/ClienteLayout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

// Mock react-router useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

import MisOrdenesPage from '../MisOrdenesPage';

describe('MisOrdenesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(<MisOrdenesPage />);
  });

  test('muestra el encabezado y la descripción', () => {
    expect(screen.getByText('Mis Órdenes')).toBeInTheDocument();
    expect(screen.getByText('Revisa el estado de tus compras recientes')).toBeInTheDocument();
  });

  test('muestra las órdenes con ID, fecha, total y estado', () => {
    // primer orden del mock
    expect(screen.getByText('#12345')).toBeInTheDocument();
    expect(screen.getByText('15 de Oct, 2024')).toBeInTheDocument();
    expect(screen.getByText(`$${(150000).toLocaleString('es-CL')}`)).toBeInTheDocument();
    expect(screen.getAllByText('Completada')[0]).toBeInTheDocument();

    // segunda orden
    expect(screen.getByText('#12344')).toBeInTheDocument();
    expect(screen.getByText('12 de Oct, 2024')).toBeInTheDocument();
    expect(screen.getByText(`$${(85500).toLocaleString('es-CL')}`)).toBeInTheDocument();
    expect(screen.getAllByText('Pendiente')[0]).toBeInTheDocument();
  });

  test('al hacer click en Ver Detalle navega a la ruta correspondiente', () => {
    const botones = screen.getAllByRole('button', { name: /Ver Detalle/i });
    // click al primer boton
    fireEvent.click(botones[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/cliente/orden/12345');
  });
});
