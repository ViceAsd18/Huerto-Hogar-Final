import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { vi, describe, test, beforeEach, expect } from 'vitest';

// Mock icons
vi.mock('@ant-design/icons', () => ({
  __esModule: true,
  MenuFoldOutlined: () => <span data-testid="icon-fold" />,
  MenuUnfoldOutlined: () => <span data-testid="icon-unfold" />,
}));

// Mock MenuVendedor and UsuarioSidebar
vi.mock('componentes/moleculas/BarraNavegacion/MenuVendedor', () => ({ __esModule: true, default: () => <div>menu-vendedor</div> }));
vi.mock('componentes/moleculas/BarraNavegacion/UsuarioSidebar', () => ({ __esModule: true, default: ({ colapsado }: any) => <div data-testid="usuario-sidebar">sidebar-{String(colapsado)}</div> }));

// Mock antd Layout components and primitives (Layout must be a component with subcomponents)
vi.mock('antd', () => {
  const Header = ({ children }: any) => <header data-testid="header">{children}</header>;
  const Content = ({ children }: any) => <main data-testid="content">{children}</main>;
  const Footer = ({ children }: any) => <footer data-testid="footer">{children}</footer>;
  const Sider = ({ children, collapsed }: any) => <aside data-testid="sider">{children}{String(collapsed)}</aside>;
  const Drawer = ({ title, placement, closable, onClose, open, bodyStyle, width, children }: any) => (
    <div data-testid="drawer" data-open={open}>
      <div data-testid="drawer-title">{title}</div>
      {open ? children : null}
    </div>
  );
  const Button = ({ children, onClick, icon, type }: any) => <button onClick={onClick}>{children ?? (icon ? 'icon' : '')}</button>;

  const Layout = ({ children }: any) => <div data-testid="layout-root">{children}</div>;
  (Layout as any).Header = Header;
  (Layout as any).Content = Content;
  (Layout as any).Footer = Footer;
  (Layout as any).Sider = Sider;

  return { __esModule: true, Layout, Drawer, Button };
});

import VendedorLayout from '../VendedorLayout';

describe('VendedorLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // reset window size to desktop default
    (window as any).innerWidth = 1024;
  });

  test('renderiza children y footer', () => {
    render(
      <VendedorLayout>
        <div>Contenido vendedor</div>
      </VendedorLayout>
    );

    expect(screen.getByText('Contenido vendedor')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toHaveTextContent('© 2025 Sistema Gestor de Ventas');
  });

  test('muestra Sider en escritorio', () => {
    render(
      <VendedorLayout>
        <div />
      </VendedorLayout>
    );

    expect(screen.getByTestId('sider')).toBeInTheDocument();
    // usuario sidebar receives colapsado prop initially false
    expect(screen.getByTestId('usuario-sidebar')).toHaveTextContent('sidebar-false');
  });

  test('en móvil abre Drawer al pulsar Menú', async () => {
    // Simulate mobile width
    (window as any).innerWidth = 500;

    render(
      <VendedorLayout>
        <div />
      </VendedorLayout>
    );

    // trigger resize listener
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    // wait for the mobile button 'Menú' to appear (select the button specifically)
    const btnMenu = await screen.findByRole('button', { name: 'Menú' });
    expect(btnMenu).toBeInTheDocument();

    // click to open drawer
    fireEvent.click(btnMenu);

    // Drawer should be rendered and open (wait for state update)
    const drawer = await screen.findByTestId('drawer');
    expect(drawer).toBeInTheDocument();
    expect(drawer).toHaveAttribute('data-open', 'true');

    // menu-vendedor inside drawer
    expect(await screen.findByText('menu-vendedor')).toBeInTheDocument();
  });
});
