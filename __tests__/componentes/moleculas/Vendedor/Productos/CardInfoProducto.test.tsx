import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CardInfoProducto from "componentes/moleculas/Vendedor/Productos/CardInfoProducto";
import type { Producto } from "services/productos";

describe("CardInfoProducto Component", () => {
    const mockProducto: Producto = {
        id_producto: 1,
        nombre_producto: "Tomate Orgánico",
        descripcion_producto: "Tomates frescos y orgánicos",
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

    it("debe renderizar nombre, precio y descripción", () => {
        render(<CardInfoProducto producto={mockProducto} />);

        expect(screen.getByText("Tomate Orgánico")).toBeInTheDocument();
        expect(screen.getByText(/2500/)).toBeInTheDocument();
        expect(screen.getByText("Tomates frescos y orgánicos")).toBeInTheDocument();
    });

    it("debe mostrar la categoría", () => {
        render(<CardInfoProducto producto={mockProducto} />);

        expect(screen.getByText("Verduras")).toBeInTheDocument();
    });

    it("debe mostrar badge de stock para stock alto", () => {
        render(<CardInfoProducto producto={mockProducto} />);

        expect(screen.getByText("10 en Stock")).toBeInTheDocument();
    });

    it("debe mostrar badge de stock bajo cuando stock < 10", () => {
        const productoBajoStock: Producto = {
            ...mockProducto,
            stock: 5,
            nombre_producto: "Lechuga",
        };

        render(<CardInfoProducto producto={productoBajoStock} />);

        expect(screen.getByText("Lechuga")).toBeInTheDocument();
        expect(screen.getByText("5 Bajo Stock")).toBeInTheDocument();
    });
});
