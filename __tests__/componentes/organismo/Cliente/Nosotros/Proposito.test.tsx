import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Proposito from "../../../../../componentes/organismo/Cliente/Nosotros/Proposito";

describe("Proposito Component", () => {
    it("debe renderizar el título principal", () => {
        render(<Proposito />);

        expect(screen.getByText("Nuestro Propósito")).toBeInTheDocument();
    });

    it("debe renderizar los cuatro títulos de propósito", () => {
        render(<Proposito />);

        expect(screen.getByText("Frescura Garantizada")).toBeInTheDocument();
        expect(screen.getByText("Apoyo Local")).toBeInTheDocument();
        expect(screen.getByText("Sostenibilidad")).toBeInTheDocument();
        expect(screen.getByText("Calidad Certificada")).toBeInTheDocument();
    });

    it("debe renderizar los párrafos descriptivos", () => {
        render(<Proposito />);

        expect(screen.getByText(/Productos cosechados en su punto óptimo/i)).toBeInTheDocument();
        expect(screen.getByText(/Comprometidos con el desarrollo y el comercio justo/i)).toBeInTheDocument();
        expect(screen.getByText(/Practicas agrícolas responsables/i)).toBeInTheDocument();
        expect(screen.getByText(/Cumplimos estrictos estándares/i)).toBeInTheDocument();
    });

    it("debe renderizar cuatro InfoProposito componentes", () => {
        const { container } = render(<Proposito />);

        const grid = container.querySelector("[style*='flex']");
        expect(grid).toBeInTheDocument();
    });

    it("debe tener la estructura de sección correcta", () => {
        const { container } = render(<Proposito />);

        const section = container.querySelector("section");
        expect(section).toBeInTheDocument();
    });

    it("debe aplicar estilos de contenedor correctamente", () => {
        const { container } = render(<Proposito />);

        const section = container.querySelector("section") as HTMLElement;
        expect(section).toHaveStyle({
            width: "100%",
            padding: "40px 0px",
            textAlign: "center",
        });
    });

    it("debe tener 4 items de propósito", () => {
        render(<Proposito />);

        const propositos = [
            "Frescura Garantizada",
            "Apoyo Local",
            "Sostenibilidad",
            "Calidad Certificada",
        ];

        propositos.forEach((proposito) => {
            expect(screen.getByText(proposito)).toBeInTheDocument();
        });
    });
});
