import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ImgGaleria from "componentes/moleculas/Cliente/Nosotros/ImgGaleria";

describe("ImgGaleria Component", () => {
    it("debe renderizar imagen con src y alt", () => {
        render(<ImgGaleria src="/img/galeria1.jpg" alt="Imagen galería" />);

        const imagen = screen.getByAltText("Imagen galería");
        expect(imagen).toBeInTheDocument();
        expect(imagen).toHaveAttribute("src", "/img/galeria1.jpg");
    });

    it("debe tener contenedor con clase small", () => {
        const { container } = render(
            <ImgGaleria src="/img/test.jpg" alt="Test" />
        );

        const contenedor = container.querySelector(".small");
        expect(contenedor).toBeInTheDocument();
    });

    it("debe renderizar diferentes imágenes", () => {
        const { rerender } = render(
            <ImgGaleria src="/img/img1.jpg" alt="Primera imagen" />
        );

        expect(screen.getByAltText("Primera imagen")).toBeInTheDocument();

        rerender(<ImgGaleria src="/img/img2.jpg" alt="Segunda imagen" />);

        expect(screen.getByAltText("Segunda imagen")).toBeInTheDocument();
        expect(screen.getByAltText("Segunda imagen")).toHaveAttribute("src", "/img/img2.jpg");
    });

    it("debe tener estilos de grid correctos", () => {
        const { container } = render(
            <ImgGaleria src="/img/test.jpg" alt="Test" />
        );

        const contenedor = container.firstChild as HTMLElement;
        expect(contenedor.style.gridColumn).toBe("span 2");
        expect(contenedor.style.gridRow).toBe("span 2");
        expect(contenedor.style.borderRadius).toBe("10px");
    });
});
