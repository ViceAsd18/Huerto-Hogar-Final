import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CardProductoCliente from "./CardProductoCliente";

const mockNavigate = vi.fn();
const mockAgregarAlCarrito = vi.fn();

vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

vi.mock("auth/CartContext", () => ({
    useCart: () => ({ agregarAlCarrito: mockAgregarAlCarrito }),
}));

vi.mock("@ant-design/icons", () => ({
    ShoppingCartOutlined: () => <span data-testid="icon-cart" />,
    EyeOutlined: () => <span data-testid="icon-eye" />,
}));

vi.mock("../../atomos/Imagen", () => ({
    __esModule: true,
    default: ({ src, alt }: { src?: string; alt?: string }) => (
        <img data-testid="imagen" src={src} alt={alt} />
    ),
}));

vi.mock("../../atomos/BadgeStock", () => ({
    __esModule: true,
    default: ({ stock }: { stock: number }) => (
        <div data-testid="badge-stock" data-stock={stock} />
    ),
}));

const messageSuccess = vi.fn();

vi.mock("antd", () => ({
    Card: ({ children, ...rest }: { children: React.ReactNode }) => (
        <div data-testid="card" {...rest}>
            {children}
        </div>
    ),
    Row: ({ children, ...rest }: { children: React.ReactNode }) => (
        <div data-testid="row" {...rest}>
            {children}
        </div>
    ),
    Col: ({ children, ...rest }: { children: React.ReactNode }) => (
        <div data-testid="col" {...rest}>
            {children}
        </div>
    ),
    Button: ({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) => (
        <button disabled={disabled} onClick={disabled ? undefined : onClick}>
            {children}
        </button>
    ),
    Tag: ({ children }: { children: React.ReactNode }) => <span data-testid="tag">{children}</span>,
    message: {
        success: (msg: string) => messageSuccess(msg),
    },
}));

describe("CardProductoCliente", () => {
    const baseProducto = {
        id_producto: 1,
        nombre_producto: "Tomate Cherry",
        precio: 5000,
        descripcion_producto: "Tomates dulces",
        stock: 3,
        categoria: { nombre_categoria: "Verduras" },
    } as any;

    beforeEach(() => {
        mockNavigate.mockClear();
        mockAgregarAlCarrito.mockClear();
        messageSuccess.mockClear();
    });

    it("renderiza datos basicos, imagen y badge de stock", () => {
        const precioSpy = vi.spyOn(Number.prototype, "toLocaleString").mockReturnValue("5.000");

        render(<CardProductoCliente producto={baseProducto} />);

        expect(screen.getByTestId("tag")).toHaveTextContent("Verduras");
        expect(screen.getByText("Tomate Cherry")).toBeInTheDocument();
        expect(screen.getByText("$5.000")).toBeInTheDocument();

        const img = screen.getByTestId("imagen");
        expect(img).toHaveAttribute("src", "/assets/img/productos/tomate_cherry.jpg");
        expect(img).toHaveAttribute("alt", "Tomate Cherry");

        expect(screen.getByTestId("badge-stock")).toHaveAttribute("data-stock", "3");

        precioSpy.mockRestore();
    });

    it("navega al detalle al clickear Ver", () => {
        render(<CardProductoCliente producto={baseProducto} />);

        fireEvent.click(screen.getByText("Ver"));
        expect(mockNavigate).toHaveBeenCalledWith("/cliente/producto/1");
    });

    it("agrega al carrito y muestra mensaje cuando hay stock", () => {
        render(<CardProductoCliente producto={baseProducto} />);

        fireEvent.click(screen.getByText("Agregar"));

        expect(mockAgregarAlCarrito).toHaveBeenCalledWith(baseProducto);
        expect(messageSuccess).toHaveBeenCalledWith("¡Producto agregado!");
    });

    it("deshabilita el boton Agregar cuando no hay stock", () => {
        const sinStock = { ...baseProducto, stock: 0 };
        render(<CardProductoCliente producto={sinStock} />);

        expect(screen.getByText("Agregar")).toBeDisabled();
    });

    it("no navega si el boton Agregar es deshabilitado", () => {
        const sinStock = { ...baseProducto, stock: 0 };
        render(<CardProductoCliente producto={sinStock} />);

        fireEvent.click(screen.getByText("Agregar"));
        expect(mockAgregarAlCarrito).not.toHaveBeenCalled();
        expect(messageSuccess).not.toHaveBeenCalled();
    });
});
