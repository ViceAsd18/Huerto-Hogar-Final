import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductoFila from "componentes/moleculas/Vendedor/Orden/ProductoFila";
import type { Producto } from "services/productos";

describe("ProductoFila Component", () => {
    const mockProducto: Producto = {
        id_producto: 1,
        nombre_producto: "Tomate Orgánico",
        descripcion_producto: "Tomates frescos",
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

    it("debe renderizar nombre, categoría y stock", () => {
        render(<ProductoFila producto={mockProducto} onAgregar={vi.fn()} />);

        expect(screen.getByText("Tomate Orgánico")).toBeInTheDocument();
        expect(screen.getByText("Verduras")).toBeInTheDocument();
        expect(screen.getByText(/10/)).toBeInTheDocument();
    });

    it("debe mostrar el precio formateado", () => {
        render(<ProductoFila producto={mockProducto} onAgregar={vi.fn()} />);

        expect(screen.getByText(/2500/)).toBeInTheDocument();
    });

    it("debe llamar onAgregar al hacer clic en Agregar", () => {
        const mockOnAgregar = vi.fn();
        render(<ProductoFila producto={mockProducto} onAgregar={mockOnAgregar} />);

        const boton = screen.getByText("Agregar");
        fireEvent.click(boton);

        expect(mockOnAgregar).toHaveBeenCalledWith(mockProducto, 1);
    });

    it("debe renderizar imagen con ruta correcta", () => {
        render(<ProductoFila producto={mockProducto} onAgregar={vi.fn()} />);

        const imagen = screen.getByAltText("Tomate Orgánico");
        expect(imagen).toBeInTheDocument();
        expect(imagen).toHaveAttribute("src", "/assets/img/productos/tomate_orgánico.jpg");
    });
});
