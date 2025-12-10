import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AccionesUsuario from "./AccionesCliente";

const mockNavigate = vi.fn();
const mockLogout = vi.fn();
let mockUser: any = { id_usuario: 10, rol: "cliente" };

vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

vi.mock("auth/AuthContext", () => ({
    useAuth: () => ({ user: mockUser, logout: mockLogout }),
}));

vi.mock("componentes/atomos/IconoRedondo", () => ({
    __esModule: true,
    default: ({ title, onClick }: { title: string; onClick: () => void }) => (
        <button data-testid={`icono-${title}`} onClick={onClick}>
            {title}
        </button>
    ),
}));

vi.mock("@ant-design/icons", () => ({
    ShoppingCartOutlined: () => <span data-testid="icon-cart" />,
    UserOutlined: () => <span data-testid="icon-user" />,
    CarOutlined: () => <span data-testid="icon-car" />,
    SwapOutlined: () => <span data-testid="icon-swap" />,
    RetweetOutlined: () => <span data-testid="icon-retweet" />,
    LoginOutlined: () => <span data-testid="icon-login" />,
    LogoutOutlined: () => <span data-testid="icon-logout" />,
}));

describe("AccionesUsuario", () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        mockLogout.mockClear();
        mockUser = { id_usuario: 10, rol: "cliente" };
    });

    it("muestra botones principales y navega a rutas de cliente", () => {
        render(<AccionesUsuario />);

        fireEvent.click(screen.getByTestId("icono-Mis Pedidos"));
        expect(mockNavigate).toHaveBeenCalledWith("/cliente/mis-ordenes");

        fireEvent.click(screen.getByTestId("icono-Ver Carrito"));
        expect(mockNavigate).toHaveBeenCalledWith("/cliente/carrito/10");
    });

    it("muestra login cuando no hay usuario y navega a login", () => {
        mockUser = null;
        render(<AccionesUsuario />);

        fireEvent.click(screen.getByTestId("icono-Iniciar Sesión"));
        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    it("muestra logout cuando hay usuario y ejecuta logout + navigate", () => {
        render(<AccionesUsuario />);

        fireEvent.click(screen.getByTestId("icono-Cerrar Sesión"));
        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    it("muestra cambiar vista solo para admin y alterna ruta segun pathname", () => {
        mockUser = { id_usuario: 1, rol: "admin" };
        const originalPath = window.location.pathname;

        Object.defineProperty(window, "location", {
            value: { pathname: "/admin/dashboard" },
            writable: true,
        });

        render(<AccionesUsuario />);

        fireEvent.click(screen.getByTestId("icono-Cambiar Vista"));
        expect(mockNavigate).toHaveBeenCalledWith("/cliente");

        mockNavigate.mockClear();
        (window as any).location.pathname = "/cliente";
        fireEvent.click(screen.getByTestId("icono-Cambiar Vista"));
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard");

        window.location.pathname = originalPath;
    });
});
