import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock antd components used by the form to make the form behave like native HTML
vi.mock('antd', () => {
  const React = require('react');
  const message = { success: vi.fn(), error: vi.fn() };

  const FormMock = ({ children, onFinish }: any) => {
    const handleSubmit = (e: any) => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const fd = new FormData(form);
      const values: any = {};
      fd.forEach((v, k) => {
        // try to convert numeric-like strings to numbers
        const n = Number(v as string);
        values[k] = !Number.isNaN(n) && (v as string).trim() !== '' ? n : v;
      });
      onFinish && onFinish(values);
    };
    return React.createElement('form', { onSubmit: handleSubmit }, children);
  };

  // Form.Item will inject the `name` prop into its only child so native inputs have name attributes
  (FormMock as any).Item = ({ name, children }: any) => {
    const child = React.Children.only(children) as any;
    return React.cloneElement(child, { name });
  };

  const InputMock = ({ placeholder, ...rest }: any) => <input {...rest} placeholder={placeholder} />;
  const TextAreaMock = ({ placeholder, ...rest }: any) => <textarea {...rest} placeholder={placeholder} />;
  const InputNumberMock = ({ placeholder, ...rest }: any) => <input {...rest} placeholder={placeholder} />;

  const SelectMock = ({ children, name, placeholder }: any) => (
    <select name={name} aria-label={placeholder || name}>
      {children}
    </select>
  );
  const OptionMock = ({ value, children }: any) => <option value={value}>{children}</option>;

  const ButtonMock = ({ children, htmlType }: any) => <button type={htmlType || 'button'}>{children}</button>;

  return { __esModule: true, Form: FormMock, Input: Object.assign(InputMock, { TextArea: TextAreaMock }), InputNumber: InputNumberMock, Select: Object.assign(SelectMock, { Option: OptionMock }), Button: ButtonMock, message };
});

// Mocks for services and navigation
const mockCrear = vi.fn();
const mockGetCategorias = vi.fn();
vi.mock('services/productos', () => ({ __esModule: true, crearProducto: (...args: any[]) => mockCrear(...args) }));
vi.mock('services/categoria', () => ({ __esModule: true, getCategorias: () => mockGetCategorias() }));

const mockNavigate = vi.fn();
vi.mock('react-router', () => ({ useNavigate: () => mockNavigate }));

import AgregarProductoForm from '../AgregarProductoForm';

describe('AgregarProductoForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renderiza campos y carga categorías', async () => {
    mockGetCategorias.mockResolvedValueOnce([{ id_categoria: 1, nombre_categoria: 'Cat1' }]);

    render(<AgregarProductoForm />);

    // esperamos que la opción de categoría aparezca
    await waitFor(() => expect(screen.getByText('Cat1')).toBeInTheDocument());

    // campos básicos presentes (buscamos por placeholder)
    expect(screen.getByPlaceholderText('Nombre del producto')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Descripción del producto')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Precio')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Stock disponible')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crear Producto/i })).toBeInTheDocument();
  });

  test('envío exitoso llama a crearProducto, muestra success y navega', async () => {
    mockGetCategorias.mockResolvedValueOnce([{ id_categoria: 1, nombre_categoria: 'Cat1' }]);
    mockCrear.mockResolvedValueOnce({});

    const { getByPlaceholderText, getByRole, getByLabelText } = screen;

    render(<AgregarProductoForm />);

    // esperar opciones cargadas
    await waitFor(() => expect(screen.getByText('Cat1')).toBeInTheDocument());

    // rellenar campos
    fireEvent.change(screen.getByPlaceholderText('Nombre del producto'), { target: { value: 'Prod A' } });
    fireEvent.change(screen.getByPlaceholderText('Descripción del producto'), { target: { value: 'Desc' } });
    fireEvent.change(screen.getByPlaceholderText('Precio'), { target: { value: '1500' } });
    fireEvent.change(screen.getByPlaceholderText('Stock disponible'), { target: { value: '3' } });
    // seleccionar categoría (select tiene aria-label igual al placeholder en nuestro mock)
    fireEvent.change(screen.getByLabelText('Selecciona una categoría'), { target: { value: '1' } });

    // submit
    fireEvent.click(screen.getByRole('button', { name: /Crear Producto/i }));

    await waitFor(() => expect(mockCrear).toHaveBeenCalled());

    // verificar que message.success se llamó y se navegó
    const { message } = await import('antd');
    expect(message.success).toHaveBeenCalledWith('Producto creado exitosamente');
    expect(mockNavigate).toHaveBeenCalledWith('/productos');
  });

  test('error en creación muestra mensaje de error y no navega', async () => {
    mockGetCategorias.mockResolvedValueOnce([{ id_categoria: 1, nombre_categoria: 'Cat1' }]);
    mockCrear.mockRejectedValueOnce(new Error('fail'));

    render(<AgregarProductoForm />);

    await waitFor(() => expect(screen.getByText('Cat1')).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText('Nombre del producto'), { target: { value: 'Prod A' } });
    fireEvent.change(screen.getByPlaceholderText('Descripción del producto'), { target: { value: 'Desc' } });
    fireEvent.change(screen.getByPlaceholderText('Precio'), { target: { value: '1500' } });
    fireEvent.change(screen.getByPlaceholderText('Stock disponible'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('Selecciona una categoría'), { target: { value: '1' } });

    fireEvent.click(screen.getByRole('button', { name: /Crear Producto/i }));

    await waitFor(() => expect(mockCrear).toHaveBeenCalled());

    const { message } = await import('antd');
    expect(message.error).toHaveBeenCalledWith('Error al crear el producto');
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
