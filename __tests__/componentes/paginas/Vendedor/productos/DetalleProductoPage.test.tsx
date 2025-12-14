import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import DetalleProductoPage from "componentes/paginas/Vendedor/productos/DetalleProductoPage";

const mockUseParams = vi.fn();

vi.mock("react-router", () => ({
    __esModule: true,
    useParams: () => mockUseParams(),
}));

const mockGetProductoById = vi.fn();
const mockGetUltimasVentasByProducto = vi.fn();

vi.mock("services/productos", () => ({
    __esModule: true,
    getProductoById: (...args: any[]) => mockGetProductoById(...args),
}));

vi.mock("services/orden", () => ({
    __esModule: true,
    getUltimasVentasByProducto: (...args: any[]) => mockGetUltimasVentasByProducto(...args),
}));

vi.mock("componentes/layout/VendedorLayout", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="vendedor-layout">{children}</div>,
}));

vi.mock("componentes/organismo/Vendedor/Productos/InfoProducto", () => ({
    __esModule: true,
    default: ({ producto }: { producto: any }) => (
        <div data-testid="info-producto">
            <h2>{producto.nombre_producto}</h2>
            <p>Precio: {producto.precio}</p>
        </div>
    ),
}));

vi.mock("componentes/organismo/Vendedor/Productos/HistorialVentas", () => ({
    __esModule: true,
    default: ({ ventas }: { ventas: any[] }) => (
        <div data-testid="historial-ventas">
            <p>Ventas: {ventas.length}</p>
        </div>
    ),
}));

describe("DetalleProductoPage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe mostrar mensaje de carga mientras obtiene el producto", () => {
        mockUseParams.mockReturnValue({ id: "1" });
        mockGetProductoById.mockReturnValue(new Promise(() => {}));
        mockGetUltimasVentasByProducto.mockReturnValue(new Promise(() => {}));

        render(<DetalleProductoPage />);

        expect(screen.getByText("Cargando producto...")).toBeInTheDocument();
    });

    it("debe mostrar error si el producto no existe", async () => {
        mockUseParams.mockReturnValue({ id: "999" });
        mockGetProductoById.mockRejectedValue(new Error("Not found"));
        mockGetUltimasVentasByProducto.mockResolvedValue([]);

        render(<DetalleProductoPage />);

        await waitFor(() => {
            expect(screen.getByText("Producto no encontrado")).toBeInTheDocument();
        });
    });

    it("debe renderizar la información del producto", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const productoMock = {
            id_producto: 1,
            nombre_producto: "Tomate",
            precio: 1500,
            stock: 50,
        };
        mockGetProductoById.mockResolvedValue(productoMock);
        mockGetUltimasVentasByProducto.mockResolvedValue([]);

        render(<DetalleProductoPage />);

        await waitFor(() => {
            expect(screen.getByTestId("info-producto")).toBeInTheDocument();
            expect(screen.getByText("Tomate")).toBeInTheDocument();
            expect(screen.getByText("Precio: 1500")).toBeInTheDocument();
        });
    });

    it("debe mostrar mensaje mientras carga el historial de ventas", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const productoMock = { id_producto: 1, nombre_producto: "Tomate", precio: 1500 };
        mockGetProductoById.mockResolvedValue(productoMock);
        mockGetUltimasVentasByProducto.mockReturnValue(new Promise(() => {}));

        render(<DetalleProductoPage />);

        await waitFor(() => {
            expect(screen.getByText("Cargando historial de ventas...")).toBeInTheDocument();
        });
    });

    it("debe mostrar mensaje si no hay ventas", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const productoMock = { id_producto: 1, nombre_producto: "Tomate", precio: 1500 };
        mockGetProductoById.mockResolvedValue(productoMock);
        mockGetUltimasVentasByProducto.mockResolvedValue([]);

        render(<DetalleProductoPage />);

        await waitFor(() => {
            expect(screen.getByText("No hay ventas para este producto")).toBeInTheDocument();
        });
    });

    it("debe renderizar el historial de ventas", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const productoMock = { id_producto: 1, nombre_producto: "Tomate", precio: 1500 };
        const ventasMock = [
            { id_venta: 1, fecha: "2024-01-01", cantidad: 5 },
            { id_venta: 2, fecha: "2024-01-02", cantidad: 3 },
        ];
        mockGetProductoById.mockResolvedValue(productoMock);
        mockGetUltimasVentasByProducto.mockResolvedValue(ventasMock);

        render(<DetalleProductoPage />);

        await waitFor(() => {
            expect(screen.getByTestId("historial-ventas")).toBeInTheDocument();
            expect(screen.getByText("Ventas: 2")).toBeInTheDocument();
        });
    });

    it("debe mostrar mensaje si hay error al cargar ventas", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const productoMock = { id_producto: 1, nombre_producto: "Tomate", precio: 1500 };
        mockGetProductoById.mockResolvedValue(productoMock);
        mockGetUltimasVentasByProducto.mockRejectedValue(new Error("Network error"));

        render(<DetalleProductoPage />);

        await waitFor(() => {
            expect(screen.getByText("No hay ventas para este producto")).toBeInTheDocument();
        });
    });

    it("debe llamar a getUltimasVentasByProducto con límite de 3 ventas", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const productoMock = { id_producto: 1, nombre_producto: "Tomate", precio: 1500 };
        mockGetProductoById.mockResolvedValue(productoMock);
        mockGetUltimasVentasByProducto.mockResolvedValue([]);

        render(<DetalleProductoPage />);

        await waitFor(() => {
            expect(mockGetUltimasVentasByProducto).toHaveBeenCalledWith(1, 3);
        });
    });
});
