import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import InfoProducto from "componentes/organismo/Vendedor/Productos/InfoProducto";
import type { Producto } from "services/productos";

const mockProducto: Producto = {
    id_producto: 1,
    nombre_producto: "Tomate Rojo",
    descripcion_producto: "Tomate rojo fresco",
    precio: 50,
    stock: 100,
    categoria: {
        id_categoria: 1,
        nombre_categoria: "Verduras",
        descripcion_categoria: "Verduras frescas",
    },
};

vi.mock("componentes/atomos/Imagen", () => ({
    default: ({ src, alt, ...props }: any) =>
        require("react").createElement("img", {
            src,
            alt,
            "data-testid": "imagen-producto",
            ...props,
        }),
}));

vi.mock("componentes/moleculas/Vendedor/Productos/CardInfoProducto", () => ({
    default: ({ producto }: any) =>
        require("react").createElement("div", {
            "data-testid": "card-info-producto",
        }, `Info: ${producto.nombre_producto}`),
}));

describe("InfoProducto Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar el componente sin errores", () => {
        const { container } = render(<InfoProducto producto={mockProducto} />);
        expect(container).toBeInTheDocument();
    });

    it("debe mostrar la imagen del producto", () => {
        render(<InfoProducto producto={mockProducto} />);
        expect(screen.getByTestId("imagen-producto")).toBeInTheDocument();
    });

    it("debe pasar el nombre del producto formateado a la imagen", () => {
        render(<InfoProducto producto={mockProducto} />);
        const imagen = screen.getByTestId("imagen-producto") as HTMLImageElement;
        expect(imagen.src).toContain("tomate_rojo.jpg");
    });

    it("debe pasar el alt del producto a la imagen", () => {
        render(<InfoProducto producto={mockProducto} />);
        const imagen = screen.getByTestId("imagen-producto") as HTMLImageElement;
        expect(imagen.alt).toBe("Tomate Rojo");
    });

    it("debe mostrar el CardInfoProducto", () => {
        render(<InfoProducto producto={mockProducto} />);
        expect(screen.getByTestId("card-info-producto")).toBeInTheDocument();
    });

    it("debe pasar el producto al CardInfoProducto", () => {
        render(<InfoProducto producto={mockProducto} />);
        expect(screen.getByText(/Info: Tomate Rojo/)).toBeInTheDocument();
    });

    it("debe manejar correctamente nombres con múltiples espacios", () => {
        const productoConEspacios = {
            ...mockProducto,
            nombre_producto: "Lechuga   Verde   Fresca",
        };
        render(<InfoProducto producto={productoConEspacios} />);
        const imagen = screen.getByTestId("imagen-producto") as HTMLImageElement;
        expect(imagen.src).toContain("lechuga_verde_fresca.jpg");
    });

    it("debe convertir el nombre a minúsculas en la URL de la imagen", () => {
        const productoMayuscula = {
            ...mockProducto,
            nombre_producto: "ZANAHORIAS",
        };
        render(<InfoProducto producto={productoMayuscula} />);
        const imagen = screen.getByTestId("imagen-producto") as HTMLImageElement;
        expect(imagen.src).toContain("zanahorias.jpg");
    });

    it("debe aplicar los estilos correctos al contenedor principal", () => {
        const { container } = render(<InfoProducto producto={mockProducto} />);
        const mainDiv = container.firstChild as HTMLElement;
        expect(mainDiv).toHaveStyle({ display: "flex", flexWrap: "wrap", gap: "40px" });
    });

    it("debe renderizar la imagen con estilos de objeto contenido", () => {
        render(<InfoProducto producto={mockProducto} />);
        const imagen = screen.getByTestId("imagen-producto") as HTMLImageElement;
        expect(imagen).toHaveStyle({ objectFit: "contain" });
    });
});
