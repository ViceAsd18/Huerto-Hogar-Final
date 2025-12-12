import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import OrdenItem from "componentes/moleculas/Vendedor/Orden/OrdenItem";
import type { Producto } from "services/productos";

describe("OrdenItem Component", () => {
    const mockProducto: Producto & { cantidad: number } = {
        id_producto: 1,
        nombre_producto: "Tomate Orgánico",
        descripcion_producto: "Tomates frescos",
        precio: 2500,
        stock: 10,
        cantidad: 3,
        categoria: {
            id_categoria: 1,
            nombre_categoria: "Verduras",
            descripcion_categoria: "Verduras frescas",
        },
    };

    const mockOnCantidadChange = vi.fn();
    const mockOnEliminar = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar información del producto", () => {
        render(
            <OrdenItem
                producto={mockProducto}
                onCantidadChange={mockOnCantidadChange}
                onEliminar={mockOnEliminar}
            />
        );

        expect(screen.getByText("Tomate Orgánico")).toBeInTheDocument();
    });

    it("debe mostrar precio total calculado", () => {
        render(
            <OrdenItem
                producto={mockProducto}
                onCantidadChange={mockOnCantidadChange}
                onEliminar={mockOnEliminar}
            />
        );

        // precio 2500 * cantidad 3 = 7500.00
        expect(screen.getByText("$7500.00")).toBeInTheDocument();
    });

    it("debe tener input de cantidad con valor correcto", () => {
        render(
            <OrdenItem
                producto={mockProducto}
                onCantidadChange={mockOnCantidadChange}
                onEliminar={mockOnEliminar}
            />
        );

        const input = screen.getByRole("spinbutton");
        expect(input).toHaveValue(3);
    });

    it("debe tener botón Eliminar", () => {
        render(
            <OrdenItem
                producto={mockProducto}
                onCantidadChange={mockOnCantidadChange}
                onEliminar={mockOnEliminar}
            />
        );

        expect(screen.getByText("Eliminar")).toBeInTheDocument();
    });

    it("debe llamar onEliminar al hacer clic en Eliminar", () => {
        render(
            <OrdenItem
                producto={mockProducto}
                onCantidadChange={mockOnCantidadChange}
                onEliminar={mockOnEliminar}
            />
        );

        const botonEliminar = screen.getByText("Eliminar");
        fireEvent.click(botonEliminar);

        expect(mockOnEliminar).toHaveBeenCalledWith(1);
    });

    it("debe renderizar imagen con ruta correcta", () => {
        render(
            <OrdenItem
                producto={mockProducto}
                onCantidadChange={mockOnCantidadChange}
                onEliminar={mockOnEliminar}
            />
        );

        const imagen = screen.getByAltText("Tomate Orgánico");
        expect(imagen).toBeInTheDocument();
        expect(imagen).toHaveAttribute("src", "/assets/img/productos/tomate_orgánico.jpg");
    });
});
