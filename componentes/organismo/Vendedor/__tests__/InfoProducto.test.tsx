import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

// Mocks
vi.mock('componentes/atomos/ImagenProducto', () => ({
  __esModule: true,
  default: ({ src, alt }: any) => <img data-testid="imagen-producto" src={src} alt={alt} />,
}));

vi.mock('componentes/moleculas/Vendedor/CardInfoProducto', () => ({
  __esModule: true,
  default: ({ producto }: any) => (
    <div data-testid="card-info">
      <span>{producto.nombre_producto}</span>
    </div>
  ),
}));

import InfoProducto from '../InfoProducto';

describe('InfoProducto', () => {
  test('muestra imagen con src calculada y alt, y renderiza CardInfoProducto', () => {
    const producto = { id_producto: 1, nombre_producto: 'Item Test' } as any;

    render(<InfoProducto producto={producto} />);

    // src debe usar nombre en minúsculas con guiones bajos
    expect(screen.getByTestId('imagen-producto')).toHaveAttribute('src', '/assets/img/productos/item_test.jpg');
    expect(screen.getByTestId('imagen-producto')).toHaveAttribute('alt', 'Item Test');

    // CardInfoProducto debe renderizarse con el producto
    expect(screen.getByTestId('card-info')).toBeInTheDocument();
    expect(screen.getByText('Item Test')).toBeInTheDocument();
  });

  test('normaliza nombres con espacios y mayúsculas', () => {
    const producto = { id_producto: 2, nombre_producto: 'Mi Producto Grande' } as any;

    render(<InfoProducto producto={producto} />);

    expect(screen.getByTestId('imagen-producto')).toHaveAttribute('src', '/assets/img/productos/mi_producto_grande.jpg');
    expect(screen.getByTestId('imagen-producto')).toHaveAttribute('alt', 'Mi Producto Grande');
  });
});
