import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductoFila from "./ProductoFila";

vi.mock("antd", () => ({
    Row: ({ children, ...rest }: { children: React.ReactNode }) => (
        <div data-testid="row" {...rest}>{children}</div>
    ),
    Col: ({ children, ...rest }: { children: React.ReactNode }) => (
        <div data-testid="col" {...rest}>{children}</div>
    ),
    Space: ({ children }: { children: React.ReactNode }) => <div data-testid="space">{children}</div>,
}));

vi.mock("componentes/atomos/Imagen", () => ({
    __esModule: true,
    default: ({ src, alt, style }: { src?: string; alt?: string; style?: React.CSSProperties }) => (
        <img data-testid="imagen" src={src} alt={alt} style={style} />
    ),
}));

vi.mock("componentes/atomos/Boton", () => ({
    __esModule: true,
    default: ({ children, onClick, color }: { children: React.ReactNode; onClick?: () => void; color?: string }) => (
        <button data-testid="boton" onClick={onClick} style={{ background: color }}>
            {children}
        </button>
    ),
}));

vi.mock("componentes/atomos/BadgeStock", () => ({
    __esModule: true,
    default: ({ stock }: { stock: number }) => <span data-testid="badge-stock">Stock: {stock}</span>,
}));

vi.mock("componentes/atomos/BadgeCategoria", () => ({
    __esModule: true,
    default: ({ categoria }: { categoria: string }) => <span data-testid="badge-categoria">Categoria: {categoria}</span>,
}));

vi.mock("componentes/atomos/PrecioProducto", () => ({
    __esModule: true,
    default: ({ valor }: { valor: number }) => <span data-testid="precio">Precio: ${valor.toFixed(2)}</span>,
}));

describe("ProductoFila", () => {
    const productoBase = {
        id_producto: 10,
        nombre_producto: "Tomate Cherry",
        precio: 25,
        stock: 8,
        categoria: { nombre_categoria: "Vegetales" },
    } as any;

    it("muestra datos del producto, badges, imagen normalizada y precio", () => {
        render(<ProductoFila producto={productoBase} onAgregar={() => {}} />);

        expect(screen.getByText("Tomate Cherry")).toBeInTheDocument();
        expect(screen.getByTestId("badge-categoria")).toHaveTextContent("Vegetales");
        expect(screen.getByTestId("badge-stock")).toHaveTextContent("Stock: 8");
        expect(screen.getByTestId("precio")).toHaveTextContent("25.00");

        const imagen = screen.getByTestId("imagen");
        expect(imagen).toHaveAttribute("src", "/assets/img/productos/tomate_cherry.jpg");
        expect(imagen).toHaveAttribute("alt", "Tomate Cherry");
    });

    it("dispara onAgregar con el producto y cantidad 1 al hacer clic en el boton", () => {
        const onAgregar = vi.fn();
        render(<ProductoFila producto={productoBase} onAgregar={onAgregar} />);

        fireEvent.click(screen.getByText("Agregar"));
        expect(onAgregar).toHaveBeenCalledWith(productoBase, 1);
    });
});
