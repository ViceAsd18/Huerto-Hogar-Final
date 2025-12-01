import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, beforeEach, describe, test, expect } from 'vitest';

// Mock router and expose navigate
vi.mock('react-router', () => {
  const __mockNavigate = vi.fn();
  return { __esModule: true, useNavigate: () => __mockNavigate, __mockNavigate };
});

// Mock antd message with hide function
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

// Mock RegisterForm
vi.mock('componentes/organismo/RegistroForm', () => ({
  __esModule: true,
  default: ({ onSubmit }: any) => (
    <div>
      <button onClick={() => onSubmit('Nombre', 'email@example.com', 'pass')}>Registrar</button>
    </div>
  ),
}));

// Mock service
vi.mock('services/auth', () => ({ __esModule: true, registerRequest: vi.fn() }));

import RegistroPage from '../RegistroPage';
import * as RR from 'react-router';
import { message } from 'antd';
import { registerRequest } from 'services/auth';

const mockNavigate = (RR as any).__mockNavigate as any;

describe('RegistroPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('registro exitoso navega a /login y muestra success', async () => {
    (registerRequest as any).mockResolvedValue(undefined);

    render(<RegistroPage />);
    fireEvent.click(screen.getByText('Registrar'));

    await waitFor(() => expect(message.loading).toHaveBeenCalled());
    await waitFor(() => expect((message as any).__hide).toHaveBeenCalled());
    expect(message.success).toHaveBeenCalledWith('Registro exitoso. Por favor, inicia sesión.');
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('error con mensaje del backend muestra ese mensaje', async () => {
    (registerRequest as any).mockRejectedValue({ response: { data: { message: 'Email ya registrado' } } });

    render(<RegistroPage />);
    fireEvent.click(screen.getByText('Registrar'));

    await waitFor(() => expect(message.loading).toHaveBeenCalled());
    await waitFor(() => expect((message as any).__hide).toHaveBeenCalled());
    expect(message.error).toHaveBeenCalledWith('Email ya registrado');
  });

  test('error genérico muestra mensaje por defecto', async () => {
    (registerRequest as any).mockRejectedValue(new Error('network'));

    render(<RegistroPage />);
    fireEvent.click(screen.getByText('Registrar'));

    await waitFor(() => expect(message.loading).toHaveBeenCalled());
    await waitFor(() => expect((message as any).__hide).toHaveBeenCalled());
    expect(message.error).toHaveBeenCalledWith('Error al registrar usuario');
  });
});
