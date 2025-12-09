import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BadgeCategoria from "./BadgeCategoria";

vi.mock("antd", () => ({
    Tag: ({ children, color }: { children: React.ReactNode; color?: string }) => (
        <div data-testid="tag" data-color={color}>
            {children}
        </div>
    ),
}));

describe("BadgeCategoria", () => {
    it("muestra el nombre de la categoria", () => {
        render(<BadgeCategoria categoria="Frutas" />);

        expect(screen.getByText("Frutas")).toBeInTheDocument();
    });

    it("usa el color azul por defecto", () => {
        render(<BadgeCategoria categoria="Verduras" />);

        const tag = screen.getByTestId("tag");
        expect(tag).toHaveAttribute("data-color", "blue");
    });

    it("permite establecer un color personalizado", () => {
        render(<BadgeCategoria categoria="Semillas" color="magenta" />);

        const tag = screen.getByTestId("tag");
        expect(tag).toHaveAttribute("data-color", "magenta");
    });
});
