import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ProductosPage from "componentes/paginas/Vendedor/productos/ProductosPage";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
    __esModule: true,
    useNavigate: () => mockNavigate,
}));

const mockGetProductos = vi.fn();
const mockEliminarProducto = vi.fn();
const mockGetCategorias = vi.fn();

vi.mock("services/productos", () => ({
    __esModule: true,
    getProductos: (...args: any[]) => mockGetProductos(...args),
    eliminarProducto: (...args: any[]) => mockEliminarProducto(...args),
}));

vi.mock("services/categoria", () => ({
    __esModule: true,
    getCategorias: (...args: any[]) => mockGetCategorias(...args),
}));

vi.mock("componentes/layout/VendedorLayout", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="vendedor-layout">{children}</div>,
}));

vi.mock("componentes/atomos/Titulo", () => ({
    __esModule: true,
    default: ({ children, nivel }: { children: React.ReactNode; nivel?: number }) => {
        const tag = `h${nivel || 1}`;
        return React.createElement(tag, {}, children);
    },
}));

vi.mock("componentes/organismo/Vendedor/Controls/ControlsTabla", () => ({
    __esModule: true,
    default: ({ busqueda, onBusquedaChange, onBotonClick, textoBoton }: any) => (
        <div data-testid="controls-tabla">
            <input
                data-testid="search-input"
                value={busqueda}
                onChange={(e) => onBusquedaChange(e.target.value)}
            />
            <button onClick={onBotonClick}>{textoBoton}</button>
        </div>
    ),
}));

vi.mock("componentes/organismo/Vendedor/Productos/CatalogoProductos", () => ({
    __esModule: true,
    default: ({ productos, onVerDetalle, onEditarProducto }: any) => (
        <div data-testid="catalogo-productos">
            {productos.map((p: any) => (
                <div key={p.id_producto} data-testid="producto-item">
                    <span>{p.nombre_producto}</span>
                    <button onClick={() => onVerDetalle(p)}>Ver Detalle</button>
                    <button onClick={() => onEditarProducto(p)}>Editar</button>
                </div>
            ))}
        </div>
    ),
}));

const mockMessageSuccess = vi.fn();
const mockMessageError = vi.fn();
const mockConfirm = vi.fn();

vi.mock("antd", async () => {
    const React = await import("react");
    const { createElement } = React;

    return {
        __esModule: true,
        Card: ({ children }: any) => createElement("div", { "data-testid": "ant-card" }, children),
        Space: ({ children, direction, style, size }: any) => 
            createElement("div", { "data-testid": "ant-space", style }, children),
        Spin: ({ size }: any) => createElement("div", { className: "ant-spin", "data-size": size }, "Loading..."),
        Modal: {
            confirm: (...args: any[]) => mockConfirm(...args),
        },
        message: {
            success: (...args: any[]) => mockMessageSuccess(...args),
            error: (...args: any[]) => mockMessageError(...args),
        },
    };
});

describe("ProductosPage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe mostrar loading mientras carga productos", () => {
        mockGetProductos.mockReturnValue(new Promise(() => {}));
        mockGetCategorias.mockResolvedValue([]);

        const { container } = render(<ProductosPage />);

        expect(container.querySelector(".ant-spin")).toBeInTheDocument();
    });

    it("debe cargar y mostrar productos", async () => {
        const productosMock = [
            { id_producto: 1, nombre_producto: "Tomate", precio: 1500, categoria: { nombre_categoria: "Verduras" } },
            { id_producto: 2, nombre_producto: "Lechuga", precio: 2000, categoria: { nombre_categoria: "Verduras" } },
        ];
        mockGetProductos.mockResolvedValue(productosMock);
        mockGetCategorias.mockResolvedValue([]);

        render(<ProductosPage />);

        await waitFor(() => {
            expect(screen.getByTestId("catalogo-productos")).toBeInTheDocument();
            expect(screen.getAllByTestId("producto-item")).toHaveLength(2);
        });
    });

    it("debe mostrar error al fallar la carga de productos", async () => {
        mockGetProductos.mockRejectedValue(new Error("Network error"));
        mockGetCategorias.mockResolvedValue([]);

        render(<ProductosPage />);

        await waitFor(() => {
            expect(mockMessageError).toHaveBeenCalledWith("No se pudieron cargar los productos");
        });
    });

    it("debe cargar categorías", async () => {
        const categoriasMock = [
            { id_categoria: 1, nombre_categoria: "Verduras" },
            { id_categoria: 2, nombre_categoria: "Frutas" },
        ];
        mockGetProductos.mockResolvedValue([]);
        mockGetCategorias.mockResolvedValue(categoriasMock);

        render(<ProductosPage />);

        await waitFor(() => {
            expect(mockGetCategorias).toHaveBeenCalled();
        });
    });

    it("debe filtrar productos por búsqueda", async () => {
        const productosMock = [
            { id_producto: 1, nombre_producto: "Tomate", precio: 1500, categoria: { nombre_categoria: "Verduras" } },
            { id_producto: 2, nombre_producto: "Lechuga", precio: 2000, categoria: { nombre_categoria: "Verduras" } },
        ];
        mockGetProductos.mockResolvedValue(productosMock);
        mockGetCategorias.mockResolvedValue([]);

        render(<ProductosPage />);

        await waitFor(() => {
            expect(screen.getAllByTestId("producto-item")).toHaveLength(2);
        });

        const searchInput = screen.getByTestId("search-input");
        fireEvent.change(searchInput, { target: { value: "Tomate" } });

        await waitFor(() => {
            expect(screen.getAllByTestId("producto-item")).toHaveLength(1);
            expect(screen.getByText("Tomate")).toBeInTheDocument();
        });
    });

    it("debe navegar a agregar producto", async () => {
        mockGetProductos.mockResolvedValue([]);
        mockGetCategorias.mockResolvedValue([]);

        render(<ProductosPage />);

        await waitFor(() => {
            expect(screen.getByText("Agregar Producto")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Agregar Producto"));

        expect(mockNavigate).toHaveBeenCalledWith("/agregar-producto");
    });

    it("debe navegar a detalle de producto", async () => {
        const productosMock = [
            { id_producto: 1, nombre_producto: "Tomate", precio: 1500, categoria: { nombre_categoria: "Verduras" } },
        ];
        mockGetProductos.mockResolvedValue(productosMock);
        mockGetCategorias.mockResolvedValue([]);

        render(<ProductosPage />);

        await waitFor(() => {
            expect(screen.getByText("Ver Detalle")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Ver Detalle"));

        expect(mockNavigate).toHaveBeenCalledWith("/detalle-producto/1");
    });

    it("debe navegar a editar producto", async () => {
        const productosMock = [
            { id_producto: 1, nombre_producto: "Tomate", precio: 1500, categoria: { nombre_categoria: "Verduras" } },
        ];
        mockGetProductos.mockResolvedValue(productosMock);
        mockGetCategorias.mockResolvedValue([]);

        render(<ProductosPage />);

        await waitFor(() => {
            expect(screen.getByText("Editar")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Editar"));

        expect(mockNavigate).toHaveBeenCalledWith("/editar-producto/1");
    });
});
