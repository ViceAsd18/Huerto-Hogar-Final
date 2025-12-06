import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    type LinksFunction,
} from "react-router";

import "./app.css";
import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";

import { AuthProvider } from "auth/AuthContext";
import { CartProvider } from "auth/CartContext";

export const links: LinksFunction = () => [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    },
];

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
            <title>HuertoHogar</title>
        </head>
        <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        </body>
        </html>
    );
}

export default function App() {
    return (
        <ConfigProvider locale={esES} theme={{ token: { colorPrimary: '#2E8B57' } }}>
            <AuthProvider>
                <CartProvider>
                    <Outlet />
                </CartProvider>
            </AuthProvider>
        </ConfigProvider>
    );
}