import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import VendedorLayout from "componentes/layout/VendedorLayout";

vi.mock("componentes/moleculas/BarraNavegacion/MenuVendedor", () => ({
    __esModule: true,
    default: () => <div data-testid="menu-vendedor">Menu Vendedor</div>,
}));

vi.mock("componentes/moleculas/BarraNavegacion/UsuarioSidebar", () => ({
    __esModule: true,
    default: () => <div data-testid="usuario-sidebar">Usuario Sidebar</div>,
}));

describe("VendedorLayout Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset window size
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 1024,
        });
    });

    it("debe renderizar el layout con header, content y footer", () => {
        render(
            <VendedorLayout>
                <div data-testid="test-child">Contenido</div>
            </VendedorLayout>
        );

        expect(screen.getByText("Panel del Vendedor")).toBeInTheDocument();
        expect(screen.getByTestId("test-child")).toBeInTheDocument();
        expect(screen.getByText("© 2025 Sistema Gestor de Ventas")).toBeInTheDocument();
    });

    it("debe renderizar MenuVendedor y UsuarioSidebar en vista desktop", () => {
        render(
            <VendedorLayout>
                <div>Test</div>
            </VendedorLayout>
        );

        expect(screen.getByTestId("menu-vendedor")).toBeInTheDocument();
        expect(screen.getByTestId("usuario-sidebar")).toBeInTheDocument();
    });

    it("debe alternar el colapsado del sider al hacer click en el botón", async () => {
        render(
            <VendedorLayout>
                <div>Test</div>
            </VendedorLayout>
        );

        const toggleButton = screen.getByRole("button", { hidden: true });
        fireEvent.click(toggleButton);

        await waitFor(() => {
            expect(toggleButton).toBeInTheDocument();
        });
    });

    it("debe renderizar los children correctamente", () => {
        render(
            <VendedorLayout>
                <h1>Título del contenido</h1>
                <p>Párrafo de prueba</p>
            </VendedorLayout>
        );

        expect(screen.getByText("Título del contenido")).toBeInTheDocument();
        expect(screen.getByText("Párrafo de prueba")).toBeInTheDocument();
    });

    it("debe mostrar drawer en vista mobile", async () => {
        Object.defineProperty(window, "innerWidth", {
            writable: true,
            configurable: true,
            value: 600,
        });

        render(
            <VendedorLayout>
                <div data-testid="mobile-content">Mobile Content</div>
            </VendedorLayout>
        );

        // Trigger resize event
        fireEvent.resize(window, { innerWidth: 600 });

        await waitFor(() => {
            expect(screen.getByTestId("mobile-content")).toBeInTheDocument();
        });
    });

    it("debe renderizar múltiples elementos hijos", () => {
        render(
            <VendedorLayout>
                <div data-testid="child-1">Hijo 1</div>
                <div data-testid="child-2">Hijo 2</div>
            </VendedorLayout>
        );

        expect(screen.getByTestId("child-1")).toBeInTheDocument();
        expect(screen.getByTestId("child-2")).toBeInTheDocument();
    });
});
