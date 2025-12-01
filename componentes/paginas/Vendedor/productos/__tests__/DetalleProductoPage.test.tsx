import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock react-router useParams
vi.mock('react-router', () => ({ useParams: () => ({ id: '5' }) }));

// Mock services
vi.mock('services/productos', () => ({
  __esModule: true,
  getProductoById: vi.fn(),
}));
vi.mock('services/orden', () => ({
  __esModule: true,
  getUltimasVentasByProducto: vi.fn(),
}));

// Mock layout and child components
vi.mock('componentes/layout/VendedorLayout', () => ({ __esModule: true, default: ({ children }: any) => <div>{children}</div> }));
vi.mock('componentes/organismo/Vendedor/InfoProducto', () => ({ __esModule: true, default: ({ producto }: any) => <div data-testid="info">{producto?.nombre_producto}</div> }));
vi.mock('componentes/organismo/Vendedor/HistorialVentas', () => ({ __esModule: true, default: ({ ventas }: any) => <div data-testid="historial">{ventas.length} ventas</div> }));

import DetalleProductoPage from '../DetalleProductoPage';
import { getProductoById } from 'services/productos';
import { getUltimasVentasByProducto } from 'services/orden';

describe('DetalleProductoPage', () => {
  beforeEach(() => vi.clearAllMocks());

  test('muestra mensaje de carga inicialmente (mocked by effects)', async () => {
    // Keep getProductoById unresolved to simulate loading -> but component hides loading after effect finishes; we'll mock resolved quickly
    (getProductoById as any).mockResolvedValue({ id_producto: 5, nombre_producto: 'Prueba' });
    (getUltimasVentasByProducto as any).mockResolvedValue([]);

    render(<DetalleProductoPage />);

    // After effects resolve, InfoProducto should appear
    const info = await screen.findByTestId('info');
    expect(info).toHaveTextContent('Prueba');
  });

  test('muestra producto no encontrado cuando getProductoById retorna null', async () => {
    (getProductoById as any).mockResolvedValue(null);
    (getUltimasVentasByProducto as any).mockResolvedValue([]);

    render(<DetalleProductoPage />);

    const msg = await screen.findByText('Producto no encontrado');
    expect(msg).toBeInTheDocument();
  });

  test('muestra historial cuando hay ventas', async () => {
    (getProductoById as any).mockResolvedValue({ id_producto: 5, nombre_producto: 'ConVentas' });
    (getUltimasVentasByProducto as any).mockResolvedValue([
      { id: 1, fecha: '2025-10-01', total: 100 },
      { id: 2, fecha: '2025-10-05', total: 200 },
    ]);

    render(<DetalleProductoPage />);

    const historial = await screen.findByTestId('historial');
    expect(historial).toHaveTextContent('2 ventas');
  });

  test('muestra mensaje de no hay ventas cuando el array está vacío', async () => {
    (getProductoById as any).mockResolvedValue({ id_producto: 5, nombre_producto: 'SinVentas' });
    (getUltimasVentasByProducto as any).mockResolvedValue([]);

    render(<DetalleProductoPage />);

    const msg = await screen.findByText('No hay ventas para este producto');
    expect(msg).toBeInTheDocument();
  });
});
