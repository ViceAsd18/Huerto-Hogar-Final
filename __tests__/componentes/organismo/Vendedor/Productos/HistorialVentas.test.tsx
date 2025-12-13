import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import HistorialVentas from "componentes/organismo/Vendedor/Productos/HistorialVentas";
import type { Venta } from "componentes/organismo/Vendedor/Productos/HistorialVentas";

const mockVentas: Venta[] = [
    {
        key: "1",
        idOrden: "ORD-001",
        fecha: "2025-12-01",
        cantidad: 5,
        precioTotal: "$500.00",
    },
    {
        key: "2",
        idOrden: "ORD-002",
        fecha: "2025-12-02",
        cantidad: 3,
        precioTotal: "$300.00",
    },
];

vi.mock("antd", () => {
    const React = require("react");

    const MockCard = ({ children, style, bodyStyle }: any) =>
        React.createElement("div", { "data-testid": "card", style }, children);

    const MockTable = ({ columns, dataSource, pagination, size }: any) =>
        React.createElement(
            "table",
            { "data-testid": "table" },
            React.createElement(
                "thead",
                null,
                React.createElement(
                    "tr",
                    null,
                    columns.map((col: any) =>
                        React.createElement("th", { key: col.key }, col.title)
                    )
                )
            ),
            React.createElement(
                "tbody",
                null,
                dataSource.map((row: any) =>
                    React.createElement(
                        "tr",
                        { key: row.key },
                        columns.map((col: any) =>
                            React.createElement(
                                "td",
                                { key: `${row.key}-${col.key}` },
                                row[col.dataIndex]
                            )
                        )
                    )
                )
            )
        );

    return {
        Card: MockCard,
        Table: MockTable,
    };
});

vi.mock("componentes/atomos/Titulo", () => ({
    default: ({ children, nivel }: any) =>
        require("react").createElement(`h${nivel}`, { "data-testid": "titulo" }, children),
}));

describe("HistorialVentas Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar el componente sin errores", () => {
        const { container } = render(<HistorialVentas ventas={mockVentas} />);
        expect(container).toBeInTheDocument();
    });

    it("debe mostrar el título 'Historial de Ventas'", () => {
        render(<HistorialVentas ventas={mockVentas} />);
        expect(screen.getByText("Historial de Ventas")).toBeInTheDocument();
    });

    it("debe renderizar el Card", () => {
        render(<HistorialVentas ventas={mockVentas} />);
        expect(screen.getByTestId("card")).toBeInTheDocument();
    });

    it("debe renderizar la tabla", () => {
        render(<HistorialVentas ventas={mockVentas} />);
        expect(screen.getByTestId("table")).toBeInTheDocument();
    });

    it("debe mostrar todos los encabezados de columna", () => {
        render(<HistorialVentas ventas={mockVentas} />);
        expect(screen.getByText("ID de Orden")).toBeInTheDocument();
        expect(screen.getByText("Fecha")).toBeInTheDocument();
        expect(screen.getByText("Cantidad")).toBeInTheDocument();
        expect(screen.getByText("Precio Total")).toBeInTheDocument();
    });

    it("debe mostrar todas las filas de datos en la tabla", () => {
        render(<HistorialVentas ventas={mockVentas} />);
        expect(screen.getByText("ORD-001")).toBeInTheDocument();
        expect(screen.getByText("ORD-002")).toBeInTheDocument();
    });

    it("debe mostrar las fechas de las ventas", () => {
        render(<HistorialVentas ventas={mockVentas} />);
        expect(screen.getByText("2025-12-01")).toBeInTheDocument();
        expect(screen.getByText("2025-12-02")).toBeInTheDocument();
    });

    it("debe mostrar las cantidades de las ventas", () => {
        render(<HistorialVentas ventas={mockVentas} />);
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("debe mostrar los precios totales", () => {
        render(<HistorialVentas ventas={mockVentas} />);
        expect(screen.getByText("$500.00")).toBeInTheDocument();
        expect(screen.getByText("$300.00")).toBeInTheDocument();
    });

    it("debe renderizar correctamente con un array vacío de ventas", () => {
        render(<HistorialVentas ventas={[]} />);
        expect(screen.getByTestId("table")).toBeInTheDocument();
    });

    it("debe renderizar una sola venta correctamente", () => {
        const unaVenta = [mockVentas[0]];
        render(<HistorialVentas ventas={unaVenta} />);
        expect(screen.getByText("ORD-001")).toBeInTheDocument();
    });
});
