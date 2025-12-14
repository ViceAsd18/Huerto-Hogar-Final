import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import LoginPage from "componentes/paginas/LoginPage";

const mockNavigate = vi.fn();
const mockLogin = vi.fn();

vi.mock("react-router", () => ({
    __esModule: true,
    useNavigate: () => mockNavigate,
}));

vi.mock("auth/AuthContext", () => ({
    __esModule: true,
    useAuth: () => ({ login: mockLogin }),
}));

const mockLoginRequest = vi.fn();
const mockGetProfile = vi.fn();

vi.mock("services/auth", () => ({
    __esModule: true,
    loginRequest: (...args: any[]) => mockLoginRequest(...args),
    getProfile: (...args: any[]) => mockGetProfile(...args),
}));

vi.mock("componentes/organismo/LoginForm", () => ({
    __esModule: true,
    default: ({ onSubmit }: any) => (
        <div data-testid="login-form">
            <button onClick={() => onSubmit("test@example.com", "password123")}>
                Submit Login
            </button>
        </div>
    ),
}));

const mockMessageSuccess = vi.fn();
const mockMessageError = vi.fn();
const mockMessageLoading = vi.fn();

vi.mock("antd", () => ({
    __esModule: true,
    message: {
        success: (...args: any[]) => mockMessageSuccess(...args),
        error: (...args: any[]) => mockMessageError(...args),
        loading: (...args: any[]) => {
            mockMessageLoading(...args);
            return vi.fn(); // return hide function
        },
    },
}));

describe("LoginPage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it("debe renderizar el formulario de login", () => {
        render(<LoginPage />);

        expect(screen.getByTestId("login-form")).toBeInTheDocument();
    });

    it("debe iniciar sesión correctamente para usuario cliente", async () => {
        const authResponseMock = { access_token: "fake-token-123" };
        const userMock = {
            id_usuario: 1,
            nombre: "Juan",
            email: "juan@example.com",
            rol: "cliente",
        };

        mockLoginRequest.mockResolvedValue(authResponseMock);
        mockGetProfile.mockResolvedValue(userMock);

        render(<LoginPage />);

        const submitButton = screen.getByText("Submit Login");
        submitButton.click();

        await waitFor(() => {
            expect(mockLoginRequest).toHaveBeenCalledWith("test@example.com", "password123");
            expect(mockGetProfile).toHaveBeenCalled();
            expect(mockLogin).toHaveBeenCalledWith({
                token: "fake-token-123",
                user: userMock,
            });
            expect(localStorage.getItem("token")).toBe("fake-token-123");
            expect(mockMessageSuccess).toHaveBeenCalledWith("Inicio de sesión exitoso");
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    it("debe iniciar sesión correctamente para usuario empleado", async () => {
        const authResponseMock = { access_token: "fake-token-456" };
        const userMock = {
            id_usuario: 2,
            nombre: "Pedro",
            email: "pedro@example.com",
            rol: "empleado",
        };

        mockLoginRequest.mockResolvedValue(authResponseMock);
        mockGetProfile.mockResolvedValue(userMock);

        render(<LoginPage />);

        const submitButton = screen.getByText("Submit Login");
        submitButton.click();

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
        });
    });

    it("debe iniciar sesión correctamente para usuario admin", async () => {
        const authResponseMock = { access_token: "fake-token-789" };
        const userMock = {
            id_usuario: 3,
            nombre: "Admin",
            email: "admin@example.com",
            rol: "admin",
        };

        mockLoginRequest.mockResolvedValue(authResponseMock);
        mockGetProfile.mockResolvedValue(userMock);

        render(<LoginPage />);

        const submitButton = screen.getByText("Submit Login");
        submitButton.click();

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/");
        });
    });

    it("debe mostrar mensaje de loading durante el login", async () => {
        const authResponseMock = { access_token: "fake-token" };
        const userMock = { id_usuario: 1, nombre: "User", email: "user@example.com", rol: "cliente" };

        mockLoginRequest.mockResolvedValue(authResponseMock);
        mockGetProfile.mockResolvedValue(userMock);

        render(<LoginPage />);

        const submitButton = screen.getByText("Submit Login");
        submitButton.click();

        await waitFor(() => {
            expect(mockMessageLoading).toHaveBeenCalledWith("Verificando credenciales...", 0);
        });
    });

    it("debe mostrar error para credenciales incorrectas (401)", async () => {
        const errorMock = {
            response: {
                status: 401,
            },
        };
        mockLoginRequest.mockRejectedValue(errorMock);

        render(<LoginPage />);

        const submitButton = screen.getByText("Submit Login");
        submitButton.click();

        await waitFor(() => {
            expect(mockMessageError).toHaveBeenCalledWith("Correo o contraseña incorrecta");
            expect(mockLogin).not.toHaveBeenCalled();
            expect(mockNavigate).not.toHaveBeenCalled();
        });
    });

    it("debe mostrar error genérico para otros errores", async () => {
        const errorMock = new Error("Network error");
        mockLoginRequest.mockRejectedValue(errorMock);

        render(<LoginPage />);

        const submitButton = screen.getByText("Submit Login");
        submitButton.click();

        await waitFor(() => {
            expect(mockMessageError).toHaveBeenCalledWith("Ocurrió un error al iniciar sesión");
            expect(mockLogin).not.toHaveBeenCalled();
            expect(mockNavigate).not.toHaveBeenCalled();
        });
    });

    it("debe guardar token en localStorage", async () => {
        const authResponseMock = { access_token: "test-token-xyz" };
        const userMock = { id_usuario: 1, nombre: "User", email: "user@example.com", rol: "cliente" };

        mockLoginRequest.mockResolvedValue(authResponseMock);
        mockGetProfile.mockResolvedValue(userMock);

        render(<LoginPage />);

        const submitButton = screen.getByText("Submit Login");
        submitButton.click();

        await waitFor(() => {
            expect(localStorage.getItem("token")).toBe("test-token-xyz");
        });
    });
});
