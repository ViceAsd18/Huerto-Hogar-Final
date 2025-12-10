import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ItemProductoOrden from "./ItemProductoOrden";

vi.mock("../../atomos/Imagen", () => ({
    __esModule: true,
    default: ({ src, alt, width, height, style }: { src?: string; alt?: string; width?: string; height?: string; style?: React.CSSProperties }) => (
        <img data-testid="imagen" src={src} alt={alt} width={width} height={height} style={style} />
    ),
}));

describe("ItemProductoOrden", () => {
    it("renderiza imagen y nombre con estilos", () => {
        const { container } = render(<ItemProductoOrden imagen="/foto.png" nombre="Lechuga" />);

        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveStyle({ display: "flex", gap: "16px" });

        const imgWrapper = wrapper.firstChild as HTMLElement;
        expect(imgWrapper).toHaveStyle({ width: "60px", height: "60px", background: "#f9f9f9", borderRadius: "8px" });

        const img = screen.getByTestId("imagen");
        expect(img).toHaveAttribute("src", "/foto.png");
        expect(img).toHaveAttribute("alt", "Lechuga");
        expect(img).toHaveAttribute("width", "100%");
        expect(img).toHaveAttribute("height", "100%");
        expect(img).toHaveStyle({ objectFit: "contain" });

        expect(screen.getByText("Lechuga")).toBeInTheDocument();
    });
});
