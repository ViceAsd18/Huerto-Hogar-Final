import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InfoProposito from "componentes/moleculas/Cliente/Nosotros/InfoProposito";

describe("InfoProposito Component", () => {
    it("debe renderizar titulo y parrafo", () => {
        render(
            <InfoProposito
                icono={<span>🌱</span>}
                titulo="Nuestra Misión"
                parrafo="Proporcionar productos orgánicos de calidad"
            />
        );

        expect(screen.getByText("Nuestra Misión")).toBeInTheDocument();
        expect(screen.getByText("Proporcionar productos orgánicos de calidad")).toBeInTheDocument();
    });

    it("debe renderizar icono", () => {
        render(
            <InfoProposito
                icono={<span data-testid="icono-test">🎯</span>}
                titulo="Visión"
                parrafo="Ser líderes en agricultura sostenible"
            />
        );

        expect(screen.getByTestId("icono-test")).toBeInTheDocument();
    });

    it("debe renderizar diferentes contenidos", () => {
        const { rerender } = render(
            <InfoProposito
                icono={<span>🌍</span>}
                titulo="Sostenibilidad"
                parrafo="Cuidamos el medio ambiente"
            />
        );

        expect(screen.getByText("Sostenibilidad")).toBeInTheDocument();
        expect(screen.getByText("Cuidamos el medio ambiente")).toBeInTheDocument();

        rerender(
            <InfoProposito
                icono={<span>💚</span>}
                titulo="Compromiso"
                parrafo="Con la comunidad local"
            />
        );

        expect(screen.getByText("Compromiso")).toBeInTheDocument();
        expect(screen.getByText("Con la comunidad local")).toBeInTheDocument();
    });

    it("debe tener contenedor con estilos correctos", () => {
        const { container } = render(
            <InfoProposito
                icono={<span>✨</span>}
                titulo="Test"
                parrafo="Test descripción"
            />
        );

        const contenedor = container.firstChild as HTMLElement;
        expect(contenedor.style.textAlign).toBe("center");
        expect(contenedor.style.display).toBe("flex");
        expect(contenedor.style.flexDirection).toBe("column");
    });
});
