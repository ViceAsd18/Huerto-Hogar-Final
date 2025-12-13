import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ModalPago from "componentes/organismo/Vendedor/Modal/ModalPago";

const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

vi.mock("componentes/atomos/Titulo", () => ({
    default: ({ nivel, children }: { nivel: number; children: React.ReactNode }) => (
        <div data-testid="titulo">Título {nivel}: {children}</div>
    ),
}));

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

describe("ModalPago Component", () => {
    const defaultProps = {
        visible: true,
        onClose: vi.fn(),
        ordenId: 123,
        cliente: "Juan Pérez",
        total: 5000,
        onRegistrarPago: vi.fn(),
        confirmLoading: false,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar el componente sin errores", () => {
        render(<ModalPago {...defaultProps} />);
        // Modal se renderiza en un portal, verificamos que aparezca el título
        expect(screen.getByText(/Registrar Pago - Orden #123/i)).toBeInTheDocument();
    });

    it("debe mostrar el título con el número de orden", () => {
        render(<ModalPago {...defaultProps} />);
        expect(screen.getByText(/Registrar Pago - Orden #123/i)).toBeInTheDocument();
    });

    it("debe mostrar la información del cliente", () => {
        render(<ModalPago {...defaultProps} />);
        expect(screen.getByText(/Juan Pérez/)).toBeInTheDocument();
    });

    it("debe mostrar el total a pagar", () => {
        render(<ModalPago {...defaultProps} />);
        // Verificamos que la etiqueta "Total:" esté presente
        const totalLabel = screen.getByText(/Total:/);
        expect(totalLabel).toBeInTheDocument();
        // Verificamos que el contenedor padre contiene el precio formateado
        const parent = totalLabel.closest("span") || totalLabel.parentElement;
        expect(parent?.textContent).toContain("$");
    });

    it("debe mostrar 'Efectivo' como método de pago", () => {
        render(<ModalPago {...defaultProps} />);
        expect(screen.getByText(/Efectivo/)).toBeInTheDocument();
    });

    it("debe mostrar el campo de monto recibido", () => {
        render(<ModalPago {...defaultProps} />);
        const input = screen.getByDisplayValue("5000");
        expect(input).toBeInTheDocument();
    });

    it("no debe mostrar el modal cuando visible es false", () => {
        render(<ModalPago {...defaultProps} visible={false} />);
        // Cuando visible es false, el modal no debe estar visible
        // Verificamos que el título de la orden no esté en el documento
        expect(screen.queryByText(/Registrar Pago - Orden/)).not.toBeInTheDocument();
    });

    it("debe tener botones Registrar Pago y Cerrar", () => {
        render(<ModalPago {...defaultProps} />);
        expect(screen.getByRole("button", { name: /Registrar Pago/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Cerrar/i })).toBeInTheDocument();
    });

    it("debe llamar a onClose cuando se cierra el modal", () => {
        const onClose = vi.fn();
        render(<ModalPago {...defaultProps} onClose={onClose} />);
        const closeButton = screen.getByRole("button", { name: /Cerrar/i });
        fireEvent.click(closeButton);
        expect(onClose).toHaveBeenCalled();
    });

    it("debe permitir cambiar el monto en el input", () => {
        render(<ModalPago {...defaultProps} />);
        const input = screen.getByDisplayValue("5000") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "6000" } });
        expect(input.value).toBe("6000");
    });

    it("debe tener el titulo 'Información del Pago'", () => {
        render(<ModalPago {...defaultProps} />);
        expect(screen.getByTestId("titulo")).toBeInTheDocument();
    });

    it("debe mostrar todos los campos de información correctamente", () => {
        render(<ModalPago {...defaultProps} />);
        expect(screen.getByText(/Cliente:/)).toBeInTheDocument();
        expect(screen.getByText(/Total:/)).toBeInTheDocument();
        expect(screen.getByText(/Método de pago:/)).toBeInTheDocument();
    });
});
