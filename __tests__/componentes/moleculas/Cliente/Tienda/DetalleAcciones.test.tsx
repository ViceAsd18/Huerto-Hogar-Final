import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DetalleAcciones from "componentes/moleculas/Cliente/Tienda/DetalleAcciones";

describe("DetalleAcciones Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar con stock predeterminado", () => {
        render(<DetalleAcciones />);

        expect(screen.getByText("Stock: 20 kg disponible")).toBeInTheDocument();
    });

    it("debe renderizar con stock personalizado", () => {
        render(<DetalleAcciones stock={50} />);

        expect(screen.getByText("Stock: 50 kg disponible")).toBeInTheDocument();
    });

    it("debe tener input de cantidad con valor inicial 1", () => {
        render(<DetalleAcciones />);

        const input = screen.getByRole("spinbutton");
        expect(input).toHaveValue(1);
    });

    it("debe tener botón Agregar", () => {
        render(<DetalleAcciones />);

        expect(screen.getByText("Agregar")).toBeInTheDocument();
    });

    it("debe llamar onAgregar con la cantidad al hacer clic en Agregar", () => {
        const mockOnAgregar = vi.fn();
        render(<DetalleAcciones onAgregar={mockOnAgregar} />);

        const botonAgregar = screen.getByText("Agregar");
        fireEvent.click(botonAgregar);

        expect(mockOnAgregar).toHaveBeenCalledWith(1);
    });

    it("debe tener InputNumber con límites basados en stock", () => {
        render(<DetalleAcciones stock={50} />);

        const input = screen.getByRole("spinbutton");
        expect(input).toHaveAttribute("min", "1");
        expect(input).toHaveAttribute("max", "50");
    });
});
