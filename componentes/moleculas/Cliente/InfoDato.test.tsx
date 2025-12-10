import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InfoDato from "./InfoDato";

vi.mock("componentes/atomos/Texto", () => ({
    __esModule: true,
    default: ({ children, type }: { children: React.ReactNode; type?: string }) => (
        <span data-testid="texto" data-type={type}>
            {children}
        </span>
    ),
}));

describe("InfoDato", () => {
    it("renderiza label con type secondary y muestra el valor", () => {
        render(<InfoDato label="Teléfono" value="123-456" />);

        const label = screen.getByTestId("texto");
        expect(label).toHaveTextContent("Teléfono");
        expect(label).toHaveAttribute("data-type", "secondary");

        expect(screen.getByText("123-456")).toBeInTheDocument();
    });

    it("acepta valor como nodo React", () => {
        render(<InfoDato label="Email" value={<strong data-testid="valor">correo@test.com</strong>} />);

        expect(screen.getByTestId("valor")).toHaveTextContent("correo@test.com");
    });
});
