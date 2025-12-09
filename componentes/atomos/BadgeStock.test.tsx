import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BadgeStock from "./BadgeStock";

vi.mock("antd", () => ({
    Tag: ({ children, color }: { children: React.ReactNode; color?: string }) => (
        <div data-testid="tag" data-color={color}>
            {children}
        </div>
    ),
}));

describe("BadgeStock", () => {
    const casos = [
        { stock: 0, texto: "Sin Stock", color: "gray" },
        { stock: 5, texto: "5 Bajo Stock", color: "red" },
        { stock: 10, texto: "10 en Stock", color: "red" },
        { stock: 20, texto: "20 en Stock", color: "orange" },
        { stock: 50, texto: "50 en Stock", color: "green" },
    ];

    casos.forEach(({ stock, texto, color }) => {
        it(`muestra '${texto}' y color ${color} cuando stock=${stock}`, () => {
            render(<BadgeStock stock={stock} />);

            expect(screen.getByText(texto)).toBeInTheDocument();
            expect(screen.getByTestId("tag")).toHaveAttribute("data-color", color);
        });
    });
});
