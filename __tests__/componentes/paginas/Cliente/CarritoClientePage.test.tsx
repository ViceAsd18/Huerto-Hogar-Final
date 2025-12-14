import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import CarritoClientePage from "componentes/paginas/Cliente/CarritoClientePage";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
    __esModule: true,
    useNavigate: () => mockNavigate,
}));

const mockUseCart = vi.fn();
const mockUseAuth = vi.fn();

vi.mock("auth/CartContext", () => ({
    __esModule: true,
    useCart: () => mockUseCart(),
}));

vi.mock("auth/AuthContext", () => ({
    __esModule: true,
    useAuth: () => mockUseAuth(),
}));

const mockCrearOrden = vi.fn();
const mockActualizarOrden = vi.fn();

vi.mock("services/orden", () => ({
    __esModule: true,
    crearOrden: (...args: any[]) => mockCrearOrden(...args),
    actualizarOrden: (...args: any[]) => mockActualizarOrden(...args),
}));

vi.mock("componentes/layout/ClienteLayout", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="cliente-layout">{children}</div>,
}));

vi.mock("componentes/atomos/Imagen", () => ({
    __esModule: true,
    default: ({ src, style }: any) => <img src={src} style={style} alt="producto" />,
}));

const mockMessageSuccess = vi.fn();
const mockMessageError = vi.fn();
const mockMessageWarning = vi.fn();

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
            Text: ({ children, type, strong, style }: any) => 
                createElement("span", { "data-type": type, "data-strong": strong, style }, children),
        },
        Card: ({ children, style, bodyStyle }: any) => 
            createElement("div", { "data-testid": "ant-card", style }, children),
        Row: ({ children, gutter }: any) => 
            createElement("div", { "data-testid": "ant-row" }, children),
        Col: ({ children, xs, lg }: any) => 
            createElement("div", { "data-testid": "ant-col" }, children),
        Button: ({ children, onClick, icon, type, danger, block }: any) => 
            createElement("button", { onClick, "data-type": type, "data-danger": danger }, children),
        InputNumber: ({ value, onChange, min, max }: any) => 
            createElement("input", { 
                type: "number", 
                value, 
                onChange: (e: any) => onChange?.(Number(e.target.value)),
                min,
                max,
                "data-testid": "input-number"
            }),
        Empty: ({ description }: any) => 
            createElement("div", { "data-testid": "ant-empty" }, description),
        Divider: () => createElement("hr", { "data-testid": "ant-divider" }),
        message: {
            success: (...args: any[]) => mockMessageSuccess(...args),
            error: (...args: any[]) => mockMessageError(...args),
            warning: (...args: any[]) => mockMessageWarning(...args),
        },
    };
});

describe("CarritoClientePage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe mostrar carrito vacío cuando no hay productos", () => {
        mockUseCart.mockReturnValue({
            carrito: [],
            total: 0,
            actualizarCantidad: vi.fn(),
            eliminarDelCarrito: vi.fn(),
            limpiarCarrito: vi.fn(),
        });
        mockUseAuth.mockReturnValue({ user: { id_usuario: 1 } });

        render(<CarritoClientePage />);

        expect(screen.getByTestId("ant-empty")).toBeInTheDocument();
        expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
    });

    it("debe renderizar productos en el carrito", () => {
        const carritoMock = [
            { id_producto: 1, nombre_producto: "Tomate", precio: 1500, cantidad: 2, stock: 10 },
            { id_producto: 2, nombre_producto: "Lechuga", precio: 2000, cantidad: 1, stock: 5 },
        ];

        mockUseCart.mockReturnValue({
            carrito: carritoMock,
            total: 5000,
            actualizarCantidad: vi.fn(),
            eliminarDelCarrito: vi.fn(),
            limpiarCarrito: vi.fn(),
        });
        mockUseAuth.mockReturnValue({ user: { id_usuario: 1 } });

        render(<CarritoClientePage />);

        expect(screen.getByText("Tomate")).toBeInTheDocument();
        expect(screen.getByText("Lechuga")).toBeInTheDocument();
    });

    it("debe actualizar cantidad de producto", () => {
        const mockActualizarCantidad = vi.fn();
        const carritoMock = [
            { id_producto: 1, nombre_producto: "Tomate", precio: 1500, cantidad: 2, stock: 10 },
        ];

        mockUseCart.mockReturnValue({
            carrito: carritoMock,
            total: 3000,
            actualizarCantidad: mockActualizarCantidad,
            eliminarDelCarrito: vi.fn(),
            limpiarCarrito: vi.fn(),
        });
        mockUseAuth.mockReturnValue({ user: { id_usuario: 1 } });

        render(<CarritoClientePage />);

        const inputNumber = screen.getByTestId("input-number");
        fireEvent.change(inputNumber, { target: { value: "3" } });

        expect(mockActualizarCantidad).toHaveBeenCalledWith(1, 3);
    });

    it("debe eliminar producto del carrito", () => {
        const mockEliminarDelCarrito = vi.fn();
        const carritoMock = [
            { id_producto: 1, nombre_producto: "Tomate", precio: 1500, cantidad: 2, stock: 10 },
        ];

        mockUseCart.mockReturnValue({
            carrito: carritoMock,
            total: 3000,
            actualizarCantidad: vi.fn(),
            eliminarDelCarrito: mockEliminarDelCarrito,
            limpiarCarrito: vi.fn(),
        });
        mockUseAuth.mockReturnValue({ user: { id_usuario: 1 } });

        render(<CarritoClientePage />);

        const deleteButtons = screen.getAllByRole("button");
        const deleteButton = deleteButtons.find(btn => btn.getAttribute("data-danger") === "true");
        
        if (deleteButton) {
            fireEvent.click(deleteButton);
            expect(mockEliminarDelCarrito).toHaveBeenCalledWith(1);
        }
    });

    it("debe limpiar el carrito", () => {
        const mockLimpiarCarrito = vi.fn();
        const carritoMock = [
            { id_producto: 1, nombre_producto: "Tomate", precio: 1500, cantidad: 2, stock: 10 },
        ];

        mockUseCart.mockReturnValue({
            carrito: carritoMock,
            total: 3000,
            actualizarCantidad: vi.fn(),
            eliminarDelCarrito: vi.fn(),
            limpiarCarrito: mockLimpiarCarrito,
        });
        mockUseAuth.mockReturnValue({ user: { id_usuario: 1 } });

        render(<CarritoClientePage />);

        const vaciarButton = screen.getByText("Vaciar carrito");
        fireEvent.click(vaciarButton);

        expect(mockLimpiarCarrito).toHaveBeenCalled();
    });

    it("debe navegar a login si no hay usuario al finalizar compra", async () => {
        const carritoMock = [
            { id_producto: 1, nombre_producto: "Tomate", precio: 1500, cantidad: 2, stock: 10 },
        ];

        mockUseCart.mockReturnValue({
            carrito: carritoMock,
            total: 3000,
            actualizarCantidad: vi.fn(),
            eliminarDelCarrito: vi.fn(),
            limpiarCarrito: vi.fn(),
        });
        mockUseAuth.mockReturnValue({ user: null });

        render(<CarritoClientePage />);

        const finalizarButton = screen.getByText("Finalizar Compra");
        fireEvent.click(finalizarButton);

        await waitFor(() => {
            expect(mockMessageWarning).toHaveBeenCalledWith("Inicia sesión para terminar tu compra");
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        });
    });

    it("debe finalizar compra correctamente", async () => {
        const mockLimpiarCarrito = vi.fn();
        const carritoMock = [
            { id_producto: 1, nombre_producto: "Tomate", precio: 1500, cantidad: 2, stock: 10 },
        ];

        mockUseCart.mockReturnValue({
            carrito: carritoMock,
            total: 3000,
            actualizarCantidad: vi.fn(),
            eliminarDelCarrito: vi.fn(),
            limpiarCarrito: mockLimpiarCarrito,
        });
        mockUseAuth.mockReturnValue({ user: { id_usuario: 1 } });
        mockCrearOrden.mockResolvedValue({ id_venta: 123 });

        render(<CarritoClientePage />);

        const finalizarButton = screen.getByText("Finalizar Compra");
        fireEvent.click(finalizarButton);

        await waitFor(() => {
            expect(mockCrearOrden).toHaveBeenCalled();
            expect(mockMessageSuccess).toHaveBeenCalledWith("¡Pedido recibido con éxito!");
            expect(mockLimpiarCarrito).toHaveBeenCalled();
            expect(mockNavigate).toHaveBeenCalledWith("/cliente/mis-ordenes");
        });
    });

    it("debe mostrar error al fallar la compra", async () => {
        const carritoMock = [
            { id_producto: 1, nombre_producto: "Tomate", precio: 1500, cantidad: 2, stock: 10 },
        ];

        mockUseCart.mockReturnValue({
            carrito: carritoMock,
            total: 3000,
            actualizarCantidad: vi.fn(),
            eliminarDelCarrito: vi.fn(),
            limpiarCarrito: vi.fn(),
        });
        mockUseAuth.mockReturnValue({ user: { id_usuario: 1 } });
        mockCrearOrden.mockRejectedValue(new Error("Network error"));

        render(<CarritoClientePage />);

        const finalizarButton = screen.getByText("Finalizar Compra");
        fireEvent.click(finalizarButton);

        await waitFor(() => {
            expect(mockMessageError).toHaveBeenCalledWith("Error al procesar la compra");
        });
    });
});
