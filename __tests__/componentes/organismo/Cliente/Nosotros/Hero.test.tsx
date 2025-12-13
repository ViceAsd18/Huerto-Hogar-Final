import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "../../../../../componentes/organismo/Cliente/Nosotros/Hero";

describe("Hero Component", () => {
    const mockProps = {
        background: "/assets/img/nosotros/hero-bg.jpg",
        titulo: "Sobre Nosotros",
        subtitulo: "Conoce nuestra historia y misión",
    };

    it("debe renderizar el componente Hero", () => {
        const { container } = render(<Hero {...mockProps} />);

        const section = container.querySelector("section");
        expect(section).toBeInTheDocument();
    });

    it("debe tener la imagen de fondo correcta", () => {
        const { container } = render(<Hero {...mockProps} />);

        const section = container.querySelector("section") as HTMLElement;
        expect(section.style.backgroundImage).toContain(mockProps.background);
    });

    it("debe renderizar el overlay oscuro", () => {
        const { container } = render(<Hero {...mockProps} />);

        const overlay = container.querySelector("[style*='rgba(0, 0, 0, 0.45)']");
        expect(overlay).toBeInTheDocument();
    });

    it("debe renderizar el título", () => {
        render(<Hero {...mockProps} />);

        expect(screen.getByText(mockProps.titulo)).toBeInTheDocument();
    });

    it("debe renderizar el subtítulo", () => {
        render(<Hero {...mockProps} />);

        expect(screen.getByText(mockProps.subtitulo)).toBeInTheDocument();
    });

    it("debe aplicar estilos correctos al hero", () => {
        const { container } = render(<Hero {...mockProps} />);

        const section = container.querySelector("section") as HTMLElement;
        expect(section).toHaveStyle({
            width: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        });
    });

    it("debe renderizar el contenido con z-index relativo", () => {
        const { container } = render(<Hero {...mockProps} />);

        const content = container.querySelector("[style*='z-index']");
        expect(content).toBeInTheDocument();
    });
});
