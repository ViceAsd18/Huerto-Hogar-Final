import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CardProductoCliente from "componentes/moleculas/Cliente/Tienda/CardProductoCliente";
import type { Producto } from "services/productos";

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

// Mock de useCart
const mockAgregarAlCarrito = vi.fn();
vi.mock("auth/CartContext", () => ({
    useCart: () => ({
        agregarAlCarrito: mockAgregarAlCarrito,
    }),
}));

// Mock de antd message
vi.mock("antd", async () => {
    const actual = await vi.importActual("antd");
    return {
        ...actual,
        message: {
            success: vi.fn(),
            error: vi.fn(),
        },
    };
});

describe("CardProductoCliente Component", () => {
    const mockProducto: Producto = {
        id_producto: 1,
        nombre_producto: "Tomate Orgánico",
        descripcion_producto: "Tomates frescos",
        precio: 2500,
        stock: 10,
        categoria: {
            id_categoria: 1,
            nombre_categoria: "Verduras",
            descripcion_categoria: "Verduras frescas y orgánicas",
        },
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar información del producto", () => {
        render(<CardProductoCliente producto={mockProducto} />);

        expect(screen.getByText("Tomate Orgánico")).toBeInTheDocument();
        expect(screen.getByText("$2.500")).toBeInTheDocument();
        expect(screen.getByText("Verduras")).toBeInTheDocument();
    });

    it("debe mostrar badge de stock", () => {
        render(<CardProductoCliente producto={mockProducto} />);

        expect(screen.getByText("10 en Stock")).toBeInTheDocument();
    });

    it("debe tener botón Ver", () => {
        render(<CardProductoCliente producto={mockProducto} />);

        expect(screen.getByText("Ver")).toBeInTheDocument();
    });

    it("debe tener botón Agregar", () => {
        render(<CardProductoCliente producto={mockProducto} />);

        expect(screen.getByText("Agregar")).toBeInTheDocument();
    });

    it("debe navegar al hacer clic en Ver", () => {
        render(<CardProductoCliente producto={mockProducto} />);

        const botonVer = screen.getByText("Ver");
        fireEvent.click(botonVer);

        expect(mockNavigate).toHaveBeenCalledWith("/cliente/producto/1");
    });

    it("debe deshabilitar botón Agregar cuando stock es 0", () => {
        const productoSinStock = { ...mockProducto, stock: 0 };
        render(<CardProductoCliente producto={productoSinStock} />);

        const botonAgregar = screen.getByRole("button", { name: /agregar/i });
        expect(botonAgregar).toBeDisabled();
    });

    it("debe renderizar imagen con ruta correcta", () => {
        render(<CardProductoCliente producto={mockProducto} />);

        const imagen = screen.getByAltText("Tomate Orgánico");
        expect(imagen).toBeInTheDocument();
        expect(imagen).toHaveAttribute("src", "/assets/img/productos/tomate_orgánico.jpg");
    });
});
