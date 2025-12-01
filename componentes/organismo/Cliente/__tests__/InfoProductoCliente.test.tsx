import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

// Mocks for atomos used by the component
vi.mock('../../../atomos/ImagenProducto', () => ({
  __esModule: true,
  default: ({ src, alt }: any) => <img data-testid="imagen-producto" src={src} alt={alt} />,
}));

vi.mock('../../../atomos/Titulo', () => ({
  __esModule: true,
  default: ({ children, nivel = 2, ...rest }: any) => React.createElement(`h${nivel}`, { 'data-testid': 'titulo', ...rest }, children),
}));

vi.mock('../../../atomos/BadgeStock', () => ({
  __esModule: true,
  default: ({ stock }: any) => <span data-testid="badge-stock">{stock}</span>,
}));

vi.mock('../../../atomos/BadgeCategoria', () => ({
  __esModule: true,
  default: ({ categoria }: any) => <span data-testid="badge-categoria">{categoria}</span>,
}));

import InfoProductoCliente from '../InfoProductoCliente';

describe('InfoProductoCliente', () => {
  test('renderiza imagen, título, badges, precio y detalles', () => {
    const producto: any = {
      nombre_producto: 'Producto Test',
      categoria: { nombre_categoria: 'Cat1' },
      stock: 5,
      precio: 12000,
      descripcion_producto: 'Una descripción',
      sku: 'SKU123',
      marca: 'MarcaX',
      proveedor: 'ProvY',
    };

    render(<InfoProductoCliente producto={producto} />);

    // Imagen: ruta compuesta a partir del nombre en minúsculas y con guiones bajos
    expect(screen.getByTestId('imagen-producto')).toHaveAttribute('src', '/assets/img/productos/producto_test.jpg');

    // Título (hay múltiples `data-testid="titulo"`, tomar el primero como encabezado principal)
    const titulos = screen.getAllByTestId('titulo');
    expect(titulos[0]).toHaveTextContent('Producto Test');

    // Badges
    expect(screen.getByTestId('badge-categoria')).toHaveTextContent('Cat1');
    expect(screen.getByTestId('badge-stock')).toHaveTextContent('5');

    // Precio formateado según locale usado en el componente
    const formatted = `$${producto.precio.toLocaleString('es-CL', { minimumFractionDigits: 0 })}`;
    expect(screen.getByText(formatted)).toBeInTheDocument();

    // Descripción
    expect(screen.getByText('Una descripción')).toBeInTheDocument();

    // Detalles adicionales (valores concretos)
    expect(screen.getByText('SKU123')).toBeInTheDocument();
    expect(screen.getByText('MarcaX')).toBeInTheDocument();
    expect(screen.getByText('ProvY')).toBeInTheDocument();
  });

  test('muestra textos por defecto cuando faltan algunos campos', () => {
    const producto: any = {
      nombre_producto: 'Otro Producto',
      categoria: {},
      stock: 0,
      precio: 0,
      descripcion_producto: '',
      sku: undefined,
      marca: undefined,
      proveedor: undefined,
    };

    render(<InfoProductoCliente producto={producto} />);

    // Si no hay nombre de categoría, se usa 'General'
    expect(screen.getByTestId('badge-categoria')).toHaveTextContent('General');

    // Descripción por defecto
    expect(screen.getByText('Sin descripción.')).toBeInTheDocument();

    // Valores por defecto en detalles
    expect(screen.getByText('N/A')).toBeInTheDocument();
    expect(screen.getByText('Genérico')).toBeInTheDocument();
    expect(screen.getByText('Local')).toBeInTheDocument();
  });
});
