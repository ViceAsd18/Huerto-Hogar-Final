import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Titulo from "../../../componentes/atomos/Titulo";

describe("Titulo Component", () => {
    it("debe renderizar título", () => {
        render(<Titulo>Mi Título</Titulo>);
        expect(screen.getByText("Mi Título")).toBeInTheDocument();
    });

    it("debe renderizar con nivel 3 por defecto", () => {
        render(<Titulo>Título</Titulo>);
        const heading = screen.getByText("Título");
        expect(heading.tagName).toBe("H3");
    });

    it("debe renderizar con nivel personalizado", () => {
        render(<Titulo nivel={1}>Título H1</Titulo>);
        const heading = screen.getByText("Título H1");
        expect(heading.tagName).toBe("H1");
    });

    it("debe renderizar diferentes niveles", () => {
        const { rerender } = render(<Titulo nivel={2}>H2</Titulo>);
        expect(screen.getByText("H2").tagName).toBe("H2");

        rerender(<Titulo nivel={4}>H4</Titulo>);
        expect(screen.getByText("H4").tagName).toBe("H4");

        rerender(<Titulo nivel={5}>H5</Titulo>);
        expect(screen.getByText("H5").tagName).toBe("H5");
    });

    it("debe renderizar con variante default", () => {
        render(<Titulo variante="default">Texto</Titulo>);
        expect(screen.getByText("Texto")).toBeInTheDocument();
    });

    it("debe renderizar con variante titulo", () => {
        render(<Titulo variante="titulo">Título Especial</Titulo>);
        expect(screen.getByText("Título Especial")).toBeInTheDocument();
    });

    it("debe aceptar estilos personalizados", () => {
        render(<Titulo style={{ color: "red" }}>Título rojo</Titulo>);
        const title = screen.getByText("Título rojo");
        expect(title).toBeInTheDocument();
    });
});
