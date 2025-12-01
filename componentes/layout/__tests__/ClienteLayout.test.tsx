import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, test, beforeEach, expect } from 'vitest';

// Mock react-router and expose navigate mock
vi.mock('react-router', () => {
  const __mockNavigate = vi.fn();
  return { __esModule: true, useNavigate: () => __mockNavigate, __mockNavigate };
});

// Mock icons
vi.mock('@ant-design/icons', () => ({
  __esModule: true,
  ShoppingCartOutlined: () => <span data-testid="icon-cart" />,
  UserOutlined: () => <span data-testid="icon-user" />,
}));

// Mock antd Layout components and primitives
vi.mock('antd', () => {
  const Header = ({ children, style }: any) => <header data-testid="header">{children}</header>;
  const Content = ({ children, style }: any) => <main data-testid="content">{children}</main>;
  const Footer = ({ children, style }: any) => <footer data-testid="footer">{children}</footer>;
  const Menu = ({ items }: any) => (
    <nav>
      {items && items.map((it: any) => (
        <button key={it.key} onClick={it.onClick}>{it.label}</button>
      ))}
    </nav>
  );
  const Button = ({ children, onClick, icon }: any) => (
    <button onClick={onClick}>{children ?? (icon ? 'icon' : '')}</button>
  );
  const Badge = ({ children }: any) => <span>{children}</span>;

  // Layout must be a component function with subcomponents attached, like antd's Layout
  const Layout = ({ children }: any) => <div data-testid="layout-root">{children}</div>;
  (Layout as any).Header = Header;
  (Layout as any).Content = Content;
  (Layout as any).Footer = Footer;

  return { __esModule: true, Layout, Menu, Button, Badge };
});

import ClienteLayout from '../ClienteLayout';
import * as RR from 'react-router';

const mockNavigate = (RR as any).__mockNavigate as any;

describe('ClienteLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renderiza children y footer', () => {
    render(
      <ClienteLayout>
        <div>Contenido de prueba</div>
      </ClienteLayout>
    );

    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toHaveTextContent('© 2025 SalesSystem. Todos los derechos reservados.');
  });

  test('click en logo navega a home_cliente', () => {
    render(
      <ClienteLayout>
        <div />
      </ClienteLayout>
    );

    const logo = screen.getByText('SalesSystem');
    fireEvent.click(logo);
    expect(mockNavigate).toHaveBeenCalledWith('/cliente/home_cliente');
  });

  test('click en menu navega a rutas correspondientes', () => {
    render(
      <ClienteLayout>
        <div />
      </ClienteLayout>
    );

    const btnInicio = screen.getByText('Inicio');
    fireEvent.click(btnInicio);
    expect(mockNavigate).toHaveBeenCalledWith('/cliente/home_cliente');

    const btnTienda = screen.getByText('Tienda');
    fireEvent.click(btnTienda);
    expect(mockNavigate).toHaveBeenCalledWith('/cliente/tienda');

    const btnOrdenes = screen.getByText('Mis Órdenes');
    fireEvent.click(btnOrdenes);
    expect(mockNavigate).toHaveBeenCalledWith('/cliente/mis-ordenes');
  });

  test('click en login navega a /login', () => {
    render(
      <ClienteLayout>
        <div />
      </ClienteLayout>
    );

    const btnLogin = screen.getByText('Login');
    fireEvent.click(btnLogin);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
