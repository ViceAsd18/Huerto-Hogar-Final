import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InfoProductoCliente from "../../../../../componentes/organismo/Cliente/Productos/InfoProductoCliente";
import type { Producto } from "services/productos";

describe("InfoProductoCliente Component", () => {
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

    it("debe renderizar el nombre del producto", () => {
        render(<InfoProductoCliente producto={mockProducto} />);

        expect(screen.getByText("Tomate Fresco")).toBeInTheDocument();
    });

    it("debe renderizar la descripción del producto", () => {
        render(<InfoProductoCliente producto={mockProducto} />);

        expect(screen.getByText("Tomate rojo de primera calidad")).toBeInTheDocument();
    });

    it("debe renderizar el precio formateado", () => {
        render(<InfoProductoCliente producto={mockProducto} />);

        expect(screen.getByText("$2.500")).toBeInTheDocument();
    });

    it("debe renderizar la imagen del producto", () => {
        render(<InfoProductoCliente producto={mockProducto} />);

        const imagen = screen.getByAltText("Tomate Fresco");
        expect(imagen).toBeInTheDocument();
        expect(imagen).toHaveAttribute("src", expect.stringContaining("tomate_fresco"));
    });

    it("debe renderizar la categoría", () => {
        render(<InfoProductoCliente producto={mockProducto} />);

        expect(screen.getByText("Verduras")).toBeInTheDocument();
    });

    it("debe mostrar sin descripción cuando no existe", () => {
        const productoSinDescripcion: Producto = {
            id_producto: 2,
            nombre_producto: "Lechuga",
            descripcion_producto: "",
            precio: 1500,
            stock: 20,
            categoria: {
                id_categoria: 1,
                nombre_categoria: "Verduras",
                descripcion_categoria: "Productos vegetales frescos",
            },
        };

        render(<InfoProductoCliente producto={productoSinDescripcion} />);

        expect(screen.getByText("Sin descripción.")).toBeInTheDocument();
    });

    it("debe renderizar el contenedor principal con estilos correctos", () => {
        const { container } = render(<InfoProductoCliente producto={mockProducto} />);

        const contenedor = container.firstChild as HTMLElement;
        expect(contenedor).toHaveStyle({
            background: "#fff",
            padding: "40px",
            borderRadius: "12px",
        });
    });

    it("debe renderizar la estructura completa del producto", () => {
        const { container } = render(<InfoProductoCliente producto={mockProducto} />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it("debe formatear precio en pesos chilenos", () => {
        const productoConPrecioAlto = {
            ...mockProducto,
            precio: 150000,
        };

        render(<InfoProductoCliente producto={productoConPrecioAlto} />);

        expect(screen.getByText("$150.000")).toBeInTheDocument();
    });
});
