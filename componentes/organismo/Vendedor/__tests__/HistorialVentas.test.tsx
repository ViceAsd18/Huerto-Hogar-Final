import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

// Mock Titulo atom
vi.mock('componentes/atomos/Titulo', () => ({
  __esModule: true,
  default: ({ children, nivel = 2 }: any) => React.createElement(`h${nivel}`, { 'data-testid': 'titulo' }, children),
}));

// Mock antd Card/Table to simple DOM rendering for assertions
vi.mock('antd', () => {
  const React = require('react');
  const Table = ({ dataSource }: any) => (
    <div data-testid="table">
      {dataSource && dataSource.map((r: any) => (
        <div key={r.key} data-testid={`row-${r.key}`}>
          <span data-testid={`id-${r.key}`}>{r.idOrden}</span>
          <span data-testid={`fecha-${r.key}`}>{r.fecha}</span>
          <span data-testid={`cant-${r.key}`}>{r.cantidad}</span>
          <span data-testid={`precio-${r.key}`}>{r.precioTotal}</span>
        </div>
      ))}
    </div>
  );
  const Card = ({ children, title }: any) => <div data-testid="card"><h4>{title}</h4>{children}</div>;
  return { __esModule: true, Table, Card };
});

import HistorialVentas from '../HistorialVentas';

describe('HistorialVentas', () => {
  test('muestra el título y filas según las ventas', () => {
    const ventas = [
      { key: '1', idOrden: 'ORD-001', fecha: '2025-12-01', cantidad: 2, precioTotal: '$200' },
      { key: '2', idOrden: 'ORD-002', fecha: '2025-12-02', cantidad: 1, precioTotal: '$150' },
    ];

    render(<HistorialVentas ventas={ventas} />);

    // Título
    expect(screen.getByTestId('titulo')).toHaveTextContent('Historial de Ventas');

    // Tabla y filas
    expect(screen.getByTestId('table')).toBeInTheDocument();
    expect(screen.getByTestId('row-1')).toBeInTheDocument();
    expect(screen.getByTestId('id-1')).toHaveTextContent('ORD-001');
    expect(screen.getByTestId('precio-2')).toHaveTextContent('$150');
  });
});
