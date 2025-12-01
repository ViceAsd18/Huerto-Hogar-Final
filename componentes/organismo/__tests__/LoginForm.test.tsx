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

import LoginForm from '../LoginForm';

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renderiza campos y botón', () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    expect(screen.getByText('Accede a tu cuenta')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ejemplo@correo.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('********')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument();
  });

  test('al enviar credenciales válidas llama a onSubmit con email y password', async () => {
    const handle = vi.fn();
    render(<LoginForm onSubmit={handle} />);

    const email = screen.getByPlaceholderText('ejemplo@correo.com');
    const pass = screen.getByPlaceholderText('********');

    fireEvent.change(email, { target: { value: 'test@correo.com' } });
    fireEvent.change(pass, { target: { value: 'miPassword123' } });

    // click submit
    fireEvent.click(screen.getByRole('button', { name: /Iniciar sesión/i }));

    // Ant Design Form puede ejecutar validaciones async, esperamos la llamada
    await waitFor(() => {
      expect(handle).toHaveBeenCalledWith('test@correo.com', 'miPassword123');
    });
  });

  test('clic en enlace de registro llama a navigate con /registro', () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    const link = screen.getByText('Crea una cuenta');
    fireEvent.click(link);

    expect(mockNavigate).toHaveBeenCalledWith('/registro');
  });
});
