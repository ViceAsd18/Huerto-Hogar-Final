import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Titulo from "./Titulo";

vi.mock("antd", () => ({
    Typography: {
        Title: ({ level, children, style }: {
            level?: 1 | 2 | 3 | 4 | 5;
            children: React.ReactNode;
            style?: React.CSSProperties;
        }) => (
            <h1 data-testid="titulo" data-level={level} style={style}>
                {children}
            </h1>
        ),
    },
}));

describe("Titulo", () => {
    it("usa nivel por defecto 3 y sin estilo extra en variante default", () => {
        render(<Titulo>Hola</Titulo>);

        const titulo = screen.getByTestId("titulo");
        expect(titulo).toHaveAttribute("data-level", "3");
        expect(titulo.getAttribute("style") || "").toBe("");
        expect(titulo).toHaveTextContent("Hola");
    });

    it("combina estilo de variante titulo con custom style", () => {
        render(
            <Titulo variante="titulo" style={{ marginBottom: 8, color: "blue" }}>
                Destacado
            </Titulo>
        );

        const titulo = screen.getByTestId("titulo");
        expect(titulo.getAttribute("style")).toContain("color: blue");
        expect(titulo.getAttribute("style")).toMatch(/font-family:\s*"?Playfair Display"?,\s*serif/);
        expect(titulo.getAttribute("style")).toContain("font-size: calc(1.2em + 1.2vw)");
        expect(titulo.getAttribute("style")).toContain("margin-bottom: 8px");
    });

    it("permite cambiar el nivel", () => {
        render(<Titulo nivel={1}>Titulo H1</Titulo>);

        expect(screen.getByTestId("titulo")).toHaveAttribute("data-level", "1");
    });
});
