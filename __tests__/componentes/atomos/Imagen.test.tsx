import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Imagen from "../../../componentes/atomos/Imagen";

describe("Imagen Component", () => {
    it("debe renderizar la imagen con src", () => {
        render(<Imagen src="https://example.com/image.jpg" />);
        expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("debe usar alt por defecto si no se proporciona", () => {
        render(<Imagen src="https://example.com/image.jpg" />);
        expect(screen.getByAltText("Imagen")).toBeInTheDocument();
    });

    it("debe usar alt personalizado", () => {
        render(<Imagen src="https://example.com/image.jpg" alt="Mi imagen" />);
        expect(screen.getByAltText("Mi imagen")).toBeInTheDocument();
    });

    it("debe tener ancho y alto por defecto 100%", () => {
        const { container } = render(<Imagen src="https://example.com/image.jpg" />);
        const img = screen.getByRole("img");
        expect(img.getAttribute("width")).toBe("100%");
        expect(img.getAttribute("height")).toBe("100%");
    });

    it("debe aceptar ancho y alto personalizados", () => {
        render(<Imagen src="https://example.com/image.jpg" width={300} height={200} />);
        const img = screen.getByRole("img");
        expect(img.getAttribute("width")).toBe("300");
        expect(img.getAttribute("height")).toBe("200");
    });
});
