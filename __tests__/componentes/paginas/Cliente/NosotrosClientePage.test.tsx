import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import NosotrosClientePage from "componentes/paginas/Cliente/NosotrosClientePage";

vi.mock("componentes/layout/ClienteLayout", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="cliente-layout">{children}</div>,
}));

vi.mock("componentes/organismo/Cliente/Nosotros/Hero", () => ({
    __esModule: true,
    default: ({ background, titulo, subtitulo }: any) => (
        <div data-testid="hero">
            <div data-background={background}>{titulo}</div>
            <p>{subtitulo}</p>
        </div>
    ),
}));

vi.mock("componentes/organismo/Cliente/Nosotros/Proposito", () => ({
    __esModule: true,
    default: () => <div data-testid="proposito">Propósito</div>,
}));

vi.mock("componentes/organismo/Cliente/Nosotros/GaleriaImagenes", () => ({
    __esModule: true,
    default: () => <div data-testid="galeria-imagenes">Galería de imágenes</div>,
}));

vi.mock("componentes/organismo/Cliente/Nosotros/Equipo", () => ({
    __esModule: true,
    default: () => <div data-testid="equipo">Equipo</div>,
}));

describe("NosotrosClientePage Component", () => {
    it("debe renderizar el layout de cliente", () => {
        render(<NosotrosClientePage />);

        expect(screen.getByTestId("cliente-layout")).toBeInTheDocument();
    });

    it("debe renderizar el componente Hero con título y subtítulo", () => {
        render(<NosotrosClientePage />);

        expect(screen.getByTestId("hero")).toBeInTheDocument();
        expect(screen.getByText("Nuestra Historia: Del campo a tu Hogar")).toBeInTheDocument();
        expect(screen.getByText(/Conectamos a las familias chilenas/i)).toBeInTheDocument();
    });

    it("debe renderizar el componente Proposito", () => {
        render(<NosotrosClientePage />);

        expect(screen.getByTestId("proposito")).toBeInTheDocument();
    });

    it("debe renderizar el componente GaleriaImagenes", () => {
        render(<NosotrosClientePage />);

        expect(screen.getByTestId("galeria-imagenes")).toBeInTheDocument();
    });

    it("debe renderizar el componente Equipo", () => {
        render(<NosotrosClientePage />);

        expect(screen.getByTestId("equipo")).toBeInTheDocument();
    });
});
