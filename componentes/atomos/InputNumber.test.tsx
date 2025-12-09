import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InputNumero from "./InputNumber";

vi.mock("antd", () => ({
    InputNumber: ({ value, onChange, min, max }: {
        value?: number;
        onChange?: (value: number | null) => void;
        min?: number;
        max?: number;
    }) => (
        <input
            data-testid="input-number"
            type="number"
            value={value ?? ""}
            min={min}
            max={max}
            onChange={(e) => onChange?.(e.target.value === "" ? null : Number(e.target.value))}
        />
    ),
}));

describe("InputNumero", () => {
    it("renderiza valor y min por defecto", () => {
        render(<InputNumero valor={5} />);

        const input = screen.getByTestId("input-number") as HTMLInputElement;
        expect(input.value).toBe("5");
        expect(input).toHaveAttribute("min", "1");
    });

    it("propaga max cuando se proporciona", () => {
        render(<InputNumero valor={2} max={10} />);

        expect(screen.getByTestId("input-number")).toHaveAttribute("max", "10");
    });

    it("llama onChange con el numero ingresado", () => {
        const handleChange = vi.fn();
        render(<InputNumero valor={1} onChange={handleChange} />);

        fireEvent.change(screen.getByTestId("input-number"), { target: { value: "7" } });
        expect(handleChange).toHaveBeenCalledWith(7);
    });

    it("envia 0 cuando el valor entrante es null o cadena vacia", () => {
        const handleChange = vi.fn();
        render(<InputNumero valor={3} onChange={handleChange} />);

        fireEvent.change(screen.getByTestId("input-number"), { target: { value: "" } });
        expect(handleChange).toHaveBeenCalledWith(0);
    });
});
