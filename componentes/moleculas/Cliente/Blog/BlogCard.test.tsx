import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import BlogCard from "./BlogCard";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

vi.mock("@ant-design/icons", () => ({
    CalendarOutlined: () => <span data-testid="calendar-icon" />,
}));

vi.mock("componentes/atomos/Boton", () => ({
    __esModule: true,
    default: ({ children, onClick, style }: { children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties }) => (
        <button data-testid="boton" onClick={onClick} style={style}>
            {children}
        </button>
    ),
}));

describe("BlogCard", () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    const baseProps = {
        imagen: "/img.jpg",
        categoria: "Huerto",
        titulo: "Cultivar en casa",
        fecha: "01/05/2025",
        linkTo: "/blogs/1",
    };

    it("renderiza categoria, titulo y fecha", () => {
        render(<BlogCard {...baseProps} />);

        expect(screen.getByText("Huerto")).toBeInTheDocument();
        expect(screen.getByText("Cultivar en casa")).toBeInTheDocument();
        expect(screen.getByText("01/05/2025")).toBeInTheDocument();
        expect(screen.getByTestId("calendar-icon")).toBeInTheDocument();
    });

    it("muestra descripcion solo cuando es principal", () => {
        const { rerender } = render(<BlogCard {...baseProps} descripcion="Guia completa" esPrincipal />);

        expect(screen.getByText("Guia completa")).toBeInTheDocument();

        rerender(<BlogCard {...baseProps} descripcion="Guia completa" esPrincipal={false} />);
        expect(screen.queryByText("Guia completa")).not.toBeInTheDocument();
    });

    it("navega al link cuando se hace click en Leer más", () => {
        render(<BlogCard {...baseProps} />);

        fireEvent.click(screen.getByTestId("boton"));
        expect(mockNavigate).toHaveBeenCalledWith("/blogs/1");
    });

    it("no navega si no hay linkTo", () => {
        render(<BlogCard {...baseProps} linkTo={undefined} />);

        fireEvent.click(screen.getByTestId("boton"));
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
