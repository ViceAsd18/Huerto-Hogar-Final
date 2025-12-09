import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Texto from "./Texto";

vi.mock("antd", () => ({
    Typography: {
        Text: ({ children, type, strong, style }: {
            children: React.ReactNode;
            type?: string;
            strong?: boolean;
            style?: React.CSSProperties;
        }) => (
            <span data-testid="texto" data-type={type} data-strong={strong ? "true" : "false"} style={style}>
                {children}
            </span>
        ),
    },
}));

describe("Texto", () => {
    it("renderiza el contenido y aplica type/strong", () => {
        render(
            <Texto type="warning" strong>
                Hola
            </Texto>
        );

        const el = screen.getByTestId("texto");
        expect(el).toHaveTextContent("Hola");
        expect(el).toHaveAttribute("data-type", "warning");
        expect(el).toHaveAttribute("data-strong", "true");
    });

    it("aplica estilos de la variante descripcion", () => {
        render(<Texto variante="descripcion">Descripcion</Texto>);

        expect(screen.getByTestId("texto")).toHaveStyle({
            fontSize: "1.2rem",
            lineHeight: "1.6",
            color: "rgba(0,0,0,0.75)",
        });
    });

    it("combina estilos de variante con estilos personalizados sobrescribiendo", () => {
        render(
            <Texto variante="muted" style={{ color: "blue", fontSize: "2rem" }}>
                Custom
            </Texto>
        );

        const el = screen.getByTestId("texto");
        expect(el.style.color).toBe("blue");
        expect(el.style.fontSize).toBe("2rem");
    });
});
