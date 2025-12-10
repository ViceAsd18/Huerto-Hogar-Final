import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CardInfoProducto from "./CardInfoProducto";

vi.mock("antd", () => ({
    Card: ({ children, style, bodyStyle }: { children: React.ReactNode; style?: React.CSSProperties; bodyStyle?: React.CSSProperties }) => (
        <div data-testid="card" style={style} data-body-style={JSON.stringify(bodyStyle)}>
            {children}
        </div>
    ),
    Typography: { Text: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
        <span data-testid="typography-text" style={style}>{children}</span>
    ) },
    Space: ({ children, ...rest }: { children: React.ReactNode }) => <div data-testid="space" {...rest}>{children}</div>,
}));

vi.mock("componentes/atomos/BadgeStock", () => ({
    __esModule: true,
    default: ({ stock }: { stock: number }) => <span data-testid="badge-stock">Stock {stock}</span>,
}));

vi.mock("componentes/atomos/BadgeCategoria", () => ({
    __esModule: true,
    default: ({ categoria }: { categoria: string }) => <span data-testid="badge-categoria">Categoria {categoria}</span>,
}));

vi.mock("componentes/atomos/Titulo", () => ({
    __esModule: true,
    default: ({ children, nivel, style }: { children: React.ReactNode; nivel?: number; style?: React.CSSProperties }) => (
        React.createElement(`h${nivel ?? 1}`, { "data-testid": "titulo", style }, children)
    ),
}));

vi.mock("componentes/atomos/PrecioProducto", () => ({
    __esModule: true,
    default: ({ valor, tipo }: { valor: number; tipo?: string }) => (
        <span data-testid="precio">Precio {valor} - {tipo}</span>
    ),
}));

vi.mock("componentes/atomos/Texto", () => ({
    __esModule: true,
    default: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
        <p data-testid="texto" style={style}>
            {children}
        </p>
    ),
}));

describe("CardInfoProducto", () => {
    const producto = {
        nombre_producto: "Tomate Cherry",
        categoria: { nombre_categoria: "Vegetales" },
        stock: 12,
        precio: 9.5,
        descripcion_producto: "Tomates dulces y jugosos",
    } as any;

    it("muestra nombre, categoria, stock, precio destacado y descripcion", () => {
        render(<CardInfoProducto producto={producto} />);

        expect(screen.getByTestId("titulo")).toHaveTextContent("Tomate Cherry");
        expect(screen.getByTestId("titulo")).toHaveStyle({ margin: "0 0 20px 0", fontSize: "24" });

        expect(screen.getByTestId("badge-categoria")).toHaveTextContent("Vegetales");
        expect(screen.getByTestId("badge-stock")).toHaveTextContent("Stock 12");

        expect(screen.getByTestId("precio")).toHaveTextContent("Precio 9.5 - destacado");
        expect(screen.getByTestId("texto")).toHaveTextContent("Tomates dulces y jugosos");
    });

    it("aplica estilos de tarjeta y body", () => {
        render(<CardInfoProducto producto={producto} />);

        const card = screen.getByTestId("card");
        expect(card).toHaveStyle({ maxWidth: "400px", borderRadius: "12px" });
        const bodyStyle = JSON.parse(card.getAttribute("data-body-style") || "{}");
        expect(bodyStyle).toEqual({ padding: "24px" });
    });
});
