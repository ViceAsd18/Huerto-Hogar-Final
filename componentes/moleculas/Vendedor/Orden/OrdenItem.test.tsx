import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import OrdenItem from "./OrdenItem";

vi.mock("componentes/atomos/Imagen", () => ({
    __esModule: true,
    default: ({ src, alt, width, height, style }: { src?: string; alt?: string; width?: number | string; height?: number | string; style?: React.CSSProperties }) => (
        <img data-testid="imagen" src={src} alt={alt} width={width as any} height={height as any} style={style} />
    ),
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
    InputNumber: ({ value, min, onChange }: { value?: number; min?: number; onChange?: (v: number | null) => void }) => (
        <input
            data-testid="input-number"
            type="number"
            value={value ?? ""}
            min={min}
            onChange={(e) => onChange?.(e.target.value === "" ? null : Number(e.target.value))}
        />
    ),
}));

describe("OrdenItem", () => {
    const baseProducto = {
        id_producto: 5,
        nombre_producto: "Tomate Cherry",
        precio: 10,
        cantidad: 3,
    } as any;

    it("renderiza nombre, imagen normalizada y total calculado", () => {
        render(
            <OrdenItem
                producto={baseProducto}
                onCantidadChange={() => {}}
                onEliminar={() => {}}
            />
        );

        expect(screen.getByText("Tomate Cherry")).toBeInTheDocument();

        const img = screen.getByTestId("imagen");
        expect(img).toHaveAttribute("src", "/assets/img/productos/tomate_cherry.jpg");
        expect(img).toHaveAttribute("alt", "Tomate Cherry");
        expect(screen.getByText("$30.00")).toBeInTheDocument();
    });

    it("propaga cambio de cantidad con id del producto", () => {
        const onCantidadChange = vi.fn();
        render(
            <OrdenItem
                producto={baseProducto}
                onCantidadChange={onCantidadChange}
                onEliminar={() => {}}
            />
        );

        fireEvent.change(screen.getByTestId("input-number"), { target: { value: "7" } });
        expect(onCantidadChange).toHaveBeenCalledWith(5, 7);
    });

    it("llama onEliminar con el id del producto", () => {
        const onEliminar = vi.fn();
        render(
            <OrdenItem
                producto={baseProducto}
                onCantidadChange={() => {}}
                onEliminar={onEliminar}
            />
        );

        fireEvent.click(screen.getByTestId("boton"));
        expect(onEliminar).toHaveBeenCalledWith(5);
    });

    it("establece min=1 y muestra cantidad actual en el input", () => {
        render(
            <OrdenItem
                producto={baseProducto}
                onCantidadChange={() => {}}
                onEliminar={() => {}}
            />
        );

        const input = screen.getByTestId("input-number");
        expect(input).toHaveAttribute("min", "1");
        expect(input).toHaveValue(3);
    });
});
