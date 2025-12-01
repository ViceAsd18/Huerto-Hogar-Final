import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

// Mock VendedorLayout
vi.mock('componentes/layout/VendedorLayout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="vendedor-layout">{children}</div>,
}));

// Mock Titulo
vi.mock('componentes/atomos/Titulo', () => ({
  __esModule: true,
  default: ({ children }: any) => <h1 data-testid="titulo">{children}</h1>,
}));

// Mock AgregarProductoForm
vi.mock('componentes/organismo/Vendedor/AgregarProductoForm', () => ({
  __esModule: true,
  default: () => <form data-testid="agregar-form">Formulario Mock</form>,
}));

import AgregarProductoPage from '../AgregarProductoPage';

describe('AgregarProductoPage', () => {
  test('renderiza layout, título y el formulario de agregar', () => {
    render(<AgregarProductoPage />);

    expect(screen.getByTestId('vendedor-layout')).toBeInTheDocument();
    expect(screen.getByTestId('titulo')).toHaveTextContent('Agregar Nuevo Producto');
    expect(screen.getByTestId('agregar-form')).toBeInTheDocument();
  });
});
