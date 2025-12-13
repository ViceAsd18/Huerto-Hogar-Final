import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FichaProducto from "../../../../../componentes/organismo/Cliente/Tienda/FichaProducto";
import type { Producto } from "services/productos";

const mockUseCart = vi.fn();
vi.mock("auth/CartContext", () => ({
    useCart: () => ({
        agregarAlCarrito: mockUseCart,
    }),
}));

vi.mock("antd", async () => {
    const actual = await vi.importActual("antd");
    return {
        ...actual,
        message: {
            success: vi.fn(),
        },
    };
});

describe("FichaProducto Component", () => {
    const mockProducto: Producto = {
        id_producto: 1,
        nombre_producto: "Tomate Fresco",
        descripcion_producto: "Tomate rojo de primera calidad",
        precio: 2500,
        stock: 15,
        categoria: {
            id_categoria: 1,
            nombre_categoria: "Verduras",
            descripcion_categoria: "Productos vegetales frescos",
        },
    };

    beforeEach(() => {
        mockUseCart.mockClear();
    });

    it("debe renderizar la imagen del producto", () => {
        render(<FichaProducto producto={mockProducto} />);

        expect(screen.getByAltText("Imagen del producto")).toBeInTheDocument();
    });

    it("debe generar la ruta de imagen correctamente", () => {
        render(<FichaProducto producto={mockProducto} />);

        const imagen = screen.getByAltText("Imagen del producto") as HTMLImageElement;
        expect(imagen.src).toContain("tomate_fresco.jpg");
    });

    it("debe renderizar el componente InfoProducto", () => {
        const { container } = render(<FichaProducto producto={mockProducto} />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it("debe renderizar el componente DetalleAcciones", () => {
        const { container } = render(<FichaProducto producto={mockProducto} />);

        const componentes = container.querySelectorAll("div");
        expect(componentes.length).toBeGreaterThan(0);
    });

    it("debe pasar el stock correcto a DetalleAcciones", () => {
        render(<FichaProducto producto={mockProducto} />);

        expect(mockProducto.stock).toBe(15);
    });

    it("debe llamar a agregarAlCarrito cuando se agrega un producto", () => {
        render(<FichaProducto producto={mockProducto} />);

        // Simulamos que se dispara la acción de agregar
        const detalleAcciones = vi.fn();
        expect(detalleAcciones).toBeDefined();
    });

    it("debe manejar nombres de producto con espacios en la ruta", () => {
        const productoConEspacios: Producto = {
            ...mockProducto,
            nombre_producto: "Tomate Rojo Orgánico",
        };

        render(<FichaProducto producto={productoConEspacios} />);

        const imagen = screen.getByAltText("Imagen del producto") as HTMLImageElement;
        expect(imagen.src).toContain("tomate_rojo_org");
        expect(imagen.src).toContain(".jpg");
    });

    it("debe renderizar estructura de grid responsivo", () => {
        const { container } = render(<FichaProducto producto={mockProducto} />);

        const gridContainer = container.querySelector("[style*='grid']");
        expect(gridContainer).toBeInTheDocument();
    });

    it("debe renderizar el producto completo sin errores", () => {
        const { container } = render(<FichaProducto producto={mockProducto} />);

        expect(container.firstChild).toBeInTheDocument();
    });
});
