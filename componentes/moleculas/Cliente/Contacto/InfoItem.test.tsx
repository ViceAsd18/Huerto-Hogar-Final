import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InfoItem from "./InfoItem";

describe("InfoItem", () => {
    it("renderiza icono, label y valor", () => {
        render(<InfoItem icon={<span data-testid="icon" />} label="Email" value="info@test.com" />);

        expect(screen.getByTestId("icon")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("info@test.com")).toBeInTheDocument();
    });
});
