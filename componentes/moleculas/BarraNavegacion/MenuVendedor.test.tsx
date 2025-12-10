import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MenuVendedor from "./MenuVendedor";

let mockUser: any = { rol: "vendedor" };
const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

vi.mock("auth/AuthContext", () => ({
    useAuth: () => ({ user: mockUser }),
}));

vi.mock("@ant-design/icons", () => ({
    DashboardOutlined: () => <span data-testid="icon-dashboard" />,
    ShoppingCartOutlined: () => <span data-testid="icon-productos" />,
    OrderedListOutlined: () => <span data-testid="icon-ordenes" />,
    UserSwitchOutlined: () => <span data-testid="icon-usuarios" />,
    SwapOutlined: () => <span data-testid="icon-swap" />,
}));

vi.mock("antd", () => ({
    Menu: ({ items, onClick }: { items: any[]; onClick: (e: { key: string }) => void }) => (
        <div data-testid="menu">
            {items.map((item) => (
                <button
                    key={item.key}
                    data-testid={`item-${item.key}`}
                    onClick={() => onClick({ key: item.key })}
                >
                    {item.label}
                </button>
            ))}
        </div>
    ),
}));

describe("MenuVendedor", () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        mockUser = { rol: "vendedor" };
    });

    it("muestra las opciones basicas para vendedor", () => {
        render(<MenuVendedor />);

        const botones = screen.getAllByRole("button");
        expect(botones).toHaveLength(3);
        expect(screen.queryByTestId("item-/usuarios")).not.toBeInTheDocument();
        expect(screen.queryByTestId("item-/")).not.toBeInTheDocument();
    });

    it("incluye opciones extras para admin", () => {
        mockUser = { rol: "admin" };
        const { rerender } = render(<MenuVendedor />);

        // rerender to pick up updated mockUser
        rerender(<MenuVendedor />);

        expect(screen.getAllByRole("button")).toHaveLength(5);
        expect(screen.getByTestId("item-/usuarios")).toBeInTheDocument();
        expect(screen.getByTestId("item-/")).toBeInTheDocument();
    });

    it("navega a la ruta seleccionada al hacer click", () => {
        render(<MenuVendedor />);

        fireEvent.click(screen.getByTestId("item-/productos"));
        expect(mockNavigate).toHaveBeenCalledWith("/productos");
    });
});
