import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BadgeEstado from "./BadgeEstado";

vi.mock("antd", () => ({
    Tag: ({ children, color }: { children: React.ReactNode; color?: string }) => (
        <div data-testid="tag" data-color={color}>
            {children}
        </div>
    ),
}));

describe("BadgeEstado", () => {
    const casos = [
        { estado: "pendiente", color: "orange" },
        { estado: "completada", color: "green" },
        { estado: "cancelada", color: "red" },
    ] as const;

    casos.forEach(({ estado, color }) => {
        it(`muestra el estado ${estado} en mayusculas con color ${color}`, () => {
            render(<BadgeEstado estado={estado} />);

            expect(screen.getByText(estado.toUpperCase())).toBeInTheDocument();
            expect(screen.getByTestId("tag")).toHaveAttribute("data-color", color);
        });
    });
});
