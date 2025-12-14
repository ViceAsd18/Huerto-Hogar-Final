import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import DetalleProductoClientePage from "componentes/paginas/Cliente/Productos/DetalleProductoClientePage";

const mockNavigate = vi.fn();
const mockUseParams = vi.fn();

vi.mock("react-router", () => ({
    __esModule: true,
    useNavigate: () => mockNavigate,
    useParams: () => mockUseParams(),
}));

const mockGetProductoById = vi.fn();

vi.mock("services/productos", () => ({
    __esModule: true,
    getProductoById: (...args: any[]) => mockGetProductoById(...args),
}));

vi.mock("componentes/layout/ClienteLayout", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="cliente-layout">{children}</div>,
}));

vi.mock("componentes/organismo/Cliente/Tienda/FichaProducto", () => ({
    __esModule: true,
    default: ({ producto }: { producto: any }) => (
        <div data-testid="ficha-producto">
            <h1>{producto.nombre}</h1>
            <p>{producto.descripcion}</p>
        </div>
    ),
}));

const mockMessageError = vi.fn();

vi.mock("antd", async () => {
    const React = await import("react");
    const { createElement } = React;

    return {
        __esModule: true,
        Spin: ({ size }: any) => createElement("div", { className: "ant-spin", "data-size": size }, "Loading..."),
        Result: ({ status, title, subTitle, extra }: any) => createElement("div", { "data-testid": "ant-result", "data-status": status }, [
            createElement("h3", { key: "title" }, title),
            createElement("p", { key: "subtitle" }, subTitle),
            extra && createElement("div", { key: "extra" }, extra),
        ]),
        Button: ({ children, onClick, icon }: any) => createElement("button", { onClick }, children),
        message: {
            error: (...args: any[]) => mockMessageError(...args),
        },
    };
});

describe("DetalleProductoClientePage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe mostrar loading mientras carga", () => {
        mockUseParams.mockReturnValue({ id: "1" });
        mockGetProductoById.mockReturnValue(new Promise(() => {}));

        const { container } = render(<DetalleProductoClientePage />);

        expect(container.querySelector(".ant-spin")).toBeInTheDocument();
    });

    it("debe mostrar error si el producto no existe", async () => {
        mockUseParams.mockReturnValue({ id: "999" });
        mockGetProductoById.mockResolvedValue(null);

        render(<DetalleProductoClientePage />);

        await waitFor(() => {
            expect(screen.getByTestId("ant-result")).toBeInTheDocument();
            expect(screen.getByText("Producto no encontrado")).toBeInTheDocument();
        });
    });

    it("debe renderizar la ficha del producto", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const productoMock = {
            id_producto: 1,
            nombre: "Tomate",
            descripcion: "Tomate fresco",
            precio: 1500,
            stock: 50,
        };
        mockGetProductoById.mockResolvedValue(productoMock);

        render(<DetalleProductoClientePage />);

        await waitFor(() => {
            expect(screen.getByTestId("ficha-producto")).toBeInTheDocument();
            expect(screen.getByText("Tomate")).toBeInTheDocument();
        });
    });

    it("debe navegar a la tienda al hacer clic en Volver", async () => {
        mockUseParams.mockReturnValue({ id: "999" });
        mockGetProductoById.mockResolvedValue(null);

        render(<DetalleProductoClientePage />);

        await waitFor(() => {
            expect(screen.getByText("Volver a la tienda")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Volver a la tienda"));

        expect(mockNavigate).toHaveBeenCalledWith("/cliente/tienda");
    });

    it("debe mostrar error al fallar la carga", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        mockGetProductoById.mockRejectedValue(new Error("Network error"));

        render(<DetalleProductoClientePage />);

        await waitFor(() => {
            expect(screen.getByTestId("ant-result")).toBeInTheDocument();
            expect(mockMessageError).toHaveBeenCalledWith("Error al cargar el producto");
        });
    });
});
