import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import DetalleOrdenClientePage from "componentes/paginas/Cliente/Ordenes/DetalleOrdenClientePage";
import type { Orden } from "services/orden";

// Mocks
const mockGetOrdenById = vi.fn();

vi.mock("services/orden", () => ({
    getOrdenById: (...args: [number]) => mockGetOrdenById(...args),
}));

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
    const actual = await vi.importActual<any>("react-router");
    return {
        ...actual,
        useParams: () => ({ id: "1" }),
        useNavigate: () => mockNavigate,
    };
});

vi.mock("componentes/layout/ClienteLayout", () => ({
    default: ({ children }: any) => <div data-testid="cliente-layout">{children}</div>,
}));

vi.mock("componentes/organismo/Cliente/Orden/InfoOrdenHeader", () => ({
    default: ({ fecha, total, metodo_pago, estado }: any) => (
        <div data-testid="info-orden-header">
            <p>{fecha}</p>
            <p>{total}</p>
            <p>{metodo_pago}</p>
            <p>{estado}</p>
        </div>
    ),
}));

vi.mock("componentes/organismo/Cliente/Productos/ListaProductosOrden", () => ({
    default: ({ detalles }: any) => (
        <div data-testid="lista-productos">{detalles?.length ?? 0} productos</div>
    ),
}));

vi.mock("componentes/atomos/Titulo", () => ({
    default: ({ children }: any) => <h1>{children}</h1>,
}));

describe("DetalleOrdenClientePage Component", () => {
    const ordenMock: Orden = {
        id_venta: 123,
        fecha_venta: "2025-12-01",
        total: 10000,
        metodo_pago: "tarjeta",
        estado: "pendiente",
        usuario: {
            id_usuario: 7,
            nombre: "Cliente Uno",
            rol: "cliente",
        },
        detalles: [
            {
                id_detalle: 1,
                cantidad: 2,
                subtotal: 10000,
                producto: {
                    id_producto: 1,
                    nombre_producto: "Tomate",
                    precio: 5000,
                    descripcion_producto: "",
                    stock: 5,
                },
            },
        ],
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockGetOrdenById.mockResolvedValue(ordenMock);
    });

    it("debe mostrar loading mientras carga", () => {
        mockGetOrdenById.mockImplementationOnce(() => new Promise(() => {}));

        const { container } = render(
            <BrowserRouter>
                <DetalleOrdenClientePage />
            </BrowserRouter>
        );

        expect(container.querySelector(".ant-spin")).toBeInTheDocument();
    });

    it("debe mostrar mensaje si la orden no existe", async () => {
        mockGetOrdenById.mockResolvedValueOnce(null);

        render(
            <BrowserRouter>
                <DetalleOrdenClientePage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("La orden que buscas no existe.")).toBeInTheDocument();
        });
    });

    it("debe renderizar datos de la orden", async () => {
        render(
            <BrowserRouter>
                <DetalleOrdenClientePage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Detalle de Orden #123")).toBeInTheDocument();
        });

        expect(screen.getByTestId("info-orden-header")).toBeInTheDocument();
        expect(screen.getByTestId("lista-productos")).toBeInTheDocument();
        expect(screen.getByText("Total: $10.000")).toBeInTheDocument();
    });

    it("debe navegar al listado al hacer clic en Volver", async () => {
        render(
            <BrowserRouter>
                <DetalleOrdenClientePage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Detalle de Orden #123")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Volver a Mis Órdenes"));
        expect(mockNavigate).toHaveBeenCalledWith("/cliente/mis-ordenes");
    });
});
