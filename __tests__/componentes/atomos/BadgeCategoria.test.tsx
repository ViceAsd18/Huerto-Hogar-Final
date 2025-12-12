import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BadgeCategoria from "../../../componentes/atomos/BadgeCategoria";

describe("BadgeCategoria Component", () => {
    it("should render the categoria text", () => {
        render(<BadgeCategoria categoria="Frutas" />);
        expect(screen.getByText("Frutas")).toBeInTheDocument();
    });

    it("should render with default blue color", () => {
        const { container } = render(<BadgeCategoria categoria="Frutas" />);
        const tag = container.querySelector("[data-color='blue']");
        expect(tag).toBeInTheDocument();
    });

    it("should render with custom color when provided", () => {
        const { container } = render(<BadgeCategoria categoria="Verduras" color="green" />);
        const tag = container.querySelector("[data-color='green']");
        expect(tag).toBeInTheDocument();
    });

    it("should render multiple badges with different categories", () => {
        render(
            <>
                <BadgeCategoria categoria="Frutas" />
                <BadgeCategoria categoria="Verduras" color="red" />
            </>
        );
        
        expect(screen.getByText("Frutas")).toBeInTheDocument();
        expect(screen.getByText("Verduras")).toBeInTheDocument();
    });
});
