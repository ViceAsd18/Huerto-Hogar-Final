import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InfoProducto from "./InfoProducto";

vi.mock("componentes/atomos/Titulo", () => ({
    __esModule: true,
    default: ({ children, nivel, variante }: { children: React.ReactNode; nivel?: number; variante?: string }) => (
        <h1 data-testid="titulo" data-nivel={nivel} data-variante={variante}>
            {children}
        </h1>
    ),
}));

vi.mock("componentes/atomos/PrecioProducto", () => ({
    __esModule: true,
    default: ({ valor, tipo }: { valor: number; tipo?: string }) => (
        <span data-testid="precio" data-valor={valor} data-tipo={tipo} />
    ),
}));

vi.mock("componentes/atomos/Texto", () => ({
    __esModule: true,
    default: ({ children, variante }: { children: React.ReactNode; variante?: string }) => (
        <p data-testid="texto" data-variante={variante}>
            {children}
        </p>
    ),
}));

describe("InfoProducto", () => {
    const producto = {
        id_producto: 1,
        nombre_producto: "Tomates orgánicos",
        precio: 12.5,
        descripcion_producto: "Tomates frescos de huerto",
    } as any;

    it("renderiza titulo, precio destacado y descripcion", () => {
        render(<InfoProducto producto={producto} />);

        expect(screen.getByTestId("titulo")).toHaveTextContent("Tomates orgánicos");
        expect(screen.getByTestId("titulo")).toHaveAttribute("data-nivel", "1");
        expect(screen.getByTestId("titulo")).toHaveAttribute("data-variante", "titulo");

        const precio = screen.getByTestId("precio");
        expect(precio).toHaveAttribute("data-valor", "12.5");
        expect(precio).toHaveAttribute("data-tipo", "destacado");

        const texto = screen.getByTestId("texto");
        expect(texto).toHaveTextContent("Tomates frescos de huerto");
        expect(texto).toHaveAttribute("data-variante", "descripcion");
    });
});
