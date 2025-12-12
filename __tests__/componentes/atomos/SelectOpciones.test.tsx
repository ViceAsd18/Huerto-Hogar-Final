import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SelectOpciones from "../../../componentes/atomos/SelectOpciones";

describe("SelectOpciones Component", () => {
    const opciones = [
        { label: "Opción 1", value: 1 },
        { label: "Opción 2", value: 2 },
        { label: "Opción 3", value: 3 },
    ];

    it("debe renderizar select", () => {
        const handleChange = vi.fn();
        render(
            <SelectOpciones 
                opciones={opciones} 
                onChange={handleChange}
            />
        );
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("debe mostrar placeholder personalizado", () => {
        const handleChange = vi.fn();
        render(
            <SelectOpciones 
                opciones={opciones} 
                onChange={handleChange}
                placeholder="Selecciona una opción"
            />
        );
        expect(screen.getByPlaceholderText("Selecciona una opción")).toBeInTheDocument();
    });

    it("debe aceptar onChange callback", () => {
        const handleChange = vi.fn();
        render(
            <SelectOpciones 
                opciones={opciones} 
                onChange={handleChange}
            />
        );
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("debe aceptar múltiples opciones", () => {
        const handleChange = vi.fn();
        const muchasOpciones = [
            { label: "Opción A", value: 1 },
            { label: "Opción B", value: 2 },
            { label: "Opción C", value: 3 },
            { label: "Opción D", value: 4 },
            { label: "Opción E", value: 5 },
        ];
        render(
            <SelectOpciones 
                opciones={muchasOpciones} 
                onChange={handleChange}
            />
        );
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
});


