import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import StatCard from "./StatCard";

vi.mock("componentes/atomos/Titulo", () => ({
    __esModule: true,
    default: ({ children, nivel, style }: { children: React.ReactNode; nivel?: number; style?: React.CSSProperties }) => (
        <h4 data-testid="titulo" data-nivel={nivel} style={style}>
            {children}
        </h4>
    ),
}));

vi.mock("antd", () => ({
    Card: ({ children, style, bordered }: { children: React.ReactNode; style?: React.CSSProperties; bordered?: boolean }) => (
        <div data-testid="card" data-bordered={bordered ? "true" : "false"} style={style}>
            {children}
        </div>
    ),
    Typography: {
        Text: ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
            <span data-testid="text" style={style}>
                {children}
            </span>
        ),
    },
}));

describe("StatCard", () => {
    it("renderiza titulo y valor con estilos", () => {
        render(<StatCard title="Ventas" value={120} />);

        const card = screen.getByTestId("card");
        expect(card).toHaveAttribute("data-bordered", "false");
        expect(card).toHaveStyle({
            borderRadius: "8px",
            textAlign: "center",
            backgroundColor: "#fff",
        });

        const text = screen.getByTestId("text");
        expect(text).toHaveTextContent("Ventas");
        expect(text).toHaveStyle({ fontSize: "14px", color: "#555" });

        const titulo = screen.getByTestId("titulo");
        expect(titulo).toHaveTextContent("120");
        expect(titulo).toHaveAttribute("data-nivel", "4");
        expect(titulo).toHaveStyle({ color: "rgb(23, 84, 207)" });
    });

    it("acepta valores string y los muestra", () => {
        render(<StatCard title="Usuarios" value="350" />);

        expect(screen.getByTestId("titulo")).toHaveTextContent("350");
    });
});
