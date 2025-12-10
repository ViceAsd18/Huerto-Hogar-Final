import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import VentasGrafico from "./VentasChart";

const captured: Record<string, any> = {};

vi.mock("recharts", () => ({
    ResponsiveContainer: ({ children, width, height }: any) => (
        <div data-testid="responsive" data-width={width} data-height={height}>
            {children}
        </div>
    ),
    LineChart: (props: any) => {
        captured.lineChart = props;
        return <div data-testid="linechart">{props.children}</div>;
    },
    XAxis: (props: any) => {
        captured.xAxis = props;
        return <div data-testid="xaxis" />;
    },
    YAxis: (props: any) => {
        captured.yAxis = props;
        return <div data-testid="yaxis" />;
    },
    Tooltip: (props: any) => {
        captured.tooltip = props;
        return <div data-testid="tooltip" />;
    },
    Line: (props: any) => {
        captured.line = props;
        return <div data-testid="line" />;
    },
}));

vi.mock("antd", () => ({
    Card: ({ children, title, style }: { children: React.ReactNode; title?: React.ReactNode; style?: React.CSSProperties }) => (
        <div data-testid="card" data-title={title} style={style}>
            {children}
        </div>
    ),
}));

describe("VentasGrafico", () => {
    beforeEach(() => {
        Object.keys(captured).forEach((k) => delete captured[k]);
    });

    const ordenes = [
        { id_venta: 1, fecha_venta: new Date(Date.UTC(2025, 0, 5, 12)).toISOString(), total: 200, estado: "completada" }, // Dom
        { id_venta: 2, fecha_venta: new Date(Date.UTC(2025, 0, 7, 12)).toISOString(), total: 100, estado: "completada" }, // Mar
        { id_venta: 3, fecha_venta: new Date(Date.UTC(2025, 0, 7, 18)).toISOString(), total: 50, estado: "completada" }, // Mar
        { id_venta: 4, fecha_venta: new Date(Date.UTC(2025, 0, 8, 12)).toISOString(), total: 999, estado: "pendiente" }, // Mié ignored
    ] as any;

    it("agrega totales por dia de la semana y los pasa al LineChart", () => {
        render(<VentasGrafico ordenes={ordenes} />);

        expect(captured.lineChart.data).toEqual([
            { fecha: "Dom", total: 200 },
            { fecha: "Lun", total: 0 },
            { fecha: "Mar", total: 150 },
            { fecha: "Mié", total: 0 },
            { fecha: "Jue", total: 0 },
            { fecha: "Vie", total: 0 },
            { fecha: "Sáb", total: 0 },
        ]);
    });

    it("configura ejes, tooltip y linea con props esperados", () => {
        render(<VentasGrafico ordenes={ordenes} />);

        expect(captured.xAxis.dataKey).toBe("fecha");
        expect(captured.yAxis.tickFormatter(123)).toBe("$123");
        expect(captured.tooltip.formatter(123)).toBe("$123.00");
        expect(captured.line.dataKey).toBe("total");
        expect(captured.line.stroke).toBe("#1754cf");
    });

    it("usa ResponsiveContainer con ancho 100% y altura 250", () => {
        render(<VentasGrafico ordenes={ordenes} />);

        const responsive = document.querySelector('[data-testid="responsive"]') as HTMLElement;
        expect(responsive.getAttribute("data-width")).toBe("100%");
        expect(responsive.getAttribute("data-height")).toBe("250");
    });
});
