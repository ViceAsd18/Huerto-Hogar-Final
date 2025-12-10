import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ResumenTotales from "./ResumenTotales";

vi.mock("antd", () => ({
    Card: ({ children, title, style }: { children: React.ReactNode; title?: React.ReactNode; style?: React.CSSProperties }) => (
        <div data-testid="card" data-title={title} style={style}>{children}</div>
    ),
    Row: ({ children, justify }: { children: React.ReactNode; justify?: string }) => (
        <div data-testid="row" data-justify={justify}>{children}</div>
    ),
    Space: ({ children, direction }: { children: React.ReactNode; direction?: string }) => (
        <div data-testid="space" data-direction={direction}>{children}</div>
    ),
}));

describe("ResumenTotales", () => {
    it("muestra subtotales, impuesto y total formateados", () => {
        render(<ResumenTotales subtotal={15000} impuesto={2850} total={17850} />);

        expect(screen.getByTestId("card")).toHaveAttribute("data-title", "Resumen de Totales");
        expect(screen.getByText("Subtotal")).toBeInTheDocument();
        expect(screen.getByText("$15.000")).toBeInTheDocument();
        expect(screen.getByText("Impuesto 19%"));
        expect(screen.getByText("$2.850")).toBeInTheDocument();
        expect(screen.getByText("Total")).toBeInTheDocument();
        expect(screen.getByText("$17.850")).toBeInTheDocument();
    });

    it("usa estilos de sticky y border radius", () => {
        render(<ResumenTotales subtotal={0} impuesto={0} total={0} />);

        const card = screen.getByTestId("card");
        expect(card).toHaveStyle({ borderRadius: "12px", position: "sticky", top: "24px" });
    });
});
