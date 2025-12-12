import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Buscador from "../../../componentes/atomos/Buscador";

describe("Buscador Component", () => {
    it("debe renderizar con placeholder por defecto", () => {
        const handleChange = vi.fn();
        render(<Buscador value="" onChange={handleChange} />);
        expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
    });

    it("debe renderizar con placeholder personalizado", () => {
        const handleChange = vi.fn();
        render(<Buscador placeholder="Buscar productos" value="" onChange={handleChange} />);
        expect(screen.getByPlaceholderText("Buscar productos")).toBeInTheDocument();
    });

    it("debe mostrar el valor ingresado", () => {
        const handleChange = vi.fn();
        render(<Buscador value="test" onChange={handleChange} />);
        expect(screen.getByDisplayValue("test")).toBeInTheDocument();
    });

    it("debe ejecutar onChange al escribir", () => {
        const handleChange = vi.fn();
        render(<Buscador value="" onChange={handleChange} />);
        const input = screen.getByPlaceholderText("Buscar...");
        fireEvent.change(input, { target: { value: "nuevo" } });
        expect(handleChange).toHaveBeenCalledWith("nuevo");
    });

    it("debe tener ancho personalizado", () => {
        const handleChange = vi.fn();
        const { container } = render(<Buscador value="" onChange={handleChange} width={300} />);
        const input = container.querySelector("input");
        expect(input?.style.maxWidth).toBe("300px");
    });
});
