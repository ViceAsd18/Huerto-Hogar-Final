import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GaleriaImagenes from "../../../../../componentes/organismo/Cliente/Nosotros/GaleriaImagenes";

describe("GaleriaImagenes Component", () => {
    it("debe renderizar el título de la galería", () => {
        render(<GaleriaImagenes />);

        expect(screen.getByText("El Corazón de HuertoHogar")).toBeInTheDocument();
    });

    it("debe renderizar la imagen principal grande", () => {
        render(<GaleriaImagenes />);

        expect(screen.getByAltText("Imagen grande")).toBeInTheDocument();
    });

    it("debe renderizar todas las imágenes pequeñas", () => {
        render(<GaleriaImagenes />);

        expect(screen.getByAltText("Pequeña 1")).toBeInTheDocument();
        expect(screen.getByAltText("Pequeña 2")).toBeInTheDocument();
        expect(screen.getByAltText("Pequeña 3")).toBeInTheDocument();
        expect(screen.getByAltText("Pequeña 4")).toBeInTheDocument();
        expect(screen.getByAltText("Pequeña 5")).toBeInTheDocument();
        expect(screen.getByAltText("Pequeña 6")).toBeInTheDocument();
        expect(screen.getByAltText("Pequeña 7")).toBeInTheDocument();
        expect(screen.getByAltText("Pequeña 8")).toBeInTheDocument();
    });

    it("debe tener las rutas correctas en las imágenes", () => {
        render(<GaleriaImagenes />);

        const imagenPrincipal = screen.getByAltText("Imagen grande") as HTMLImageElement;
        expect(imagenPrincipal.src).toContain("/assets/img/nosotros/galeria/principal.png");

        const imagenPequena1 = screen.getByAltText("Pequeña 1") as HTMLImageElement;
        expect(imagenPequena1.src).toContain("/assets/img/nosotros/galeria/1.jpg");
    });

    it("debe tener el contenedor galería con la clase correcta", () => {
        const { container } = render(<GaleriaImagenes />);

        const galeriaContainer = container.querySelector(".galeria-imagenes");
        expect(galeriaContainer).toBeInTheDocument();
    });

    it("debe renderizar el grid con 9 imágenes en total", () => {
        render(<GaleriaImagenes />);

        const imagenes = screen.getAllByRole("img");
        expect(imagenes.length).toBe(9);
    });

    it("debe tener el contenedor con estilo de fondo correcto", () => {
        const { container } = render(<GaleriaImagenes />);

        const contenedor = container.firstChild as HTMLElement;
        expect(contenedor).toHaveStyle({
            backgroundColor: "#FAFAFA",
            padding: "40px 0",
        });
    });
});
