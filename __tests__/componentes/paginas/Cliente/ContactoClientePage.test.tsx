import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import ContactoClientePage from "componentes/paginas/Cliente/ContactoClientePage";

vi.mock("componentes/layout/ClienteLayout", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="cliente-layout">{children}</div>,
}));

vi.mock("componentes/organismo/Cliente/Contacto/FormContacto", () => ({
    __esModule: true,
    default: () => <div data-testid="formulario-contacto">Formulario de contacto</div>,
}));

vi.mock("componentes/organismo/Cliente/Contacto/PanelInformacion", () => ({
    __esModule: true,
    default: () => <div data-testid="panel-informacion">Panel de información</div>,
}));

describe("ContactoClientePage Component", () => {
    it("debe renderizar el layout de cliente", () => {
        render(<ContactoClientePage />);

        expect(screen.getByTestId("cliente-layout")).toBeInTheDocument();
    });

    it("debe renderizar el formulario de contacto", () => {
        render(<ContactoClientePage />);

        expect(screen.getByTestId("formulario-contacto")).toBeInTheDocument();
    });

    it("debe renderizar el panel de información", () => {
        render(<ContactoClientePage />);

        expect(screen.getByTestId("panel-informacion")).toBeInTheDocument();
    });
});
