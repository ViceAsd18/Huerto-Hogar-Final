import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DetalleAcciones from "./DetalleAcciones";

vi.mock("componentes/atomos/Texto", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <span data-testid="texto">{children}</span>,
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
    InputNumber: ({ value, min, max, onChange, style }: {
        value?: number;
        min?: number;
        max?: number;
        onChange?: (v: number | null) => void;
        style?: React.CSSProperties;
    }) => (
        <input
            data-testid="input-number"
            type="number"
            value={value ?? ""}
            min={min}
            max={max}
            style={style}
            onChange={(e) => onChange?.(e.target.value === "" ? null : Number(e.target.value))}
        />
    ),
}));

describe("DetalleAcciones", () => {
    it("muestra el stock disponible y configura limites del input", () => {
        render(<DetalleAcciones stock={15} />);

        expect(screen.getByTestId("texto")).toHaveTextContent("Stock: 15 kg disponible");
        const input = screen.getByTestId("input-number");
        expect(input).toHaveAttribute("min", "1");
        expect(input).toHaveAttribute("max", "15");
        expect(input).toHaveValue(1);
    });

    it("actualiza cantidad y llama onAgregar con el valor seleccionado", () => {
        const onAgregar = vi.fn();
        render(<DetalleAcciones stock={8} onAgregar={onAgregar} />);

        fireEvent.change(screen.getByTestId("input-number"), { target: { value: "3" } });
        fireEvent.click(screen.getByTestId("boton"));

        expect(onAgregar).toHaveBeenCalledTimes(1);
        expect(onAgregar).toHaveBeenCalledWith(3);
    });

    it("no falla si onAgregar no se proporciona", () => {
        render(<DetalleAcciones stock={5} />);

        fireEvent.click(screen.getByTestId("boton"));
        // no assertion needed; just ensure no throw
    });
});
