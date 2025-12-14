import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import HomeClientePage from "componentes/paginas/Cliente/HomeClientePage";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
    __esModule: true,
    useNavigate: () => mockNavigate,
}));

const mockGetProductos = vi.fn();

vi.mock("services/productos", () => ({
    __esModule: true,
    getProductos: (...args: any[]) => mockGetProductos(...args),
}));

vi.mock("componentes/layout/ClienteLayout", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="cliente-layout">{children}</div>,
}));

vi.mock("componentes/atomos/Titulo", () => ({
    __esModule: true,
    default: ({ children, nivel }: { children: React.ReactNode; nivel?: number }) => {
        const tag = `h${nivel || 1}`;
        return React.createElement(tag, {}, children);
    },
}));

vi.mock("componentes/moleculas/Cliente/Tienda/CardProductoCliente", () => ({
    __esModule: true,
    default: ({ producto }: { producto: any }) => (
        <div data-testid="card-producto" data-producto-id={producto.id_producto}>
            <h3>{producto.nombre_producto}</h3>
        </div>
    ),
}));

const mockMessageError = vi.fn();

vi.mock("antd", async () => {
    const React = await import("react");
    const { createElement } = React;

    return {
        __esModule: true,
        Typography: {
            Title: ({ children, level, style }: any) => {
                const tag = `h${level || 1}`;
                return createElement(tag, { style }, children);
            },
            Paragraph: ({ children, style }: any) => createElement("p", { style }, children),
        },
        Button: ({ children, onClick, type, size, shape }: any) => 
            createElement("button", { onClick, "data-type": type }, children),
        Spin: ({ size }: any) => createElement("div", { className: "ant-spin", "data-size": size }, "Loading..."),
        message: {
            error: (...args: any[]) => mockMessageError(...args),
        },
    };
});

describe("HomeClientePage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar el layout de cliente", () => {
        mockGetProductos.mockReturnValue(new Promise(() => {}));

        render(<HomeClientePage />);

        expect(screen.getByTestId("cliente-layout")).toBeInTheDocument();
    });

    it("debe mostrar loading mientras carga productos", () => {
        mockGetProductos.mockReturnValue(new Promise(() => {}));

        const { container } = render(<HomeClientePage />);

        expect(container.querySelector(".ant-spin")).toBeInTheDocument();
    });

    it("debe renderizar el hero section", () => {
        mockGetProductos.mockResolvedValue([]);

        render(<HomeClientePage />);

        expect(screen.getByText(/Bienvenido a/i)).toBeInTheDocument();
        expect(screen.getByText(/nuestra tienda/i)).toBeInTheDocument();
        expect(screen.getByText(/Explora nuestros productos/i)).toBeInTheDocument();
    });

    it("debe navegar a la tienda al hacer clic en el botón", async () => {
        mockGetProductos.mockResolvedValue([]);

        render(<HomeClientePage />);

        const irTiendaButton = screen.getByText("Ir a la tienda");
        fireEvent.click(irTiendaButton);

        expect(mockNavigate).toHaveBeenCalledWith("/cliente/tienda");
    });

    it("debe renderizar productos destacados", async () => {
        const productosMock = [
            { id_producto: 1, nombre_producto: "Tomate" },
            { id_producto: 2, nombre_producto: "Lechuga" },
            { id_producto: 3, nombre_producto: "Zanahoria" },
            { id_producto: 4, nombre_producto: "Cebolla" },
        ];
        mockGetProductos.mockResolvedValue(productosMock);

        render(<HomeClientePage />);

        await waitFor(() => {
            expect(screen.getAllByTestId("card-producto")).toHaveLength(4);
            expect(screen.getByText("Tomate")).toBeInTheDocument();
            expect(screen.getByText("Lechuga")).toBeInTheDocument();
        });
    });

    it("debe mostrar máximo 4 productos destacados", async () => {
        const productosMock = [
            { id_producto: 1, nombre_producto: "Tomate" },
            { id_producto: 2, nombre_producto: "Lechuga" },
            { id_producto: 3, nombre_producto: "Zanahoria" },
            { id_producto: 4, nombre_producto: "Cebolla" },
            { id_producto: 5, nombre_producto: "Papa" },
            { id_producto: 6, nombre_producto: "Pepino" },
        ];
        mockGetProductos.mockResolvedValue(productosMock);

        render(<HomeClientePage />);

        await waitFor(() => {
            expect(screen.getAllByTestId("card-producto")).toHaveLength(4);
        });
    });

    it("debe mostrar error al fallar la carga de productos", async () => {
        mockGetProductos.mockRejectedValue(new Error("Network error"));

        render(<HomeClientePage />);

        await waitFor(() => {
            expect(mockMessageError).toHaveBeenCalledWith("Error cargando destacados");
        });
    });
});
