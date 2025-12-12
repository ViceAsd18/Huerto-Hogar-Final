import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Boton from "../../../componentes/atomos/Boton";

describe("Boton Component", () => {
    it("debe renderizar el texto del botón", () => {
        render(<Boton>Click</Boton>);
        expect(screen.getByRole("button", { name: "Click" })).toBeInTheDocument();
    });

    it("debe ejecutar el callback onClick", () => {
        const handleClick = vi.fn();
        render(<Boton onClick={handleClick}>Click</Boton>);
        fireEvent.click(screen.getByRole("button"));
        expect(handleClick).toHaveBeenCalledOnce();
    });

    it("debe tener tipo button por defecto", () => {
        render(<Boton>Default</Boton>);
        expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("debe aceptar htmlType submit", () => {
        render(<Boton htmlType="submit">Submit</Boton>);
        expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });
});
