import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Boton from "./Boton";

vi.mock("antd", () => ({
    Button: ({ children, onClick, htmlType, style }: {
        children: React.ReactNode;
        onClick?: React.MouseEventHandler<HTMLButtonElement>;
        htmlType?: "button" | "submit" | "reset";
        style?: React.CSSProperties;
    }) => (
        <button data-testid="boton" type={htmlType} onClick={onClick} style={style}>
            {children}
        </button>
    ),
}));

describe("Boton", () => {
    it("renderiza el texto hijo", () => {
        render(<Boton>Comprar</Boton>);

        expect(screen.getByText("Comprar")).toBeInTheDocument();
    });

    it("usa htmlType='button' por defecto", () => {
        render(<Boton>Default</Boton>);

        expect(screen.getByTestId("boton")).toHaveAttribute("type", "button");
    });

    it("llama onClick al hacer click", () => {
        const handleClick = vi.fn();
        render(<Boton onClick={handleClick}>Click</Boton>);

        fireEvent.click(screen.getByTestId("boton"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("combina estilo personalizado con color y texto blanco", () => {
        render(
            <Boton color="tomato" style={{ border: "1px solid red", color: "black" }}>
                Styled
            </Boton>
        );

        const boton = screen.getByTestId("boton");

        expect(boton.style.backgroundColor).toBe("tomato");
        expect(boton.style.border).toBe("1px solid red");
        expect(boton.style.color).toBe("white");
    });
});
