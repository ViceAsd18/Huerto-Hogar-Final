import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, beforeEach, describe, test, expect } from 'vitest';

// Mock react-router and expose the navigate mock
vi.mock('react-router', () => {
  const __mockNavigate = vi.fn();
  return { __esModule: true, useNavigate: () => __mockNavigate, __mockNavigate };
});

// Mock auth context and expose mock login
vi.mock('auth/AuthContext', () => {
  const __mockLogin = vi.fn();
  return { __esModule: true, useAuth: () => ({ login: __mockLogin }), __mockLogin };
});

// Mock antd message and expose hide mock
vi.mock('antd', () => {
  const __hide = vi.fn();
  const message = {
    loading: vi.fn(() => __hide),
    success: vi.fn(),
    error: vi.fn(),
    __hide,
  };
  return { __esModule: true, message };
});

vi.mock('componentes/organismo/LoginForm', () => ({
  __esModule: true,
  default: ({ onSubmit }: any) => (
    <div>
      <button onClick={() => onSubmit('user@example.com', 'password')}>Iniciar</button>
    </div>
  ),
}));

// Mock services and later import their mocked functions
vi.mock('services/auth', () => ({ __esModule: true, loginRequest: vi.fn(), getProfile: vi.fn() }));

import LoginPage from '../LoginPage';
import * as RR from 'react-router';
import * as AC from 'auth/AuthContext';
import { message } from 'antd';
import { loginRequest, getProfile } from 'services/auth';

const mockNavigate = (RR as any).__mockNavigate as any;
const mockLogin = (AC as any).__mockLogin as any;

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('inicio exitoso como cliente navega a /', async () => {
    (loginRequest as any).mockResolvedValue({ access_token: 'tok' });
    (getProfile as any).mockResolvedValue({ id: 1, nombre: 'User', rol: 'Cliente' });

    render(<LoginPage />);

    fireEvent.click(screen.getByText('Iniciar'));

    await waitFor(() => expect(message.loading).toHaveBeenCalled());
    await waitFor(() => expect((message as any).__hide).toHaveBeenCalled());
    expect(localStorage.getItem('token')).toBe('tok');
    expect(mockLogin).toHaveBeenCalledWith({ token: 'tok', user: { id: 1, nombre: 'User', rol: 'Cliente' } });
    expect(message.success).toHaveBeenCalledWith('Inicio de sesión exitoso');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('error 401 muestra mensaje de credenciales', async () => {
    const err = { response: { status: 401 } };
    (loginRequest as any).mockRejectedValue(err);

    render(<LoginPage />);
    fireEvent.click(screen.getByText('Iniciar'));

    await waitFor(() => expect(message.loading).toHaveBeenCalled());
    await waitFor(() => expect((message as any).__hide).toHaveBeenCalled());
    expect(message.error).toHaveBeenCalledWith('Correo o contraseña incorrecta');
    expect(localStorage.getItem('token')).toBeNull();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('error genérico muestra mensaje de error', async () => {
    (loginRequest as any).mockRejectedValue(new Error('network'));

    render(<LoginPage />);
    fireEvent.click(screen.getByText('Iniciar'));

    await waitFor(() => expect(message.loading).toHaveBeenCalled());
    await waitFor(() => expect((message as any).__hide).toHaveBeenCalled());
    expect(message.error).toHaveBeenCalledWith('Ocurrió un error al iniciar sesión');
  });
});
