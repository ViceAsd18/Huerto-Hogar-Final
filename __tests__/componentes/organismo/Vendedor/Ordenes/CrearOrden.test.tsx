import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CrearOrden from "componentes/organismo/Vendedor/Ordenes/CrearOrden";
import type { Producto } from "services/productos";

vi.mock("antd", async () => {
    const actual = await vi.importActual("antd");
    return {
        ...actual,
        message: {
            error: vi.fn(),
            success: vi.fn(),
        },
    };
});

vi.mock("componentes/moleculas/Vendedor/Orden/ProductoFila", () => ({
    default: ({ producto, onAgregar }: { producto: Producto; onAgregar: (p: Producto) => void }) => (
        <div data-testid={`producto-fila-${producto.id_producto}`}>
            {producto.nombre_producto}
            <button onClick={() => onAgregar(producto)}>Agregar</button>
        </div>
    ),
}));

vi.mock("componentes/moleculas/Vendedor/Orden/OrdenItem", () => ({
    default: ({ producto }: { producto: any }) => (
        <div data-testid={`orden-item-${producto.id_producto}`}>
            {producto.nombre_producto} x{producto.cantidad}
        </div>
    ),
}));

vi.mock("componentes/atomos/Boton", () => ({
    default: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
        <button onClick={onClick}>{children}</button>
    ),
}));

vi.mock("componentes/atomos/SelectOpciones", () => ({
    default: ({ valor, onChange, opciones }: { valor: any; onChange: (v: any) => void; opciones: any[] }) => (
        <select value={valor || ""} onChange={(e) => onChange(Number(e.target.value) || undefined)}>
            <option value="">Seleccione un cliente</option>
            {opciones.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    ),
}));

vi.mock("componentes/atomos/Titulo", () => ({
    default: ({ nivel, children }: { nivel: number; children: React.ReactNode }) => (
        <div data-testid="titulo">Titulo {nivel}: {children}</div>
    ),
}));

describe("CrearOrden Component", () => {
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
    ];

    const mockClientes = [
        { id_usuario: 1, nombre: "Juan Pérez" },
        { id_usuario: 2, nombre: "María García" },
    ];

    const defaultProps = {
        productosDisponibles: mockProductos,
        clientes: mockClientes,
        onGenerarOrden: vi.fn(),
        onPagarOrden: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar el componente sin errores", () => {
        const { container } = render(<CrearOrden {...defaultProps} />);
        expect(container).toBeInTheDocument();
    });

    it("debe mostrar todos los productos disponibles", () => {
        render(<CrearOrden {...defaultProps} />);
        expect(screen.getByTestId("producto-fila-1")).toBeInTheDocument();
        expect(screen.getByTestId("producto-fila-2")).toBeInTheDocument();
    });

    it("debe mostrar el título 'Detalle de la Orden'", () => {
        render(<CrearOrden {...defaultProps} />);
        expect(screen.getByText(/Detalle de la Orden/i)).toBeInTheDocument();
    });

    it("debe mostrar el selector de clientes", () => {
        render(<CrearOrden {...defaultProps} />);
        const select = screen.getByRole("combobox");
        expect(select).toBeInTheDocument();
    });

    it("debe mostrar opciones de clientes en el selector", () => {
        render(<CrearOrden {...defaultProps} />);
        const select = screen.getByRole("combobox") as HTMLSelectElement;
        const options = select.querySelectorAll("option");
        expect(options.length).toBe(3); // 1 placeholder + 2 clientes
    });

    it("debe agregar producto al carrito", () => {
        render(<CrearOrden {...defaultProps} />);
        const agregarBtns = screen.getAllByText("Agregar");
        fireEvent.click(agregarBtns[0]);
        expect(screen.getByTestId("orden-item-1")).toBeInTheDocument();
    });

    it("debe mostrar el subtotal", () => {
        render(<CrearOrden {...defaultProps} />);
        expect(screen.getByText(/Subtotal:/)).toBeInTheDocument();
    });

    it("debe mostrar el impuesto del 19%", () => {
        render(<CrearOrden {...defaultProps} />);
        expect(screen.getByText(/Impuesto 19%:/)).toBeInTheDocument();
    });

    it("debe mostrar el total", () => {
        render(<CrearOrden {...defaultProps} />);
        expect(screen.getByText(/Total:/)).toBeInTheDocument();
    });

    it("debe mostrar botones Generar Orden y Pagar Orden", () => {
        render(<CrearOrden {...defaultProps} />);
        expect(screen.getByRole("button", { name: /Generar Orden/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Pagar Orden/i })).toBeInTheDocument();
    });

    it("debe mostrar buscador de productos", () => {
        render(<CrearOrden {...defaultProps} />);
        const searchInput = screen.getByPlaceholderText("Buscar producto...");
        expect(searchInput).toBeInTheDocument();
    });

    it("debe filtrar productos al buscar", () => {
        render(<CrearOrden {...defaultProps} />);
        const searchInput = screen.getByPlaceholderText("Buscar producto...") as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: "Tomate" } });
        expect(screen.getByTestId("producto-fila-1")).toBeInTheDocument();
        expect(screen.queryByTestId("producto-fila-2")).not.toBeInTheDocument();
    });

    it("debe calcular correctamente el subtotal con un producto", () => {
        render(<CrearOrden {...defaultProps} />);
        const agregarBtns = screen.getAllByText("Agregar");
        fireEvent.click(agregarBtns[0]);
        expect(screen.getByText(/Subtotal: \$100\.00/)).toBeInTheDocument();
    });

    it("debe calcular correctamente el impuesto (19%)", () => {
        render(<CrearOrden {...defaultProps} />);
        const agregarBtns = screen.getAllByText("Agregar");
        fireEvent.click(agregarBtns[0]);
        expect(screen.getByText(/Impuesto 19%: \$19\.00/)).toBeInTheDocument();
    });

    it("debe calcular correctamente el total", () => {
        render(<CrearOrden {...defaultProps} />);
        const agregarBtns = screen.getAllByText("Agregar");
        fireEvent.click(agregarBtns[0]);
        expect(screen.getByText(/Total: \$119\.00/)).toBeInTheDocument();
    });

    it("debe no permitir generar orden sin cliente seleccionado", () => {
        render(<CrearOrden {...defaultProps} />);
        const generarBtn = screen.getByRole("button", { name: /Generar Orden/i });
        fireEvent.click(generarBtn);
        expect(defaultProps.onGenerarOrden).not.toHaveBeenCalled();
    });

    it("debe no permitir pagar orden sin productos", () => {
        render(<CrearOrden {...defaultProps} />);
        const select = screen.getByRole("combobox") as HTMLSelectElement;
        fireEvent.change(select, { target: { value: "1" } });
        const pagarBtn = screen.getByRole("button", { name: /Pagar Orden/i });
        fireEvent.click(pagarBtn);
        expect(defaultProps.onPagarOrden).not.toHaveBeenCalled();
    });

    it("debe permitir generar orden con cliente y productos", () => {
        render(<CrearOrden {...defaultProps} />);
        // Agregar producto
        const agregarBtns = screen.getAllByText("Agregar");
        fireEvent.click(agregarBtns[0]);
        // Seleccionar cliente
        const select = screen.getByRole("combobox") as HTMLSelectElement;
        fireEvent.change(select, { target: { value: "1" } });
        // Generar orden
        const generarBtn = screen.getByRole("button", { name: /Generar Orden/i });
        fireEvent.click(generarBtn);
        expect(defaultProps.onGenerarOrden).toHaveBeenCalledWith(1, expect.any(Array));
    });

    it("debe permitir pagar orden con cliente y productos", () => {
        render(<CrearOrden {...defaultProps} />);
        // Agregar producto
        const agregarBtns = screen.getAllByText("Agregar");
        fireEvent.click(agregarBtns[0]);
        // Seleccionar cliente
        const select = screen.getByRole("combobox") as HTMLSelectElement;
        fireEvent.change(select, { target: { value: "1" } });
        // Pagar orden
        const pagarBtn = screen.getByRole("button", { name: /Pagar Orden/i });
        fireEvent.click(pagarBtn);
        expect(defaultProps.onPagarOrden).toHaveBeenCalledWith(1, expect.any(Array));
    });
});
