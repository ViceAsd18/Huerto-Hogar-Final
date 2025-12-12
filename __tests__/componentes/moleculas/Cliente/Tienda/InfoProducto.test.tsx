import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import InfoProducto from "componentes/moleculas/Cliente/Tienda/InfoProducto";
import type { Producto } from "services/productos";

describe("InfoProducto Component", () => {
    const mockProducto: Producto = {
        id_producto: 1,
        nombre_producto: "Tomate Orgánico",
        descripcion_producto: "Tomates frescos y orgánicos cultivados sin pesticidas",
        precio: 2500,
        stock: 10,
        categoria: {
            id_categoria: 1,
            nombre_categoria: "Verduras",
            descripcion_categoria: "Verduras frescas",
        },
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar nombre del producto", () => {
        render(<InfoProducto producto={mockProducto} />);

        expect(screen.getByText("Tomate Orgánico")).toBeInTheDocument();
    });

    it("debe renderizar precio del producto", () => {
        render(<InfoProducto producto={mockProducto} />);

        expect(screen.getByText(/2500/)).toBeInTheDocument();
    });

    it("debe renderizar descripción del producto", () => {
        render(<InfoProducto producto={mockProducto} />);

        expect(screen.getByText("Tomates frescos y orgánicos cultivados sin pesticidas")).toBeInTheDocument();
    });

    it("debe renderizar con producto diferente", () => {
        const otroProducto: Producto = {
            id_producto: 2,
            nombre_producto: "Lechuga",
            descripcion_producto: "Lechuga fresca",
            precio: 1500,
            stock: 20,
            categoria: {
                id_categoria: 1,
                nombre_categoria: "Verduras",
                descripcion_categoria: "Verduras frescas",
            },
        };

        render(<InfoProducto producto={otroProducto} />);

        expect(screen.getByText("Lechuga")).toBeInTheDocument();
        expect(screen.getByText(/1500/)).toBeInTheDocument();
        expect(screen.getByText("Lechuga fresca")).toBeInTheDocument();
    });
});
