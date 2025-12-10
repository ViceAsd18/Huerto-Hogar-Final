import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CardProducto from "./CardProductos";

vi.mock("antd", () => ({
    Card: ({ children, onClick, style, bodyStyle, hoverable }: { children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties; bodyStyle?: React.CSSProperties; hoverable?: boolean }) => (
        <div data-testid="card" data-hoverable={hoverable} style={style} data-body-style={JSON.stringify(bodyStyle)} onClick={onClick}>
            {children}
        </div>
    ),
    Row: ({ children }: { children: React.ReactNode }) => <div data-testid="row">{children}</div>,
    Col: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
        <div data-testid="col" style={style}>
            {children}
        </div>
    ),
}));

vi.mock("componentes/atomos/Imagen", () => ({
    __esModule: true,
    default: ({ src, alt, height, style }: { src?: string; alt?: string; height?: string | number; style?: React.CSSProperties }) => (
        <img data-testid="imagen" src={src} alt={alt} height={height as any} style={style} />
    ),
}));

vi.mock("componentes/atomos/BadgeStock", () => ({
    __esModule: true,
    default: ({ stock }: { stock: number }) => <span data-testid="badge-stock">Stock {stock}</span>,
}));

vi.mock("componentes/atomos/BadgeCategoria", () => ({
    __esModule: true,
    default: ({ categoria }: { categoria: string }) => <span data-testid="badge-categoria">Categoria {categoria}</span>,
}));

vi.mock("componentes/atomos/PrecioProducto", () => ({
    __esModule: true,
    default: ({ valor }: { valor: number }) => <span data-testid="precio">$ {valor.toFixed(2)}</span>,
}));

vi.mock("componentes/atomos/Boton", () => ({
    __esModule: true,
    default: ({ children, onClick, style, color }: { children: React.ReactNode; onClick?: (e: any) => void; style?: React.CSSProperties; color?: string }) => (
        <button data-testid="boton" onClick={onClick} style={{ ...style, background: color }}>
            {children}
        </button>
    ),
}));

describe("CardProducto", () => {
    const producto = {
        id_producto: 7,
        nombre_producto: "Lechuga Fresca",
        precio: 15,
        stock: 20,
        categoria: { nombre_categoria: "Vegetales" },
    } as any;

    it("renderiza datos, imagen normalizada y badges", () => {
        render(
            <CardProducto
                producto={producto}
                onVerDetalle={() => {}}
                onEditarProducto={() => {}}
            />
        );

        expect(screen.getByText("Lechuga Fresca")).toBeInTheDocument();
        expect(screen.getByTestId("badge-stock")).toHaveTextContent("Stock 20");
        expect(screen.getByTestId("badge-categoria")).toHaveTextContent("Vegetales");
        expect(screen.getByTestId("precio")).toHaveTextContent("15.00");

        const img = screen.getByTestId("imagen");
        expect(img).toHaveAttribute("src", "/assets/img/productos/lechuga_fresca.jpg");
        expect(img).toHaveAttribute("alt", "Lechuga Fresca");
        expect(img).toHaveAttribute("height", "100%");
    });

    it("dispara onVerDetalle al hacer click en la tarjeta", () => {
        const onVerDetalle = vi.fn();
        const onEditarProducto = vi.fn();
        render(
            <CardProducto
                producto={producto}
                onVerDetalle={onVerDetalle}
                onEditarProducto={onEditarProducto}
            />
        );

        fireEvent.click(screen.getByTestId("card"));
        expect(onVerDetalle).toHaveBeenCalledWith(producto);
        expect(onEditarProducto).not.toHaveBeenCalled();
    });

    it("el boton de editar llama onEditarProducto y no dispara onVerDetalle", () => {
        const onVerDetalle = vi.fn();
        const onEditarProducto = vi.fn();
        render(
            <CardProducto
                producto={producto}
                onVerDetalle={onVerDetalle}
                onEditarProducto={onEditarProducto}
            />
        );

        const stopPropagation = vi.fn();
        fireEvent.click(screen.getByTestId("boton"));
        expect(onVerDetalle).not.toHaveBeenCalled();
    });
});
