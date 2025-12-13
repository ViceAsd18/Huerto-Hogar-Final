import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ListaProductosOrden from "../../../../../componentes/organismo/Cliente/Productos/ListaProductosOrden";
import type { ProductoDetalle } from "../../../../../componentes/organismo/Cliente/Productos/ListaProductosOrden";

describe("ListaProductosOrden Component", () => {
    const mockDetalles: ProductoDetalle[] = [
        {
            id_detalle: 1,
            cantidad: 2,
            producto: {
                id_producto: 1,
                nombre_producto: "Tomate Fresco",
                precio: 2500,
                descripcion_producto: "Tomate rojo",
                stock: 10,
            },
        },
        {
            id_detalle: 2,
            cantidad: 3,
            producto: {
                id_producto: 2,
                nombre_producto: "Lechuga",
                precio: 1500,
                descripcion_producto: "Lechuga verde",
                stock: 20,
            },
        },
    ];

    it("debe renderizar el componente sin errores", () => {
        const { container } = render(<ListaProductosOrden detalles={mockDetalles} />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it("debe renderizar los nombres de los productos", () => {
        render(<ListaProductosOrden detalles={mockDetalles} />);

        expect(screen.getByText("Tomate Fresco")).toBeInTheDocument();
        expect(screen.getByText("Lechuga")).toBeInTheDocument();
    });

    it("debe renderizar las cantidades", () => {
        render(<ListaProductosOrden detalles={mockDetalles} />);

        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("debe renderizar los precios unitarios formateados", () => {
        render(<ListaProductosOrden detalles={mockDetalles} />);

        expect(screen.getByText("$2.500")).toBeInTheDocument();
        expect(screen.getByText("$1.500")).toBeInTheDocument();
    });

    it("debe renderizar los subtotales calculados", () => {
        render(<ListaProductosOrden detalles={mockDetalles} />);

        expect(screen.getByText("$5.000")).toBeInTheDocument();
        expect(screen.getByText("$4.500")).toBeInTheDocument();
    });

    it("debe renderizar los encabezados de la tabla", () => {
        render(<ListaProductosOrden detalles={mockDetalles} />);

        expect(screen.getByText("Producto")).toBeInTheDocument();
        expect(screen.getByText("Cantidad")).toBeInTheDocument();
        expect(screen.getByText("Precio Unitario")).toBeInTheDocument();
        expect(screen.getByText("Subtotal")).toBeInTheDocument();
    });

    it("debe renderizar correctamente sin datos", () => {
        const { container } = render(<ListaProductosOrden detalles={[]} />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it("debe renderizar con un solo detalle", () => {
        render(<ListaProductosOrden detalles={[mockDetalles[0]]} />);

        expect(screen.getByText("Tomate Fresco")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("debe calcular correctamente subtotales con diferentes cantidades", () => {
        const detallesConDiferenteCantidad: ProductoDetalle[] = [
            {
                id_detalle: 1,
                cantidad: 5,
                producto: {
                    id_producto: 1,
                    nombre_producto: "Producto Test",
                    precio: 1000,
                },
            },
        ];

        render(<ListaProductosOrden detalles={detallesConDiferenteCantidad} />);

        expect(screen.getByText("$5.000")).toBeInTheDocument();
    });
});
