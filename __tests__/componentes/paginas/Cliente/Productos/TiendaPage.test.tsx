import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import TiendaPage from "componentes/paginas/Cliente/Productos/TiendaPage";

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
            Text: ({ children, ...rest }: any) => createElement("span", rest, children),
        },
        Input: ({ placeholder, value, onChange, prefix }: any) => 
            createElement("input", { 
                placeholder, 
                value, 
                onChange: (e: any) => onChange?.(e),
                "data-testid": "search-input" 
            }),
        Button: ({ children, onClick, type }: any) => 
            createElement("button", { onClick, "data-type": type }, children),
        Spin: ({ size }: any) => createElement("div", { className: "ant-spin", "data-size": size }, "Loading..."),
        Empty: ({ description, children }: any) => 
            createElement("div", { "data-testid": "ant-empty" }, [description, children]),
        Space: ({ children }: any) => createElement("div", {}, children),
        message: {
            error: (...args: any[]) => mockMessageError(...args),
        },
    };
});

describe("TiendaPage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe mostrar loading mientras carga", () => {
        mockGetProductos.mockReturnValue(new Promise(() => {}));

        const { container } = render(<TiendaPage />);

        expect(container.querySelector(".ant-spin")).toBeInTheDocument();
    });

    it("debe mostrar error al fallar la carga", async () => {
        mockGetProductos.mockRejectedValue(new Error("Network error"));

        render(<TiendaPage />);

        await waitFor(() => {
            expect(screen.getByTestId("ant-empty")).toBeInTheDocument();
            expect(mockMessageError).toHaveBeenCalledWith("Error al cargar productos");
        });
    });

    it("debe renderizar productos correctamente", async () => {
        const productosMock = [
            { id_producto: 1, nombre_producto: "Tomate", categoria: { nombre_categoria: "Verduras" } },
            { id_producto: 2, nombre_producto: "Lechuga", categoria: { nombre_categoria: "Verduras" } },
        ];
        mockGetProductos.mockResolvedValue(productosMock);

        render(<TiendaPage />);

        await waitFor(() => {
            expect(screen.getAllByTestId("card-producto")).toHaveLength(2);
            expect(screen.getByText("Tomate")).toBeInTheDocument();
            expect(screen.getByText("Lechuga")).toBeInTheDocument();
        });
    });

    it("debe filtrar productos por búsqueda", async () => {
        const productosMock = [
            { id_producto: 1, nombre_producto: "Tomate", categoria: { nombre_categoria: "Verduras" } },
            { id_producto: 2, nombre_producto: "Lechuga", categoria: { nombre_categoria: "Verduras" } },
        ];
        mockGetProductos.mockResolvedValue(productosMock);

        render(<TiendaPage />);

        await waitFor(() => {
            expect(screen.getAllByTestId("card-producto")).toHaveLength(2);
        });

        const searchInput = screen.getByTestId("search-input");
        fireEvent.change(searchInput, { target: { value: "Tomate" } });

        await waitFor(() => {
            expect(screen.getAllByTestId("card-producto")).toHaveLength(1);
            expect(screen.getByText("Tomate")).toBeInTheDocument();
            expect(screen.queryByText("Lechuga")).not.toBeInTheDocument();
        });
    });

    it("debe filtrar productos por categoría", async () => {
        const productosMock = [
            { id_producto: 1, nombre_producto: "Tomate", categoria: { nombre_categoria: "Verduras" } },
            { id_producto: 2, nombre_producto: "Manzana", categoria: { nombre_categoria: "Frutas" } },
        ];
        mockGetProductos.mockResolvedValue(productosMock);

        render(<TiendaPage />);

        await waitFor(() => {
            expect(screen.getAllByTestId("card-producto")).toHaveLength(2);
        });

        const frutasButton = screen.getByText("Frutas");
        fireEvent.click(frutasButton);

        await waitFor(() => {
            expect(screen.getAllByTestId("card-producto")).toHaveLength(1);
            expect(screen.getByText("Manzana")).toBeInTheDocument();
            expect(screen.queryByText("Tomate")).not.toBeInTheDocument();
        });
    });

    it("debe mostrar mensaje cuando no hay productos filtrados", async () => {
        const productosMock = [
            { id_producto: 1, nombre_producto: "Tomate", categoria: { nombre_categoria: "Verduras" } },
        ];
        mockGetProductos.mockResolvedValue(productosMock);

        render(<TiendaPage />);

        await waitFor(() => {
            expect(screen.getAllByTestId("card-producto")).toHaveLength(1);
        });

        const searchInput = screen.getByTestId("search-input");
        fireEvent.change(searchInput, { target: { value: "NoExiste" } });

        await waitFor(() => {
            expect(screen.getByTestId("ant-empty")).toBeInTheDocument();
            expect(screen.queryByTestId("card-producto")).not.toBeInTheDocument();
        });
    });
});
