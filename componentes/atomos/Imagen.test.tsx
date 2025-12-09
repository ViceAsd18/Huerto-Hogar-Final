import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Imagen from "./Imagen";

vi.mock("antd", () => ({
    Image: ({ src, alt, width, height, style, preview, fallback }: {
        src?: string;
        alt?: string;
        width?: number | string;
        height?: number | string;
        style?: React.CSSProperties;
        preview?: boolean;
        fallback?: string;
    }) => (
        <img
            data-testid="imagen"
            src={src}
            alt={alt}
            width={width as any}
            height={height as any}
            style={style}
            data-preview={preview ? "true" : "false"}
            data-fallback={fallback}
        />
    ),
}));

describe("Imagen", () => {
    it("renderiza con src y alt por defecto", () => {
        render(<Imagen src="/foto.png" />);

        const img = screen.getByTestId("imagen");
        expect(img).toHaveAttribute("src", "/foto.png");
        expect(img).toHaveAttribute("alt", "Imagen");
    });

    it("aplica width, height y estilos compuestos", () => {
        render(
            <Imagen
                src="/foto.png"
                alt="Producto"
                width={200}
                height={120}
                style={{ borderRadius: 4, objectFit: "contain" }}
            />
        );

        const img = screen.getByTestId("imagen");
        expect(img).toHaveAttribute("width", "200");
        expect(img).toHaveAttribute("height", "120");
        expect(img).toHaveStyle({
            borderRadius: "4px",
            objectFit: "contain",
        });
    });

    it("deshabilita preview y usa fallback por defecto", () => {
        render(<Imagen src="/foto.png" />);

        const img = screen.getByTestId("imagen");
        expect(img).toHaveAttribute("data-preview", "false");
        expect(img).toHaveAttribute("data-fallback", "https://via.placeholder.com/150?text=Sin+Imagen");
    });
});
