import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BarraFiltros from "./BarraFiltros";

vi.mock("@ant-design/icons", () => ({
    ClearOutlined: () => <span data-testid="clear-icon" />,
}));

vi.mock("antd", () => ({
    Space: ({ children, ...rest }: { children: React.ReactNode }) => (
        <div data-testid="space" {...rest}>{children}</div>
    ),
    Button: ({ children, onClick, icon }: { children: React.ReactNode; onClick?: () => void; icon?: React.ReactNode }) => (
        <button data-testid="limpiar-btn" onClick={onClick}>
            {icon}
            {children}
        </button>
    ),
    Select: ({ value, onChange, options, placeholder, style }: { value?: string; onChange?: (v: string) => void; options?: { value: string; label: string }[]; placeholder?: string; style?: React.CSSProperties }) => (
        <select
            data-testid={`select-${placeholder?.toLowerCase() ?? ""}`}
            value={value ?? ""}
            onChange={(e) => onChange?.(e.target.value)}
            style={style}
        >
            <option value="">{placeholder}</option>
            {options?.map((opt) => (
                <option key={opt.value || opt.label} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    ),
}));

vi.mock("componentes/atomos/Buscador", () => ({
    __esModule: true,
    default: ({ value, onChange, placeholder, width }: { value?: string; onChange?: (v: string) => void; placeholder?: string; width?: number }) => (
        <input
            data-testid="buscador"
            value={value ?? ""}
            placeholder={placeholder}
            style={{ width }}
            onChange={(e) => onChange?.(e.target.value)}
        />
    ),
}));

describe("BarraFiltros", () => {
    const baseProps = {
        busqueda: "tomate",
        onBusquedaChange: vi.fn(),
        categoria: "Ropa",
        onCategoriaChange: vi.fn(),
        disponibilidad: "En stock",
        onDisponibilidadChange: vi.fn(),
    } as const;

    it("renderiza buscador, selects con opciones y valores actuales", () => {
        render(<BarraFiltros {...baseProps} />);

        const buscador = screen.getByTestId("buscador") as HTMLInputElement;
        expect(buscador.value).toBe("tomate");
        expect(buscador).toHaveAttribute("placeholder", "Buscar producto...");

        const selectCategoria = screen.getByTestId("select-categoría") as HTMLSelectElement;
        expect(selectCategoria.value).toBe("Ropa");
        expect(selectCategoria.querySelectorAll("option").length).toBe(5); // placeholder + 4 opciones
        expect(selectCategoria).toHaveTextContent("Electrónica");
        expect(selectCategoria).toHaveTextContent("Ropa");
        expect(selectCategoria).toHaveTextContent("Hogar");
        expect(selectCategoria).toHaveTextContent("Juguetes");

        const selectDispon = screen.getByTestId("select-disponibilidad") as HTMLSelectElement;
        expect(selectDispon.value).toBe("En stock");
        expect(selectDispon.querySelectorAll("option").length).toBe(5); // placeholder + 4 opciones
        const todosOption = Array.from(selectDispon.options).find((opt) => opt.textContent === "Todos");
        expect(todosOption?.value).toBe("");
    });

    it("propaga cambios de buscador, categoria y disponibilidad", () => {
        render(<BarraFiltros {...baseProps} />);

        fireEvent.change(screen.getByTestId("buscador"), { target: { value: "lechuga" } });
        expect(baseProps.onBusquedaChange).toHaveBeenCalledWith("lechuga");

        fireEvent.change(screen.getByTestId("select-categoría"), { target: { value: "Hogar" } });
        expect(baseProps.onCategoriaChange).toHaveBeenCalledWith("Hogar");

        fireEvent.change(screen.getByTestId("select-disponibilidad"), { target: { value: "Stock Bajo" } });
        expect(baseProps.onDisponibilidadChange).toHaveBeenCalledWith("Stock Bajo");
    });

    it("limpiar restablece buscador, categoria y disponibilidad", () => {
        render(<BarraFiltros {...baseProps} />);

        fireEvent.click(screen.getByTestId("limpiar-btn"));
        expect(baseProps.onBusquedaChange).toHaveBeenCalledWith("");
        expect(baseProps.onCategoriaChange).toHaveBeenCalledWith("");
        expect(baseProps.onDisponibilidadChange).toHaveBeenCalledWith("");
    });
});
