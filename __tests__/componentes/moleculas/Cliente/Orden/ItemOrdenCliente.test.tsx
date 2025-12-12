import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemOrdenCliente from "componentes/moleculas/Cliente/Orden/ItemOrdenCliente";
import type { Orden } from "services/orden";

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

describe("ItemOrdenCliente Component", () => {
    const mockOrden: Orden = {
        id_venta: 123,
        fecha_venta: "2025-01-15",
        total: 15000,
        estado: "pendiente",
        metodo_pago: "efectivo",
        usuario: {
            id_usuario: 1,
            nombre: "Juan Pérez",
            rol: "cliente",
        },
        detalles: [],
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar información básica de la orden", () => {
        render(<ItemOrdenCliente orden={mockOrden} />);

        expect(screen.getByText("#123")).toBeInTheDocument();
        expect(screen.getByText("$15.000")).toBeInTheDocument();
    });

    it("debe renderizar fecha formateada", () => {
        render(<ItemOrdenCliente orden={mockOrden} />);

        expect(screen.getByText("Fecha")).toBeInTheDocument();
        expect(screen.getByText(/15/)).toBeInTheDocument();
    });

    it("debe mostrar badge con estado", () => {
        render(<ItemOrdenCliente orden={mockOrden} />);

        expect(screen.getByText("Estado")).toBeInTheDocument();
        expect(screen.getByText("PENDIENTE")).toBeInTheDocument();
    });

    it("debe mostrar botón Ver detalle", () => {
        render(<ItemOrdenCliente orden={mockOrden} />);

        expect(screen.getByText("Ver detalle")).toBeInTheDocument();
    });

    it("debe navegar al hacer clic en Ver detalle", () => {
        render(<ItemOrdenCliente orden={mockOrden} />);

        const boton = screen.getByText("Ver detalle");
        fireEvent.click(boton);

        expect(mockNavigate).toHaveBeenCalledWith("/cliente/orden/123");
    });

    it("debe renderizar diferentes órdenes", () => {
        const otraOrden: Orden = {
            id_venta: 456,
            fecha_venta: "2025-02-20",
            total: 25000,
            estado: "completada",
            metodo_pago: "tarjeta",
            usuario: {
                id_usuario: 2,
                nombre: "María García",
                rol: "cliente",
            },
            detalles: [],
        };

        const { rerender } = render(<ItemOrdenCliente orden={mockOrden} />);
        expect(screen.getByText("#123")).toBeInTheDocument();

        rerender(<ItemOrdenCliente orden={otraOrden} />);
        expect(screen.getByText("#456")).toBeInTheDocument();
        expect(screen.getByText("$25.000")).toBeInTheDocument();
        expect(screen.getByText("COMPLETADA")).toBeInTheDocument();
    });
});
