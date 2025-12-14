import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import OrdenesPage from "componentes/paginas/Vendedor/ordenes/OrdenesPage";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
    __esModule: true,
    useNavigate: () => mockNavigate,
}));

const mockGetOrdenes = vi.fn();
const mockGetOrdenById = vi.fn();
const mockActualizarOrden = vi.fn();
const mockRegistrarPagoOrden = vi.fn();

vi.mock("services/orden", () => ({
    __esModule: true,
    getOrdenes: (...args: any[]) => mockGetOrdenes(...args),
    getOrdenById: (...args: any[]) => mockGetOrdenById(...args),
    actualizarOrden: (...args: any[]) => mockActualizarOrden(...args),
    registrarPagoOrden: (...args: any[]) => mockRegistrarPagoOrden(...args),
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

vi.mock("componentes/organismo/Vendedor/Ordenes/TablaOrdenes", () => ({
    __esModule: true,
    default: ({ ordenes, onVerDetalle, onPagarOrden, onNuevaOrden, onCancelarOrden }: any) => (
        <div data-testid="tabla-ordenes">
            <button onClick={onNuevaOrden}>Nueva Orden</button>
            {ordenes.map((orden: any) => (
                <div key={orden.id_venta} data-testid="orden-item">
                    <span>Orden #{orden.id_venta}</span>
                    <button onClick={() => onVerDetalle(orden)}>Ver Detalle</button>
                    <button onClick={() => onPagarOrden(orden)}>Pagar</button>
                    <button onClick={() => onCancelarOrden(orden)}>Cancelar</button>
                </div>
            ))}
        </div>
    ),
}));

vi.mock("componentes/organismo/Vendedor/Modal/ModalPago", () => ({
    __esModule: true,
    default: ({ visible, onClose, ordenId, cliente, total, onRegistrarPago }: any) =>
        visible ? (
            <div data-testid="modal-pago">
                <p>Orden ID: {ordenId}</p>
                <p>Cliente: {cliente}</p>
                <p>Total: {total}</p>
                <button onClick={onClose}>Cerrar</button>
                <button onClick={onRegistrarPago}>Registrar Pago</button>
            </div>
        ) : null,
}));

const mockMessageSuccess = vi.fn();
const mockMessageError = vi.fn();

vi.mock("antd", () => ({
    __esModule: true,
    message: {
        success: (...args: any[]) => mockMessageSuccess(...args),
        error: (...args: any[]) => mockMessageError(...args),
    },
}));

describe("OrdenesPage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe mostrar mensaje de carga mientras obtiene órdenes", () => {
        mockGetOrdenes.mockReturnValue(new Promise(() => {}));

        render(<OrdenesPage />);

        expect(screen.getByText("Cargando órdenes...")).toBeInTheDocument();
    });

    it("debe cargar y mostrar las órdenes", async () => {
        const ordenesMock = [
            { id_venta: 1, usuario: { nombre: "Cliente 1" }, total: 5000, estado: "pendiente" },
            { id_venta: 2, usuario: { nombre: "Cliente 2" }, total: 8000, estado: "completada" },
        ];
        mockGetOrdenes.mockResolvedValue(ordenesMock);

        render(<OrdenesPage />);

        await waitFor(() => {
            expect(screen.getByTestId("tabla-ordenes")).toBeInTheDocument();
            expect(screen.getAllByTestId("orden-item")).toHaveLength(2);
        });
    });

    it("debe mostrar error al fallar la carga de órdenes", async () => {
        mockGetOrdenes.mockRejectedValue(new Error("Network error"));

        render(<OrdenesPage />);

        await waitFor(() => {
            expect(mockMessageError).toHaveBeenCalledWith("No se pudieron cargar las órdenes");
        });
    });

    it("debe navegar a crear orden al hacer clic en Nueva Orden", async () => {
        mockGetOrdenes.mockResolvedValue([]);

        render(<OrdenesPage />);

        await waitFor(() => {
            expect(screen.getByText("Nueva Orden")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Nueva Orden"));

        expect(mockNavigate).toHaveBeenCalledWith("/crear-orden");
    });

    it("debe navegar a detalle de orden al hacer clic en Ver Detalle", async () => {
        const ordenesMock = [
            { id_venta: 1, usuario: { nombre: "Cliente 1" }, total: 5000, estado: "pendiente" },
        ];
        mockGetOrdenes.mockResolvedValue(ordenesMock);

        render(<OrdenesPage />);

        await waitFor(() => {
            expect(screen.getByText("Ver Detalle")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Ver Detalle"));

        expect(mockNavigate).toHaveBeenCalledWith("/orden/1");
    });

    it("debe abrir modal de pago al hacer clic en Pagar", async () => {
        const ordenesMock = [
            { id_venta: 1, usuario: { nombre: "Cliente 1" }, total: 5000, estado: "pendiente" },
        ];
        mockGetOrdenes.mockResolvedValue(ordenesMock);

        render(<OrdenesPage />);

        await waitFor(() => {
            expect(screen.getByText("Pagar")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Pagar"));

        await waitFor(() => {
            expect(screen.getByTestId("modal-pago")).toBeInTheDocument();
            expect(screen.getByText("Cliente: Cliente 1")).toBeInTheDocument();
        });
    });

    it("debe registrar pago correctamente", async () => {
        const ordenesMock = [
            { id_venta: 1, usuario: { nombre: "Cliente 1" }, total: 5000, estado: "pendiente" },
        ];
        const ordenActualizadaMock = { ...ordenesMock[0], estado: "completada" };

        mockGetOrdenes.mockResolvedValue(ordenesMock);
        mockRegistrarPagoOrden.mockResolvedValue({});
        mockGetOrdenById.mockResolvedValue(ordenActualizadaMock);

        render(<OrdenesPage />);

        await waitFor(() => {
            expect(screen.getByText("Pagar")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Pagar"));

        await waitFor(() => {
            expect(screen.getByTestId("modal-pago")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Registrar Pago"));

        await waitFor(() => {
            expect(mockRegistrarPagoOrden).toHaveBeenCalled();
            expect(mockMessageSuccess).toHaveBeenCalledWith("Pago registrado con éxito");
            expect(screen.queryByTestId("modal-pago")).not.toBeInTheDocument();
        });
    });

    it("debe mostrar error al fallar el registro de pago", async () => {
        const ordenesMock = [
            { id_venta: 1, usuario: { nombre: "Cliente 1" }, total: 5000, estado: "pendiente" },
        ];

        mockGetOrdenes.mockResolvedValue(ordenesMock);
        mockRegistrarPagoOrden.mockRejectedValue(new Error("Payment error"));

        render(<OrdenesPage />);

        await waitFor(() => {
            expect(screen.getByText("Pagar")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Pagar"));

        await waitFor(() => {
            expect(screen.getByTestId("modal-pago")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Registrar Pago"));

        await waitFor(() => {
            expect(mockMessageError).toHaveBeenCalledWith("No se pudo registrar el pago");
        });
    });

    it("debe cancelar orden correctamente", async () => {
        const ordenesMock = [
            { id_venta: 1, usuario: { nombre: "Cliente 1" }, total: 5000, estado: "pendiente" },
        ];

        mockGetOrdenes.mockResolvedValue(ordenesMock);
        mockActualizarOrden.mockResolvedValue({});

        render(<OrdenesPage />);

        await waitFor(() => {
            expect(screen.getByText("Cancelar")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Cancelar"));

        await waitFor(() => {
            expect(mockActualizarOrden).toHaveBeenCalledWith(1, { estado: "cancelada" });
            expect(mockMessageSuccess).toHaveBeenCalledWith("Orden #1 cancelada");
        });
    });

    it("debe mostrar error al fallar la cancelación", async () => {
        const ordenesMock = [
            { id_venta: 1, usuario: { nombre: "Cliente 1" }, total: 5000, estado: "pendiente" },
        ];

        mockGetOrdenes.mockResolvedValue(ordenesMock);
        mockActualizarOrden.mockRejectedValue(new Error("Cancel error"));

        render(<OrdenesPage />);

        await waitFor(() => {
            expect(screen.getByText("Cancelar")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Cancelar"));

        await waitFor(() => {
            expect(mockMessageError).toHaveBeenCalledWith("No se pudo cancelar la orden");
        });
    });

    it("debe cerrar el modal de pago al hacer clic en Cerrar", async () => {
        const ordenesMock = [
            { id_venta: 1, usuario: { nombre: "Cliente 1" }, total: 5000, estado: "pendiente" },
        ];
        mockGetOrdenes.mockResolvedValue(ordenesMock);

        render(<OrdenesPage />);

        await waitFor(() => {
            expect(screen.getByText("Pagar")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Pagar"));

        await waitFor(() => {
            expect(screen.getByTestId("modal-pago")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Cerrar"));

        await waitFor(() => {
            expect(screen.queryByTestId("modal-pago")).not.toBeInTheDocument();
        });
    });
});
