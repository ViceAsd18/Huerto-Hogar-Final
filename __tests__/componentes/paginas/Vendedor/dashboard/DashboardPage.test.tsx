import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import DashboardPage from "componentes/paginas/Vendedor/dashboard/DashboardPage";

vi.mock("componentes/layout/VendedorLayout", () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div data-testid="vendedor-layout">{children}</div>,
}));

vi.mock("componentes/organismo/Vendedor/Dashboard/DashboardPanel", () => ({
    __esModule: true,
    default: () => <div data-testid="dashboard-panel">Dashboard Panel</div>,
}));

vi.mock("antd", async () => {
    const React = await import("react");
    const { createElement } = React;

    return {
        __esModule: true,
        Row: ({ children, gutter }: any) => 
            createElement("div", { "data-testid": "ant-row", "data-gutter": gutter }, children),
        Col: ({ children, span }: any) => 
            createElement("div", { "data-testid": "ant-col", "data-span": span }, children),
    };
});

describe("DashboardPage Component", () => {
    it("debe renderizar el layout de vendedor", () => {
        render(<DashboardPage />);

        expect(screen.getByTestId("vendedor-layout")).toBeInTheDocument();
    });

    it("debe renderizar el panel de dashboard", () => {
        render(<DashboardPage />);

        expect(screen.getByTestId("dashboard-panel")).toBeInTheDocument();
    });

    it("debe renderizar Row y Col de Ant Design", () => {
        render(<DashboardPage />);

        expect(screen.getByTestId("ant-row")).toBeInTheDocument();
        expect(screen.getByTestId("ant-col")).toBeInTheDocument();
    });
});
