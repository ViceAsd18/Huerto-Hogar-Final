import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import TablaProductoDetalle from "componentes/organismo/Vendedor/Productos/TablaProductoDetalle";
import type { Orden } from "services/orden";

const mockDetalles: Orden["detalles"] = [
    {
        id_detalle: 1,
        cantidad: 2,
        subtotal: 100,
        producto: {
            id_producto: 1,
            nombre_producto: "Tomate Rojo",
            descripcion_producto: "Tomate rojo fresco",
            precio: 50,
            stock: 100,
        },
    },
    {
        id_detalle: 2,
        cantidad: 3,
        subtotal: 150,
        producto: {
            id_producto: 2,
            nombre_producto: "Lechuga Verde",
            descripcion_producto: "Lechuga fresca",
            precio: 50,
            stock: 150,
        },
    },
];

vi.mock("antd", () => {
    const React = require("react");

    const MockTable = ({ columns, dataSource, pagination, rowKey, size }: any) =>
        React.createElement(
            "table",
            { "data-testid": "tabla-detalle" },
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
                        { key: row[rowKey] },
                        columns.map((col: any) => {
                            let cellValue: any = row;
                            if (col.dataIndex) {
                                if (Array.isArray(col.dataIndex)) {
                                    col.dataIndex.forEach((index: string) => {
                                        cellValue = cellValue?.[index];
                                    });
                                } else {
                                    cellValue = cellValue[col.dataIndex];
                                }
                            }
                            const displayValue = col.render
                                ? col.render(null, row)
                                : cellValue;
                            return React.createElement(
                                "td",
                                { key: `${row[rowKey]}-${col.key}` },
                                displayValue
                            );
                        })
                    )
                )
            )
        );

    return {
        Table: MockTable,
    };
});

describe("TablaProductoDetalle Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar el componente sin errores", () => {
        const { container } = render(<TablaProductoDetalle detalles={mockDetalles} />);
        expect(container).toBeInTheDocument();
    });

    it("debe renderizar la tabla", () => {
        render(<TablaProductoDetalle detalles={mockDetalles} />);
        expect(screen.getByTestId("tabla-detalle")).toBeInTheDocument();
    });

    it("debe mostrar los encabezados de columna", () => {
        render(<TablaProductoDetalle detalles={mockDetalles} />);
        expect(screen.getByText("Producto")).toBeInTheDocument();
        expect(screen.getByText("Cantidad")).toBeInTheDocument();
        expect(screen.getByText("Precio Unit.")).toBeInTheDocument();
        expect(screen.getByText("Subtotal")).toBeInTheDocument();
    });

    it("debe mostrar los nombres de los productos", () => {
        render(<TablaProductoDetalle detalles={mockDetalles} />);
        expect(screen.getByText("Tomate Rojo")).toBeInTheDocument();
        expect(screen.getByText("Lechuga Verde")).toBeInTheDocument();
    });

    it("debe mostrar las cantidades correctas", () => {
        render(<TablaProductoDetalle detalles={mockDetalles} />);
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("debe mostrar el precio unitario formateado", () => {
        render(<TablaProductoDetalle detalles={mockDetalles} />);
        const precios = screen.getAllByText("$50");
        expect(precios.length).toBeGreaterThan(0);
    });

    it("debe mostrar los subtotales formateados", () => {
        render(<TablaProductoDetalle detalles={mockDetalles} />);
        expect(screen.getByText("$100")).toBeInTheDocument();
        expect(screen.getByText("$150")).toBeInTheDocument();
    });

    it("debe renderizar correctamente con un array vacío de detalles", () => {
        render(<TablaProductoDetalle detalles={[]} />);
        expect(screen.getByTestId("tabla-detalle")).toBeInTheDocument();
    });

    it("debe renderizar un solo detalle correctamente", () => {
        render(<TablaProductoDetalle detalles={[mockDetalles[0]]} />);
        expect(screen.getByText("Tomate Rojo")).toBeInTheDocument();
        expect(screen.queryByText("Lechuga Verde")).not.toBeInTheDocument();
    });

    it("debe usar el id_detalle como rowKey", () => {
        const { container } = render(<TablaProductoDetalle detalles={mockDetalles} />);
        const rows = container.querySelectorAll("tbody tr");
        expect(rows.length).toBe(2);
    });
});
