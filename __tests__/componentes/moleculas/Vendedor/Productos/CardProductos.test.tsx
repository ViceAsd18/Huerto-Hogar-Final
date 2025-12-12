import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CardProducto from "componentes/moleculas/Vendedor/Productos/CardProductos";
import type { Producto } from "services/productos";

// Mock específico para Card que preserve onClick
vi.mock("antd", async () => {
    const actual = await vi.importActual<any>("antd");
    return {
        ...actual,
        Card: ({ onClick, children }: any) => (
            <div data-testid="card" onClick={onClick}>
                {children}
            </div>
        ),
    };
});

describe("CardProducto Component", () => {
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

    const mockOnVerDetalle = vi.fn();
    const mockOnEditarProducto = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar datos básicos", () => {
        render(
            <CardProducto
                producto={mockProducto}
                onVerDetalle={mockOnVerDetalle}
                onEditarProducto={mockOnEditarProducto}
            />
        );

        expect(screen.getByText("Tomate Orgánico")).toBeInTheDocument();
        expect(screen.getByText("Verduras")).toBeInTheDocument();
        expect(screen.getByText(/2500/)).toBeInTheDocument();
    });

    it("debe mostrar badge de stock", () => {
        render(
            <CardProducto
                producto={mockProducto}
                onVerDetalle={mockOnVerDetalle}
                onEditarProducto={mockOnEditarProducto}
            />
        );

        expect(screen.getByText("10 en Stock")).toBeInTheDocument();
    });

    it("debe renderizar imagen con ruta normalizada", () => {
        render(
            <CardProducto
                producto={mockProducto}
                onVerDetalle={mockOnVerDetalle}
                onEditarProducto={mockOnEditarProducto}
            />
        );

        const imagen = screen.getByAltText("Tomate Orgánico");
        expect(imagen).toBeInTheDocument();
        expect(imagen).toHaveAttribute("src", "/assets/img/productos/tomate_orgánico.jpg");
    });

    it("debe llamar onVerDetalle al hacer clic en la tarjeta", () => {
        render(
            <CardProducto
                producto={mockProducto}
                onVerDetalle={mockOnVerDetalle}
                onEditarProducto={mockOnEditarProducto}
            />
        );

        fireEvent.click(screen.getByTestId("card"));

        expect(mockOnVerDetalle).toHaveBeenCalledWith(mockProducto);
        expect(mockOnEditarProducto).not.toHaveBeenCalled();
    });

    it("debe llamar onEditarProducto al hacer clic en Editar Producto sin disparar onVerDetalle", () => {
        render(
            <CardProducto
                producto={mockProducto}
                onVerDetalle={mockOnVerDetalle}
                onEditarProducto={mockOnEditarProducto}
            />
        );

        const boton = screen.getByText("Editar Producto");
        fireEvent.click(boton);

        expect(mockOnEditarProducto).toHaveBeenCalledWith(mockProducto);
        expect(mockOnVerDetalle).not.toHaveBeenCalled();
    });
});
