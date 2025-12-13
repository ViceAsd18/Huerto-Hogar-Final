import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CatalogoProductos from "componentes/organismo/Vendedor/Productos/CatalogoProductos";
import type { Producto } from "services/productos";

vi.mock("componentes/moleculas/Vendedor/Productos/CardProductos", () => ({
    default: ({ producto, onVerDetalle, onEditarProducto }: { producto: Producto; onVerDetalle: (p: Producto) => void; onEditarProducto: (p: Producto) => void }) => (
        <div data-testid={`card-producto-${producto.id_producto}`}>
            <h3>{producto.nombre_producto}</h3>
            <p>${producto.precio}</p>
            <button onClick={() => onVerDetalle(producto)}>Ver Detalle</button>
            <button onClick={() => onEditarProducto(producto)}>Editar</button>
        </div>
    ),
}));

describe("CatalogoProductos Component", () => {
    const mockProductos: Producto[] = [
        {
            id_producto: 1,
            nombre_producto: "Tomate",
            descripcion_producto: "Tomate fresco",
            precio: 100,
            stock: 50,
            categoria: { id_categoria: 1, nombre_categoria: "Verduras", descripcion_categoria: "Verduras frescas" },
        },
        {
            id_producto: 2,
            nombre_producto: "Lechuga",
            descripcion_producto: "Lechuga fresca",
            precio: 80,
            stock: 30,
            categoria: { id_categoria: 1, nombre_categoria: "Verduras", descripcion_categoria: "Verduras frescas" },
        },
        {
            id_producto: 3,
            nombre_producto: "Cebolla",
            descripcion_producto: "Cebolla fresca",
            precio: 60,
            stock: 40,
            categoria: { id_categoria: 1, nombre_categoria: "Verduras", descripcion_categoria: "Verduras frescas" },
        },
    ];

    const defaultProps = {
        productos: mockProductos,
        onVerDetalle: vi.fn(),
        onEditarProducto: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar el componente sin errores", () => {
        const { container } = render(<CatalogoProductos {...defaultProps} />);
        expect(container).toBeInTheDocument();
    });

    it("debe renderizar todas las tarjetas de productos", () => {
        render(<CatalogoProductos {...defaultProps} />);
        expect(screen.getByTestId("card-producto-1")).toBeInTheDocument();
        expect(screen.getByTestId("card-producto-2")).toBeInTheDocument();
        expect(screen.getByTestId("card-producto-3")).toBeInTheDocument();
    });

    it("debe mostrar el nombre de cada producto", () => {
        render(<CatalogoProductos {...defaultProps} />);
        expect(screen.getByText("Tomate")).toBeInTheDocument();
        expect(screen.getByText("Lechuga")).toBeInTheDocument();
        expect(screen.getByText("Cebolla")).toBeInTheDocument();
    });

    it("debe mostrar el precio de cada producto", () => {
        render(<CatalogoProductos {...defaultProps} />);
        expect(screen.getByText("$100")).toBeInTheDocument();
        expect(screen.getByText("$80")).toBeInTheDocument();
        expect(screen.getByText("$60")).toBeInTheDocument();
    });

    it("debe tener botones Ver Detalle para cada producto", () => {
        render(<CatalogoProductos {...defaultProps} />);
        const verDetalleButtons = screen.getAllByText("Ver Detalle");
        expect(verDetalleButtons.length).toBe(3);
    });

    it("debe tener botones Editar para cada producto", () => {
        render(<CatalogoProductos {...defaultProps} />);
        const editarButtons = screen.getAllByText("Editar");
        expect(editarButtons.length).toBe(3);
    });

    it("debe llamar a onVerDetalle cuando se hace clic en Ver Detalle", () => {
        render(<CatalogoProductos {...defaultProps} />);
        const verDetalleButtons = screen.getAllByText("Ver Detalle");
        fireEvent.click(verDetalleButtons[0]);
        expect(defaultProps.onVerDetalle).toHaveBeenCalledWith(mockProductos[0]);
    });

    it("debe llamar a onEditarProducto cuando se hace clic en Editar", () => {
        render(<CatalogoProductos {...defaultProps} />);
        const editarButtons = screen.getAllByText("Editar");
        fireEvent.click(editarButtons[0]);
        expect(defaultProps.onEditarProducto).toHaveBeenCalledWith(mockProductos[0]);
    });

    it("debe mostrar catálogo vacío cuando no hay productos", () => {
        const { container } = render(<CatalogoProductos {...defaultProps} productos={[]} />);
        expect(container.firstChild).toBeInTheDocument();
        expect(screen.queryByTestId(/^card-producto-/)).not.toBeInTheDocument();
    });

    it("debe renderizar con un solo producto", () => {
        render(<CatalogoProductos {...defaultProps} productos={[mockProductos[0]]} />);
        expect(screen.getByTestId("card-producto-1")).toBeInTheDocument();
        expect(screen.queryByTestId("card-producto-2")).not.toBeInTheDocument();
    });

    it("debe tener estructura de grid responsive", () => {
        const { container } = render(<CatalogoProductos {...defaultProps} />);
        const gridContainer = container.firstChild as HTMLElement;
        expect(gridContainer).toHaveStyle({
            display: "grid",
            gap: "16px",
            width: "100%",
        });
    });

    it("debe mantener el orden de los productos del array", () => {
        render(<CatalogoProductos {...defaultProps} />);
        const cards = screen.getAllByTestId(/^card-producto-/);
        expect(cards[0]).toHaveAttribute("data-testid", "card-producto-1");
        expect(cards[1]).toHaveAttribute("data-testid", "card-producto-2");
        expect(cards[2]).toHaveAttribute("data-testid", "card-producto-3");
    });

    it("debe renderizar correctamente múltiples productos", () => {
        const muchasProductos = Array.from({ length: 10 }, (_, i) => ({
            id_producto: i + 1,
            nombre_producto: `Producto ${i + 1}`,
            descripcion_producto: `Descripción ${i + 1}`,
            precio: 100 + i * 10,
            stock: 50,
            categoria: { id_categoria: 1, nombre_categoria: "Verduras", descripcion_categoria: "Verduras frescas" },
        }));

        render(<CatalogoProductos {...defaultProps} productos={muchasProductos} />);
        const cards = screen.getAllByTestId(/^card-producto-/);
        expect(cards.length).toBe(10);
    });
});
