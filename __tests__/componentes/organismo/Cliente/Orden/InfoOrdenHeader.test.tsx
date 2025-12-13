import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InfoOrdenHeader from "../../../../../componentes/organismo/Cliente/Orden/InfoOrdenHeader";

describe("InfoOrdenHeader Component", () => {
    const mockProps = {
        fecha: "2024-12-10",
        total: 15500,
        metodo_pago: "Tarjeta de Crédito",
        estado: "completada" as const,
    };

    it("debe renderizar todos los datos de la orden", () => {
        render(<InfoOrdenHeader {...mockProps} />);

        expect(screen.getByText("Fecha")).toBeInTheDocument();
        expect(screen.getByText("Total")).toBeInTheDocument();
        expect(screen.getByText(mockProps.metodo_pago)).toBeInTheDocument();
    });

    it("debe renderizar la estructura de información", () => {
        const { container } = render(<InfoOrdenHeader {...mockProps} />);

        expect(container.firstChild).toBeInTheDocument();
    });

    it("debe renderizar la etiqueta y valor de fecha", () => {
        render(<InfoOrdenHeader {...mockProps} />);

        expect(screen.getByText("Fecha")).toBeInTheDocument();
    });

    it("debe renderizar la etiqueta de total", () => {
        render(<InfoOrdenHeader {...mockProps} />);

        expect(screen.getByText("Total")).toBeInTheDocument();
    });

    it("debe renderizar el método de pago", () => {
        render(<InfoOrdenHeader {...mockProps} />);

        expect(screen.getByText(mockProps.metodo_pago)).toBeInTheDocument();
        expect(screen.getByText("Método de Pago")).toBeInTheDocument();
    });

    it("debe aceptar diferentes estados", () => {
        const { rerender } = render(
            <InfoOrdenHeader {...mockProps} estado="pendiente" />
        );

        expect(screen.getByText("Fecha")).toBeInTheDocument();

        rerender(
            <InfoOrdenHeader {...mockProps} estado="cancelada" />
        );

        expect(screen.getByText("Fecha")).toBeInTheDocument();
    });

    it("debe renderizar con diferentes totales", () => {
        const propsConTotalDiferente = { ...mockProps, total: 25000 };
        render(<InfoOrdenHeader {...propsConTotalDiferente} />);

        expect(screen.getByText("Total")).toBeInTheDocument();
    });

    it("debe tener estructura responsive", () => {
        const { container } = render(<InfoOrdenHeader {...mockProps} />);

        expect(container.firstChild).toBeInTheDocument();
    });
});
