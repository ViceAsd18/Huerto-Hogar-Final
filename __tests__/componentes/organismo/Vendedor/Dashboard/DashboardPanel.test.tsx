import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import DashboardPanel from "componentes/organismo/Vendedor/Dashboard/DashboardPanel";
import type { Orden } from "services/orden";

const mockGetOrdenes = vi.fn();
vi.mock("services/orden", () => ({
    getOrdenes: () => mockGetOrdenes(),
}));

vi.mock("componentes/moleculas/Vendedor/Dashboard/StatCard", () => ({
    default: ({ title, value }: { title: string; value: string | number }) => (
        <div data-testid={`stat-card-${title}`}>{title}: {value}</div>
    ),
}));

vi.mock("componentes/organismo/Vendedor/Dashboard/VentasChart", () => ({
    default: () => <div data-testid="ventas-grafico">Gráfico de Ventas</div>,
}));

vi.mock("componentes/atomos/PrecioProducto", () => ({
    default: ({ valor }: { valor?: number | null }) => <span>${valor ? valor.toFixed(2) : "0.00"}</span>,
}));

vi.mock("componentes/atomos/BadgeEstado", () => ({
    default: ({ estado }: { estado: string }) => <span>{estado}</span>,
}));

vi.mock("componentes/atomos/Fecha", () => ({
    default: ({ fecha }: { fecha: string }) => <span>{new Date(fecha).toLocaleDateString()}</span>,
}));

vi.mock("antd", async () => {
    const actual = await vi.importActual("antd");
    return {
        ...actual,
        Alert: ({ message, description }: { message: string; description: string }) => (
            <div data-testid="alert" role="alert">{message}: {description}</div>
        ),
    };
});

describe("DashboardPanel Component", () => {
    const mockOrdenes: Orden[] = [
        {
            id_venta: 1,
            usuario: { id_usuario: 1, nombre: "Cliente 1" } as any,
            total: 1000,
            estado: "completada",
            fecha_venta: new Date().toISOString(),
            metodo_pago: "tarjeta",
            detalles: [] as any,
        },
        {
            id_venta: 2,
            usuario: { id_usuario: 2, nombre: "Cliente 2" } as any,
            total: 1500,
            estado: "pendiente",
            fecha_venta: new Date().toISOString(),
            metodo_pago: "transferencia",
            detalles: [] as any,
        },
        {
            id_venta: 3,
            usuario: { id_usuario: 1, nombre: "Cliente 1" } as any,
            total: 800,
            estado: "cancelada",
            fecha_venta: new Date().toISOString(),
            metodo_pago: "efectivo",
            detalles: [] as any,
        },
    ];

    beforeEach(() => {
        mockGetOrdenes.mockClear();
        mockGetOrdenes.mockResolvedValue(mockOrdenes);
    });

    it("debe renderizar el componente sin errores", async () => {
        const { container } = render(<DashboardPanel />);
        await waitFor(() => {
            expect(container.firstChild).toBeInTheDocument();
        });
    });

    it("debe cargar las órdenes al montar", async () => {
        render(<DashboardPanel />);
        await waitFor(() => {
            expect(mockGetOrdenes).toHaveBeenCalled();
        });
    });

    it("debe mostrar las tarjetas de estadísticas después de cargar", async () => {
        render(<DashboardPanel />);
        await waitFor(() => {
            expect(screen.getByTestId("stat-card-Ventas Mes")).toBeInTheDocument();
            expect(screen.getByTestId("stat-card-Pendientes")).toBeInTheDocument();
            expect(screen.getByTestId("stat-card-Completadas")).toBeInTheDocument();
            expect(screen.getByTestId("stat-card-Canceladas")).toBeInTheDocument();
            expect(screen.getByTestId("stat-card-Clientes Activos")).toBeInTheDocument();
        });
    });

    it("debe mostrar el gráfico de ventas", async () => {
        render(<DashboardPanel />);
        await waitFor(() => {
            expect(screen.getByTestId("ventas-grafico")).toBeInTheDocument();
        });
    });

    it("debe contar correctamente las órdenes por estado", async () => {
        render(<DashboardPanel />);
        await waitFor(() => {
            expect(screen.getByTestId("stat-card-Pendientes")).toHaveTextContent("1");
            expect(screen.getByTestId("stat-card-Completadas")).toHaveTextContent("1");
            expect(screen.getByTestId("stat-card-Canceladas")).toHaveTextContent("1");
        });
    });

    it("debe mostrar mensaje de error cuando falla la carga", async () => {
        mockGetOrdenes.mockRejectedValue(new Error("Error de red"));
        render(<DashboardPanel />);
        await waitFor(() => {
            const alert = screen.getByTestId("alert");
            expect(alert).toBeInTheDocument();
            expect(alert).toHaveTextContent("Error");
        });
    });

    it("debe mostrar lista vacía cuando no hay órdenes", async () => {
        mockGetOrdenes.mockResolvedValue([]);
        const { container } = render(<DashboardPanel />);
        await waitFor(() => {
            const tabla = container.querySelector("table");
            expect(tabla).toBeInTheDocument();
        });
    });

    it("debe renderizar la tabla con datos", async () => {
        render(<DashboardPanel />);
        await waitFor(() => {
            const tabla = document.querySelector("table");
            expect(tabla).toBeInTheDocument();
        });
    });
});
