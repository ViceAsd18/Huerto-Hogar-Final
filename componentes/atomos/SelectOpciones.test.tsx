import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SelectOpciones from "./SelectOpciones";

vi.mock("antd", () => ({
    Select: ({
        showSearch,
        value,
        onChange,
        placeholder,
        optionFilterProp,
        style,
        filterOption,
        options,
    }: {
        showSearch?: boolean;
        value?: number;
        onChange?: (value: number) => void;
        placeholder?: string;
        optionFilterProp?: string;
        style?: React.CSSProperties;
        filterOption?: (input: string, option?: { label?: string }) => boolean;
        options?: { label: string; value: number }[];
    }) => (
        <div>
            <div data-testid="select-props" data-show-search={showSearch} data-placeholder={placeholder} data-option-filter-prop={optionFilterProp} style={style} />
            <input
                data-testid="select-input"
                value={value ?? ""}
                onChange={(e) => {
                    const newValue = Number(e.target.value);
                    onChange?.(newValue);
                }}
            />
            <div data-testid="options">
                {options?.map((opt) => (
                    <div key={opt.value} data-label={opt.label} data-value={opt.value}>
                        {opt.label}
                    </div>
                ))}
            </div>
            <button
                data-testid="filter-btn"
                onClick={() => {
                    const matches = filterOption?.("pe", options?.[0]);
                    (window as any).__filterMatch = matches;
                }}
            >
                filter
            </button>
        </div>
    ),
}));

describe("SelectOpciones", () => {
    const opciones = [
        { label: "Pera", value: 1 },
        { label: "Manzana", value: 2 },
    ];

    it("pasa props basicos y renderiza opciones", () => {
        render(<SelectOpciones opciones={opciones} valor={2} onChange={() => {}} placeholder="Elige" />);

        const propsNode = screen.getByTestId("select-props");
        expect(propsNode).toHaveAttribute("data-show-search", "true");
        expect(propsNode).toHaveAttribute("data-placeholder", "Elige");
        expect(propsNode).toHaveAttribute("data-option-filter-prop", "label");
        expect(propsNode).toHaveStyle({ width: "100%" });

        const renderedOptions = screen.getAllByTestId(/options/)[0].children;
        expect(renderedOptions).toHaveLength(2);
        expect(renderedOptions[1]).toHaveAttribute("data-label", "Manzana");
    });

    it("invoca onChange con el nuevo valor numerico", () => {
        const handleChange = vi.fn();
        render(<SelectOpciones opciones={opciones} valor={1} onChange={handleChange} />);

        fireEvent.change(screen.getByTestId("select-input"), { target: { value: "2" } });
        expect(handleChange).toHaveBeenCalledWith(2);
    });

    it("usa filterOption para comparar etiquetas", () => {
        render(<SelectOpciones opciones={opciones} valor={1} onChange={() => {}} />);

        fireEvent.click(screen.getByTestId("filter-btn"));
        expect((window as any).__filterMatch).toBe(true);
    });
});
