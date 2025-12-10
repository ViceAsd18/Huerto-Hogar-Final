import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ImgGaleria from "./ImgGaleria";

vi.mock("componentes/atomos/Imagen", () => ({
    __esModule: true,
    default: ({ src, alt, style }: { src?: string; alt?: string; style?: React.CSSProperties }) => (
        <img data-testid="imagen" src={src} alt={alt} style={style} />
    ),
}));

describe("ImgGaleria", () => {
    it("renderiza contenedor con clase y estilos, pasando props a Imagen", () => {
        const { container } = render(<ImgGaleria src="/foto.jpg" alt="Foto" />);

        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass("small");
        expect(wrapper).toHaveStyle({
            gridColumn: "span 2",
            gridRow: "span 2",
            minHeight: "100px",
            minWidth: "100px",
        });

        const img = screen.getByTestId("imagen");
        expect(img).toHaveAttribute("src", "/foto.jpg");
        expect(img).toHaveAttribute("alt", "Foto");
        expect(img).toHaveStyle({ objectFit: "cover", width: "100%", height: "100%" });
    });
});
