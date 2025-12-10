import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UsuarioSidebar from "./UsuarioSidebar";

let mockUser: any = { email: "vendedor@test.com", rol: "vendedor" };
const mockLogout = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

vi.mock("auth/AuthContext", () => ({
    useAuth: () => ({ user: mockUser, logout: mockLogout }),
}));

vi.mock("@ant-design/icons", () => ({
    LogoutOutlined: () => <span data-testid="logout-icon" />,
}));

vi.mock("antd", () => ({
    Avatar: ({ size, style, children }: { size?: number; style?: React.CSSProperties; children?: React.ReactNode }) => (
        <div data-testid="avatar" data-size={size} style={style}>
            {children}
        </div>
    ),
    Dropdown: ({ menu, children }: { menu?: { items?: any[] }; children: React.ReactNode }) => (
        <div data-testid="dropdown">
            {children}
            <button
                data-testid="logout-button"
                onClick={() => menu?.items?.[0]?.onClick?.({ key: menu?.items?.[0]?.key })}
            >
                trigger-logout
            </button>
        </div>
    ),
}));

describe("UsuarioSidebar", () => {
    beforeEach(() => {
        mockUser = { email: "vendedor@test.com", rol: "vendedor" };
        mockLogout.mockClear();
        mockNavigate.mockClear();
    });

    it("muestra email y rol cuando no esta colapsado", () => {
        render(<UsuarioSidebar colapsado={false} />);

        expect(screen.getByText("vendedor@test.com")).toBeInTheDocument();
        expect(screen.getByText("vendedor")).toBeInTheDocument();
        expect(screen.getByTestId("avatar")).toHaveAttribute("data-size", "58");
    });

    it("oculta email y rol cuando esta colapsado", () => {
        render(<UsuarioSidebar colapsado />);

        expect(screen.queryByText("vendedor@test.com")).not.toBeInTheDocument();
        expect(screen.queryByText("vendedor")).not.toBeInTheDocument();
        expect(screen.getByTestId("avatar")).toHaveAttribute("data-size", "48");
    });

    it("ejecuta logout y navega a /login al seleccionar Cerrar sesion", () => {
        render(<UsuarioSidebar />);

        fireEvent.click(screen.getByTestId("logout-button"));

        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
});
