import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock ClienteLayout
vi.mock('../../../layout/ClienteLayout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

// Mock CardProductoCliente
vi.mock('../../../moleculas/Cliente/CardProductoCliente', () => ({
  __esModule: true,
  default: ({ producto }: any) => (
    <div data-testid={`card-${producto.id_producto}`}>{producto.nombre_producto}</div>
  ),
}));

// Mock getProductos service (path from this test file)
vi.mock('../../../../services/productos', () => ({
  __esModule: true,
  getProductos: vi.fn(),
}));

import TiendaPage from '../TiendaPage';
import { getProductos } from '../../../../services/productos';

describe('TiendaPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renderiza productos y filtra por búsqueda', async () => {
    const productos = [
      { id_producto: 1, nombre_producto: 'Manzana Roja', categoria: { nombre_categoria: 'Frutas' } },
      { id_producto: 2, nombre_producto: 'Pera Verde', categoria: { nombre_categoria: 'Frutas' } },
      { id_producto: 3, nombre_producto: 'Jugo Naranja', categoria: { nombre_categoria: 'Bebidas' } },
    ];
    (getProductos as any).mockResolvedValue(productos);

    render(<TiendaPage />);

    // Esperar a que los cards aparezcan
    const card1 = await screen.findByTestId('card-1');
    const card2 = await screen.findByTestId('card-2');
    const card3 = await screen.findByTestId('card-3');

    expect(card1).toHaveTextContent('Manzana Roja');
    expect(card2).toHaveTextContent('Pera Verde');
    expect(card3).toHaveTextContent('Jugo Naranja');

    // buscar 'Pera' - solo debe quedar card-2
    const input = screen.getByPlaceholderText('¿Qué estás buscando?');
    fireEvent.change(input, { target: { value: 'Pera' } });

    expect(screen.queryByTestId('card-1')).toBeNull();
    expect(screen.getByTestId('card-2')).toBeInTheDocument();
    expect(screen.queryByTestId('card-3')).toBeNull();
  });

  test('filtra por categoría', async () => {
    const productos = [
      { id_producto: 1, nombre_producto: 'Manzana Roja', categoria: { nombre_categoria: 'Frutas' } },
      { id_producto: 2, nombre_producto: 'Pera Verde', categoria: { nombre_categoria: 'Frutas' } },
      { id_producto: 3, nombre_producto: 'Jugo Naranja', categoria: { nombre_categoria: 'Bebidas' } },
    ];
    (getProductos as any).mockResolvedValue(productos);

    render(<TiendaPage />);

    // esperar a que se muestren botones de categoría
    const btnFrutas = await screen.findByRole('button', { name: 'Frutas' });
    fireEvent.click(btnFrutas);

    expect(screen.getByTestId('card-1')).toBeInTheDocument();
    expect(screen.getByTestId('card-2')).toBeInTheDocument();
    expect(screen.queryByTestId('card-3')).toBeNull();
  });

  test('muestra mensaje vacío cuando no hay productos', async () => {
    (getProductos as any).mockResolvedValue([]);

    render(<TiendaPage />);

    const empty = await screen.findByText('No se encontraron productos');
    expect(empty).toBeInTheDocument();
  });
});
