import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import CrearOrdenPage from "componentes/paginas/Vendedor/ordenes/CrearOrdenPage";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
    __esModule: true,
    useNavigate: () => mockNavigate,
}));

const mockGetClientes = vi.fn();
const mockGetProductos = vi.fn();
const mockGetProductoById = vi.fn();
const mockCrearOrden = vi.fn();
const mockRegistrarPagoOrden = vi.fn();

vi.mock("services/usuario", () => ({
    __esModule: true,
    getClientes: (...args: any[]) => mockGetClientes(...args),
}));

vi.mock("services/productos", () => ({
    __esModule: true,
    getProductos: (...args: any[]) => mockGetProductos(...args),
    getProductoById: (...args: any[]) => mockGetProductoById(...args),
}));

vi.mock("services/orden", () => ({
    __esModule: true,
    crearOrden: (...args: any[]) => mockCrearOrden(...args),
    registrarPagoOrden: (...args: any[]) => mockRegistrarPagoOrden(...args),
}));

vi.mock("componentes/layout/VendedorLayout", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="vendedor-layout">{children}</div>,
}));

vi.mock("componentes/atomos/Titulo", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>,
}));

vi.mock("componentes/organismo/Vendedor/Ordenes/CrearOrden", () => ({
    __esModule: true,
    default: ({ productosDisponibles, clientes, onGenerarOrden, onPagarOrden }: any) => (
        <div data-testid="crear-orden">
            <p>Productos: {productosDisponibles.length}</p>
            <p>Clientes: {clientes.length}</p>
            <button onClick={() => onGenerarOrden(1, [{ id_producto: 1, cantidad: 2, precio: 1000 }])}>
                Generar Orden
            </button>
            <button onClick={() => onPagarOrden(1, [{ id_producto: 1, cantidad: 2, precio: 1000 }])}>
                Pagar Orden
            </button>
        </div>
    ),
}));

vi.mock("componentes/organismo/Vendedor/Modal/ModalPago", () => ({
    __esModule: true,
    default: ({ visible, onClose, total, cliente, ordenId, onRegistrarPago }: any) => 
        visible ? (
            <div data-testid="modal-pago">
                <p>Total: {total}</p>
                <p>Cliente: {cliente}</p>
                <p>Orden ID: {ordenId}</p>
                <button onClick={onClose}>Cerrar</button>
                <button onClick={onRegistrarPago}>Registrar Pago</button>
            </div>
        ) : null,
}));

const mockMessageSuccess = vi.fn();
const mockMessageError = vi.fn();

vi.mock("antd", async () => {
    const React = await import("react");
    const { createElement } = React;

    return {
        __esModule: true,
        Spin: ({ size }: any) => createElement("div", { className: "ant-spin", "data-size": size }, "Loading..."),
        Alert: ({ type, message, description, action }: any) => 
            createElement("div", { "data-testid": "ant-alert", "data-type": type }, [
                createElement("p", { key: "message" }, message),
                createElement("p", { key: "description" }, description),
                action && createElement("div", { key: "action" }, action),
            ]),
        Button: ({ children, onClick }: any) => 
            createElement("button", { onClick }, children),
        message: {
            success: (...args: any[]) => mockMessageSuccess(...args),
            error: (...args: any[]) => mockMessageError(...args),
        },
    };
});

describe("CrearOrdenPage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe mostrar loading mientras carga datos", () => {
        mockGetClientes.mockReturnValue(new Promise(() => {}));
        mockGetProductos.mockReturnValue(new Promise(() => {}));

        const { container } = render(<CrearOrdenPage />);

        expect(container.querySelector(".ant-spin")).toBeInTheDocument();
    });

    it("debe cargar y mostrar clientes y productos", async () => {
        const clientesMock = [
            { id_usuario: 1, nombre: "Cliente 1" },
            { id_usuario: 2, nombre: "Cliente 2" },
        ];
        const productosMock = [
            { id_producto: 1, nombre_producto: "Tomate", precio: 1000 },
            { id_producto: 2, nombre_producto: "Lechuga", precio: 1500 },
        ];

        mockGetClientes.mockResolvedValue(clientesMock);
        mockGetProductos.mockResolvedValue(productosMock);

        render(<CrearOrdenPage />);

        await waitFor(() => {
            expect(screen.getByTestId("crear-orden")).toBeInTheDocument();
            expect(screen.getByText("Productos: 2")).toBeInTheDocument();
            expect(screen.getByText("Clientes: 2")).toBeInTheDocument();
        });
    });

    it("debe mostrar error al fallar la carga", async () => {
        mockGetClientes.mockRejectedValue(new Error("Network error"));
        mockGetProductos.mockRejectedValue(new Error("Network error"));

        render(<CrearOrdenPage />);

        await waitFor(() => {
            expect(screen.getByTestId("ant-alert")).toBeInTheDocument();
            expect(screen.getByText("Error al cargar datos")).toBeInTheDocument();
        });
    });

    it("debe crear orden correctamente", async () => {
        const clientesMock = [{ id_usuario: 1, nombre: "Cliente 1" }];
        const productosMock = [{ id_producto: 1, nombre_producto: "Tomate", precio: 1000 }];

        mockGetClientes.mockResolvedValue(clientesMock);
        mockGetProductos.mockResolvedValue(productosMock);
        mockCrearOrden.mockResolvedValue({ id_venta: 123 });

        render(<CrearOrdenPage />);

        await waitFor(() => {
            expect(screen.getByText("Generar Orden")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Generar Orden"));

        await waitFor(() => {
            expect(mockCrearOrden).toHaveBeenCalled();
            expect(mockMessageSuccess).toHaveBeenCalledWith("Orden creada exitosamente");
            expect(mockNavigate).toHaveBeenCalledWith("/ordenes");
        });
    });

    it("debe abrir modal de pago al hacer clic en Pagar Orden", async () => {
        const clientesMock = [{ id_usuario: 1, nombre: "Cliente 1" }];
        const productosMock = [{ id_producto: 1, nombre_producto: "Tomate", precio: 1000 }];
        const productoDetalladoMock = { id_producto: 1, nombre_producto: "Tomate", precio: 1000 };

        mockGetClientes.mockResolvedValue(clientesMock);
        mockGetProductos.mockResolvedValue(productosMock);
        mockGetProductoById.mockResolvedValue(productoDetalladoMock);
        mockCrearOrden.mockResolvedValue({ id_venta: 123 });

        render(<CrearOrdenPage />);

        await waitFor(() => {
            expect(screen.getByText("Pagar Orden")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Pagar Orden"));

        await waitFor(() => {
            expect(screen.getByTestId("modal-pago")).toBeInTheDocument();
            expect(screen.getByText("Cliente: Cliente 1")).toBeInTheDocument();
        });
    });

    it("debe registrar pago desde el modal", async () => {
        const clientesMock = [{ id_usuario: 1, nombre: "Cliente 1" }];
        const productosMock = [{ id_producto: 1, nombre_producto: "Tomate", precio: 1000 }];
        const productoDetalladoMock = { id_producto: 1, nombre_producto: "Tomate", precio: 1000 };

        mockGetClientes.mockResolvedValue(clientesMock);
        mockGetProductos.mockResolvedValue(productosMock);
        mockGetProductoById.mockResolvedValue(productoDetalladoMock);
        mockCrearOrden.mockResolvedValue({ id_venta: 123 });
        mockRegistrarPagoOrden.mockResolvedValue({});

        render(<CrearOrdenPage />);

        await waitFor(() => {
            expect(screen.getByText("Pagar Orden")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Pagar Orden"));

        await waitFor(() => {
            expect(screen.getByTestId("modal-pago")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Registrar Pago"));

        await waitFor(() => {
            expect(mockRegistrarPagoOrden).toHaveBeenCalled();
            expect(mockMessageSuccess).toHaveBeenCalledWith("Pago registrado y stock actualizado");
            expect(screen.queryByTestId("modal-pago")).not.toBeInTheDocument();
        });
    });

    it("debe reintentar cargar datos al hacer clic en Reintentar", async () => {
        mockGetClientes.mockRejectedValueOnce(new Error("Network error"));
        mockGetProductos.mockRejectedValueOnce(new Error("Network error"));

        const { rerender } = render(<CrearOrdenPage />);

        await waitFor(() => {
            expect(screen.getByText("Reintentar")).toBeInTheDocument();
        });

        mockGetClientes.mockResolvedValue([]);
        mockGetProductos.mockResolvedValue([]);

        fireEvent.click(screen.getByText("Reintentar"));

        await waitFor(() => {
            expect(mockGetClientes).toHaveBeenCalledTimes(2);
            expect(mockGetProductos).toHaveBeenCalledTimes(2);
        });
    });
});
