import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ControlsTabla from "./ControlsTabla";

vi.mock("antd", () => {
    const Select = ({ value, onChange, children, placeholder, style }: { value?: string; onChange?: (v: string) => void; children?: React.ReactNode; placeholder?: string; style?: React.CSSProperties }) => (
        <select
            data-testid="select-filtro"
            value={value ?? ""}
            onChange={(e) => onChange?.(e.target.value)}
            style={style}
        >
            {placeholder && <option value="">{placeholder}</option>}
            {children}
        </select>
    );
    // attach Option to mimic antd API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Select as any).Option = ({ value, children }: { value: string; children: React.ReactNode }) => (
        <option value={value}>{children}</option>
    );

    return {
        Input: ({ value, onChange, placeholder }: { value?: string; onChange?: (e: any) => void; placeholder?: string }) => (
            <input
                data-testid="input-busqueda"
                value={value ?? ""}
                placeholder={placeholder}
                onChange={(e) => onChange?.(e)}
            />
        ),
        Select,
        Button: ({ children, onClick, style }: { children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties }) => (
            <button data-testid="boton" onClick={onClick} style={style}>
                {children}
            </button>
        ),
        Row: ({ children }: { children: React.ReactNode }) => <div data-testid="row">{children}</div>,
        Col: ({ children }: { children: React.ReactNode }) => <div data-testid="col">{children}</div>,
    };
});

describe("ControlsTabla", () => {
    it("muestra buscador con placeholder y propaga cambios", () => {
        const onBusquedaChange = vi.fn();
        render(
            <ControlsTabla
                busqueda="pera"
                onBusquedaChange={onBusquedaChange}
            />
        );

        const input = screen.getByTestId("input-busqueda") as HTMLInputElement;
        expect(input.value).toBe("pera");
        expect(input).toHaveAttribute("placeholder", "Buscar...");

        fireEvent.change(input, { target: { value: "manzana" } });
        expect(onBusquedaChange).toHaveBeenCalledWith("manzana");
    });

    it("renderiza select de filtro cuando hay opciones y propaga cambio", () => {
        const onFiltroChange = vi.fn();
        render(
            <ControlsTabla
                busqueda=""
                onBusquedaChange={() => {}}
                filtro="Rojo"
                onFiltroChange={onFiltroChange}
                opcionesFiltro={["Rojo", "Verde"]}
            />
        );

        const select = screen.getByTestId("select-filtro") as HTMLSelectElement;
        expect(select.value).toBe("Rojo");
        // placeholder + "Todos" + 2 options => 3 options rendered (placeholder doubled? placeholder plus explicit "Todos")
        expect(select.querySelectorAll("option").length).toBe(4);

        fireEvent.change(select, { target: { value: "Verde" } });
        expect(onFiltroChange).toHaveBeenCalledWith("Verde");
    });

    it("muestra boton cuando onBotonClick existe y usa texto personalizado", () => {
        const onBotonClick = vi.fn();
        render(
            <ControlsTabla
                busqueda=""
                onBusquedaChange={() => {}}
                onBotonClick={onBotonClick}
                textoBoton="Crear"
            />
        );

        const boton = screen.getByTestId("boton");
        expect(boton).toHaveTextContent("Crear");
        fireEvent.click(boton);
        expect(onBotonClick).toHaveBeenCalled();
    });
});
