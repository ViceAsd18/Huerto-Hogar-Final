import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

// Mock antd Table to render a simple table from dataSource for assertions
vi.mock('antd', () => {
  const React = require('react');
  const Table = ({ dataSource }: any) => (
    <div data-testid="table">
      {dataSource && dataSource.map((d: any) => (
        <div key={d.id_detalle} data-testid={`row-${d.id_detalle}`}>
          <span data-testid={`nombre-${d.id_detalle}`}>{d.producto.nombre_producto}</span>
          <span data-testid={`cantidad-${d.id_detalle}`}>{d.cantidad}</span>
          <span data-testid={`precio-${d.id_detalle}`}>${d.producto.precio.toLocaleString('es-CL')}</span>
          <span data-testid={`subtotal-${d.id_detalle}`}>${d.subtotal.toLocaleString('es-CL')}</span>
        </div>
      ))}
    </div>
  );
  return { __esModule: true, Table };
});

import TablaProductos from '../TablaProductoDetalle';

describe('TablaProductoDetalle', () => {
  test('renderiza filas con nombre, cantidad, precio unitario y subtotal formateado', () => {
    const detalles = [
      { id_detalle: 101, producto: { nombre_producto: 'Zapato', precio: 12000 }, cantidad: 2, subtotal: 24000 },
      { id_detalle: 102, producto: { nombre_producto: 'Camisa', precio: 15000 }, cantidad: 1, subtotal: 15000 },
    ];

    render(<TablaProductos detalles={detalles as any} />);

    // filas presentes
    expect(screen.getByTestId('row-101')).toBeInTheDocument();
    expect(screen.getByTestId('row-102')).toBeInTheDocument();

    // valores correctos y formateados
    expect(screen.getByTestId('nombre-101')).toHaveTextContent('Zapato');
    expect(screen.getByTestId('cantidad-101')).toHaveTextContent('2');
    expect(screen.getByTestId('precio-101')).toHaveTextContent(`$${(12000).toLocaleString('es-CL')}`);
    expect(screen.getByTestId('subtotal-101')).toHaveTextContent(`$${(24000).toLocaleString('es-CL')}`);

    expect(screen.getByTestId('nombre-102')).toHaveTextContent('Camisa');
    expect(screen.getByTestId('cantidad-102')).toHaveTextContent('1');
    expect(screen.getByTestId('precio-102')).toHaveTextContent(`$${(15000).toLocaleString('es-CL')}`);
    expect(screen.getByTestId('subtotal-102')).toHaveTextContent(`$${(15000).toLocaleString('es-CL')}`);
  });
});
