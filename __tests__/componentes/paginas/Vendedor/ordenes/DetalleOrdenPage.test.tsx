import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import DetalleOrdenPage from "componentes/paginas/Vendedor/ordenes/DetalleOrdenPage";

const mockUseParams = vi.fn();

vi.mock("react-router", () => ({
    __esModule: true,
    useParams: () => mockUseParams(),
}));

const mockGetOrdenById = vi.fn();

vi.mock("services/orden", () => ({
    __esModule: true,
    getOrdenById: (...args: any[]) => mockGetOrdenById(...args),
}));

vi.mock("componentes/layout/VendedorLayout", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="vendedor-layout">{children}</div>,
}));

vi.mock("componentes/atomos/Titulo", () => ({
    __esModule: true,
    default: ({ children, nivel, style }: { children: React.ReactNode; nivel?: number; style?: any }) => {
        const tag = `h${nivel || 1}`;
        return React.createElement(tag, { style }, children);
    },
}));

vi.mock("componentes/atomos/BadgeEstado", () => ({
    __esModule: true,
    default: ({ estado }: { estado: string }) => <span data-testid="badge-estado">{estado}</span>,
}));

vi.mock("componentes/atomos/Fecha", () => ({
    __esModule: true,
    default: ({ fecha, variante }: { fecha: string; variante?: string }) => (
        <span data-testid="fecha" data-variante={variante}>{fecha}</span>
    ),
}));

vi.mock("componentes/moleculas/Vendedor/Orden/ResumenTotales", () => ({
    __esModule: true,
    default: ({ subtotal, impuesto, total }: { subtotal: number; impuesto: number; total: number }) => (
        <div data-testid="resumen-totales">
            <p>Subtotal: {subtotal}</p>
            <p>Impuesto: {impuesto}</p>
            <p>Total: {total}</p>
        </div>
    ),
}));

vi.mock("componentes/organismo/Vendedor/Productos/TablaProductoDetalle", () => ({
    __esModule: true,
    default: ({ detalles }: { detalles: any[] }) => (
        <div data-testid="tabla-productos">
            {detalles.map((d, i) => (
                <div key={i}>Producto {d.producto.nombre_producto}</div>
            ))}
        </div>
    ),
}));

vi.mock("antd", async () => {
    const React = await import("react");
    const { createElement } = React;

    return {
        __esModule: true,
        Row: ({ children, justify, align, gutter }: any) => 
            createElement("div", { "data-testid": "ant-row" }, children),
        Col: ({ children, xs, lg }: any) => 
            createElement("div", { "data-testid": "ant-col" }, children),
        Card: ({ children, title, style }: any) => 
            createElement("div", { "data-testid": "ant-card" }, [
                title && createElement("h3", { key: "title" }, title),
                children,
            ]),
        Space: ({ children, direction, size, style }: any) => 
            createElement("div", { "data-testid": "ant-space", style }, children),
        Spin: ({ size, style }: any) => 
            createElement("div", { className: "ant-spin", "data-size": size, style }, "Loading..."),
        Alert: ({ type, message, showIcon }: any) => 
            createElement("div", { "data-testid": "ant-alert", "data-type": type }, message),
    };
});

describe("DetalleOrdenPage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe mostrar loading mientras carga la orden", () => {
        mockUseParams.mockReturnValue({ id: "1" });
        mockGetOrdenById.mockReturnValue(new Promise(() => {}));

        const { container } = render(<DetalleOrdenPage />);

        expect(container.querySelector(".ant-spin")).toBeInTheDocument();
    });

    it("debe mostrar error si falla la carga", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        mockGetOrdenById.mockRejectedValue(new Error("Network error"));

        render(<DetalleOrdenPage />);

        await waitFor(() => {
            const alert = screen.getByTestId("ant-alert");
            expect(alert).toBeInTheDocument();
            expect(alert).toHaveTextContent("No se pudo cargar la orden");
        });
    });

    it("debe mostrar mensaje si la orden no existe", async () => {
        mockUseParams.mockReturnValue({ id: "999" });
        mockGetOrdenById.mockResolvedValue(null);

        render(<DetalleOrdenPage />);

        await waitFor(() => {
            const alert = screen.getByTestId("ant-alert");
            expect(alert).toBeInTheDocument();
            expect(alert).toHaveTextContent("Orden no encontrada");
        });
    });

    it("debe renderizar los detalles de la orden", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const ordenMock = {
            id_venta: 123,
            estado: "completada",
            fecha_venta: "2024-01-15",
            usuario: { nombre: "Juan Pérez" },
            detalles: [
                { subtotal: 2000, producto: { nombre_producto: "Tomate" } },
                { subtotal: 3000, producto: { nombre_producto: "Lechuga" } },
            ],
        };
        mockGetOrdenById.mockResolvedValue(ordenMock);

        render(<DetalleOrdenPage />);

        await waitFor(() => {
            expect(screen.getByText("Orden #123")).toBeInTheDocument();
            expect(screen.getByText("Cliente: Juan Pérez")).toBeInTheDocument();
            expect(screen.getByTestId("badge-estado")).toHaveTextContent("completada");
        });
    });

    it("debe renderizar la tabla de productos", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const ordenMock = {
            id_venta: 123,
            estado: "completada",
            fecha_venta: "2024-01-15",
            usuario: { nombre: "Juan Pérez" },
            detalles: [
                { subtotal: 2000, producto: { nombre_producto: "Tomate" } },
                { subtotal: 3000, producto: { nombre_producto: "Lechuga" } },
            ],
        };
        mockGetOrdenById.mockResolvedValue(ordenMock);

        render(<DetalleOrdenPage />);

        await waitFor(() => {
            expect(screen.getByTestId("tabla-productos")).toBeInTheDocument();
            expect(screen.getByText("Producto Tomate")).toBeInTheDocument();
            expect(screen.getByText("Producto Lechuga")).toBeInTheDocument();
        });
    });

    it("debe calcular y mostrar el resumen de totales", async () => {
        mockUseParams.mockReturnValue({ id: "1" });
        const ordenMock = {
            id_venta: 123,
            estado: "completada",
            fecha_venta: "2024-01-15",
            usuario: { nombre: "Juan Pérez" },
            detalles: [
                { subtotal: 2000, producto: { nombre_producto: "Tomate" } },
                { subtotal: 3000, producto: { nombre_producto: "Lechuga" } },
            ],
        };
        mockGetOrdenById.mockResolvedValue(ordenMock);

        render(<DetalleOrdenPage />);

        await waitFor(() => {
            expect(screen.getByTestId("resumen-totales")).toBeInTheDocument();
            expect(screen.getByText("Subtotal: 5000")).toBeInTheDocument();
            expect(screen.getByText("Impuesto: 950")).toBeInTheDocument();
            expect(screen.getByText("Total: 5950")).toBeInTheDocument();
        });
    });
});
