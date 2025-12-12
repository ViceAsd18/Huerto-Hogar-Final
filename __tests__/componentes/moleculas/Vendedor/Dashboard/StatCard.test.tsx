import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import StatCard from "componentes/moleculas/Vendedor/Dashboard/StatCard";

describe("StatCard Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar título y valor", () => {
        render(<StatCard title="Total Ventas" value="$125.000" />);

        expect(screen.getByText("Total Ventas")).toBeInTheDocument();
        expect(screen.getByText("$125.000")).toBeInTheDocument();
    });

    it("debe renderizar valor numérico", () => {
        render(<StatCard title="Órdenes" value={42} />);

        expect(screen.getByText("Órdenes")).toBeInTheDocument();
        expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("debe renderizar valor de tipo string", () => {
        render(<StatCard title="Estado" value="Activo" />);

        expect(screen.getByText("Estado")).toBeInTheDocument();
        expect(screen.getByText("Activo")).toBeInTheDocument();
    });

    it("debe renderizar con diferentes valores", () => {
        const { rerender } = render(<StatCard title="Productos" value={100} />);
        
        expect(screen.getByText("100")).toBeInTheDocument();

        rerender(<StatCard title="Productos" value={250} />);
        
        expect(screen.getByText("250")).toBeInTheDocument();
    });
});
