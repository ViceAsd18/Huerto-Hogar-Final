import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Equipo from "../../../../../componentes/organismo/Cliente/Nosotros/Equipo";

describe("Equipo Component", () => {
    it("debe renderizar el título principal", () => {
        render(<Equipo />);

        expect(screen.getByText("El equipo detrás del proyecto")).toBeInTheDocument();
    });

    it("debe renderizar los tres miembros del equipo", () => {
        render(<Equipo />);

        expect(screen.getByText("Vicente Ramírez Garay")).toBeInTheDocument();
        expect(screen.getByText("Camila Soto Rojas")).toBeInTheDocument();
        expect(screen.getByText("Joaquín Muñoz")).toBeInTheDocument();
    });

    it("debe renderizar los roles de cada miembro", () => {
        render(<Equipo />);

        expect(screen.getByText("Frontend")).toBeInTheDocument();
        expect(screen.getByText("Fullstack")).toBeInTheDocument();
        expect(screen.getByText("Backend")).toBeInTheDocument();
    });

    it("debe renderizar las imágenes de cada miembro", () => {
        render(<Equipo />);

        const imagenes = screen.getAllByRole("img");
        expect(imagenes.length).toBeGreaterThanOrEqual(3);
    });

    it("debe tener el estilo de fondo correcto", () => {
        const { container } = render(<Equipo />);

        const contenedor = container.firstChild as HTMLElement;
        expect(contenedor).toHaveStyle({
            backgroundColor: "#FAFAFA",
            borderRadius: "12px",
            padding: "60px 20px",
        });
    });

    it("debe renderizar el contenedor del equipo con espaciado correcto", () => {
        const { container } = render(<Equipo />);

        const equipoContainer = container.querySelector('[style*="flex"]');
        expect(equipoContainer).toBeInTheDocument();
    });
});
