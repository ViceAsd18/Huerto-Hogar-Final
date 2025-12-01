import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock react-router useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({ useNavigate: () => mockNavigate }));

// Mock services
vi.mock('services/categoria', () => ({ __esModule: true, getCategorias: vi.fn() }));
vi.mock('services/productos', () => ({ __esModule: true, getProductos: vi.fn() }));

// Mock layout and small components
vi.mock('componentes/layout/VendedorLayout', () => ({ __esModule: true, default: ({ children }: any) => <div>{children}</div> }));
vi.mock('componentes/atomos/Titulo', () => ({ __esModule: true, default: ({ children }: any) => <h1>{children}</h1> }));

// Mock ControlsTabla to expose handlers and render placeholder inputs/buttons
vi.mock('componentes/moleculas/Vendedor/ControlsTabla', () => ({
  __esModule: true,
  default: ({ busqueda, onBusquedaChange, filtro, onFiltroChange, opcionesFiltro, onBotonClick, placeholderBusqueda }: any) => (
    <div>
      <input placeholder={placeholderBusqueda} value={busqueda} onChange={(e) => onBusquedaChange(e.target.value)} />
      {opcionesFiltro && opcionesFiltro.map((o: string) => (
        <button key={o} onClick={() => onFiltroChange(o)}>{o}</button>
      ))}
      <button onClick={() => onBotonClick()}>{'Agregar Producto'}</button>
    </div>
  ),
}));

// Mock CatalogoProductos to render productos list and detail button
vi.mock('componentes/organismo/Vendedor/CatalogoProductos', () => ({
  __esModule: true,
  default: ({ productos, onVerDetalle }: any) => (
    <div>
      {productos.map((p: any) => (
        <div key={p.id_producto} data-testid={`prod-${p.id_producto}`}>
          <span>{p.nombre_producto}</span>
          <button onClick={() => onVerDetalle(p)}>Ver</button>
        </div>
      ))}
    </div>
  ),
}));

import ProductosPage from '../ProductosPage';
import { getCategorias } from 'services/categoria';
import { getProductos } from 'services/productos';

describe('ProductosPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renderiza y naviga a agregar producto', async () => {
    (getCategorias as any).mockResolvedValue([{ id_categoria: 1, nombre_categoria: 'Frutas' }]);
    (getProductos as any).mockResolvedValue([{ id_producto: 1, nombre_producto: 'Manzana', categoria: { nombre_categoria: 'Frutas' } }]);

    render(<ProductosPage />);

    expect(await screen.findByText('Listado de Productos')).toBeInTheDocument();

    // boton agregar
    const btnAgregar = screen.getByText('Agregar Producto');
    fireEvent.click(btnAgregar);
    expect(mockNavigate).toHaveBeenCalledWith('/agregar-producto');
  });

  test('filtra por búsqueda y por categoría y abre detalle', async () => {
    (getCategorias as any).mockResolvedValue([{ id_categoria: 1, nombre_categoria: 'Frutas' }, { id_categoria:2, nombre_categoria: 'Bebidas' }]);
    (getProductos as any).mockResolvedValue([
      { id_producto: 1, nombre_producto: 'Manzana', categoria: { nombre_categoria: 'Frutas' } },
      { id_producto: 2, nombre_producto: 'Jugo', categoria: { nombre_categoria: 'Bebidas' } },
    ]);

    render(<ProductosPage />);

    // buscar 'Jugo'
    const input = screen.getByPlaceholderText('Buscar producto...');
    fireEvent.change(input, { target: { value: 'Jugo' } });

    expect(await screen.findByTestId('prod-2')).toBeInTheDocument();
    expect(screen.queryByTestId('prod-1')).toBeNull();

    // limpiar búsqueda antes de aplicar filtro por categoría
    fireEvent.change(input, { target: { value: '' } });

    // filtrar por Frutas (boton generado por ControlsTabla mock)
    const btnFrutas = screen.getByText('Frutas');
    fireEvent.click(btnFrutas);

    // ahora solo prod-1 debe aparecer
    expect(await screen.findByTestId('prod-1')).toBeInTheDocument();
    expect(screen.queryByTestId('prod-2')).toBeNull();

    // abrir detalle
    const btnVer = screen.getByText('Ver');
    fireEvent.click(btnVer);
    expect(mockNavigate).toHaveBeenCalledWith('/detalle-producto/1');
  });
});
