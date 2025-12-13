import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ControlsTabla from "componentes/organismo/Vendedor/Controls/ControlsTabla";

describe("ControlsTabla Component", () => {
    const mockOnBusquedaChange = vi.fn();
    const mockOnFiltroChange = vi.fn();
    const mockOnBotonClick = vi.fn();

    beforeEach(() => {
        mockOnBusquedaChange.mockClear();
        mockOnFiltroChange.mockClear();
        mockOnBotonClick.mockClear();
    });

    it("debe renderizar el componente sin errores", () => {
        const { container } = render(
            <ControlsTabla
                busqueda=""
                onBusquedaChange={mockOnBusquedaChange}
            />
        );
        expect(container.firstChild).toBeInTheDocument();
    });

    it("debe renderizar el input de búsqueda", () => {
        render(
            <ControlsTabla
                busqueda=""
                onBusquedaChange={mockOnBusquedaChange}
            />
        );
        const input = screen.getByPlaceholderText("Buscar...");
        expect(input).toBeInTheDocument();
    });

    it("debe usar placeholder personalizado en búsqueda", () => {
        render(
            <ControlsTabla
                busqueda=""
                onBusquedaChange={mockOnBusquedaChange}
                placeholderBusqueda="Buscar productos..."
            />
        );
        expect(screen.getByPlaceholderText("Buscar productos...")).toBeInTheDocument();
    });

    it("debe actualizar el valor de búsqueda cuando se escribe", () => {
        render(
            <ControlsTabla
                busqueda=""
                onBusquedaChange={mockOnBusquedaChange}
            />
        );
        const input = screen.getByPlaceholderText("Buscar...") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "tomate" } });
        expect(mockOnBusquedaChange).toHaveBeenCalled();
    });

    it("debe mostrar el filtro cuando hay opciones", () => {
        render(
            <ControlsTabla
                busqueda=""
                onBusquedaChange={mockOnBusquedaChange}
                opcionesFiltro={["Verduras", "Frutas", "Granos"]}
            />
        );
        expect(screen.getByPlaceholderText("Filtrar...")).toBeInTheDocument();
    });

    it("no debe mostrar el filtro cuando no hay opciones", () => {
        render(
            <ControlsTabla
                busqueda=""
                onBusquedaChange={mockOnBusquedaChange}
                opcionesFiltro={[]}
            />
        );
        expect(screen.queryByPlaceholderText("Filtrar...")).not.toBeInTheDocument();
    });

    it("debe mostrar el botón cuando hay callback", () => {
        render(
            <ControlsTabla
                busqueda=""
                onBusquedaChange={mockOnBusquedaChange}
                onBotonClick={mockOnBotonClick}
            />
        );
        expect(screen.getByRole("button", { name: /Agregar/i })).toBeInTheDocument();
    });

    it("no debe mostrar el botón cuando no hay callback", () => {
        render(
            <ControlsTabla
                busqueda=""
                onBusquedaChange={mockOnBusquedaChange}
            />
        );
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("debe usar texto personalizado en el botón", () => {
        render(
            <ControlsTabla
                busqueda=""
                onBusquedaChange={mockOnBusquedaChange}
                textoBoton="Nuevo Producto"
                onBotonClick={mockOnBotonClick}
            />
        );
        expect(screen.getByRole("button", { name: /Nuevo Producto/i })).toBeInTheDocument();
    });

    it("debe llamar al callback cuando se hace clic en el botón", () => {
        render(
            <ControlsTabla
                busqueda=""
                onBusquedaChange={mockOnBusquedaChange}
                onBotonClick={mockOnBotonClick}
            />
        );
        const boton = screen.getByRole("button");
        fireEvent.click(boton);
        expect(mockOnBotonClick).toHaveBeenCalled();
    });

    it("debe mostrar todas las opciones de filtro", () => {
        render(
            <ControlsTabla
                busqueda=""
                onBusquedaChange={mockOnBusquedaChange}
                opcionesFiltro={["Verduras", "Frutas", "Granos"]}
                onFiltroChange={mockOnFiltroChange}
            />
        );
        const select = screen.getByPlaceholderText("Filtrar...") as HTMLInputElement;
        expect(select).toBeInTheDocument();
    });

    it("debe mantener el valor de búsqueda actualizado", () => {
        const { rerender } = render(
            <ControlsTabla
                busqueda="tomate"
                onBusquedaChange={mockOnBusquedaChange}
            />
        );
        const input = screen.getByPlaceholderText("Buscar...") as HTMLInputElement;
        expect(input.value).toBe("tomate");

        rerender(
            <ControlsTabla
                busqueda="papa"
                onBusquedaChange={mockOnBusquedaChange}
            />
        );
        expect(input.value).toBe("papa");
    });
});
