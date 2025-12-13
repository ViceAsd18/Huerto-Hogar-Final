import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import VentasGrafico from "componentes/organismo/Vendedor/Dashboard/VentasChart";
import type { Orden } from "services/orden";

vi.mock("antd", async () => {
    const actual = await vi.importActual("antd");
    return {
        ...actual,
        Card: ({ title, children }: { title: string; children: React.ReactNode }) => (
            <div data-testid="card" data-title={title}>
                {children}
            </div>
        ),
    };
});

vi.mock("recharts", () => ({
    LineChart: ({ children, data }: { children: React.ReactNode; data: any[] }) => (
        <div data-testid="line-chart" data-points={data.length}>
            {children}
        </div>
    ),
    Line: () => <div data-testid="line" />,
    XAxis: ({ dataKey }: { dataKey: string }) => <div data-testid="x-axis" data-key={dataKey} />,
    YAxis: () => <div data-testid="y-axis" />,
    Tooltip: () => <div data-testid="tooltip" />,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="responsive-container">{children}</div>
    ),
}));

describe("VentasGrafico Component", () => {
    const mockOrdenes: Orden[] = [
        {
            id_venta: 1,
            usuario: { id_usuario: 1, nombre: "Cliente 1" } as any,
            total: 1000,
            estado: "completada",
            fecha_venta: new Date(2025, 11, 8).toISOString(), // Lunes
            metodo_pago: "tarjeta",
            detalles: [] as any,
        },
        {
            id_venta: 2,
            usuario: { id_usuario: 2, nombre: "Cliente 2" } as any,
            total: 1500,
            estado: "completada",
            fecha_venta: new Date(2025, 11, 9).toISOString(), // Martes
            metodo_pago: "transferencia",
            detalles: [] as any,
        },
        {
            id_venta: 3,
            usuario: { id_usuario: 1, nombre: "Cliente 1" } as any,
            total: 800,
            estado: "pendiente",
            fecha_venta: new Date(2025, 11, 10).toISOString(), // Miércoles (no cuenta, pendiente)
            metodo_pago: "efectivo",
            detalles: [] as any,
        },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar el componente sin errores", () => {
        const { container } = render(<VentasGrafico ordenes={mockOrdenes} />);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("debe mostrar el título 'Ventas de la Semana'", () => {
        render(<VentasGrafico ordenes={mockOrdenes} />);
        const card = screen.getByTestId("card");
        expect(card).toHaveAttribute("data-title", "Ventas de la Semana");
    });

    it("debe renderizar el gráfico de líneas", () => {
        render(<VentasGrafico ordenes={mockOrdenes} />);
        expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    });

    it("debe renderizar todos los ejes", () => {
        render(<VentasGrafico ordenes={mockOrdenes} />);
        expect(screen.getByTestId("x-axis")).toBeInTheDocument();
        expect(screen.getByTestId("y-axis")).toBeInTheDocument();
    });

    it("debe renderizar el tooltip", () => {
        render(<VentasGrafico ordenes={mockOrdenes} />);
        expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    });

    it("debe renderizar la línea del gráfico", () => {
        render(<VentasGrafico ordenes={mockOrdenes} />);
        expect(screen.getByTestId("line")).toBeInTheDocument();
    });

    it("debe renderizar el contenedor responsivo", () => {
        render(<VentasGrafico ordenes={mockOrdenes} />);
        expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    });

    it("debe tener 7 puntos de datos (días de la semana)", () => {
        render(<VentasGrafico ordenes={mockOrdenes} />);
        const chart = screen.getByTestId("line-chart");
        expect(chart).toHaveAttribute("data-points", "7");
    });

    it("debe filtrar solo órdenes completadas", () => {
        const ordenes: Orden[] = [
            {
                id_venta: 1,
                usuario: { id_usuario: 1, nombre: "Cliente 1" } as any,
                total: 1000,
                estado: "completada",
                fecha_venta: new Date(2025, 11, 8).toISOString(),
                metodo_pago: "tarjeta",
                detalles: [] as any,
            },
            {
                id_venta: 2,
                usuario: { id_usuario: 2, nombre: "Cliente 2" } as any,
                total: 2000,
                estado: "cancelada",
                fecha_venta: new Date(2025, 11, 8).toISOString(),
                metodo_pago: "transferencia",
                detalles: [] as any,
            },
        ];

        render(<VentasGrafico ordenes={ordenes} />);
        expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    });

    it("debe renderizar correctamente con lista vacía", () => {
        const { container } = render(<VentasGrafico ordenes={[]} />);
        expect(container.firstChild).toBeInTheDocument();
        expect(screen.getByTestId("line-chart")).toBeInTheDocument();
    });
});
