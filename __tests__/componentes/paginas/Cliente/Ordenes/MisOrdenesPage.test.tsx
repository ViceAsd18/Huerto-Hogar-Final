import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import MisOrdenesPage from "componentes/paginas/Cliente/Ordenes/MisOrdenesPage";

const mockNavigate = vi.fn();

vi.mock("react-router", () => ({
    __esModule: true,
    useNavigate: () => mockNavigate,
}));

const useAuthMock = vi.fn();

vi.mock("auth/AuthContext", () => ({
    __esModule: true,
    useAuth: () => useAuthMock(),
}));

const mockGetOrdenes = vi.fn();

vi.mock("services/orden", () => ({
    __esModule: true,
    getOrdenes: (...args: any[]) => mockGetOrdenes(...args),
}));

vi.mock("componentes/layout/ClienteLayout", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="cliente-layout">{children}</div>,
}));

vi.mock("componentes/atomos/Titulo", () => ({
    __esModule: true,
    default: ({ children, nivel }: { children: React.ReactNode; nivel?: number }) => {
        const tag = `h${nivel || 1}`;
        return React.createElement(tag, {}, children);
    },
}));

vi.mock("componentes/organismo/Cliente/Orden/ListaOrdenesCliente", () => ({
    __esModule: true,
    default: ({ ordenes }: { ordenes: any[] }) => (
        <div data-testid="lista-ordenes" data-count={ordenes.length}>
            {ordenes.map((o) => (
                <div key={o.id_venta}>{o.usuario?.id_usuario}</div>
            ))}
        </div>
    ),
}));

vi.mock("antd", async () => {
    const React = await import("react");
    const { createElement } = React;

    return {
        __esModule: true,
        Typography: {
            Text: ({ children, ...rest }: any) => createElement("span", rest, children),
        },
        Spin: ({ children }: any) => createElement("div", { className: "ant-spin" }, children),
        Empty: ({ description }: any) => createElement("div", { "data-testid": "ant-empty" }, description),
    };
});

describe("MisOrdenesPage Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("debe mostrar loading mientras carga", () => {
        useAuthMock.mockReturnValue({ user: { id_usuario: 1 } });
        mockGetOrdenes.mockReturnValue(new Promise(() => {}));

        const { container } = render(<MisOrdenesPage />);

        expect(container.querySelector(".ant-spin")).toBeInTheDocument();
    });

    it("debe mostrar mensaje vacío si no hay órdenes", async () => {
        useAuthMock.mockReturnValue({ user: { id_usuario: 1 } });
        mockGetOrdenes.mockResolvedValue([
            { id_venta: 10, usuario: { id_usuario: 2 } },
        ]);

        render(<MisOrdenesPage />);

        await waitFor(() => {
            expect(screen.getByTestId("ant-empty")).toBeInTheDocument();
        });
    });

    it("debe renderizar las órdenes filtradas del usuario", async () => {
        useAuthMock.mockReturnValue({ user: { id_usuario: 1 } });
        const ordenesMock = [
            { id_venta: 10, usuario: { id_usuario: 1 } },
            { id_venta: 11, usuario: { id_usuario: 2 } },
        ];
        mockGetOrdenes.mockResolvedValue(ordenesMock);

        render(<MisOrdenesPage />);

        await waitFor(() => {
            expect(screen.getByTestId("lista-ordenes")).toBeInTheDocument();
            expect(screen.getByTestId("lista-ordenes")).toHaveAttribute("data-count", "1");
        });
    });
});
