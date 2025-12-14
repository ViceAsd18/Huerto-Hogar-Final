import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import RegistroPage from "componentes/paginas/RegistroPage";

const mockNavigate = vi.fn();
const mockUseAuth = vi.fn();

vi.mock("react-router", () => ({
    __esModule: true,
    useNavigate: () => mockNavigate,
}));

vi.mock("auth/AuthContext", () => ({
    __esModule: true,
    useAuth: () => mockUseAuth(),
}));

const mockRegisterRequest = vi.fn();

vi.mock("services/auth", () => ({
    __esModule: true,
    registerRequest: (...args: any[]) => mockRegisterRequest(...args),
}));

vi.mock("componentes/organismo/RegistroForm", () => ({
    __esModule: true,
    default: ({ onSubmit }: any) => (
        <div data-testid="register-form">
            <button onClick={() => onSubmit("Juan Pérez", "juan@example.com", "password123", "cliente")}>
                Submit Register
            </button>
            <button onClick={() => onSubmit("Admin User", "admin@example.com", "admin123", "empleado")}>
                Submit Admin Register
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

describe("RegistroPage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe renderizar el formulario de registro", () => {
        mockUseAuth.mockReturnValue({ user: null });

        render(<RegistroPage />);

        expect(screen.getByTestId("register-form")).toBeInTheDocument();
    });

    it("debe registrar usuario correctamente y navegar a login (sin usuario logueado)", async () => {
        mockUseAuth.mockReturnValue({ user: null });
        mockRegisterRequest.mockResolvedValue({});

        render(<RegistroPage />);

        const submitButton = screen.getByText("Submit Register");
        submitButton.click();

        await waitFor(() => {
            expect(mockRegisterRequest).toHaveBeenCalledWith(
                "Juan Pérez",
                "juan@example.com",
                "password123",
                "cliente"
            );
            expect(mockMessageSuccess).toHaveBeenCalledWith("Registro exitoso.");
            expect(mockNavigate).toHaveBeenCalledWith("/login");
        });
    });

    it("debe registrar usuario y navegar a /usuarios cuando usuario logueado es admin", async () => {
        mockUseAuth.mockReturnValue({ user: { id_usuario: 1, rol: "admin" } });
        mockRegisterRequest.mockResolvedValue({});

        render(<RegistroPage />);

        const submitButton = screen.getByText("Submit Admin Register");
        submitButton.click();

        await waitFor(() => {
            expect(mockRegisterRequest).toHaveBeenCalledWith(
                "Admin User",
                "admin@example.com",
                "admin123",
                "empleado"
            );
            expect(mockMessageSuccess).toHaveBeenCalledWith("Registro exitoso.");
            expect(mockNavigate).toHaveBeenCalledWith("/usuarios");
        });
    });

    it("debe mostrar mensaje de loading durante el registro", async () => {
        mockUseAuth.mockReturnValue({ user: null });
        mockRegisterRequest.mockResolvedValue({});

        render(<RegistroPage />);

        const submitButton = screen.getByText("Submit Register");
        submitButton.click();

        await waitFor(() => {
            expect(mockMessageLoading).toHaveBeenCalledWith("Registrando usuario...", 0);
        });
    });

    it("debe mostrar error al fallar el registro", async () => {
        mockUseAuth.mockReturnValue({ user: null });
        const errorMock = new Error("Registration failed");
        mockRegisterRequest.mockRejectedValue(errorMock);

        render(<RegistroPage />);

        const submitButton = screen.getByText("Submit Register");
        submitButton.click();

        await waitFor(() => {
            expect(mockMessageError).toHaveBeenCalledWith("Error al registrar usuario");
            expect(mockNavigate).not.toHaveBeenCalled();
        });
    });

    it("debe mostrar mensaje de error personalizado del backend", async () => {
        mockUseAuth.mockReturnValue({ user: null });
        const errorMock = {
            response: {
                data: {
                    message: "El correo ya está registrado"
                }
            }
        };
        mockRegisterRequest.mockRejectedValue(errorMock);

        render(<RegistroPage />);

        const submitButton = screen.getByText("Submit Register");
        submitButton.click();

        await waitFor(() => {
            expect(mockMessageError).toHaveBeenCalledWith("El correo ya está registrado");
        });
    });

    it("debe usar rol 'cliente' por defecto si no se proporciona", async () => {
        mockUseAuth.mockReturnValue({ user: null });
        mockRegisterRequest.mockResolvedValue({});

        render(<RegistroPage />);

        const submitButton = screen.getByText("Submit Register");
        submitButton.click();

        await waitFor(() => {
            expect(mockRegisterRequest).toHaveBeenCalledWith(
                "Juan Pérez",
                "juan@example.com",
                "password123",
                "cliente"
            );
            expect(mockMessageSuccess).toHaveBeenCalledWith("Registro exitoso.");
        });
    });
});
