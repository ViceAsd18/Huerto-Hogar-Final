import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PrecioProducto from "./PrecioProducto";

vi.mock("antd", () => ({
    Typography: {
        Text: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
            <span data-testid="precio" style={style}>
                {children}
            </span>
        ),
    },
}));

describe("PrecioProducto", () => {
    it("muestra el valor con dos decimales y estilo normal por defecto", () => {
        render(<PrecioProducto valor={12.5} />);

        const precio = screen.getByTestId("precio");
        expect(precio).toHaveTextContent("$12.50");
        expect(precio).toHaveStyle({
            fontWeight: "400",
            fontSize: "14px",
            color: "#000",
        });
    });

    it("aplica estilos de destacado cuando tipo='destacado'", () => {
        render(<PrecioProducto valor={199.99} tipo="destacado" />);

        const precio = screen.getByTestId("precio");
        expect(precio).toHaveTextContent("$199.99");
        expect(precio).toHaveStyle({
            fontWeight: "500",
            fontSize: "24px",
        });
    });

    it("permite color personalizado", () => {
        render(<PrecioProducto valor={3} color="tomato" />);

        const precio = screen.getByTestId("precio");
        expect(precio.style.color).toBe("tomato");
    });
});
