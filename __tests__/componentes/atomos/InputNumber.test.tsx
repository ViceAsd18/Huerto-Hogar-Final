import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InputNumero from "../../../componentes/atomos/InputNumber";

describe("InputNumero Component", () => {
    it("debe renderizar con valor inicial", () => {
        render(<InputNumero valor={5} />);
        const input = screen.getByRole("spinbutton");
        expect(input).toHaveValue(5);
    });

    it("debe ejecutar onChange al cambiar valor", () => {
        const handleChange = vi.fn();
        render(<InputNumero valor={5} onChange={handleChange} />);
        const input = screen.getByRole("spinbutton") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "10" } });
        expect(handleChange).toHaveBeenCalled();
    });

    it("debe tener min por defecto de 1", () => {
        render(<InputNumero valor={5} />);
        const input = screen.getByRole("spinbutton");
        expect(input).toHaveAttribute("min", "1");
    });

    it("debe aceptar min personalizado", () => {
        render(<InputNumero valor={5} min={0} />);
        const input = screen.getByRole("spinbutton");
        expect(input).toHaveAttribute("min", "0");
    });

    it("debe aceptar max personalizado", () => {
        render(<InputNumero valor={5} max={100} />);
        const input = screen.getByRole("spinbutton");
        expect(input).toHaveAttribute("max", "100");
    });
});
