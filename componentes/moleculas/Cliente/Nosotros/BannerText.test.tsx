import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BannerText from "./BannerText";

vi.mock("componentes/atomos/Titulo", () => ({
    __esModule: true,
    default: ({ children, nivel, style }: { children: React.ReactNode; nivel?: number; style?: React.CSSProperties }) => (
        <h1 data-testid="titulo" data-level={nivel} style={style}>
            {children}
        </h1>
    ),
}));

vi.mock("componentes/atomos/Texto", () => ({
    __esModule: true,
    default: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
        <p data-testid="texto" style={style}>
            {children}
        </p>
    ),
}));

describe("BannerText", () => {
    it("renderiza titulo y subtitulo dentro del contenedor", () => {
        const { container } = render(<BannerText titulo="Nosotros" subtitulo="Quienes somos" />);

        expect(screen.getByText("Nosotros")).toBeInTheDocument();
        expect(screen.getByText("Quienes somos")).toBeInTheDocument();

        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveStyle({ maxWidth: "1400px", textAlign: "center" });
    });

    it("pasa nivel 1 y estilos esperados al titulo y texto", () => {
        render(<BannerText titulo="Huerto" subtitulo="Cultiva en casa" />);

        const titulo = screen.getByTestId("titulo");
        expect(titulo).toHaveAttribute("data-level", "1");
        expect(titulo).toHaveStyle({
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: "700",
            textAlign: "center",
        });

        const texto = screen.getByTestId("texto");
        expect(texto).toHaveStyle({
            fontSize: "clamp(1rem, 2vw, 1.5rem)",
            lineHeight: "1.6",
            textAlign: "center",
        });
    });
});
