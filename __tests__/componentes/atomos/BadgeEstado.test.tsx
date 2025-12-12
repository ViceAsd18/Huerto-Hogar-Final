import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BadgeEstado from "../../../componentes/atomos/BadgeEstado";

describe("BadgeEstado Component", () => {
    it("should render pendiente state with orange color", () => {
        const { container } = render(<BadgeEstado estado="pendiente" />);
        expect(screen.getByText("PENDIENTE")).toBeInTheDocument();
        const tag = container.querySelector("[data-color='orange']");
        expect(tag).toBeInTheDocument();
    });

    it("should render completada state with green color", () => {
        const { container } = render(<BadgeEstado estado="completada" />);
        expect(screen.getByText("COMPLETADA")).toBeInTheDocument();
        const tag = container.querySelector("[data-color='green']");
        expect(tag).toBeInTheDocument();
    });

    it("should render cancelada state with red color", () => {
        const { container } = render(<BadgeEstado estado="cancelada" />);
        expect(screen.getByText("CANCELADA")).toBeInTheDocument();
        const tag = container.querySelector("[data-color='red']");
        expect(tag).toBeInTheDocument();
    });

    it("should display estado in uppercase", () => {
        render(<BadgeEstado estado="pendiente" />);
        expect(screen.getByText("PENDIENTE")).toBeInTheDocument();
        expect(screen.queryByText("pendiente")).not.toBeInTheDocument();
    });
});
