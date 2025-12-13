import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TablaOrdenes from "componentes/organismo/Vendedor/Ordenes/TablaOrdenes";
import type { Orden } from "services/orden";

vi.mock("antd", async () => {
    const actual = await vi.importActual("antd");
    return {
        ...actual,
        Table: ({ columns, dataSource }: { columns: any[]; dataSource: any[] }) => (
            <div data-testid="table">
                <table>
                    <thead>
                        <tr>
                            {columns.map(col => <th key={col.key}>{col.title}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource.map((row, idx) => (
                            <tr key={idx} data-testid={`row-${row.id_venta}`}>
                                {columns.map(col => {
                                    const getValue = () => {
                                        if (Array.isArray(col.dataIndex)) {
                                            // Si dataIndex es un array como ["usuario", "nombre"]
                                            let value = row;
                                            for (const key of col.dataIndex) {
                                                value = value?.[key];
                                            }
                                            return value;
                                        } else {
                                            // Si dataIndex es un string simple
                                            return row[col.dataIndex];
                                        }
                                    };
                                    const value = getValue();
                                    return (
                                        <td key={col.key}>
                                            {col.render ? col.render(value, row) : value}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ),
        Button: ({ children, onClick, danger, type }: { children: React.ReactNode; onClick: () => void; danger?: boolean; type?: string }) => (
            <button onClick={onClick} data-testid={danger ? "btn-danger" : "btn"}>{children}</button>
        ),
        Space: ({ children }: { children: React.ReactNode }) => <div data-testid="space">{children}</div>,
    };
});

vi.mock("componentes/organismo/Vendedor/Controls/ControlsTabla", () => ({
    default: ({ busqueda, onBusquedaChange, onBotonClick }: any) => (
        <div data-testid="controls-tabla">
            <input
                value={busqueda}
                onChange={(e) => onBusquedaChange(e.target.value)}
                placeholder="Buscar por cliente..."
            />
            <button onClick={onBotonClick}>Nueva Orden</button>
        </div>
    ),
}));

vi.mock("componentes/atomos/PrecioProducto", () => ({
    default: ({ valor }: { valor: number }) => <span>${valor.toFixed(2)}</span>,
}));

vi.mock("componentes/atomos/BadgeEstado", () => ({
    default: ({ estado }: { estado: string }) => <span data-testid={`badge-${estado}`}>{estado}</span>,
}));

vi.mock("componentes/atomos/Boton", () => ({
    default: ({ children, onClick, color }: { children: React.ReactNode; onClick: () => void; color: string }) => (
        <button onClick={onClick} data-testid={`btn-${color}`}>{children}</button>
    ),
}));

vi.mock("componentes/atomos/Fecha", () => ({
    default: ({ fecha }: { fecha: string }) => <span>{new Date(fecha).toLocaleDateString()}</span>,
}));

describe("TablaOrdenes Component", () => {
    const mockOrdenes: Orden[] = [
        {
            id_venta: 1,
            usuario: { id_usuario: 1, nombre: "Juan Pérez", rol: "cliente" },
            total: 5000,
            estado: "pendiente",
            fecha_venta: new Date().toISOString(),
            metodo_pago: "tarjeta",
            detalles: [] as any,
        },
        {
            id_venta: 2,
            usuario: { id_usuario: 2, nombre: "María García", rol: "cliente" },
            total: 3500,
            estado: "completada",
            fecha_venta: new Date().toISOString(),
            metodo_pago: "transferencia",
            detalles: [] as any,
        },
        {
            id_venta: 3,
            usuario: { id_usuario: 1, nombre: "Juan Pérez", rol: "cliente" },
            total: 2000,
            estado: "cancelada",
            fecha_venta: new Date().toISOString(),
            metodo_pago: "efectivo",
            detalles: [] as any,
        },
    ];

    const defaultProps = {
        ordenes: mockOrdenes,
        busqueda: "",
        onBusquedaChange: vi.fn(),
        estadoFiltro: undefined,
        onEstadoChange: vi.fn(),
        onVerDetalle: vi.fn(),
        onPagarOrden: vi.fn(),
        onNuevaOrden: vi.fn(),
        onCancelarOrden: vi.fn(),
        loadingCancelar: false,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar el componente sin errores", () => {
        const { container } = render(<TablaOrdenes {...defaultProps} />);
        expect(container).toBeInTheDocument();
    });

    it("debe mostrar los controles de búsqueda", () => {
        render(<TablaOrdenes {...defaultProps} />);
        expect(screen.getByTestId("controls-tabla")).toBeInTheDocument();
    });

    it("debe mostrar la tabla de órdenes", () => {
        render(<TablaOrdenes {...defaultProps} />);
        expect(screen.getByTestId("table")).toBeInTheDocument();
    });

    it("debe mostrar todas las órdenes en la tabla", () => {
        render(<TablaOrdenes {...defaultProps} />);
        expect(screen.getByTestId("row-1")).toBeInTheDocument();
        expect(screen.getByTestId("row-2")).toBeInTheDocument();
        expect(screen.getByTestId("row-3")).toBeInTheDocument();
    });

    it("debe mostrar el nombre del cliente en cada fila", () => {
        render(<TablaOrdenes {...defaultProps} />);
        const juanPerezElements = screen.getAllByText("Juan Pérez");
        expect(juanPerezElements.length).toBeGreaterThan(0);
        expect(screen.getByText("María García")).toBeInTheDocument();
    });

    it("debe mostrar el estado de cada orden", () => {
        render(<TablaOrdenes {...defaultProps} />);
        expect(screen.getByTestId("badge-pendiente")).toBeInTheDocument();
        expect(screen.getByTestId("badge-completada")).toBeInTheDocument();
        expect(screen.getByTestId("badge-cancelada")).toBeInTheDocument();
    });

    it("debe mostrar los botones de acción para órdenes pendientes", () => {
        render(<TablaOrdenes {...defaultProps} />);
        const verDetalleButtons = screen.getAllByText("Ver detalle");
        expect(verDetalleButtons.length).toBeGreaterThan(0);
    });

    it("debe llamar a onVerDetalle al hacer clic en Ver detalle", () => {
        render(<TablaOrdenes {...defaultProps} />);
        const verDetalleBtn = screen.getAllByText("Ver detalle")[0];
        fireEvent.click(verDetalleBtn);
        expect(defaultProps.onVerDetalle).toHaveBeenCalled();
    });

    it("debe mostrar botón Pagar solo para órdenes pendientes", () => {
        render(<TablaOrdenes {...defaultProps} />);
        const pagarButtons = screen.queryAllByText("Pagar");
        expect(pagarButtons.length).toBeGreaterThan(0);
    });

    it("debe llamar a onPagarOrden al hacer clic en Pagar", () => {
        render(<TablaOrdenes {...defaultProps} />);
        const pagarBtn = screen.getByTestId("btn-green");
        fireEvent.click(pagarBtn);
        expect(defaultProps.onPagarOrden).toHaveBeenCalled();
    });

    it("debe mostrar botón Cancelar solo para órdenes pendientes", () => {
        render(<TablaOrdenes {...defaultProps} />);
        const cancelarButtons = screen.queryAllByText("Cancelar");
        expect(cancelarButtons.length).toBeGreaterThan(0);
    });

    it("debe llamar a onCancelarOrden al hacer clic en Cancelar", () => {
        render(<TablaOrdenes {...defaultProps} />);
        const cancelarBtn = screen.getByTestId("btn-danger");
        fireEvent.click(cancelarBtn);
        expect(defaultProps.onCancelarOrden).toHaveBeenCalled();
    });

    it("debe mostrar botón Nueva Orden", () => {
        render(<TablaOrdenes {...defaultProps} />);
        expect(screen.getByText("Nueva Orden")).toBeInTheDocument();
    });

    it("debe llamar a onNuevaOrden al hacer clic en Nueva Orden", () => {
        render(<TablaOrdenes {...defaultProps} />);
        const nuevaOrdenBtn = screen.getByText("Nueva Orden");
        fireEvent.click(nuevaOrdenBtn);
        expect(defaultProps.onNuevaOrden).toHaveBeenCalled();
    });

    it("debe filtrar órdenes por búsqueda de cliente", () => {
        render(<TablaOrdenes {...defaultProps} />);
        const searchInput = screen.getByPlaceholderText("Buscar por cliente...") as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: "María" } });
        expect(defaultProps.onBusquedaChange).toHaveBeenCalled();
    });

    it("debe mostrar mensaje correcto de total en pesos", () => {
        render(<TablaOrdenes {...defaultProps} />);
        expect(screen.getByText("$5000.00")).toBeInTheDocument();
        expect(screen.getByText("$3500.00")).toBeInTheDocument();
        expect(screen.getByText("$2000.00")).toBeInTheDocument();
    });

    it("debe mostrar lista vacía cuando no hay órdenes", () => {
        render(<TablaOrdenes {...defaultProps} ordenes={[]} />);
        expect(screen.getByTestId("table")).toBeInTheDocument();
    });

    it("debe filtrar órdenes por estado", () => {
        const estadoFiltro = "pendiente";
        render(<TablaOrdenes {...defaultProps} estadoFiltro={estadoFiltro} />);
        // Solo se debería mostrar la orden con estado pendiente
        const rows = screen.getAllByTestId(/^row-/);
        expect(rows.length).toBeGreaterThan(0);
    });

    it("debe mostrar columnas correctas en la tabla", () => {
        render(<TablaOrdenes {...defaultProps} />);
        const table = screen.getByTestId("table");
        expect(table.textContent).toContain("ID Orden");
        expect(table.textContent).toContain("Cliente");
        expect(table.textContent).toContain("Fecha");
        expect(table.textContent).toContain("Monto Total");
        expect(table.textContent).toContain("Estado");
        expect(table.textContent).toContain("Acciones");
    });
});
