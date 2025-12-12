import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BadgeStock from "../../../componentes/atomos/BadgeStock";

describe("BadgeStock Component", () => {
    it("should render 'Sin Stock' with gray color when stock is 0", () => {
        const { container } = render(<BadgeStock stock={0} />);
        expect(screen.getByText("Sin Stock")).toBeInTheDocument();
        const tag = container.querySelector("[data-color='gray']");
        expect(tag).toBeInTheDocument();
    });

    it("should render low stock message with red color when stock < 10", () => {
        const { container } = render(<BadgeStock stock={5} />);
        expect(screen.getByText("5 Bajo Stock")).toBeInTheDocument();
        const tag = container.querySelector("[data-color='red']");
        expect(tag).toBeInTheDocument();
    });

    it("should render with orange color when stock is between 16 and 30", () => {
        const { container } = render(<BadgeStock stock={25} />);
        expect(screen.getByText("25 en Stock")).toBeInTheDocument();
        const tag = container.querySelector("[data-color='orange']");
        expect(tag).toBeInTheDocument();
    });

    it("should render with green color when stock is above 30", () => {
        const { container } = render(<BadgeStock stock={50} />);
        expect(screen.getByText("50 en Stock")).toBeInTheDocument();
        const tag = container.querySelector("[data-color='green']");
        expect(tag).toBeInTheDocument();
    });

    it("should render boundary value at 10 with red color", () => {
        const { container } = render(<BadgeStock stock={10} />);
        expect(screen.getByText("10 en Stock")).toBeInTheDocument();
        const tag = container.querySelector("[data-color='red']");
        expect(tag).toBeInTheDocument();
    });

    it("should render boundary value at 30 with orange color", () => {
        const { container } = render(<BadgeStock stock={30} />);
        expect(screen.getByText("30 en Stock")).toBeInTheDocument();
        const tag = container.querySelector("[data-color='orange']");
        expect(tag).toBeInTheDocument();
    });
});
