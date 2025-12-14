import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import ClienteLayout from "componentes/layout/ClienteLayout";

vi.mock("componentes/organismo/Cliente/BarraNavegacion", () => ({
    __esModule: true,
    default: () => <div data-testid="barra-navegacion">Barra Navegación</div>,
}));

describe("ClienteLayout Component", () => {
    it("debe renderizar el layout con todos sus elementos", () => {
        render(
            <ClienteLayout>
                <div data-testid="test-child">Contenido</div>
            </ClienteLayout>
        );

        expect(screen.getByTestId("barra-navegacion")).toBeInTheDocument();
        expect(screen.getByTestId("test-child")).toBeInTheDocument();
    });

    it("debe renderizar BarraNavegacion en el header", () => {
        render(
            <ClienteLayout>
                <div>Test</div>
            </ClienteLayout>
        );

        const barraNavegacion = screen.getByTestId("barra-navegacion");
        expect(barraNavegacion).toBeInTheDocument();
        expect(barraNavegacion.textContent).toBe("Barra Navegación");
    });

    it("debe renderizar los children correctamente", () => {
        render(
            <ClienteLayout>
                <p>Este es el contenido del cliente</p>
                <button>Acción</button>
            </ClienteLayout>
        );

        expect(screen.getByText("Este es el contenido del cliente")).toBeInTheDocument();
        expect(screen.getByText("Acción")).toBeInTheDocument();
    });

    it("debe renderizar el footer con el copyright", () => {
        render(
            <ClienteLayout>
                <div>Content</div>
            </ClienteLayout>
        );

        expect(screen.getByText("© 2025 HuertoHogar. Todos los derechos reservados.")).toBeInTheDocument();
    });

    it("debe renderizar múltiples elementos hijos", () => {
        render(
            <ClienteLayout>
                <div data-testid="child-1">Hijo 1</div>
                <div data-testid="child-2">Hijo 2</div>
                <div data-testid="child-3">Hijo 3</div>
            </ClienteLayout>
        );

        expect(screen.getByTestId("child-1")).toBeInTheDocument();
        expect(screen.getByTestId("child-2")).toBeInTheDocument();
        expect(screen.getByTestId("child-3")).toBeInTheDocument();
    });
});
