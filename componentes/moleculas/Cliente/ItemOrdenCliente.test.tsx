import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ItemOrdenCliente from "./ItemOrdenCliente";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

vi.mock("componentes/atomos/BadgeEstado", () => ({
    __esModule: true,
    default: ({ estado }: { estado: string }) => <div data-testid="badge-estado">{estado}</div>,
}));

vi.mock("componentes/atomos/Boton", () => ({
    __esModule: true,
    default: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
        <button data-testid="boton" onClick={onClick}>
            {children}
        </button>
    ),
}));

vi.mock("antd", () => ({
    Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
    Row: ({ children }: { children: React.ReactNode }) => <div data-testid="row">{children}</div>,
    Col: ({ children }: { children: React.ReactNode }) => <div data-testid="col">{children}</div>,
    Typography: {
        Text: ({ children, type }: { children: React.ReactNode; type?: string }) => (
            <span data-testid="text" data-type={type}>
                {children}
            </span>
        ),
    },
}));

describe("ItemOrdenCliente", () => {
    const orden = {
        id_venta: 10,
        fecha_venta: "2025-01-10T00:00:00.000Z",
        total: 50000,
        estado: "pendiente",
    } as any;

    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it("muestra id, fecha, total y estado", () => {
        const dateSpy = vi.spyOn(Date.prototype, "toLocaleDateString").mockReturnValue("10-01-2025");
        const numberSpy = vi.spyOn(Number.prototype, "toLocaleString").mockReturnValue("50.000");

        render(<ItemOrdenCliente orden={orden} />);

        expect(screen.getByText("#10")).toBeInTheDocument();
        expect(screen.getByText("10-01-2025")).toBeInTheDocument();
        expect(screen.getByText("$50.000")).toBeInTheDocument();
        expect(screen.getByTestId("badge-estado")).toHaveTextContent("pendiente");

        dateSpy.mockRestore();
        numberSpy.mockRestore();
    });

    it("navega al detalle al hacer click en Ver detalle", () => {
        render(<ItemOrdenCliente orden={orden} />);

        fireEvent.click(screen.getByTestId("boton"));
        expect(mockNavigate).toHaveBeenCalledWith("/cliente/orden/10");
    });
});
