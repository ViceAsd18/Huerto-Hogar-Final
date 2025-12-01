import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock antd pieces used (Input.Search and message) to keep tests simple
vi.mock('antd', () => {
  const React = require('react');
  const InputSearch = ({ placeholder, value, onChange, ...rest }: any) => (
    <input aria-label={placeholder} value={value} onChange={onChange} {...rest} />
  );
  const Text = ({ children, ...rest }: any) => React.createElement('span', rest, children);
  const Title = ({ children, level = 2, ...rest }: any) => React.createElement(`h${level}`, rest, children);

  return {
    __esModule: true,
    Input: { Search: InputSearch },
    Divider: ({ children }: any) => React.createElement(React.Fragment, null, children),
    Row: ({ children, ...rest }: any) => React.createElement('div', rest, children),
    Col: ({ children, ...rest }: any) => React.createElement('div', rest, children),
    message: { error: vi.fn(), success: vi.fn() },
    Typography: { Text, Title },
  };
});

// Mock atom components and molecule components
vi.mock('componentes/moleculas/Vendedor/Orden/ProductoFila', () => ({
  __esModule: true,
  default: ({ producto, onAgregar }: any) => (
    <div data-testid={`fila-${producto.id_producto}`}>
      <span>{producto.nombre_producto}</span>
      <button onClick={() => onAgregar && onAgregar(producto)}>Agregar</button>
    </div>
  ),
}));

vi.mock('componentes/moleculas/Vendedor/Orden/OrdenItem', () => ({
  __esModule: true,
  default: ({ producto, onCantidadChange, onEliminar }: any) => (
    <div data-testid={`item-${producto.id_producto}`}>
      <span>{producto.nombre_producto}</span>
      <span data-testid={`cantidad-${producto.id_producto}`}>{producto.cantidad}</span>
      <button onClick={() => onCantidadChange && onCantidadChange(producto.id_producto, producto.cantidad + 1)}>+</button>
      <button onClick={() => onEliminar && onEliminar(producto.id_producto)}>Eliminar</button>
    </div>
  ),
}));

vi.mock('componentes/atomos/Boton', () => ({
  __esModule: true,
  default: ({ children, onClick, color }: any) => (
    <button onClick={onClick} style={{ background: color }}>{children}</button>
  ),
}));

vi.mock('componentes/atomos/SelectOpciones', () => ({
  __esModule: true,
  default: ({ valor, onChange, opciones, placeholder }: any) => (
    <select aria-label={placeholder} value={valor} onChange={(e: any) => onChange(Number(e.target.value))}>
      <option value="">--</option>
      {opciones.map((o: any) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  ),
}));

vi.mock('componentes/atomos/Titulo', () => ({
  __esModule: true,
  default: ({ children, nivel = 2 }: any) => React.createElement(`h${nivel}`, { 'data-testid': 'titulo' }, children),
}));

import CrearOrden from '../CrearOrden';
import { message } from 'antd';

describe('CrearOrden', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('añadir producto actualiza carrito y totales', async () => {
    const productosDisponibles = [
      { id_producto: 1, nombre_producto: 'Prod A', precio: 100 },
      { id_producto: 2, nombre_producto: 'Prod B', precio: 200 },
    ];

    render(<CrearOrden productosDisponibles={productosDisponibles as any} clientes={[]} onGenerarOrden={() => {}} onPagarOrden={() => {}} />);

    // Ambos productos están en la lista inicial
    expect(screen.getByTestId('fila-1')).toBeInTheDocument();
    expect(screen.getByTestId('fila-2')).toBeInTheDocument();

    // Agregar el producto 1
    fireEvent.click(screen.getByTestId('fila-1').querySelector('button')!);

    // Ahora debe aparecer en el carrito (OrdenItem) y desaparecer de la lista de productos filtrados
    await waitFor(() => expect(screen.getByTestId('item-1')).toBeInTheDocument());
    expect(screen.queryByTestId('fila-1')).toBeNull();

    // Totales: subtotal 100, impuesto 19, total 119
    expect(screen.getByText(/Subtotal: \$100.00/)).toBeInTheDocument();
    expect(screen.getByText(/Impuesto 19%: \$19.00/)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$119.00/)).toBeInTheDocument();
  });

  test('validaciones de cliente y botones llaman message.error cuando falta cliente o productos', async () => {
    const productosDisponibles = [ { id_producto: 1, nombre_producto: 'Prod A', precio: 50 } ];
    const mockGenerar = vi.fn();
    const mockPagar = vi.fn();

    const { rerender } = render(<CrearOrden productosDisponibles={productosDisponibles as any} clientes={[]} onGenerarOrden={mockGenerar} onPagarOrden={mockPagar} />);

    // Click Generar Orden sin cliente
    fireEvent.click(screen.getByRole('button', { name: /Generar Orden/i }));
    expect(message.error).toHaveBeenCalledWith('Seleccione un cliente');

    // Click Pagar Orden sin cliente
    fireEvent.click(screen.getByRole('button', { name: /Pagar Orden/i }));
    expect(message.error).toHaveBeenCalledWith('Seleccione un cliente');

    // Seleccionar cliente y click Pagar sin productos -> error agregar productos
    const clientes = [{ id_usuario: 10, nombre: 'Cliente 1' }];
    // re-render with clientes
    rerender(<CrearOrden productosDisponibles={productosDisponibles as any} clientes={clientes as any} onGenerarOrden={mockGenerar} onPagarOrden={mockPagar} />);

    // select the client (si hay duplicados en DOM, tomar el último que contiene las opciones)
    const selects = screen.getAllByLabelText('Seleccione un cliente');
    const selectToUse = selects[selects.length - 1];
    fireEvent.change(selectToUse, { target: { value: '10' } });

    fireEvent.click(screen.getByRole('button', { name: /Pagar Orden/i }));
    expect(message.error).toHaveBeenCalledWith('Agregue productos a la orden');
  });

  test('onGenerarOrden y onPagarOrden se llaman cuando hay cliente y productos', async () => {
    const productosDisponibles = [ { id_producto: 1, nombre_producto: 'Prod A', precio: 10 } ];
    const clientes = [{ id_usuario: 5, nombre: 'Cli' }];
    const mockGenerar = vi.fn();
    const mockPagar = vi.fn();

    render(<CrearOrden productosDisponibles={productosDisponibles as any} clientes={clientes as any} onGenerarOrden={mockGenerar} onPagarOrden={mockPagar} />);

    // select client
    fireEvent.change(screen.getByLabelText('Seleccione un cliente'), { target: { value: '5' } });

    // add product
    fireEvent.click(screen.getByTestId('fila-1').querySelector('button')!);
    await waitFor(() => expect(screen.getByTestId('item-1')).toBeInTheDocument());

    // Generar Orden
    fireEvent.click(screen.getByRole('button', { name: /Generar Orden/i }));
    expect(mockGenerar).toHaveBeenCalledWith(5, expect.any(Array));

    // Pagar Orden
    fireEvent.click(screen.getByRole('button', { name: /Pagar Orden/i }));
    expect(mockPagar).toHaveBeenCalledWith(5, expect.any(Array));
  });
});
