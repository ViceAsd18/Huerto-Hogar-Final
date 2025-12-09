import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Buscador from "./Buscador";

vi.mock("@ant-design/icons", () => ({
    SearchOutlined: () => <span data-testid="search-icon" />,
}));

vi.mock("antd", () => ({
    Input: ({ placeholder, prefix, value, onChange, style, allowClear }: {
        placeholder?: string;
        prefix?: React.ReactNode;
        value?: string;
        onChange?: React.ChangeEventHandler<HTMLInputElement>;
        style?: React.CSSProperties;
        allowClear?: boolean;
    }) => (
        <div>
            {prefix}
            <input
                data-testid="buscador-input"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={style}
                data-allow-clear={allowClear ? "true" : "false"}
            />
        </div>
    ),
}));

describe("Buscador", () => {
    it("renderiza placeholder por defecto y muestra el icono", () => {
        render(<Buscador value="" onChange={() => {}} />);

        expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
        expect(screen.getByTestId("search-icon")).toBeInTheDocument();
    });

    it("propaga el value recibido", () => {
        render(<Buscador value="tomate" onChange={() => {}} />);

        expect(screen.getByTestId("buscador-input")).toHaveValue("tomate");
    });

    it("llama onChange con el nuevo texto", () => {
        const handleChange = vi.fn();
        render(<Buscador value="" onChange={handleChange} />);

        fireEvent.change(screen.getByTestId("buscador-input"), { target: { value: "pepino" } });
        expect(handleChange).toHaveBeenCalledWith("pepino");
    });

    it("aplica maxWidth basado en width", () => {
        render(<Buscador value="" onChange={() => {}} width={320} />);

        expect(screen.getByTestId("buscador-input")).toHaveStyle({ maxWidth: "320px" });
    });

    it("habilita allowClear en el input", () => {
        render(<Buscador value="" onChange={() => {}} />);

        expect(screen.getByTestId("buscador-input")).toHaveAttribute("data-allow-clear", "true");
    });
});
