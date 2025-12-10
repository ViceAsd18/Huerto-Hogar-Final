import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MenuCliente from "./MenuCliente";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

vi.mock("@ant-design/icons", () => ({
    HomeOutlined: () => <span data-testid="icon-home" />,
    ShopOutlined: () => <span data-testid="icon-shop" />,
    InfoCircleOutlined: () => <span data-testid="icon-info" />,
    ReadOutlined: () => <span data-testid="icon-blog" />,
    PhoneOutlined: () => <span data-testid="icon-phone" />,
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

describe("MenuCliente", () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it("renderiza las 5 opciones del menu", () => {
        render(<MenuCliente />);

        const botones = screen.getAllByRole("button");
        expect(botones).toHaveLength(5);
        expect(screen.getByTestId("item-/cliente/home_cliente")).toBeInTheDocument();
        expect(screen.getByTestId("item-/cliente/contacto")).toBeInTheDocument();
    });

    it("navega a la ruta seleccionada al clickear una opcion", () => {
        render(<MenuCliente />);

        fireEvent.click(screen.getByTestId("item-/cliente/tienda"));
        expect(mockNavigate).toHaveBeenCalledWith("/cliente/tienda");
    });
});
