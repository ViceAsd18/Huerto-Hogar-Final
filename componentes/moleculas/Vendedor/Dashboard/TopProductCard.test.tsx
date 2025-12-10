import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TopProductCard from "./TopProductCard";

vi.mock("antd", () => ({
    Card: ({ children, style, bordered }: { children: React.ReactNode; style?: React.CSSProperties; bordered?: boolean }) => (
        <div data-testid="card" data-bordered={bordered ? "true" : "false"} style={style}>
            {children}
        </div>
    ),
    Typography: {
        Text: ({ children, strong, type }: { children: React.ReactNode; strong?: boolean; type?: string }) => (
            <span data-testid={`text-${type ?? (strong ? "strong" : "default")}`} data-strong={strong ? "true" : "false"} data-type={type ?? ""}>
                {children}
            </span>
        ),
    },
}));

describe("TopProductCard", () => {
    it("muestra nombre y cantidad vendidos", () => {
        render(<TopProductCard nombre="Semillas" vendidos={42} />);

        expect(screen.getByTestId("text-strong")).toHaveTextContent("Semillas");
        expect(screen.getByTestId("text-secondary")).toHaveTextContent("42 vendidos");
    });

    it("aplica estilo de tarjeta y es no bordeada", () => {
        render(<TopProductCard nombre="Abono" vendidos={5} />);

        const card = screen.getByTestId("card");
        expect(card).toHaveAttribute("data-bordered", "false");
        expect(card).toHaveStyle({
            borderRadius: "8px",
            backgroundColor: "#fafafa",
        });
    });
});
