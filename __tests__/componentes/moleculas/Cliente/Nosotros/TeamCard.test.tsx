import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TeamCard from "componentes/moleculas/Cliente/Nosotros/TeamCard";

describe("TeamCard Component", () => {
    it("debe renderizar nombre y rol del miembro", () => {
        render(
            <TeamCard
                src="/img/team/person1.jpg"
                nombre="Juan Pérez"
                rol="Director General"
            />
        );

        expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
        expect(screen.getByText("Director General")).toBeInTheDocument();
    });

    it("debe renderizar imagen con alt correcto", () => {
        render(
            <TeamCard
                src="/img/team/maria.jpg"
                nombre="María García"
                rol="Gerente de Ventas"
            />
        );

        const imagen = screen.getByAltText("María García");
        expect(imagen).toBeInTheDocument();
        expect(imagen).toHaveAttribute("src", "/img/team/maria.jpg");
    });

    it("debe renderizar diferentes miembros del equipo", () => {
        const { rerender } = render(
            <TeamCard
                src="/img/person1.jpg"
                nombre="Pedro López"
                rol="Desarrollador"
            />
        );

        expect(screen.getByText("Pedro López")).toBeInTheDocument();
        expect(screen.getByText("Desarrollador")).toBeInTheDocument();

        rerender(
            <TeamCard
                src="/img/person2.jpg"
                nombre="Ana Martínez"
                rol="Diseñadora"
            />
        );

        expect(screen.getByText("Ana Martínez")).toBeInTheDocument();
        expect(screen.getByText("Diseñadora")).toBeInTheDocument();
    });

    it("debe tener estructura de card con estilos correctos", () => {
        const { container } = render(
            <TeamCard
                src="/img/test.jpg"
                nombre="Test"
                rol="Tester"
            />
        );

        const card = container.firstChild as HTMLElement;
        expect(card.style.display).toBe("flex");
        expect(card.style.flexDirection).toBe("column");
        expect(card.style.textAlign).toBe("center");
    });
});
