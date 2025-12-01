import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock Titulo to render children plainly
vi.mock('componentes/atomos/Titulo', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
}));

// Mock useNavigate from react-router
const mockNavigate = vi.fn();
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

import RegisterForm from '../RegistroForm';

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renderiza campos y botón', () => {
    render(<RegisterForm onSubmit={vi.fn()} />);

    expect(screen.getByText('Crea tu cuenta')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tu nombre')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ejemplo@correo.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('********')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });

  test('al enviar credenciales válidas llama a onSubmit y resetea el formulario', async () => {
    const handle = vi.fn();
    render(<RegisterForm onSubmit={handle} />);

    const nombre = screen.getByPlaceholderText('Tu nombre');
    const email = screen.getByPlaceholderText('ejemplo@correo.com');
    const pass = screen.getByPlaceholderText('********');

    fireEvent.change(nombre, { target: { value: 'Juan' } });
    fireEvent.change(email, { target: { value: 'juan@correo.com' } });
    fireEvent.change(pass, { target: { value: 'Secreto123' } });

    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    await waitFor(() => {
      expect(handle).toHaveBeenCalledWith('Juan', 'juan@correo.com', 'Secreto123');
    });

    // después de resetFields, los inputs deberían quedar vacíos
    await waitFor(() => {
      expect((screen.getByPlaceholderText('Tu nombre') as HTMLInputElement).value).toBe('');
      expect((screen.getByPlaceholderText('ejemplo@correo.com') as HTMLInputElement).value).toBe('');
      expect((screen.getByPlaceholderText('********') as HTMLInputElement).value).toBe('');
    });
  });

  test('clic en enlace de login llama a navigate con /login', () => {
    render(<RegisterForm onSubmit={vi.fn()} />);

    const link = screen.getByText('Inicia sesión');
    fireEvent.click(link);

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
