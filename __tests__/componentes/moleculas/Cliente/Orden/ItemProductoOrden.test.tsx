import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ItemProductoOrden from "componentes/moleculas/Cliente/Orden/ItemProductoOrden";

describe("ItemProductoOrden Component", () => {
    it("debe renderizar nombre del producto", () => {
        render(
            <ItemProductoOrden
                imagen="/img/productos/tomate.jpg"
                nombre="Tomate Orgánico"
            />
        );

        expect(screen.getByText("Tomate Orgánico")).toBeInTheDocument();
    });

    it("debe renderizar imagen con alt correcto", () => {
        render(
            <ItemProductoOrden
                imagen="/img/productos/lechuga.jpg"
                nombre="Lechuga Romana"
            />
        );

        const imagen = screen.getByAltText("Lechuga Romana");
        expect(imagen).toBeInTheDocument();
        expect(imagen).toHaveAttribute("src", "/img/productos/lechuga.jpg");
    });

    it("debe renderizar diferentes productos", () => {
        const { rerender } = render(
            <ItemProductoOrden
                imagen="/img/producto1.jpg"
                nombre="Producto 1"
            />
        );

        expect(screen.getByText("Producto 1")).toBeInTheDocument();

        rerender(
            <ItemProductoOrden
                imagen="/img/producto2.jpg"
                nombre="Producto 2"
            />
        );

        expect(screen.getByText("Producto 2")).toBeInTheDocument();
        expect(screen.getByAltText("Producto 2")).toHaveAttribute("src", "/img/producto2.jpg");
    });

    it("debe tener estructura correcta con contenedor de imagen", () => {
        const { container } = render(
            <ItemProductoOrden
                imagen="/img/test.jpg"
                nombre="Test Product"
            />
        );

        const contenedorPrincipal = container.firstChild as HTMLElement;
        expect(contenedorPrincipal.style.display).toBe("flex");
        expect(contenedorPrincipal.style.alignItems).toBe("center");
    });
});
