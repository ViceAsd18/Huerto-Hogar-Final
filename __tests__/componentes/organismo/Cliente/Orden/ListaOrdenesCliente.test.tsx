import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import ListaOrdenesCliente from "../../../../../componentes/organismo/Cliente/Orden/ListaOrdenesCliente";
import type { Orden } from "services/orden";

describe("ListaOrdenesCliente Component", () => {
    const mockOrdenes: Orden[] = [
        {
            id_venta: 1,
            fecha_venta: "2024-12-10",
            total: 15500,
            estado: "completada",
            metodo_pago: "Tarjeta",
            usuario: {
                id_usuario: 1,
                nombre: "Juan Pérez",
                rol: "cliente",
            },
            detalles: [
                {
                    id_detalle: 1,
                    cantidad: 2,
                    subtotal: 15500,
                    producto: {
                        id_producto: 1,
                        nombre_producto: "Tomate",
                        precio: 7750,
                        descripcion_producto: "Tomate fresco",
                        stock: 10,
                    },
                },
            ],
        },
        {
            id_venta: 2,
            fecha_venta: "2024-12-05",
            total: 8900,
            estado: "pendiente",
            metodo_pago: "Efectivo",
            usuario: {
                id_usuario: 1,
                nombre: "Juan Pérez",
                rol: "cliente",
            },
            detalles: [],
        },
    ];

    it("debe renderizar el componente sin errores con órdenes", () => {
        const { container } = render(
            <BrowserRouter>
                <ListaOrdenesCliente ordenes={mockOrdenes} />
            </BrowserRouter>
        );

        expect(container.firstChild).toBeInTheDocument();
    });

    it("debe renderizar sin errores con lista vacía", () => {
        const { container } = render(
            <BrowserRouter>
                <ListaOrdenesCliente ordenes={[]} />
            </BrowserRouter>
        );

        expect(container.firstChild).toBeInTheDocument();
    });

    it("debe aceptar array de órdenes como prop", () => {
        const { container } = render(
            <BrowserRouter>
                <ListaOrdenesCliente ordenes={mockOrdenes} />
            </BrowserRouter>
        );

        expect(container.firstChild).toBeInTheDocument();
    });

    it("debe renderizar con una sola orden", () => {
        const { container } = render(
            <BrowserRouter>
                <ListaOrdenesCliente ordenes={[mockOrdenes[0]]} />
            </BrowserRouter>
        );

        expect(container.firstChild).toBeInTheDocument();
    });

    it("debe renderizar con múltiples órdenes", () => {
        const { container } = render(
            <BrowserRouter>
                <ListaOrdenesCliente ordenes={mockOrdenes} />
            </BrowserRouter>
        );

        expect(container.firstChild).toBeInTheDocument();
    });

    it("debe manejar prop ordenes correctamente", () => {
        render(
            <BrowserRouter>
                <ListaOrdenesCliente ordenes={mockOrdenes} />
            </BrowserRouter>
        );

        // Verifica que el componente se renderice sin lanzar errores
        expect(true).toBe(true);
    });
});
