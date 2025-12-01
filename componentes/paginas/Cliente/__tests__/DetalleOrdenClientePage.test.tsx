import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock react-router hooks
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useParams: () => ({ id: '12345' }),
  useNavigate: () => mockNavigate,
}));

// Mock ClienteLayout to just render children (correct relative path from this test file)
vi.mock('../../../layout/ClienteLayout', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

// Mock ImagenProducto to render an img with src (correct relative path)
vi.mock('../../../atomos/ImagenProducto', () => ({
  __esModule: true,
  default: ({ src, alt }: any) => <img src={src} alt={alt} data-testid="imagen-producto" />,
}));

// Mock antd components used to simplify DOM structure
vi.mock('antd', () => {
  const React = require('react');
  const Text = ({ children, ...props }: any) => <span {...props}>{children}</span>;
  const Card = ({ children, ...props }: any) => <div {...props}>{children}</div>;
  const Divider = ({ children }: any) => <hr />;
  const Row = ({ children }: any) => <div>{children}</div>;
  const Col = ({ children, ...props }: any) => <div {...props}>{children}</div>;
  const Tag = ({ children }: any) => <span data-testid="tag">{children}</span>;
  const Button = ({ children, onClick }: any) => <button onClick={onClick}>{children}</button>;
  const Table = ({ dataSource }: any) => (
    <div data-testid="table">
      {dataSource && dataSource.map((d: any) => (
        <div key={d.key} data-testid={`producto-${d.key}`}>
          <div data-testid={`nombre-${d.key}`}>{d.nombre}</div>
          <div data-testid={`cantidad-${d.key}`}>{d.cantidad}</div>
          <div data-testid={`precio-${d.key}`}>${d.precio.toLocaleString('es-CL')}</div>
          <div data-testid={`subtotal-${d.key}`}>${d.subtotal.toLocaleString('es-CL')}</div>
        </div>
      ))}
    </div>
  );

  const Layout = ({ children }: any) => <div>{children}</div>;
  Layout.Header = ({ children }: any) => <header>{children}</header>;
  Layout.Content = ({ children }: any) => <main>{children}</main>;
  Layout.Footer = ({ children }: any) => <footer>{children}</footer>;

  return {
    __esModule: true,
    Layout,
    Typography: { Title: (props: any) => <div data-testid="title">{props.children}</div>, Text: (props: any) => <div>{props.children}</div> },
    Card,
    Divider,
    Row,
    Col,
    Tag,
    Button,
    Table,
  };
});

import DetalleOrdenClientePage from '../DetalleOrdenClientePage';

describe('DetalleOrdenClientePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('muestra información de la orden y productos', () => {
    render(<DetalleOrdenClientePage />);

    expect(screen.getByText('Detalle de Orden #12345')).toBeInTheDocument();

    // datos principales
    expect(screen.getByText('15 de Agosto, 2024')).toBeInTheDocument();
    expect(screen.getByText('$3.400')).toBeInTheDocument();
    expect(screen.getByText('Efectivo')).toBeInTheDocument();
    expect(screen.getByText('San Petersburgo 6666, San Miguel')).toBeInTheDocument();

    // estado
    expect(screen.getByTestId('tag')).toHaveTextContent('Completada');

    // productos
    expect(screen.getByTestId('nombre-1')).toHaveTextContent('Coca Cola Original 350ml');
    expect(screen.getByTestId('cantidad-1')).toHaveTextContent('2');
    expect(screen.getByTestId('precio-1')).toHaveTextContent(`$${(1200).toLocaleString('es-CL')}`);
    expect(screen.getByTestId('subtotal-1')).toHaveTextContent(`$${(2400).toLocaleString('es-CL')}`);

    expect(screen.getByTestId('nombre-2')).toHaveTextContent('Lechuga Costina');
    expect(screen.getByTestId('cantidad-2')).toHaveTextContent('1');
  });

  test('clic en volver navega a mis ordenes', () => {
    render(<DetalleOrdenClientePage />);

    const btn = screen.getByText('Volver a Mis Órdenes');
    fireEvent.click(btn);

    expect(mockNavigate).toHaveBeenCalledWith('/cliente/mis-ordenes');
  });
});
