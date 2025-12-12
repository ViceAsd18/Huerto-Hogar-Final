import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BannerText from "componentes/moleculas/Cliente/Nosotros/BannerText";

describe("BannerText Component", () => {
    it("debe renderizar titulo y subtitulo", () => {
        render(
            <BannerText
                titulo="Sobre Nosotros"
                subtitulo="Conoce nuestra historia"
            />
        );

        expect(screen.getByText("Sobre Nosotros")).toBeInTheDocument();
        expect(screen.getByText("Conoce nuestra historia")).toBeInTheDocument();
    });

    it("debe renderizar titulo como heading nivel 1", () => {
        render(<BannerText titulo="Título Principal" subtitulo="Subtítulo" />);

        const heading = screen.getByText("Título Principal");
        expect(heading.tagName).toBe("H1");
    });

    it("debe renderizar diferentes textos", () => {
        const { rerender } = render(
            <BannerText titulo="Texto 1" subtitulo="Descripción 1" />
        );

        expect(screen.getByText("Texto 1")).toBeInTheDocument();
        expect(screen.getByText("Descripción 1")).toBeInTheDocument();

        rerender(<BannerText titulo="Texto 2" subtitulo="Descripción 2" />);

        expect(screen.getByText("Texto 2")).toBeInTheDocument();
        expect(screen.getByText("Descripción 2")).toBeInTheDocument();
    });

    it("debe tener contenedor con textAlign center", () => {
        const { container } = render(
            <BannerText titulo="Título" subtitulo="Subtítulo" />
        );

        const contenedor = container.firstChild as HTMLElement;
        expect(contenedor.style.textAlign).toBe("center");
    });
});
