import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Texto from "../../../componentes/atomos/Texto";

describe("Texto Component", () => {
    it("debe renderizar texto con children", () => {
        render(<Texto>Mi texto</Texto>);
        expect(screen.getByText("Mi texto")).toBeInTheDocument();
    });

    it("debe renderizar con strong false por defecto", () => {
        render(<Texto>Texto normal</Texto>);
        const text = screen.getByText("Texto normal");
        expect(text).toBeInTheDocument();
    });

    it("debe renderizar con strong true", () => {
        render(<Texto strong={true}>Texto fuerte</Texto>);
        expect(screen.getByText("Texto fuerte")).toBeInTheDocument();
    });

    it("debe renderizar diferentes variantes", () => {
        const { rerender } = render(<Texto variante="default">Texto</Texto>);
        expect(screen.getByText("Texto")).toBeInTheDocument();

        rerender(<Texto variante="descripcion">Descripción</Texto>);
        expect(screen.getByText("Descripción")).toBeInTheDocument();

        rerender(<Texto variante="muted">Muted</Texto>);
        expect(screen.getByText("Muted")).toBeInTheDocument();
    });

    it("debe aceptar type de Typography", () => {
        render(<Texto type="danger">Error</Texto>);
        expect(screen.getByText("Error")).toBeInTheDocument();
    });

    it("debe aceptar estilos personalizados", () => {
        render(<Texto style={{ color: "blue" }}>Texto azul</Texto>);
        const text = screen.getByText("Texto azul");
        expect(text).toBeInTheDocument();
    });
});
